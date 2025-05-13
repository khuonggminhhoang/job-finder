import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746891673824 implements MigrationInterface {
    name = 'AutoMigration1746891673824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`name\` varchar(255) NOT NULL, \`logo_url\` varchar(255) NULL, \`description\` text NULL, \`website\` varchar(255) NULL, \`industry\` varchar(255) NULL, \`company_size\` varchar(255) NULL, \`address\` text NULL, \`is_top_company\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_categories\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`name\` varchar(255) NOT NULL, \`icon_url\` varchar(255) NULL, UNIQUE INDEX \`IDX_2e5f6c46d136907967008b9bb6\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`company_id\` int NOT NULL, \`category_id\` int NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`location\` varchar(255) NOT NULL, \`salary_min\` decimal(10,2) NULL, \`salary_max\` decimal(10,2) NULL, \`salary_period\` enum ('MONTH', 'YEAR', 'HOUR') NULL, \`job_type\` enum ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE') NOT NULL, \`is_top_job\` tinyint NOT NULL DEFAULT 0, \`status\` enum ('OPEN', 'CLOSE') NOT NULL DEFAULT 'OPEN', INDEX \`IDX_087a773c50525e348e26188e7c\` (\`company_id\`), INDEX \`IDX_652419b4e4717ce9c426832c21\` (\`category_id\`), INDEX \`IDX_f803a854cd07320ee634d8887f\` (\`location\`), INDEX \`IDX_a0c30e3eb9649fe7fbcd336a63\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`applications\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`user_id\` int NOT NULL, \`job_id\` int NOT NULL, \`status\` enum ('SUBMITTED', 'IN_REVIEW', 'SHORTLISTED', 'DECLINED', 'HIRED') NOT NULL DEFAULT 'SUBMITTED', \`resume_url\` varchar(255) NULL, \`cover_letter\` text NULL, INDEX \`IDX_9e7594d5b474d9cbebba15c1ae\` (\`user_id\`), INDEX \`IDX_8aba14d7f098c23ba06d869323\` (\`job_id\`), INDEX \`IDX_8ee114cee92e995a9e75c05cfb\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`title\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NOT NULL, \`application_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`user_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`level\` enum ('SKILL_LEVEL.BEGINNER', 'SKILL_LEVEL.INTERMEDIATE', 'SKILL_LEVEL.ADVANCE') NOT NULL DEFAULT 'SKILL_LEVEL.BEGINNER', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experiences\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`user_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`company_name\` varchar(255) NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`headline\` varchar(255) NULL, \`location\` text NULL, \`date_of_birth\` date NULL, \`about_me\` text NULL, \`auth_version\` bigint NULL DEFAULT '0', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`saved_jobs\` (\`jobsId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_7ad77b0b0f1de97f60459f67f1\` (\`jobsId\`), INDEX \`IDX_b23650f3ebcb9e67cbde9d8b7b\` (\`usersId\`), PRIMARY KEY (\`jobsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_087a773c50525e348e26188e7cc\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD CONSTRAINT \`FK_652419b4e4717ce9c426832c211\` FOREIGN KEY (\`category_id\`) REFERENCES \`job_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD CONSTRAINT \`FK_9e7594d5b474d9cbebba15c1ae7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD CONSTRAINT \`FK_8aba14d7f098c23ba06d8693235\` FOREIGN KEY (\`job_id\`) REFERENCES \`jobs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9a8a82462cab47c73d25f49261f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_dd75186e413a1f6e0d1ef8e1214\` FOREIGN KEY (\`application_id\`) REFERENCES \`applications\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skills\` ADD CONSTRAINT \`FK_b6037133328ed50f9b66cd547de\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experiences\` ADD CONSTRAINT \`FK_99646b65b428fe670f2dc5aac77\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`saved_jobs\` ADD CONSTRAINT \`FK_7ad77b0b0f1de97f60459f67f12\` FOREIGN KEY (\`jobsId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`saved_jobs\` ADD CONSTRAINT \`FK_b23650f3ebcb9e67cbde9d8b7b1\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`saved_jobs\` DROP FOREIGN KEY \`FK_b23650f3ebcb9e67cbde9d8b7b1\``);
        await queryRunner.query(`ALTER TABLE \`saved_jobs\` DROP FOREIGN KEY \`FK_7ad77b0b0f1de97f60459f67f12\``);
        await queryRunner.query(`ALTER TABLE \`experiences\` DROP FOREIGN KEY \`FK_99646b65b428fe670f2dc5aac77\``);
        await queryRunner.query(`ALTER TABLE \`skills\` DROP FOREIGN KEY \`FK_b6037133328ed50f9b66cd547de\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_dd75186e413a1f6e0d1ef8e1214\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9a8a82462cab47c73d25f49261f\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP FOREIGN KEY \`FK_8aba14d7f098c23ba06d8693235\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP FOREIGN KEY \`FK_9e7594d5b474d9cbebba15c1ae7\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_652419b4e4717ce9c426832c211\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP FOREIGN KEY \`FK_087a773c50525e348e26188e7cc\``);
        await queryRunner.query(`DROP INDEX \`IDX_b23650f3ebcb9e67cbde9d8b7b\` ON \`saved_jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ad77b0b0f1de97f60459f67f1\` ON \`saved_jobs\``);
        await queryRunner.query(`DROP TABLE \`saved_jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`experiences\``);
        await queryRunner.query(`DROP TABLE \`skills\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
        await queryRunner.query(`DROP INDEX \`IDX_8ee114cee92e995a9e75c05cfb\` ON \`applications\``);
        await queryRunner.query(`DROP INDEX \`IDX_8aba14d7f098c23ba06d869323\` ON \`applications\``);
        await queryRunner.query(`DROP INDEX \`IDX_9e7594d5b474d9cbebba15c1ae\` ON \`applications\``);
        await queryRunner.query(`DROP TABLE \`applications\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0c30e3eb9649fe7fbcd336a63\` ON \`jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_f803a854cd07320ee634d8887f\` ON \`jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_652419b4e4717ce9c426832c21\` ON \`jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_087a773c50525e348e26188e7c\` ON \`jobs\``);
        await queryRunner.query(`DROP TABLE \`jobs\``);
        await queryRunner.query(`DROP INDEX \`IDX_2e5f6c46d136907967008b9bb6\` ON \`job_categories\``);
        await queryRunner.query(`DROP TABLE \`job_categories\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
    }

}
