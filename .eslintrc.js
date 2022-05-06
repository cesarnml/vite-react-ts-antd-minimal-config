module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 0, // React (>v17) no longer needs to be explicitly imported
    '@typescript-eslint/no-shadow': 0, // Too restrictive
    'import/prefer-default-export': 0, // Named exports have better IntelliSense support
    'import/extensions': 0, // Old fashion to require file extension for imports
    'react/function-component-definition': [1, { namedComponents: 'arrow-function' }], // Named components are better
    'import/order': 0, // TODO: Turn on when `OrganizeImports` plays nice
    '@typescript-eslint/no-unused-vars': 0, // Duplicate. Covered by `no-unused-vars`
    'react/require-default-props': 0, // Unnecessary since we use TS
    'react/prop-types': 0, // Unnecessary since we use TS
    'no-param-reassign': 0, // Conflicts with immer pattern
    '@typescript-eslint/naming-convention': 0, // Doesn't play nice with Python snake_case convention
    '@typescript-eslint/no-explicit-any': 1, // TODO: Discuss with team. Necessary evil to move fast.
    'consistent-return': 0, // TODO: Discuss with team. Too restrictive. Conflicts with thunk pattern
    'react/no-unstable-nested-components': [2, { allowAsProps: true }], // Conflicts with AntD prop patterns
    'react/no-array-index-key': 1, // TODO: Discuss with team. Conflicts with CoachScheduleDay component
    'react/jsx-no-useless-fragment': 0, // Prevents error when offending component is imported by a parent component as a sibling
    'jsx-a11y/label-has-associated-control': 1, // FIXME: Changed to warning, but should be fixed and reverted to error
    'react/jsx-props-no-spreading': 0, // Conflicts with ReusableComponent pattern
  },
}
