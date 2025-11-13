import fs from 'fs';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = process.env.npm_config_client || 'default';
const configPath = path.resolve(
  __dirname,
  `../../packages/tailwind-config/clients/tailwind.config.${client}.ts`
);
const targetPath = path.resolve(__dirname, './tailwind.config.ts');

if (!fs.existsSync(configPath)) {
  throw new Error(`No Tailwind config found for client: ${client}`);
}

fs.copyFileSync(configPath, targetPath);
console.log(`✅ Using Tailwind config for client: ${client}`);
