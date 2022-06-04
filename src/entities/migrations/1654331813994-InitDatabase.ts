import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1654331813994 implements MigrationInterface {
    name = 'InitDatabase1654331813994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`blog_challenges\` (\`id\` int NOT NULL AUTO_INCREMENT, \`post_id\` int NOT NULL COMMENT '게시글 아이디', \`challenge_id\` int NOT NULL COMMENT '챌린지 아이디', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog_comment\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '아이디', \`post_id\` int NOT NULL COMMENT '게시글 아이디', \`user_id\` int NOT NULL COMMENT '사용자 아이디', \`content\` text NOT NULL COMMENT '내용', \`comment_id\` int NULL COMMENT '리댓글 대상(?) 댓글 pk', \`reg_date\` datetime NOT NULL COMMENT '등록 날짜', \`del_date\` datetime NULL COMMENT '삭제 날짜', \`Is_deleted\` char(1) NULL COMMENT '삭제 여부' DEFAULT 'N', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog_image\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id', \`post_id\` int NOT NULL COMMENT '게시글 아이디', \`file_url\` varchar(255) NOT NULL COMMENT '파일 경로', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog_like\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'pk필수?', \`post_id\` int NOT NULL COMMENT '게시글 아이디', \`user_id\` int NOT NULL COMMENT '사용자 아이디', \`reg_date\` datetime NOT NULL COMMENT '등록 날짜', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog_post\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '아이디', \`user_id\` int NOT NULL COMMENT '사용자 아이디', \`content\` text NOT NULL COMMENT '내용', \`store_address\` varchar(200) NOT NULL COMMENT '매장 주소', \`location_x\` decimal(10,7) NOT NULL COMMENT 'x좌표', \`location_y\` decimal(10,7) NOT NULL COMMENT 'y좌표', \`hits\` int NOT NULL COMMENT '조회수' DEFAULT '0', \`mod_date\` timestamp NULL COMMENT '수정 날짜', \`reg_date\` datetime NOT NULL COMMENT '등록 날짜' DEFAULT CURRENT_TIMESTAMP, \`del_date\` datetime NULL COMMENT '삭제 날짜', \`Is_deleted\` char(1) NULL COMMENT '삭제 여부' DEFAULT 'N', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog_promotion\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'pk필수?', \`post_id\` int NOT NULL COMMENT '게시글 아이디', \`promotion_id\` int NOT NULL COMMENT '프로모션 아이디', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`challenges\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '아이디', \`title\` varchar(20) NOT NULL COMMENT '챌린지명', \`sub_title\` varchar(45) NOT NULL COMMENT '서브타이틀', \`content\` text NOT NULL COMMENT '내용', \`reg_date\` datetime NOT NULL COMMENT '등록 날짜', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promotions\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '아이디', \`type\` varchar(45) NOT NULL COMMENT '종류', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'pk', \`nickname\` varchar(45) NOT NULL COMMENT '닉네임', \`provider_id\` int NOT NULL COMMENT '제공자', \`access_token\` varchar(255) NULL COMMENT '접근 토큰', \`reg_date\` datetime NOT NULL COMMENT '등록 날짜' DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`promotions\``);
        await queryRunner.query(`DROP TABLE \`challenges\``);
        await queryRunner.query(`DROP TABLE \`blog_promotion\``);
        await queryRunner.query(`DROP TABLE \`blog_post\``);
        await queryRunner.query(`DROP TABLE \`blog_like\``);
        await queryRunner.query(`DROP TABLE \`blog_image\``);
        await queryRunner.query(`DROP TABLE \`blog_comment\``);
        await queryRunner.query(`DROP TABLE \`blog_challenges\``);
    }

}
