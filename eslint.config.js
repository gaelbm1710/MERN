module.exports = {
  root: true, 
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  environments: {
    browser: true,
    jest: true,
  },
  extends: [
    'react-app',
    'react-app/jest'
  ],
  plugins: [
    'react'
  ],
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      rules: {
        "no-unused-vars": "off",
        "react-hooks/exhaustive-deps": "warn" 
      },
    }
  ],
};
