module.exports = {
  'presets': ['@babel/preset-env', '@babel/preset-react'],
  'plugins': [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    'inline-json-import',    [
      'istanbul',
      {
        'include': ['src/**/**.js'],
        'exclude': ['**/mocks/**'],
      },
    ],
  ],
  'ignore': ['**/*.usfm.js'],
};
