import * as esbuild from "esbuild";

export const buildSettings = {
  entryPoints: ["content/main.js"],
  outdir: "dist",
  bundle: true,
  loader: { ".js": "jsx" },
  sourcemap: true,
  minify: true,
};
await esbuild.build(buildSettings);
