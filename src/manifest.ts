import pk from "../package.json" with { type: "json" };
import { type Manifest } from "./__generated__/manifest.js";

export const manifest = {
  schema: "pre2",
  name: "core",
  version: pk.version,
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
  charts: [
    {
      type: "step",
      title: "Response Time (p95)",
      definition: {
        bucket: { time: "HOUR" },
        series: {
          query: "core/domain = '%(dimension)s'",
          dimension: "core/domain",
          dimensionType: "string",
        },
        aggregate: { p95: "core/durationMs" },
      },
    },
    {
      type: "step",
      title: "Response Time (p99)",
      definition: {
        bucket: { time: "HOUR" },
        series: {
          query: "core/domain = '%(dimension)s'",
          dimension: "core/domain",
          dimensionType: "string",
        },
        aggregate: { p99: "core/durationMs" },
      },
    },
    {
      type: "table",
      title: "Calls per Domain",
      definition: {
        bucket: { dimension: "core/domain" },
        aggregate: { count: "core/domain" },
      },
    },
    {
      type: "pie",
      title: "Failures by Domain",
      definition: {
        bucket: { dimension: "core/domain" },
        series: { query: "core/status >= 400" },
        aggregate: { count: "core/domain" },
      },
    },
  ],
} satisfies Manifest;
