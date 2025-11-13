// eslint.config.js (Flat config for ESLint v9+)
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import path from 'node:path';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['**/*.ts', '**/*.tsx', 'scripts/**/*.js'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: path.resolve('.'), // explicitly set the root
        project: [
          './tsconfig.json', // main tsconfig
          './server/app-server/tsconfig.json', // additional tsconfig if needed
          './packages/core/zustand-store/tsconfig.json',
        ],
        sourceType: 'module',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
