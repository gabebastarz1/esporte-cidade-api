import { MigrationInterface, QueryRunner } from "typeorm";

export class TesteNovo1745271443378 implements MigrationInterface {
    name = 'TesteNovo1745271443378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "release" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "priority" varchar CHECK( "priority" IN ('HIGH','LOW') ) NOT NULL DEFAULT ('LOW'), "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "state" text NOT NULL, "city" text NOT NULL, "neighborhood" text NOT NULL, "street" text NOT NULL, "number" integer NOT NULL, "complement" text NOT NULL, "references" text NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user-base" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "cpf" text(11) NOT NULL, "rg" text, "birthday" text NOT NULL, "phone" text NOT NULL, "photo_url" text, "email" text, "role" varchar CHECK( "role" IN ('1','2','3') ) NOT NULL, CONSTRAINT "UQ_0dfb99b20ad3c8c6b1f16eae4db" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "cpf" text(11) NOT NULL, "rg" text, "birthday" text NOT NULL, "phone" text NOT NULL, "photo_url" text, "email" text, "role" varchar CHECK( "role" IN ('1','2','3') ) NOT NULL, "about" text NOT NULL, "modalityId" integer, CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "atendiment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "present" boolean NOT NULL, "modalityId" integer, "athleteId" integer)`);
        await queryRunner.query(`CREATE TABLE "athlete" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "cpf" text(11) NOT NULL, "rg" text, "birthday" text NOT NULL, "phone" text NOT NULL, "photo_url" text, "email" text, "role" varchar CHECK( "role" IN ('1','2','3') ) NOT NULL, "father_name" text DEFAULT ('Nenhum nome informado'), "father_phone" text, "father_cpf" text, "father_email" text, "mother_name" text DEFAULT ('Nenhum nome informado'), "mother_phone" text, "mother_cpf" text, "mother_email" text, "responsible_person_name" text DEFAULT ('Nenhum responsável informado'), "responsible_person_email" text, "responsible_person_cpf" text, "blood_type" text DEFAULT ('Nenhum tipo sanguíneo informado'), "photo_url_cpf_front" text, "photo_url_cpf_back" text, "allergy" text DEFAULT ('Nenhuma alergia informada'), CONSTRAINT "UQ_6b605cd9ed2fc11b50677fc8f2d" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "enrollment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "active" boolean NOT NULL DEFAULT (0), "aproved" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "athleteId" integer, "modalityId" integer)`);
        await queryRunner.query(`CREATE TABLE "modality" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "days_of_week" text array NOT NULL, "start_time" time NOT NULL, "end_time" time NOT NULL, "class_locations" text array NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "material" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" text DEFAULT ('Sem descrição'), "quantity" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`CREATE TABLE "manager" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "cpf" text(11) NOT NULL, "rg" text, "birthday" text NOT NULL, "phone" text NOT NULL, "photo_url" text, "email" text, "role" varchar CHECK( "role" IN ('1','2','3') ) NOT NULL, CONSTRAINT "UQ_ee8fba4edb704ce2465753a2edd" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "documentation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "temporary_address" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "state" text NOT NULL, "city" text NOT NULL, "neighborhood" text NOT NULL, "street" text NOT NULL, "number" integer NOT NULL, "complement" text NOT NULL, "references" text NOT NULL, "userId" integer, CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user-base" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_address"("id", "state", "city", "neighborhood", "street", "number", "complement", "references", "userId") SELECT "id", "state", "city", "neighborhood", "street", "number", "complement", "references", "userId" FROM "address"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "temporary_address" RENAME TO "address"`);
        await queryRunner.query(`CREATE TABLE "temporary_teacher" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "cpf" text(11) NOT NULL, "rg" text, "birthday" text NOT NULL, "phone" text NOT NULL, "photo_url" text, "email" text, "role" varchar CHECK( "role" IN ('1','2','3') ) NOT NULL, "about" text NOT NULL, "modalityId" integer, CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email"), CONSTRAINT "FK_316b0a548186c8ff19da65676f9" FOREIGN KEY ("modalityId") REFERENCES "modality" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_teacher"("id", "name", "password", "cpf", "rg", "birthday", "phone", "photo_url", "email", "role", "about", "modalityId") SELECT "id", "name", "password", "cpf", "rg", "birthday", "phone", "photo_url", "email", "role", "about", "modalityId" FROM "teacher"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`ALTER TABLE "temporary_teacher" RENAME TO "teacher"`);
        await queryRunner.query(`CREATE TABLE "temporary_atendiment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "present" boolean NOT NULL, "modalityId" integer, "athleteId" integer, CONSTRAINT "FK_94559c147b79dc19928622c55a3" FOREIGN KEY ("modalityId") REFERENCES "modality" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_549c5e59022f9902b94afefd420" FOREIGN KEY ("athleteId") REFERENCES "athlete" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_atendiment"("id", "created_at", "present", "modalityId", "athleteId") SELECT "id", "created_at", "present", "modalityId", "athleteId" FROM "atendiment"`);
        await queryRunner.query(`DROP TABLE "atendiment"`);
        await queryRunner.query(`ALTER TABLE "temporary_atendiment" RENAME TO "atendiment"`);
        await queryRunner.query(`CREATE TABLE "temporary_enrollment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "active" boolean NOT NULL DEFAULT (0), "aproved" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "athleteId" integer, "modalityId" integer, CONSTRAINT "FK_9da60bd721aae7b35c89b448751" FOREIGN KEY ("athleteId") REFERENCES "athlete" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_df014b705a2c5dff9da9ba54c54" FOREIGN KEY ("modalityId") REFERENCES "modality" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_enrollment"("id", "active", "aproved", "created_at", "updated_at", "athleteId", "modalityId") SELECT "id", "active", "aproved", "created_at", "updated_at", "athleteId", "modalityId" FROM "enrollment"`);
        await queryRunner.query(`DROP TABLE "enrollment"`);
        await queryRunner.query(`ALTER TABLE "temporary_enrollment" RENAME TO "enrollment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment" RENAME TO "temporary_enrollment"`);
        await queryRunner.query(`CREATE TABLE "enrollment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "active" boolean NOT NULL DEFAULT (0), "aproved" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "athleteId" integer, "modalityId" integer)`);
        await queryRunner.query(`INSERT INTO "enrollment"("id", "active", "aproved", "created_at", "updated_at", "athleteId", "modalityId") SELECT "id", "active", "aproved", "created_at", "updated_at", "athleteId", "modalityId" FROM "temporary_enrollment"`);
        await queryRunner.query(`DROP TABLE "temporary_enrollment"`);
        await queryRunner.query(`ALTER TABLE "atendiment" RENAME TO "temporary_atendiment"`);
        await queryRunner.query(`CREATE TABLE "atendiment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "present" boolean NOT NULL, "modalityId" integer, "athleteId" integer)`);
        await queryRunner.query(`INSERT INTO "atendiment"("id", "created_at", "present", "modalityId", "athleteId") SELECT "id", "created_at", "present", "modalityId", "athleteId" FROM "temporary_atendiment"`);
        await queryRunner.query(`DROP TABLE "temporary_atendiment"`);
        await queryRunner.query(`ALTER TABLE "teacher" RENAME TO "temporary_teacher"`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "cpf" text(11) NOT NULL, "rg" text, "birthday" text NOT NULL, "phone" text NOT NULL, "photo_url" text, "email" text, "role" varchar CHECK( "role" IN ('1','2','3') ) NOT NULL, "about" text NOT NULL, "modalityId" integer, CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "teacher"("id", "name", "password", "cpf", "rg", "birthday", "phone", "photo_url", "email", "role", "about", "modalityId") SELECT "id", "name", "password", "cpf", "rg", "birthday", "phone", "photo_url", "email", "role", "about", "modalityId" FROM "temporary_teacher"`);
        await queryRunner.query(`DROP TABLE "temporary_teacher"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME TO "temporary_address"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "state" text NOT NULL, "city" text NOT NULL, "neighborhood" text NOT NULL, "street" text NOT NULL, "number" integer NOT NULL, "complement" text NOT NULL, "references" text NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "address"("id", "state", "city", "neighborhood", "street", "number", "complement", "references", "userId") SELECT "id", "state", "city", "neighborhood", "street", "number", "complement", "references", "userId" FROM "temporary_address"`);
        await queryRunner.query(`DROP TABLE "temporary_address"`);
        await queryRunner.query(`DROP TABLE "documentation"`);
        await queryRunner.query(`DROP TABLE "manager"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`DROP TABLE "modality"`);
        await queryRunner.query(`DROP TABLE "enrollment"`);
        await queryRunner.query(`DROP TABLE "athlete"`);
        await queryRunner.query(`DROP TABLE "atendiment"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "user-base"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "release"`);
    }

}
