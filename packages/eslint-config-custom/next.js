module.exports = {
  extends: ["next/core-web-vitals", "turbo", "./base.js", "plugin:prettier/recommended"],
  settings: {
    react: {
      version: "detect",
    },
    next: {
      rootDir: 'apps/web/',
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}
