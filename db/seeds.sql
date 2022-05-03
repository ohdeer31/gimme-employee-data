INSERT INTO department (department_name)
VALUES  ("Legal"),
        ("Engineering"),
        ("Finance"),
        ("Sales");

INSERT INTO employeeRole (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 4),
        ("Salesperson", 80000, 4),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 1),
        ("Lawyer", 190000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, null),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3, null),
        ("Kevin", "Tupik", 4, 3),
        ("Kunal", "Singh", 5, null),
        ("Malia", "Brown", 6, 5),
        ("Sarah", "Lourd", 7, null),
        ("Tom", "Allen", 8, 7);