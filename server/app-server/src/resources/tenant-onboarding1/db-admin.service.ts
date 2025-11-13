import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { Client } from 'pg';

@Injectable()
export class DbAdminService {
  async createTenantDb(tenantCode: string) {
    // Real PostgreSQL DB and user creation
    const dbName = `tenant_${tenantCode}_db`;
    const dbUser = `tenant_${tenantCode}_user`;
    const dbPassword = 'securepass'; // You may want to generate a random password

    // Connect to the main postgres database as admin
    const adminClient = new Client({
      host: process.env.PG_HOST || 'localhost',
      port: parseInt(process.env.PG_PORT || '5432'),
      user: process.env.PG_ADMIN_USER || 'postgres',
      password: process.env.PG_ADMIN_PASSWORD || 'postgres',
      database: 'pg3',
    });
    await adminClient.connect();

    // Create database
    await adminClient.query(`CREATE DATABASE "${dbName}"`);
    // Create user
    await adminClient.query(
      `CREATE USER "${dbUser}" WITH PASSWORD '${dbPassword}'`
    );
    // Grant privileges on database
    await adminClient.query(
      `GRANT ALL PRIVILEGES ON DATABASE "${dbName}" TO "${dbUser}"`
    );

    // Connect to the new tenant database to update schema privileges
    const tenantClient = new Client({
      host: process.env.PG_HOST || 'localhost',
      port: parseInt(process.env.PG_PORT || '5432'),
      user: process.env.PG_ADMIN_USER || 'postgres',
      password: process.env.PG_ADMIN_PASSWORD || 'postgres',
      database: dbName,
    });
    await tenantClient.connect();
    // Grant privileges and ownership on public schema
    await tenantClient.query(`GRANT ALL ON SCHEMA public TO "${dbUser}"`);
    await tenantClient.query(`ALTER SCHEMA public OWNER TO "${dbUser}"`);
    await tenantClient.end();

    await adminClient.end();

    console.log(`Created DB: ${dbName}, User: ${dbUser}`);
    return { dbName, user: dbUser, password: dbPassword };
  }

  async runMigrations(dbInfo: {
    dbName: string;
    user: string;
    password: string;
  }) {
    // Run TypeORM migrations for the tenant DB using npm script
    const { dbName, user, password } = dbInfo;

    // Use the migration:run script from package.json
    const command = 'npm run migration:run';

    // Set env vars for tenant DB connection
    const env = Object.assign({}, process.env, {
      TYPEORM_DATABASE: dbName,
      TYPEORM_USERNAME: user,
      TYPEORM_PASSWORD: password,
    });
    console.log({ env });

    try {
      console.log(`Running migrations for DB: ${dbName}`);
      execSync(command, { stdio: 'inherit', env });
      console.log('Migrations completed.');
      return true;
    } catch (error) {
      console.error('Migration error:', error);
      throw error;
    }
  }

  async seedAdminUser(
    dbInfo: { dbName: string },
    adminUser: { email: string; name: string }
  ) {
    // Simulate seeding admin user
    // In production, connect to tenant DB and insert admin user
    console.log(`Seeding admin user for DB: ${dbInfo.dbName}`);
    console.log('Admin user:', adminUser);
    return true;
  }
}
