import { execSync } from 'child_process';

const name = process.argv[2];
if (!name) {
  console.error(
    'Migration name required.\nUsage: npm run migration:gen <MigrationName>'
  );
  process.exit(1);
}

const cmd = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/${name} --dataSource=ormconfig.ts`;
execSync(cmd, { stdio: 'inherit' });
