import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// Optional: `npm i -D eslint-plugin-jsx-a11y` switches on the full JSX accessibility rule set.
// Until it is installed the config degrades gracefully; scripts/verify/rules/a11y-static.mjs still runs.
const jsxA11y = await import('eslint-plugin-jsx-a11y').then((m) => m.default ?? m).catch(() => null);

const HEX = '/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/';

export default [
  { ignores: ['dist', 'node_modules'] },

  // ---- Browser source (src/) ----
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
    settings: { react: { version: '18.3' } },
    plugins: { react, 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Existing choices
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Correctness
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',

      // React hygiene
      'react/no-danger': 'error',
      'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
      'react/self-closing-comp': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-no-leaked-render': 'off',

      // Size and complexity budgets (mirrors scripts/verify/rules/hygiene.mjs)
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      complexity: ['warn', 15],

      // Project rules from AGENTS.md
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['gsap', 'gsap/*', '@gsap/react'], message: 'Import gsap helpers from src/lib/gsap.js so plugins are registered once.' },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        { selector: `Literal[value=${HEX}]`, message: 'No raw hex colours; use a theme token from src/styles/index.css.' },
        { selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']", message: 'Do not inject raw HTML.' },
      ],
    },
  },

  // The one place allowed to import gsap directly
  { files: ['src/lib/gsap.js'], rules: { 'no-restricted-imports': 'off' } },

  // Data files are plain content modules
  { files: ['src/data/**/*.js'], rules: { 'max-lines': 'off', 'no-restricted-imports': ['error', { patterns: ['**/components/*', '**/sections/*', '**/hooks/*'] }] } },

  // ---- Node scripts, configs, hooks ----
  {
    files: ['scripts/**/*.mjs', '.claude/hooks/*.mjs', 'vite.config.js', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: globals.node },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // ---- Optional accessibility plugin ----
  ...(jsxA11y ? [{ ...jsxA11y.flatConfigs.recommended, files: ['src/**/*.{js,jsx}'] }] : []),
];
