# Taskless Core Plugin

The Taskless Core plugin powers the Open Source [Taskless Loader](https://github.com/taskless/loader-js) and is the default pack most users use when starting with Taskless.

# What Are Packs?

Packs are WebAssembly binaries that expose one or more "hooks" to the host system. In the case of Taskless, these WebAssembly hooks must expose a `pre` and `post` method which operate on strings containing JSON.

# Building Locally

Taskless Packs are built as Extism plugins. This one is (currently) TypeScript based, and requires the Extism PDK to build.

1. Follow the `js-pdk` instructions to install Extism's builder for JavaScript and TypeScript projects ([link](https://github.com/extism/js-pdk))
2. Run `pnpm install` to install the development dependnecies
3. Run `pnpm build` to build the plugin

In the `dist` folder, you'll see the final JavaScript, along with a `plugin.wasm` file (the WebAssembly binary) and a `manifest.json` file that describes the plugin.

# Testing

This library uses [@taskless/packcheck](https://github.com/taskless/packcheck) to test the WebAssembly binary. To run the tests, run `pnpm test`.
