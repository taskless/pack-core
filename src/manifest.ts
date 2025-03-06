import { type Manifest } from "./__generated__/manifest.js";

export const manifest = {
  schema: "pre2",
  name: "core",
  version: "0.0.2",
  description:
    "Taskless core Telemetry. The core telemetry contains common monitoring and logging found in APM-like solutions, and is a solid baseline for any observability stack.",
  permissions: {
    // no extended permissions required
  },
  fields: [
    {
      name: "domains",
      type: "string[]",
      description: "List of domains to capture telemetry for",
      default: ["*"],
    },
    {
      name: "enableUrl",
      type: "boolean",
      description: "Enable URL capture",
      default: true,
    },
    {
      name: "enablePath",
      type: "boolean",
      description: "Enable path capture",
      default: true,
    },
    {
      name: "enableError",
      type: "boolean",
      description: "Enable error capture",
      default: true,
    },
    {
      name: "enableDomain",
      type: "boolean",
      description: "Enable domain capture",
      default: true,
    },
    {
      name: "enableStatus",
      type: "boolean",
      description: "Enable status capture",
      default: true,
    },
    {
      name: "enableDurationMs",
      type: "boolean",
      description: "Enable duration capture",
      default: true,
    },
  ],
} satisfies Manifest;
