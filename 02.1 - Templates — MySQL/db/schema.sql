CREATE SCHEMA IF NOT EXISTS `tin-example` ;

CREATE TABLE IF NOT EXISTS `tin-example`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT IGNORE INTO `tin-example`.`users` (`id`, `firstName`, `lastName`) VALUES 
  (1, 'Jan', 'Kowalski'),
  (2, 'Adam', 'Zieliński'),
  (3, 'Marian', 'Nowak')
;