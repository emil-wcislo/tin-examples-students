CREATE SCHEMA `tin-example` ;

CREATE TABLE `tin-example`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT INTO `tin-example`.`users` (`firstName`, `lastName`) VALUES ('Jan', 'Kowalski');
