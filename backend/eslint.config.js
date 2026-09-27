import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'src/prisma/contract.json', 'src/prisma/contract.d.ts'],
  },
  ...tseslint.configs.recommended,
  {
    
  
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
);