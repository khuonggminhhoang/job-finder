import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746634405290 implements MigrationInterface {
    name = 'AutoMigration1746634405290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`applications\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`user_id\` int NOT NULL, \`job_id\` int NOT NULL, \`status\` enum ('SUBMITTED', 'IN_REVIEW', 'SHORTLISTED', 'DECLINED', 'HIRED') NOT NULL DEFAULT 'SUBMITTED', \`resume_url\` varchar(255) NULL, \`cover_letter\` text NULL, INDEX \`IDX_9e7594d5b474d9cbebba15c1ae\` (\`user_id\`), INDEX \`IDX_8aba14d7f098c23ba06d869323\` (\`job_id\`), INDEX \`IDX_8ee114cee92e995a9e75c05cfb\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD CONSTRAINT \`FK_9e7594d5b474d9cbebba15c1ae7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD CONSTRAINT \`FK_8aba14d7f098c23ba06d8693235\` FOREIGN KEY (\`job_id\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`applications\` DROP FOREIGN KEY \`FK_8aba14d7f098c23ba06d8693235\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP FOREIGN KEY \`FK_9e7594d5b474d9cbebba15c1ae7\``);
        await queryRunner.query(`DROP INDEX \`IDX_8ee114cee92e995a9e75c05cfb\` ON \`applications\``);
        await queryRunner.query(`DROP INDEX \`IDX_8aba14d7f098c23ba06d869323\` ON \`applications\``);
        await queryRunner.query(`DROP INDEX \`IDX_9e7594d5b474d9cbebba15c1ae\` ON \`applications\``);
        await queryRunner.query(`DROP TABLE \`applications\``);
    }

}
