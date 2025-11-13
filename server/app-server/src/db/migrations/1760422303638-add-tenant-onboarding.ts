import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenantOnboarding1760422303638 implements MigrationInterface {
  name = 'AddTenantOnboarding1760422303638';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "tenant_onboarding" ("id" SERIAL NOT NULL, "businessName" character varying NOT NULL, "businessType" character varying NOT NULL, "businessLocation" character varying NOT NULL, "website" character varying NOT NULL, "logoUrl" character varying, "phone" character varying NOT NULL, "email" character varying NOT NULL, "address1" character varying NOT NULL, "address2" character varying, "state" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying, "fiscalYear" character varying NOT NULL, "baseCurrency" character varying NOT NULL, "timeZone" character varying NOT NULL, "dateFormat" character varying NOT NULL, "language" character varying NOT NULL, "module1" boolean NOT NULL DEFAULT false, "module2" boolean NOT NULL DEFAULT false, "module3" boolean NOT NULL DEFAULT false, "module4" boolean NOT NULL DEFAULT false, "module5" boolean NOT NULL DEFAULT false, "module6" boolean NOT NULL DEFAULT false, "module7" boolean NOT NULL DEFAULT false, "module8" boolean NOT NULL DEFAULT false, "module9" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_291568411f1964224f953f56895" PRIMARY KEY ("id"))'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "tenant_onboarding"');
  }
}
