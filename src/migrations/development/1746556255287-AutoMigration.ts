import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746556255287 implements MigrationInterface {
    name = 'AutoMigration1746556255287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`company_id\` int NOT NULL, \`category_id\` int NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`location\` varchar(255) NOT NULL, \`salary_min\` decimal(10,2) NULL, \`salary_max\` decimal(10,2) NULL, \`salary_period\` enum ('MONTH', 'YEAR', 'HOUR') NULL, \`job_type\` enum ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE') NOT NULL, \`is_top_job\` tinyint NOT NULL DEFAULT 0, \`status\` enum ('OPEN', 'CLOSE') NOT NULL DEFAULT 'OPEN', INDEX \`IDX_087a773c50525e348e26188e7c\` (\`company_id\`), INDEX \`IDX_652419b4e4717ce9c426832c21\` (\`category_id\`), INDEX \`IDX_f803a854cd07320ee634d8887f\` (\`location\`), INDEX \`IDX_a0c30e3eb9649fe7fbcd336a63\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_087a773c50525e348e26188e7cc\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_652419b4e4717ce9c426832c211\` FOREIGN KEY (\`category_id\`) REFERENCES \`job_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_652419b4e4717ce9c426832c211\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_087a773c50525e348e26188e7cc\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0c30e3eb9649fe7fbcd336a63\` ON \`jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_f803a854cd07320ee634d8887f\` ON \`jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_652419b4e4717ce9c426832c21\` ON \`jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_087a773c50525e348e26188e7c\` ON \`jobs\``);
        await queryRunner.query(`DROP TABLE \`jobs\``);
    }

}
