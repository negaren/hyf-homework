-- part2
-- class
DROP TABLE `class`;
CREATE TABLE `class` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(25),
  `begins` date,
  `ends` date
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Student
CREATE TABLE `student` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` text NULL DEFAULT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `class_id` int(10) unsigned NULL DEFAULT NULL,
  -- why when I set this to NOT NULL it gives error?
  CONSTRAINT `fk_class` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE INDEX student_name_index ON `student`(`name`);
ALTER TABLE
  `class`
ADD
  `status` varchar(25);
ALTER TABLE
  `class`
ADD
  CONSTRAINT chk_status Check(
    `status` = 'not-started'
    OR `status` = 'ongoing'
    OR `status` = 'finished'
  );