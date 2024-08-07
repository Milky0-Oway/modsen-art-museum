import globals from 'globals';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';
//import configPrettier from 'eslint-config-prettier';

export default [
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			parser: tsParser,
			globals: {
				...globals.browser,
				...globals.jest,
				module: 'readonly',
				global: 'readonly',
				__dirname: 'readonly',
			},
			sourceType: 'module',
			ecmaVersion: 'latest',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			react: pluginReact,
			'react-hooks': pluginReactHooks,
			prettier: pluginPrettier,
		},
		rules: {
			...js.configs.recommended.rules,
			...typescriptEslint.configs.recommended.rules,
			...pluginReact.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'error',
			'react/jsx-no-target-blank': ['error', { allowReferrer: true }],
			'react/display-name': 'off',
		},
	},
];
