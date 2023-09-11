const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    ...[
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/react',
      '@vercel/style-guide/eslint/next',
    ].map(require.resolve),
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', 'storybook-static/'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',

    'react/function-component-definition': 'off',

    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    'import/no-default-export': 'off',

    'unicorn/filename-case': 'off',
  },
};
