import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import configPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const ext2file = (ext) => `src/**/*.${ext}`;

export default defineConfig([
  // eslint:recommended
  eslint.configs.recommended,
  // for TypeScript
  tseslint.configs.recommended,
  // for React
  {
    files: ['js', 'ts', 'jsx', 'tsx'].map(ext2file),
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
    },
  },
  // override for Prettier
  configPrettier,
  // override for Tanstack Query
  ...pluginQuery.configs['flat/recommended'],
  // override for Tanstack Router
  ...pluginRouter.configs['flat/recommended'],
  // 生成されるファイルを除外
  globalIgnores([
    'src/route-tree.gen.ts',
    'src/shared/api/api-spec.ts',
    'dist/**/*',
  ]),
]);
