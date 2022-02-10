USE hyf_lesson1;

SELECT name
FROM status;

SELECT name, email
FROM user;

SELECT *
FROM task;

SELECT title, description
FROM task
WHERE title LIKE "%linkedin%";

SELECT
 id,
  title,
  description
FROM
  task
WHERE
  id=29;

SELECT
  id,
  title,
  description
FROM
  task
LIMIT
  5;

SELECT id, title, description
FROM task
ORDER BY title
LIMIT 5;


SELECT
  id,
  title,
  description
FROM
  task
LIMIT
  2, 5;


SELECT COUNT(phone)
FROM user;

SELECT DISTINCT phone
FROM user;

SELECT
  COUNT(id)
FROM
  user;


SELECT AVG(id)
FROM status;

SELECT
  MIN(id)
FROM
  status;

select
  max(title)
FROM
  task;

SELECT
  MAX(created)
FROM
  task;

SELECT SUM(id)
FROM status;

SELECT month(created), COUNT(id)
FROM task
GROUP BY month(created);

SELECT
  month(created),
  title
FROM
  task
GROUP BY
  month(created);

SELECT id, month(created), created
FROM task
WHERE month(created)=10;

SELECT *
FROM task;


SELECT task.title, user.name, user.id, task.user_id
FROM user, task
WHERE task.user_id=user.id AND user.id = 10;

SELECT
  task.title,
  user.name,
  user.id,
  task.user_id
FROM
  user,
  task;

SELECT
  task.title, user.name, user.id, task.user_id
FROM user JOIN task ON task.user_id = user.id;


SELECT
  task.title,
  status.name,
  status.id,
  task.status_id
FROM
  status JOIN task ON task.status_id = status.id;

SELECT
  task.title AS task_title,
  user.name AS user_name,
  status.name AS status_name,
  user.id AS user_id,
  task.user_id AS task_user_id,
  task.status_id AS task_status_id,
  status.id AS status_id
FROM
  (user JOIN task ON task.user_id = user.id) 
    JOIN status ON task.status_id=status.id ;


SELECT
  task.title,
  user.name,
  user.id,
  task.user_id
FROM
  user,
  task;
SELECT
  task.title,
  user.name,
  user.id,
  task.user_id
FROM
  user LEFT JOIN task ON task.user_id = user.id;


SELECT
  task.title,
  user.name,
  user.id,
  task.user_id
FROM
  user,
  task;
SELECT
  task.title,
  user.name,
  user.id,
  task.user_id
FROM
  user
  RIGHT JOIN task ON task.user_id = user.id;


SELECT
  task.user_id,
  COUNT(task.id)
FROM
  user LEFT JOIN task ON user.id = task.user_id
GROUP BY task.user_id;