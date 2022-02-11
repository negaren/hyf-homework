USE movie;

CREATE TABLE `director`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(`id`),
    `name` VARCHAR(25) NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `movie`(
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  `title` VARCHAR(25) NOT NULL,
  `rank` FLOAT(3, 1) UNSIGNED NOT NULL,
  `release_date` DATE NULL,
  `director_id` INT(10) UNSIGNED NOT NULL,
  CONSTRAINT `fk_director` FOREIGN KEY (`director_id` ) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `actor`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(`id`),
    `name` VARCHAR(25) NOT NULL,
    `website` VARCHAR(255)
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE Table `movie_actor`(
    `movie_id` INT(10) UNSIGNED NOT NULL,
    `actor_id` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY (`movie_id`, `actor_id`),
    CONSTRAINT `fk_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`)ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;