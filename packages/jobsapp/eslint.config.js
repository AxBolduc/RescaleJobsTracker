//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    files: ['package.json'],
    rules: {
      'pnpm/json-enforce-catalog': 'off',
      'pnpm/json-valid-catalog': 'off',
      'pnpm/json-prefer-workspace-settings': 'off',
    },
  },
]
