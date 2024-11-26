import YAML from 'yaml'
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { uint8ArrayToBase64 } from "uint8array-extras"

const __dirname = new URL(".", import.meta.url).pathname;

const template = {
  schema: 3,
  name: "core",
  version: "1.0.0",
  description:
    "Taskless core Telemetry. The core telemetry contains common monitoring and logging found in APM-like solutions, and is a solid baseline for any observability stack.",
  capture: {
    durationMs: {
      type: "number",
      description: "The duration of the request in milliseconds",
    },
    status: {
      type: "number",
      description: "The status code of the request",
    },
    domain: {
      type: "string",
      description: "The domain of the request",
    },
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
      description: "The error message",
    },
  },
  permissions: {
    domains: [".+"],
    response: ["body", "headers"],
  }
}

const wasm = readFileSync(resolve(__dirname, "./dist/plugin.wasm"));

// convert the wasm string to base64
template.module = uint8ArrayToBase64(wasm);

writeFileSync(
  resolve(__dirname, "./dist/taskless-oss.yaml"),
  YAML.stringify(template)
);
