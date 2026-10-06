import type { Config } from 'prettier';

const config: Config = {
  endOfLine: 'lf',
  printWidth: 85,
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^@/types/(.*)$',
    '^@/components/(.*)$',
    '^@/(.*)$', // Any other relative `@/` path imports
    '^[./]', // Relative imports (e.g., ./Card, ../styles)
  ],
  importOrderSeparation: true, // Adds a blank line between import groups
  importOrderSortSpecifiers: true, // Sorts named specifiers alphabetically: { a, b, c }
  importOrderParserPlugins: ['typescript', 'jsx'],
};

export default config;
