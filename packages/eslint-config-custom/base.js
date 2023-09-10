module.exports = {
  rules: {
    "no-unused-vars": "off",
    "no-console": "warn",

    "unicorn/filename-case": [
      "error",
      {
        "cases": {
          "camelCase": true,
          "pascalCase": true
        }
      }
    ]
  }
}