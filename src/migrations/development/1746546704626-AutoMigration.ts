import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746546704626 implements MigrationInterface {
    name = 'AutoMigration1746546704626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`name\` varchar(255) NOT NULL, \`logo_url\` varchar(255) NULL, \`description\` text NULL, \`website\` varchar(255) NULL, \`industry\` varchar(255) NULL, \`company_size\` varchar(255) NULL, \`address\` text NULL, \`is_top_company\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`companies\``);
    }

}
