import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  bundle: true,
  sourcemap: "inline",
  minify: false, // might want to use true for production build
  format: "cjs", // needs to be CJS for now
  target: ["es2020"], // don't go over es2020 because quickjs doesn't support it
});
