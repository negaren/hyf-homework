-- part1
USE hyf_lesson1;
INSERT INTO
  `task` (
    title,
    description,
    created,
    updated,
    due_date,
    status_id,
    user_id
  )
VALUES
  (
    'Teaching database',
    'How to create a table',
    '2022-02-09 13:16:47',
    '2022-02-09 13:16:47',
    '2022-03-09 13:16:47',
    1,
    12
  );
UPDATE
  task
set
  title = 'Planting'
WHERE
 id = (select LAST_INSERT_ID());
UPDATE
  task
set
  due_date = '2023-03-09 13:16:47'
WHERE
  id = (select LAST_INSERT_ID());
UPDATE
  task
set
  status_id = 2
WHERE
  id = (select LAST_INSERT_ID());
UPDATE
  task
set
  status_id = 3
WHERE
  id = (select LAST_INSERT_ID());
DELETE FROM
  task
WHERE
  id = (select LAST_INSERT_ID());
SELECT
  *
FROM
  task;
-- Part 2
  CREATE DATABASE school;