module.exports = {
  env:{
    browser: true,
    es2021: true
  },
  extends:[
    'plugin:react/recoommended',
    'standar'
  ],
  parserOptions:{
    ecmaFeatures:{
      jsx:true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins:[
    'react'
  ],
  rules: {
    "no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "caughtErrors": "all",
      "ignoreRestSiblings": false,
      "reportUsedIgnorePattern": false
  }]
  }
}