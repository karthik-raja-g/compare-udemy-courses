import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";
import { copy } from "esbuild-plugin-copy";

export const buildSettings = {
  entryPoints: ["content/main.js", "manifest.json"],
  outdir: "dist",
  bundle: true,
  loader: { ".js": "jsx", ".json": "copy", ".png": "dataurl" },
  sourcemap: false,
  minify: false,
  platform: 'browser',
  plugins: [
    lessLoader(),
    // copy({
    //   // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
    //   // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
    //   resolveFrom: "cwd",
    //   assets: {
    //     from: ["./content/assets/*"],
    //     to: ["./dist/content/assets"],
    //   },
    //   watch: true,
    // }),
  ],
};
await esbuild.build({...buildSettings, });
