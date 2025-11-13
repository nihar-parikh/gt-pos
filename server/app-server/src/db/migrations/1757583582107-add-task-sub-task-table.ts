import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaskSubTaskTable1757583582107 implements MigrationInterface {
  name = 'add_task_sub_task_table_1757583582107';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sub_task" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "taskId" integer, CONSTRAINT "PK_ccb15801cf521e9c45237f484c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_task" ADD CONSTRAINT "FK_fe51338fd9567d08ae3ab4d5a57" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_task" DROP CONSTRAINT "FK_fe51338fd9567d08ae3ab4d5a57"`,
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "sub_task"`);
  }
}
