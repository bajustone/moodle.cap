import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
export default {
    input: 'src/index.js',
    output: {
      format: 'iife',
      dir: "./build",
      name: "index.js"
    },
    plugins: [
      nodeResolve(),
      json(),
      terser({compress: true, output: {comments: ""}})
    ]
  };