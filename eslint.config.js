module.exports = {
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
    extends: [
      'react-app',
      'react-app/jest'
    ],
    plugins: [
      'react'
    ],
    overrides: [
      {
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        languageOptions: {
          ecmaVersion: 2021,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    ],
    rules: {
      "no-unused-vars": "off"
    }
  }
  