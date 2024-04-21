module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": 0,
    "no-console": 0,
    quotes: 0,
    "class-methods-use-this": 0,
    "comma-dangle": 0,
    "no-param-reassign": 0,
    camelcase: 0,
  },
};
