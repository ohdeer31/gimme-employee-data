SELECT employee.id, employee.first_name, employee.last_name, employeeRole.title, department.department_name, employeeRole.salary, employee.manager_id 
FROM department 
JOIN employeeRole ON department.id = employeeRole.department_id 
JOIN employee ON employeeRole.id = employee.role_id
ORDER BY employee.id;

SELECT employeeRole.title, department.department_name, employeeRole.salary 
FROM department 
JOIN employeeRole ON department.id = employeeRole.department_id;

INSERT INTO department (department_name) 
VALUE ();

-- INSERT INTO 
-- 	employeeRole (title, salary)
-- OUTPUT inserted.id
-- VALUES
-- 	('2020 Summer Promotion',0.25,'20200601','20200901'),
-- 	('2020 Fall Promotion',0.10,'20201001','20201101'),
-- 	('2020 Winter Promotion', 0.25,'20201201','20210101');

INSERT INTO tableAll ( title, salary, department_name )
VALUE (?)
FROM department d
INNER JOIN employeeRole r ON d.id = r.department_name
INNER JOIN employee e ON r.id = e.role_id;


SELECT employee.id, 
        employee.first_name, 
        employee.last_name, 
        employeeRole.title, 
        department.department_name, 
        employeeRole.salary, 
        concat(manager.first_name, " ", manager.last_name) as manager 
FROM employee 
LEFT JOIN employee manager ON manager.id = employee.manager_id 
LEFT JOIN department ON employeeRole.department_id = department.id 
JOIN employeeRole ON department.id = employeeRole.department_id 
JOIN employee ON employeeRole.id = employee.role_id 
ORDER BY employee.id;

SELECT a.id, a.first_name, a.last_name, concat(b.first_name, " ", b.last_name) as manager 
    FROM employee AS a 
    LEFT JOIN employee AS b ON a.manager_id = b.id;


SELECT employee.id, employee.first_name, employee.last_name, employeeRole.title, department.department_name, employeeRole.salary, concat(manager.first_name, ' ', manager.last_name) as manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id LEFT JOIN employeeRole ON employee.role_id = employeeRole.id LEFT JOIN department ON employeeRole.department_id = department.id;