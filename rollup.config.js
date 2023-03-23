import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import image from "@rollup/plugin-image";
import multi from "@rollup/plugin-multi-entry";
import { getFiles } from "./scripts/buildUtils";

const packageJson = require("./package.json");

export default [
  {
    input: [
      "src/index.ts",
      ...getFiles("./src/components", [".js", ".ts", ".jsx", ".tsx"]),
    ],
    output: {
      dir: "dist",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
    // output: [
    //   {
    //     file: packageJson.main,
    //     format: "cjs",
    //     sourcemap: true,
    //     inlineDynamicImports: true,
    //   },
    //   {
    //     file: packageJson.module,
    //     format: "esm",
    //     sourcemap: true,
    //     inlineDynamicImports: true,
    //   },
    //   {
    //     dir: "dist",
    //     format: "cjs",
    //     preserveModules: true,
    //     preserveModulesRoot: "src",
    //     sourcemap: true,
    //   },
    // ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
      }),

      terser(),
      image(),
    ],
    external: ["react", "react-dom"],
  },
  // {
  //   input: "dist/esm/types/index.d.ts",
  //   output: [{ dir: "dist", format: "esm" }],
  //   plugins: [dts()],

  //   external: ["react", "react-dom"],
  // },
];
