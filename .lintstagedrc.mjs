/**
 * @type {import('lint-staged').Configuration}
 * ESLint runs during `next build`; lint-staged only formats staged files.
 */
const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": ["prettier --write"],
  "*.mdx": "prettier --write",
};

export default lintStagedConfig;
