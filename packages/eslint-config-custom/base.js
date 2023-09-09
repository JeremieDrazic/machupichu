module.exports = {
  plugins: ["import"],
  rules: {
    "no-unused-vars": "error",

    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
      },
    ],
    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
        png: 'always',
        svg: 'always',
        jpg: 'always',
        jpeg: 'always',
      },
    ],
  },
  ignorePatterns: [
    'node_modules/',
    '**/node_modules/',
    '/**/node_modules/*',
    'out/',
    'dist/',
    'build/',
    '.turbo',
    '.next',
    'public',
    '.eslintrc.js'
  ]
}