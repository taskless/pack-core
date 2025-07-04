import {
  type PluginInput as PI,
  type PluginOutput as PO,
} from "@taskless/loader";
import { z } from "zod";
import { type Pack } from "./__generated__/pack.js";
import { isValidHost, readInput, writeOutput } from "./helpers.js";
import { manifest } from "./manifest.js";

type PluginInput<
  TContext = unknown,
  TRequest = unknown,
  TResponse = unknown,
> = PI<TContext, TRequest, TResponse> & Pick<Pack, "configuration">;

type PluginOutput<TContext = unknown> = PO<TContext> &
  Pick<Pack, "configuration">;

type Context = {
  start: number;
};

type AnyJsonResponse = {
  error?: string;
  message?: string;
  err?: {
    type?: string;
  };
};

type AnyResponse = undefined | string | AnyJsonResponse;

const configuration = z
  .object({
    domains: z.array(z.string()).optional(),
    enableUrl: z.boolean().optional(),
    enablePath: z.boolean().optional(),
    enableError: z.boolean().optional(),
    enableDomain: z.boolean().optional(),
    enableStatus: z.boolean().optional(),
    enableDurationMs: z.boolean().optional(),
  })
  .optional();

export function pre() {
  const input = readInput<PluginInput<Context>>();
  const userConfig = configuration.parse(input.configuration);
  const domains = userConfig?.domains;

  // if there's no domains, then this is a v1 loader calling us
  // so we skip the domain check
  if (domains && !isValidHost(input.request.domain, domains)) {
    writeOutput<PluginOutput<Context>>({});
    return;
  }

  const enableDomain =
    userConfig?.enableDomain ??
    manifest.fields.find((f) => f.name === "enableDomain")?.default ??
    true;
  const domain = enableDomain ? input.request.domain : undefined;

  const enableUrl =
    userConfig?.enableUrl ??
    manifest.fields.find((f) => f.name === "enableUrl")?.default ??
    true;
  const url = enableUrl ? input.request.url : undefined;

  const enablePath =
    userConfig?.enablePath ??
    manifest.fields.find((f) => f.name === "enablePath")?.default ??
    true;

  const path = enablePath ? input.request.path : undefined;

  writeOutput<PluginOutput<Context>>({
    capture: {
      domain,
      url,
      path,
    },
    context: {
      start: Date.now(),
    },
  });
}

export function post() {
  const input = readInput<PluginInput<Context, unknown, AnyResponse>>();
  const userConfig = configuration.parse(input.configuration);
  const domains = userConfig?.domains;

  // if there's no domains, then this is a v1 loader calling us
  // so we skip the domain check
  if (domains && !isValidHost(input.request.domain, domains)) {
    writeOutput<PluginOutput<Context>>({});
    return;
  }

  const body =
    input.response?.body && typeof input.response.body === "object"
      ? input.response.body
      : undefined;

  let seenError: string | undefined;
  if (input.response?.status && input.response.status >= 400) {
    if (typeof body === "string") {
      try {
        const parsedBody = JSON.parse(body) as AnyJsonResponse;
        seenError =
          parsedBody.error ?? parsedBody.message ?? parsedBody.err?.type;
      } catch {
        // noop, the body wasn't JSON
      }
    } else if (typeof body === "object" && body !== null) {
      seenError = body?.error ?? body?.message ?? body?.err?.type;
    }
  }

  const durationMs =
    (userConfig?.enableDurationMs ??
    manifest.fields.find((f) => f.name === "enableDurationMs")?.default ??
    true)
      ? { durationMs: Date.now() - input.context.start }
      : {};

  const status =
    (userConfig?.enableStatus ??
    manifest.fields.find((f) => f.name === "enableStatus")?.default ??
    true)
      ? { status: input.response?.status }
      : {};

  const error =
    (userConfig?.enableError ??
    manifest.fields.find((f) => f.name === "enableError")?.default ??
    true)
      ? { error: seenError }
      : {};

  writeOutput<PluginOutput<Context>>({
    capture: {
      ...durationMs,
      ...status,
      ...error,
    },
  });
}
