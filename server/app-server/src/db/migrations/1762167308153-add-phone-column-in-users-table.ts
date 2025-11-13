import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhoneColumnInUsersTable1762167308153
  implements MigrationInterface
{
  name = 'AddPhoneColumnInUsersTable1762167308153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sub_task" DROP CONSTRAINT "FK_fe51338fd9567d08ae3ab4d5a57"'
    );
    await queryRunner.query(
      'ALTER TABLE "sub_task" RENAME COLUMN "taskId" TO "task_id"'
    );
    await queryRunner.query(
      'CREATE TABLE "user_otps" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "otp_hash" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL, "verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_058cf61bf2024c3a3c3bfc4e1b7" PRIMARY KEY ("id"))'
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "isAdmin"');
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "businessName"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "businessType"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "businessLocation"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "logoUrl"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "zipCode"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "fiscalYear"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "baseCurrency"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "timeZone"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "dateFormat"'
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD "phone" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD "is_admin" boolean NOT NULL DEFAULT false'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "business_name" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "business_type" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "business_location" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "logo_url" character varying'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "zip_code" character varying'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "fiscal_year" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "base_currency" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "time_zone" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "date_format" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "sub_task" ADD CONSTRAINT "FK_2e7559455ea9a839fadfc45db22" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sub_task" DROP CONSTRAINT "FK_2e7559455ea9a839fadfc45db22"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "date_format"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "time_zone"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "base_currency"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "fiscal_year"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "zip_code"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "logo_url"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "business_location"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "business_type"'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" DROP COLUMN "business_name"'
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "is_admin"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "phone"');
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "dateFormat" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "timeZone" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "baseCurrency" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "fiscalYear" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "zipCode" character varying'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "logoUrl" character varying'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "businessLocation" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "businessType" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "tenant_onboarding" ADD "businessName" character varying NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false'
    );
    await queryRunner.query('DROP TABLE "user_otps"');
    await queryRunner.query(
      'ALTER TABLE "sub_task" RENAME COLUMN "task_id" TO "taskId"'
    );
    await queryRunner.query(
      'ALTER TABLE "sub_task" ADD CONSTRAINT "FK_fe51338fd9567d08ae3ab4d5a57" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }
}
