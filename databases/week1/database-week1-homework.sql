-- 1
USE hyf_lesson1;
SELECT * FROM task;
SELECT
  COUNT(id)
FROM
  `task`;
-- 2
SELECT
  SUM( CASE 
          WHEN due_date IS NULL THEN 1
          ELSE 0 
          END)
FROM
  `task`;

-- 3
SELECT
  status.name,
  task.id,
  task.title
FROM
  status
  JOIN task on task.status_id = status.id
WHERE
  status.name = 'Done';
-- 4
SELECT
  status.name,
  task.id,
  task.title
FROM
  status
  JOIN task on task.status_id = status.id
WHERE
  status.name <> 'Done';
-- 5
SELECT
  *
FROM
  task
ORDER BY
  created DESC;
-- 6
SELECT
  *
FROM
  task
WHERE
  created in (
    SELECT
      max(created)
    FROM
      task
  );
--7
SELECT
  title,
  due_date
FROM
  task
WHERE
  title LIKE '%database%'
  OR `description` LIKE '%database%';
-- 8
SELECT
  title,
  status.name
FROM
  task
  JOIN status on task.status_id = status.id;
-- 9
SELECT
  name,
  COUNT(task.id)
FROM
  status
  JOIN task on task.status_id = status.id
GROUP BY
  status.id;
-- 10
SELECT
  name,
  COUNT(task.id)
FROM
  status
  JOIN task ON status.id = task.status_id
GROUP BY
  status.id
ORDER BY
  COUNT(task.id) DESC;