import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1747068492036 implements MigrationInterface {
    name = 'AutoMigration1747068492036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`portfolio\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`portfolio\``);
    }

}
