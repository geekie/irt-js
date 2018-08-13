"use strict";

const babel = require("@babel/core");
const path = require("path");
const rollup = require("rollup");
const vm = require("vm");

function evaluate(file, code) {
  return rollup
    .rollup({
      input: file,
      plugins: [{ load: () => code }]
    })
    .then(bundle => bundle.generate({ format: "iife", name: "$$$module" }))
    .then(({ code }) => {
      const sandbox = vm.createContext();
      vm.runInContext(code, sandbox);
      return `export default ${JSON.stringify(sandbox.$$$module)}`;
    });
}

module.exports = {
  input: "src/irt.js",
  plugins: [
    {
      transform(code, id) {
        code = babel.transform(code, { filename: id, comments: false });
        return id === path.resolve("./src/prior.js")
          ? evaluate(id, code)
          : code;
      }
    }
  ],
  output: [
    {
      file: "dist/irt.js",
      format: "cjs"
    },
    {
      file: "dist/irt.umd.js",
      name: "IRT",
      format: "umd"
    }
  ]
};
