module.exports = {
  "root": true,
  "extends": [
    "react-app",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  "plugins": ["react-hooks"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": [
      "warn",
      {
        "args": "after-used",
        "ignoreRestSiblings": false,
        "argsIgnorePattern": "^_$"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "printWidth": 100,
        "trailingComma": "all",
        "tabWidth": 2,
        "semi": true,
        "singleQuote": false,
        "bracketSpacing": false,
        "arrowParens": "always"
      }
    ],
    "import/order": ["warn", {"newlines-between": "always"}],
    "react/self-closing-comp": "warn",
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-sort-props": ["warn", {
      "callbacksLast": true,
      "shorthandFirst": true,
      "noSortAlphabetically": false,
      "reservedFirst": true
    }]
  }
}
