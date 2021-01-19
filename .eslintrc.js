module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': ['off'],
    'import/prefer-default-export': ['off'],
    'react/require-default-props': ['warn'],
    'react/forbid-prop-types': ['warn'],
    'linebreak-style': ['error', 'windows']
  },
};
