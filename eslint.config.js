import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic": stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@stylistic/space-before-function-paren": "error",
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/eol-last": "error",
      "@stylistic/comma-dangle": "error",
      "@stylistic/jsx-quotes": ["error", "prefer-single"],
      "@stylistic/quotes": ["error", "single", { avoidEscape: true }],
      "@stylistic/semi": ["error", "never"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/space-infix-ops": ["error"],
      "@stylistic/spaced-comment": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/operator-linebreak": ["error", "before"],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/template-curly-spacing": ["error", "never"],
      "@stylistic/indent": ["error", 2],
    },
  }
);
