import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746815074384 implements MigrationInterface {
    name = 'AutoMigration1746815074384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`experiences\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`user_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`company_name\` varchar(255) NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`experiences\` ADD CONSTRAINT \`FK_99646b65b428fe670f2dc5aac77\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experiences\` DROP FOREIGN KEY \`FK_99646b65b428fe670f2dc5aac77\``);
        await queryRunner.query(`DROP TABLE \`experiences\``);
    }

}
