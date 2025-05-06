import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746541065617 implements MigrationInterface {
    name = 'AutoMigration1746541065617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`job_categories\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`name\` varchar(255) NOT NULL, \`icon_url\` varchar(255) NULL, UNIQUE INDEX \`IDX_2e5f6c46d136907967008b9bb6\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2e5f6c46d136907967008b9bb6\` ON \`job_categories\``);
        await queryRunner.query(`DROP TABLE \`job_categories\``);
    }

}
