module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import'
  ],
  rules: {
    "react/prop-types": "off", // https://cpoint-lab.co.jp/article/202107/20531/
    "@typescript-eslint/ban-ts-comment": "off", // https://stackoverflow.com/questions/59729654/how-ignore-typescript-errors-with-ts-ignore
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  }
};
