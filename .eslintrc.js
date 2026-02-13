module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // Code style
    'prettier/prettier': 'error',

    // TypeScript
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // React
    'react/no-unknown-property': ['error', { ignore: ['css'] }],

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
