const { FlatCompat } = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort');
const js = require('@eslint/js');
const eslintPluginJsxA11y = require('eslint-plugin-jsx-a11y');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginSortDestructureKeys = require('eslint-plugin-sort-destructure-keys');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@nx': nxEslintPlugin,
      '@typescript-eslint': typescriptPlugin,
      'simple-import-sort': eslintPluginSimpleImportSort,
      'sort-destructure-keys': eslintPluginSortDestructureKeys,
    },
    rules: {
      '@/sort-keys': 'warn',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: [
            {
              onlyDependOnLibsWithTags: ['*'],
              sourceTag: '*',
            },
          ],
          enforceBuildableLibDependency: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'react-hooks/exhaustive-deps': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^\\u0000'],
            ['^(react|react-dom)(/.*|$)', '^(next)(/.*|$)', '^@?\\w'],
            ['^(src)(/.*|$)'],
            ['^'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': [
        'warn',
        {
          caseSensitive: false,
        },
      ],
    },
  },
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      'jsx-a11y': eslintPluginJsxA11y,
      'jsx-react': eslintPluginReact,
    },
    rules: {
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/no-noninteractive-tabindex': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-react/jsx-sort-props': [
        'warn',
        { callbacksLast: true, shorthandFirst: true },
      ],
    },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: {
            order: 'alphabetically',
          },
        },
      ],
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  })),
  ...compat.config({ env: { jest: true } }).map((config) => ({
    ...config,
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {},
  })),
];
