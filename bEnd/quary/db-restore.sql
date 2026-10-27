-- =====================================================
-- TODO LIST 2.0 - 데이터베이스 복원 스크립트
-- 코드베이스 분석을 통해 복원됨
-- =====================================================

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema todo_v2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todo_v2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `todo_v2` ;
-- -----------------------------------------------------
-- Table `todo_v2`.`users`
-- (user.js, getUser.js, userLogIO.js, index.js 참조)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_v2`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL COMMENT '사용자 실명',
  `nickname` VARCHAR(20) NOT NULL COMMENT '닉네임',
  `userId` VARCHAR(10) NOT NULL COMMENT '로그인 ID',
  `password` VARCHAR(255) NOT NULL COMMENT '비밀번호 (해시 저장 권장)',
  `email` VARCHAR(255) NOT NULL COMMENT '이메일 (Google 로그인 연동)',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE,
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '사용자 테이블';

-- -----------------------------------------------------
-- Table `todo_v2`.`tasks`
-- (task.js 참조 - subject, memo, userId, done 컬럼 사용)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_v2`.`tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(100) NOT NULL COMMENT '태스크 제목',
  `memo` TEXT NULL DEFAULT NULL COMMENT '태스크 메모',
  `userId` VARCHAR(10) NOT NULL COMMENT '소유 사용자 ID',
  `done` TINYINT(1) NULL DEFAULT 0 COMMENT '완료 여부 (0:미완료, 1:완료)',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tasks_userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_tasks_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `todo_v2`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '할일 태스크 테이블';

-- -----------------------------------------------------
-- 샘플 데이터 (선택사항 - 테스트용)
-- ex.json 참조
-- -----------------------------------------------------
-- INSERT INTO `todo_v2`.`users` (`username`, `nickname`, `userId`, `password`, `email`) VALUES
-- ('김희연', '멜로디', 'melody', 'pass123', 'user1@aa.com'),
-- ('오사랑', '오리', 'duck', 'pass456', 'user2@aa.com');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
