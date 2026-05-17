#!/usr/bin/env node

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import stripAnsi from "strip-ansi";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEST_PROJECTS_SCRIPT = path.join(ROOT_DIR, "scripts", "test-projects.mjs");
const DEFAULT_LOG_DIR = path.join(ROOT_DIR, ".artifacts", "test-logs");

function sanitizeForLog(chunk) {
  return stripAnsi(String(chunk)).replace(/\r\n?/g, "\n");
}

function resolveLogPath() {
  const explicitPath = process.env.OPENCLAW_TEST_LOG_FILE?.trim();
  if (explicitPath) {
    return path.resolve(ROOT_DIR, explicitPath);
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(DEFAULT_LOG_DIR, `test-projects-${stamp}.log`);
}

async function main() {
  const args = process.argv.slice(2);
  const logPath = resolveLogPath();
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  const logStream = fs.createWriteStream(logPath, {
    flags: "w",
    mode: 0o600,
  });
  let streamError = null;
  logStream.on("error", (error) => {
    streamError = error;
  });

  const relativeLogPath = path.relative(ROOT_DIR, logPath) || logPath;
  const commandLine = [process.execPath, TEST_PROJECTS_SCRIPT, ...args]
    .map((part) => JSON.stringify(part))
    .join(" ");

  const header = [
    `==> [test-log] command: ${commandLine}`,
    `==> [test-log] log: ${relativeLogPath}`,
    `==> [test-log] started: ${new Date().toISOString()}`,
    "",
  ].join("\n");
  process.stdout.write(header);
  logStream.write(header);

  const child = spawn(process.execPath, [TEST_PROJECTS_SCRIPT, ...args], {
    cwd: ROOT_DIR,
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
  });

  let forwardedSignal = null;
  const forwardSignal = (signal) => {
    if (forwardedSignal) {
      return;
    }
    forwardedSignal = signal;
    try {
      child.kill(signal);
    } catch {
      // Best-effort only.
    }
  };
  process.once("SIGINT", forwardSignal);
  process.once("SIGTERM", forwardSignal);

  child.stdout.on("data", (chunk) => {
    process.stdout.write(chunk);
    if (!streamError) {
      logStream.write(sanitizeForLog(chunk));
    }
  });
  child.stderr.on("data", (chunk) => {
    process.stderr.write(chunk);
    if (!streamError) {
      logStream.write(sanitizeForLog(chunk));
    }
  });

  const exitCode = await new Promise((resolve) => {
    child.on("error", () => resolve(1));
    child.on("exit", (code, signal) => {
      if (signal) {
        resolve(128 + (signal === "SIGINT" ? 2 : signal === "SIGTERM" ? 15 : 1));
        return;
      }
      resolve(code ?? 1);
    });
  });

  const footer = `\n==> [test-log] finished: ${new Date().toISOString()} exitCode=${exitCode}\n`;
  process.stdout.write(footer);
  logStream.write(footer);

  await new Promise((resolve) => {
    logStream.end(resolve);
  });

  if (streamError) {
    process.stderr.write(
      `[test-log] failed to write ${relativeLogPath}: ${streamError.message ?? "unknown error"}\n`,
    );
    process.exitCode = exitCode === 0 ? 1 : exitCode;
    return;
  }

  process.exitCode = exitCode;
}

await main();
