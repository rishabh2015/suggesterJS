// Severity should be one of the following: 0 = off, 1 = warn, 2 = error
// Lint ruled docs: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "standard",
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    include: [
      "src/**/*.ts"
    ],
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    "no-new": 0,
    "indent": ["error", 4],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "arrow-parens": ["error", "always"],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/ban-ts-ignore": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/camelcase": ["error", { "properties": "always" }],
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/interface-name-prefix": "error",
    "@typescript-eslint/member-delimiter-style": "error",
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "no-empty-function": "error",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-this-alias": "error",
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/triple-slash-reference": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "space-before-function-paren": 0
  }
}
