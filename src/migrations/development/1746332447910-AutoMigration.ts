import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746332447910 implements MigrationInterface {
    name = 'AutoMigration1746332447910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`headline\` varchar(255) NULL, \`location\` text NULL, \`date_of_birth\` date NULL, \`about_me\` text NULL, \`auth_version\` bigint NULL DEFAULT '0', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
