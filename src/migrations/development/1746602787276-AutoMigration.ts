import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746602787276 implements MigrationInterface {
    name = 'AutoMigration1746602787276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`saved_jobs\` (\`jobsId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_7ad77b0b0f1de97f60459f67f1\` (\`jobsId\`), INDEX \`IDX_b23650f3ebcb9e67cbde9d8b7b\` (\`usersId\`), PRIMARY KEY (\`jobsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`saved_jobs\` ADD CONSTRAINT \`FK_7ad77b0b0f1de97f60459f67f12\` FOREIGN KEY (\`jobsId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`saved_jobs\` ADD CONSTRAINT \`FK_b23650f3ebcb9e67cbde9d8b7b1\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`saved_jobs\` DROP FOREIGN KEY \`FK_b23650f3ebcb9e67cbde9d8b7b1\``);
        await queryRunner.query(`ALTER TABLE \`saved_jobs\` DROP FOREIGN KEY \`FK_7ad77b0b0f1de97f60459f67f12\``);
        await queryRunner.query(`DROP INDEX \`IDX_b23650f3ebcb9e67cbde9d8b7b\` ON \`saved_jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ad77b0b0f1de97f60459f67f1\` ON \`saved_jobs\``);
        await queryRunner.query(`DROP TABLE \`saved_jobs\``);
    }

}
