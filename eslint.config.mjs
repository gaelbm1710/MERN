// eslint.config.js
import js from "@eslint/js";

export default [
    js.configs.recommended,

    {
      "rules": {
          "no-unused-vars": ["error", {
              "vars": "all",
              "args": "after-used",
              "caughtErrors": "all",
              "ignoreRestSiblings": false,
              "reportUsedIgnorePattern": false
          }]
      }
  }
];