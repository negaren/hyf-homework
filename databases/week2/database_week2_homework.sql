-- part1
ALTER TABLE
  task
ADD
  user_id int(10);
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
  user_id = 12;
UPDATE
  task
set
  due_date = '2023-03-09 13:16:47'
WHERE
  user_id = 12;
UPDATE
  task
set
  status_id = 2
WHERE
  user_id = 12;
UPDATE
  task
set
  status_id = 3
WHERE
  user_id = 12;
DELETE FROM
  task
WHERE
  user_id = 12;
SELECT
  *
FROM
  task;
-- Part 2
  CREATE DATABASE school;
