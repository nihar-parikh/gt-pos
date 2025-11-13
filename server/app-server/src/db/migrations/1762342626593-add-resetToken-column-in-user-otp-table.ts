import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetTokenColumnInUserOtpTable1762342626593
  implements MigrationInterface
{
  name = 'AddResetTokenColumnInUserOtpTable1762342626593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_otps" ADD "reset_token" character varying'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_otps" DROP COLUMN "reset_token"'
    );
  }
}
