import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import tseslint from '@typescript-eslint/eslint-plugin'
import parserTypeScript from '@typescript-eslint/parser'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,

  ...pluginVue.configs['flat/recommended'],
  {
    name: 'app/typescript-recommended',
    files: ['**/*.{ts,mts,tsx,vue}'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: parserTypeScript,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  {
    name: 'app/vue-rules',
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        sourceType: 'module',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    name: 'app/typescript-rules',
    files: ['**/*.{ts,mts,tsx}'],
    languageOptions: {
      parser: parserTypeScript,
    },
  },
]