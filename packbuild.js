import { writeFileSync } from "node:fs";
import path from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;

const template = {
  schema: "pre1",
  name: "core",
  version: "0.0.1",
  description:
    "Taskless core Telemetry. The core telemetry contains common monitoring and logging found in APM-like solutions, and is a solid baseline for any observability stack.",
  capture: {
    url: {
      type: "string",
      description: "The full URL of the request",
    },
    path: {
      type: "string",
      description: "The path of the request in the form of '/path/to/resource'",
    },
    error: {
      type: "string",
      description: "The error message in the event of a non-200 response code",
    },
    domain: {
      type: "string",
      description: "The domain of the request",
    },
    status: {
      type: "number",
      description: "The status code of the request",
    },
    durationMs: {
      type: "number",
      description: "The duration of the request in milliseconds",
    },
  },
  permissions: {
    domains: [".+"],
    response: ["body", "headers"],
  },
};

writeFileSync(
  path.resolve(__dirname, "./dist/manifest.json"),
  JSON.stringify(template, null, 2)
);
