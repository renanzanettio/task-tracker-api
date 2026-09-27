import tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // Aplica as regras recomendadas de JavaScript padrao
  eslintJs.configs.recommended,

  // Aplica as regras recomendadas para TypeScript
  ...tseslint.configs.recommended,

  // Desativa regras do ESLint que conflitam com o Prettier
  prettierConfig,

  {
    // Habilita as variaveis globais do ambiente Node.js (process, __dirname, etc.)
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    // Pastas e arquivos a serem ignorados pelo linter
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js',
      'src/config/config.cjs',
      'src/migrations/**',
    ],
  },

  {
    // Regras personalizadas para o backend
    rules: {
      'no-console': 'off', // Permitido no backend para logs do servidor
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn', // Alerta uso de any sem travar o build
    },
  },
);
