import { Elysia } from "elysia";

type LogLevel = "info" | "warn" | "error";

const lokiUrl = process.env.LOKI_URL || "http://localhost:3100";

const log = (
  level: LogLevel,
  message: string,
  app: string,
  labels?: Record<string, string>
) => {
  const payload = {
    streams: [
      {
        stream: { level, app, ...labels },
        values: [[`${Date.now()}000000`, message]],
      },
    ],
  };

  fetch(`${lokiUrl}/loki/api/v1/push`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const createLoggerPlugin = async (options: { app: string }) => {
  const { app } = options;

  const logger = {
    info: (message: string, labels?: Record<string, string>) =>
      log("info", message, app, labels),
    warn: (message: string, labels?: Record<string, string>) =>
      log("warn", message, app, labels),
    error: (message: string, labels?: Record<string, string>) =>
      log("error", message, app, labels),
  };

  return new Elysia().decorate("log", logger);
};

