import {Table} from "typeorm";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotes1773062107629 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar(50)',
          },
          {
            name: 'description',
            type: 'varchar(2000)',
          }
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notes');
  }

}
