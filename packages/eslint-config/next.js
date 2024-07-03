const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		"eslint:recommended",
		"prettier",
		require.resolve("@vercel/style-guide/eslint/next"),
		"turbo",
		"next/core-web-vitals",
	],
	globals: {
		React: true,
		JSX: true,
	},
	env: {
		node: true,
		browser: true,
	},
	plugins: ["only-warn"],
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
	ignorePatterns: [
		// Ignore dotfiles
		".*.js",
		"node_modules/",
	],
	overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
	rules: {
		"no-console": "warn",
		"no-var": "warn",
		"no-unused-vars": "warn",
		"no-unused-expressions": "warn",
		"no-unused-labels": "warn",
		"no-empty": "error",
		"no-empty-function": "error",
		"no-const-assign": "error",
		"no-unreachable": "error",
		"default-case": "error",
		"eqeqeq": "error",
		"space-before-blocks": "error",
		"no-prototype-builtins": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "off",
	},
};
