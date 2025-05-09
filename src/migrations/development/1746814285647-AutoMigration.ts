import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1746814285647 implements MigrationInterface {
    name = 'AutoMigration1746814285647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id entity', \`created_at\` timestamp(6) NOT NULL COMMENT 'Ngày khởi tạo' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL COMMENT 'Ngày cập nhật' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL COMMENT 'Ngày xóa', \`user_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`level\` enum ('SKILL_LEVEL.BEGINNER', 'SKILL_LEVEL.INTERMEDIATE', 'SKILL_LEVEL.ADVANCE') NOT NULL DEFAULT 'SKILL_LEVEL.BEGINNER', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`skills\` ADD CONSTRAINT \`FK_b6037133328ed50f9b66cd547de\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skills\` DROP FOREIGN KEY \`FK_b6037133328ed50f9b66cd547de\``);
        await queryRunner.query(`DROP TABLE \`skills\``);
    }

}
