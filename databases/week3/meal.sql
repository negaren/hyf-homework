DROP DATABASE IF EXISTS `meal_sharing`;
CREATE DATABASE `meal_sharing`;

USE `meal_sharing`;

SET NAMES utf8mb4;
CREATE TABLE `meal`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `when` DATETIME NOT NULL,
    `max_reservations` INT(10) UNSIGNED NOT NULL,
    `price` DECIMAL(7.2) NOT NULL,
    `created-date` DATE NOT NULL,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reservation`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `number_of_guests` INT(10) UNSIGNED NOT NULL,
    `meal_id` INT(10) UNSIGNED NOT NULL,
    `created-date` DATE NOT NULL,
    `contact_phonenumber` VARCHAR(255) NOT NULL,
    `contact_name` VARCHAR(255) NOT NULL,
    `contact_email` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_meal_reservation` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `review`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `meal_id` INT(10) UNSIGNED NOT NULL,
    `stars` ENUM('1', '2', '3', '4', '5') NOT NULL,
    `created-date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_meal_review` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Queries
-- meal
USE `meal_sharing`;
SELECT * 
FROM meal;

INSERT INTO meal (title, description, location, `when`, `max_reservations`, price, `created-date`) VALUES ('Qorme Sabzi', 'The most delcious Iranian stew that needs to be prepared with vegetables, beans and lamb meat', 'Iran', '2022-02-25 06:54:16', 5, 1000, '2022-02-17');

SELECT *
FROM meal
WHERE id = 1;

UPDATE meal
SET title = 'Ghormeh Sabzi'
WHERE id = 1;

DELETE 
FROM meal
WHERE id = 1;

-- reservation
SELECT *
FROM reservation;

INSERT INTO reservation (number_of_guests, meal_id, `created-date`, contact_phonenumber, contact_name, contact_email) VALUES (3, 1, '2022-02-17', '+9065482315', 'Tina', 'blob@gmail.com');

SELECT *
FROM reservation
WHERE id = 1;

UPDATE reservation
SET contact_phonenumber = '945632515', contact_email = 'blob2@blob.com'
WHERE id = 1;

DELETE 
FROM reservation
WHERE id = 1;

-- Review
SELECT *
FROM review;

INSERT INTO review (title, description, meal_id, stars, `created-date`) VALUES ('delicious', 'the course was amazing and the food is yummyyyy', 1, 4, '2022-02-26');

SELECT *
FROM review
WHERE id = 1;

UPDATE review
SET title = 'not bad'
WHERE id = 1;

DELETE 
FROM review
WHERE id = 1;

-- Last part

-- meal data entry
USE meal_sharing;
INSERT INTO meal (title, description, location, `when`, `max_reservations`, price, `created-date`) VALUES ('Koobide Kebab', 'The mix of minced lamb and beff meat is needed', 'Iran', '2022-02-26 06:54:16', 10, 1500, '2022-02-17');
INSERT INTO meal (title, description, location, `when`, `max_reservations`, price, `created-date`) VALUES ('Kashk Badenjan', 'A delicious mix of herbs and eggplant with Kashk!', 'Iran', '2022-02-27 06:54:16', 3, 1000, '2022-02-17');
INSERT INTO meal (title, description, location, `when`, `max_reservations`, price, `created-date`) VALUES ('Ash Reshteh', 'Traditional iranian dish served with Kash and mint, suitable to be served at cold weather', 'Iran', '2022-02-28 06:54:16', 2, 5000, '2022-02-17');
INSERT INTO meal (title, description, location, `when`, `max_reservations`, price, `created-date`) VALUES ('Ash Reshteh', 'Traditional iranian dish served with Kash and mint, suitable to be served at cold weather', 'Iran', '2022-03-28 06:54:16', 2, 5000, '2022-03-10');
SELECT * FROM meal;

-- reservation data entry
INSERT INTO reservation (number_of_guests, meal_id, `created-date`, contact_phonenumber, contact_name, contact_email) VALUES (4, 3, '2022-02-19', '54689236', 'Tina', 'tina@blob.com');
INSERT INTO reservation (number_of_guests, meal_id, `created-date`, contact_phonenumber, contact_name, contact_email) VALUES (6, 2, '2022-02-18', '87469352', 'Cyrus', 'Cyrus@blob.com');
INSERT INTO reservation (number_of_guests, meal_id, `created-date`, contact_phonenumber, contact_name, contact_email) VALUES (4, 4, '2022-02-18', '78523654', 'Giti', 'Giti@blob.com');
INSERT INTO reservation (number_of_guests, meal_id, `created-date`, contact_phonenumber, contact_name, contact_email) VALUES (2, 4, '2022-02-17', '56895364', 'Tanha', 'tanha@blob.com');
INSERT INTO reservation (number_of_guests, meal_id, `created-date`, contact_phonenumber, contact_name, contact_email) VALUES (2, 4, '2022-02-16', '98765324', 'Panda', 'panda@blob.com');

-- Review data entry
INSERT INTO review (title, description, meal_id, stars, `created-date`) VALUES ('delicious', 'the course was amazing and the food is yummyyyy', 3, 4, '2022-03-26');
INSERT INTO review (title, description, meal_id, stars, `created-date`) VALUES ('difficult to cook', 'nod bad, the food is tricky', 2, 3, '2022-03-28');
INSERT INTO review (title, description, meal_id, stars, `created-date`) VALUES ('perfect', 'wow thats delicious', 2, 5, '2022-03-28');

-- Functionality
SELECT * 
FROM meal
WHERE price < 5000;

SELECT* from meal;
SELECT * from reservation;

-- Meals with the calculation based on the number of the total reservations without considering the number of guests (The question is not obvious)
select sum(reservation.number_of_guests
) AS Total_Guest,
meal.title,
meal.id,
meal.`max_reservations`
FROM
  meal
  INNER JOIN reservation ON meal.id = reservation.meal_id
GROUP BY
  reservation.meal_id
HAVING
  sum(reservation.number_of_guests) < meal.`max_reservations`;

-- Meals with the calculation based on the number of guests (The question is not obvious)
SELECT * 
FROM (SELECT SUM(reservation.number_of_guests) AS Total_Guest, meal.title, meal.id, meal.`max_reservations`
FROM meal
INNER JOIN reservation ON meal.id = reservation.meal_id
GROUP BY reservation.meal_id) AS ml
WHERE ml.Total_Guest < ml.`max_reservations`;

SELECT *
FROM meal
WHERE title LIKE '%kebab%';

SELECT *
FROM meal
WHERE `created-date` BETWEEN '2022-02-16' AND '2022-03-10';

SELECT *
FROM meal
LIMIT 2;

SELECT *
FROM meal
JOIN review ON meal.id = review.meal_id
WHERE stars >= 4;

SELECT *
FROM reservation
WHERE meal_id = 4
ORDER BY `created_date` ASC; 

SELECT AVG(review.stars) as `average_review`, meal.id, meal.title
FROM review
JOIN meal ON meal.id = review.meal_id
GROUP BY meal.id 
ORDER BY `average_review` DESC;