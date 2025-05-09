import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746809893740 implements MigrationInterface {
    name = 'AutoMigration1746809893740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`title\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NOT NULL, \`application_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9a8a82462cab47c73d25f49261f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_dd75186e413a1f6e0d1ef8e1214\` FOREIGN KEY (\`application_id\`) REFERENCES \`applications\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_dd75186e413a1f6e0d1ef8e1214\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9a8a82462cab47c73d25f49261f\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}
