USE employee_db;

SELECT concat(b.first_name, " ", b.last_name) as manager 
FROM employee as a LEFT JOIN employee as b ON b.manager_id = a.id;