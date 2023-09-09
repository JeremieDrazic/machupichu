module.exports = {
  extends: ["eslint:recommended", "turbo", "./base.js", "plugin:prettier/recommended"],
  plugins: ['import'],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
  ]
}