import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionToTaskTable1757583836318
  implements MigrationInterface
{
  name = 'add_description_to_task_table_1757583836318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "task" ADD "description" character varying NOT NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "task" DROP COLUMN "description"');
  }
}
