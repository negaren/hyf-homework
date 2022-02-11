USE hyf_lesson2;
SELECT
  task.title,
  user.email
FROM
  (
    user_task
    JOIN task ON task.id = user_task.task_id
  )
  JOIN user ON user.id = user_task.user_id
WHERE
  user.email LIKE '%@spotify.com';
SELECT
  user.name as user_name,
  task.title,
  status.name as status_name
FROM
  user_task
  JOIN user ON user.id = user_task.user_id
  JOIN task ON task.id = user_task.task_id
  JOIN status on task.status_id = status.id
WHERE
  status.name = 'Not started'
  AND user.name = 'Donald Duck';
SELECT
  task.title,
  task.created,
  user.name
FROM
  task
  JOIN user_task ON task.id = user_task.task_id
  JOIN user ON user.id = user_task.user_id
WHERE
  user.name = 'Maryrose Meadows'
  AND month(task.created) = 9;
SELECT
  count(id),
  month(created)
FROM
  task
GROUP BY
  month(created);
-- part4
  CREATE DATABASE movie;