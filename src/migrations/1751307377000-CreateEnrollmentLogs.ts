import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEnrollmentLogs1751307377000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "enrollment_logs",
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "enrollment_id", type: "int", isNullable: false },
          { name: "athlete_id", type: "int", isNullable: false },
          { name: "event_type", type: "varchar", length: "50" },
          { name: "event_description", type: "text", isNullable: true },
          { name: "created_at", type: "datetime", default: "CURRENT_TIMESTAMP" },
          { name: "changed_by", type: "int", isNullable: true },
          { name: "old_value", type: "json", isNullable: true },
          { name: "new_value", type: "json", isNullable: true },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "enrollment_logs",
      new TableForeignKey({
        columnNames: ["enrollment_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "enrollment",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "enrollment_logs",
      new TableForeignKey({
        columnNames: ["athlete_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "athlete",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("enrollment_logs");
  }
}
