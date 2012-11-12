SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

DROP SCHEMA IF EXISTS `ss` ;
CREATE SCHEMA IF NOT EXISTS `ss` DEFAULT CHARACTER SET utf8 ;
USE `ss` ;

-- -----------------------------------------------------
-- Table `ss`.`Country`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`Country` (
  `countryId` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(90) BINARY NULL ,
  `active` TINYINT NULL DEFAULT 1 ,
  PRIMARY KEY (`countryId`) ,
  UNIQUE INDEX `countryId_UNIQUE` (`countryId` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ss`.`City`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`City` (
  `cityId` INT NOT NULL AUTO_INCREMENT ,
  `countryId` INT NOT NULL ,
  `name` VARCHAR(225) BINARY NULL ,
  `active` TINYINT NULL DEFAULT 1 ,
  PRIMARY KEY (`cityId`, `countryId`) ,
  INDEX `fk_City_Country1` (`countryId` ASC) ,
  CONSTRAINT `fk_City_Country1`
    FOREIGN KEY (`countryId` )
    REFERENCES `ss`.`Country` (`countryId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ss`.`University`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`University` (
  `universityId` INT NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(100) NULL ,
  `email` VARCHAR(60) NULL ,
  `website` VARCHAR(60) NULL ,
  `cityId` INT NULL ,
  `region` VARCHAR(90) NULL ,
  `active` INT NULL DEFAULT 1 ,
  PRIMARY KEY (`universityId`) ,
  UNIQUE INDEX `versityId_UNIQUE` (`universityId` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `website_UNIQUE` (`website` ASC) ,
  CONSTRAINT `fk_University_City1`
    FOREIGN KEY (`cityId` )
    REFERENCES `ss`.`City` (`cityId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `ss`.`Faculty`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`Faculty` (
  `facultyId` INT NOT NULL AUTO_INCREMENT ,
  `universityId` INT NOT NULL ,
  `title` VARCHAR(225) NULL ,
  `active` TINYINT NULL DEFAULT 1 ,
  PRIMARY KEY (`facultyId`, `universityId`) ,
  UNIQUE INDEX `facultyId_UNIQUE` (`facultyId` ASC) ,
  INDEX `fk_Faculty_University1_index` (`universityId` ASC) ,
  CONSTRAINT `fk_Faculty_University1`
    FOREIGN KEY (`universityId` )
    REFERENCES `ss`.`University` (`universityId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `ss`.`User`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT ,
  `facultyId` INT NOT NULL ,
  `email` VARCHAR(60) NULL ,
  `password` VARCHAR(32) NULL ,
  `firstName` VARCHAR(45) NULL ,
  `lastName` VARCHAR(45) NULL ,
  `status` TINYINT NULL DEFAULT 1 COMMENT 'status:\n1 - free\n2 - busy' ,
  `type` TINYINT NULL DEFAULT 1 ,
  `active` TINYINT(2) NULL DEFAULT 1 ,
  PRIMARY KEY (`userId`) ,
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  INDEX `fk_User_Faculty1_index` (`facultyId` ASC) ,
  CONSTRAINT `fk_User_Faculty1`
    FOREIGN KEY (`facultyId` )
    REFERENCES `ss`.`Faculty` (`facultyId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `ss`.`Document`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`Document` (
  `documentId` INT NOT NULL AUTO_INCREMENT ,
  `originPath` VARCHAR(90) NULL ,
  `convertedPath` VARCHAR(90) NULL ,
  `active` INT NULL DEFAULT 1 ,
  PRIMARY KEY (`documentId`) ,
  UNIQUE INDEX `documentId_UNIQUE` (`documentId` ASC) ,
  UNIQUE INDEX `filePath_UNIQUE` (`originPath` ASC) ,
  UNIQUE INDEX `convertedPath_UNIQUE` (`convertedPath` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `ss`.`Task`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`Task` (
  `taskId` INT NOT NULL AUTO_INCREMENT ,
  `userId` INT NULL ,
  `facultyId` INT NULL ,
  `title` VARCHAR(100) NULL ,
  `description` TEXT NULL ,
  `documentId` INT NULL ,
  `status` TINYINT NULL COMMENT 'status:\n1-open\n2-closed because of user\n3-closed because of time limit\n' ,
  `price` INT NULL DEFAULT 0 ,
  `expiredDate` DATETIME NULL ,
  `active` TINYINT(2) NULL DEFAULT 1 ,
  PRIMARY KEY (`taskId`) ,
  UNIQUE INDEX `taskId_UNIQUE` (`taskId` ASC) ,
  INDEX `fk_Task_Faculty1_index` (`facultyId` ASC) ,
  INDEX `fk_Task_User1_index` (`userId` ASC) ,
  INDEX `fk_Task_Document_index1` (`documentId` ASC) ,
  CONSTRAINT `fk_Task_Faculty1`
    FOREIGN KEY (`facultyId` )
    REFERENCES `ss`.`Faculty` (`facultyId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Task_User1`
    FOREIGN KEY (`userId` )
    REFERENCES `ss`.`User` (`userId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Task_Document1`
    FOREIGN KEY (`documentId` )
    REFERENCES `ss`.`Document` (`documentId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `ss`.`Solution`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`Solution` (
  `solutionId` INT NOT NULL AUTO_INCREMENT ,
  `taskId` INT NULL ,
  `authorId` INT NULL ,
  `file` VARCHAR(100) NULL ,
  `downloadCount` INT NULL ,
  `description` TEXT NULL ,
  `active` INT NULL DEFAULT 1 ,
  PRIMARY KEY (`solutionId`) ,
  UNIQUE INDEX `solutionId_UNIQUE` (`solutionId` ASC) ,
  UNIQUE INDEX `file_UNIQUE` (`file` ASC) ,
  INDEX `fk_Solution_Task1_index` (`taskId` ASC) ,
  CONSTRAINT `fk_Solution_Task1`
    FOREIGN KEY (`taskId` )
    REFERENCES `ss`.`Task` (`taskId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `ss`.`Comment`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `ss`.`Comment` (
  `commentId` INT NOT NULL AUTO_INCREMENT ,
  `userId` INT NOT NULL ,
  `text` TEXT NULL ,
  `entityId` TINYINT NULL COMMENT 'entityId:\n1 - User \n2 - Solution\n3 - Task' ,
  `dateCreated` DATETIME NULL ,
  `active` TINYINT NULL DEFAULT 1 ,
  PRIMARY KEY (`commentId`, `userId`) ,
  INDEX `fk_Commet_User1_index` (`userId` ASC) ,
  CONSTRAINT `fk_Commet_User1`
    FOREIGN KEY (`userId` )
    REFERENCES `ss`.`User` (`userId` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
