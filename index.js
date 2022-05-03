const fs = require("fs").promises;
const inquirer = require("inquirer");
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

//   let departmentChoices = db.query('SELECT department_name FROM department', function (err, results) {
//     console.log(results);})
//   console.log(departmentChoices);

// class CLI {
//     constructor() {
//         this.list = null;
//     }

// db.query("SELECT * FROM department", function (err, results) {
//     console.log(results);
// });

// var useMe = db.query('SELECT department.department_name FROM department', function (err, results) {
//     let arr = JSON.stringify(results);
//     let arrAgain = JSON.parse(arr);
//     var departmentArray = arrAgain.map(x => x. department_name);
//     return departmentArray;
// })



    function searchData() {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "What would you like to do?",
                    name: "searchDb",
                    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
                }
            ])
            .then((answer) => {
                if (answer.searchDb === "view all departments") {
                    db.query('SELECT department_name FROM department', function (err, results) {
                        console.table(results);
                        return searchData();
                    });
                } else if (answer.searchDb === "view all roles") {
                    db.query('SELECT employeeRole.title, department.department_name, employeeRole.salary FROM department JOIN employeeRole ON department.id = employeeRole.department_id;', function (err, results) {
                    // db.query('SELECT employeeRole.salary FROM employeeRole;', function (err, results) {
                        console.table(results);
                        return searchData();
                    })
                } else if (answer.searchDb === "view all employees") {
                    // db.query('SELECT employee.id, employee.first_name, employee.last_name, employeeRole.title, department.department_name, employeeRole.salary, employee.manager_id FROM department JOIN employeeRole ON department.id = employeeRole.department_id JOIN employee ON employeeRole.id = employee.role_id ORDER BY employee.id;', function (err, results) {
                    db.query('SELECT employee.id, employee.first_name, employee.last_name, employeeRole.title, department.department_name, employeeRole.salary, concat(manager.first_name, " ", manager.last_name) as manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id LEFT JOIN employeeRole ON employee.role_id = employeeRole.id LEFT JOIN department ON employeeRole.department_id = department.id;', function (err, results) {
                        console.table(results);
                        // console.log(resule);
                        return searchData();
                    })
                } else if (answer.searchDb === "add a department") {
                    return inquirer.prompt([
                        {
                            type: "input",
                            message: "What is the name of the department?",
                            name: "nameOfDepartment"
                        }
                    ])
                    .then((answer) => {
                        db.query('INSERT INTO department (department_name) VALUE (?);', answer.nameOfDepartment, function (err, results) {
                            console.log("Added service to the database.");
                            return searchData();
                        })
                    })
                } else if (answer.searchDb === "add a role") {
                    // db.query('SELECT department.id FROM department', function (err, results) {
                    //     let arr = JSON.stringify(results);
                    //     let arrAgain = JSON.parse(arr);
                        // var departmentArray = arrAgain.map(x => x. department_name);
                    db.query("SELECT * FROM department", (err, departments) => {
                        if (err) {
                            console.log(err);
                        }
                        //  console.log(departments)
                        let departmentChoices = departments.map(department => ({
                            name: department.department_name,
                            value: department.id
                        }))
                        return inquirer.prompt([
                            {
                                type: "input",
                                message: "What is the name of the role?",
                                name: "title"
                            },
                            {
                                type: "input",
                                message: "What is the salary of the role?",
                                name: "salary"
                            },
                            {
                                type: "list",
                                message: "Which department does the role belong to?",
                                name: "department_id",
                                choices: departmentChoices
                            }
                        ])
                        .then((answer) => {
                            // db.query('INSERT INTO employeeRole (title) VALUE (?);', answer.nameOfRole, function (err, results) {
                            // db.query('INSERT INTO tableAll ( title, salary, department_name ) VALUE (?) FROM department d INNER JOIN employeeRole r ON d.id = r.department_name INNER JOIN employee e ON r.id = e.role_id;', (answer.nameOfRole, answer.salaryOfRole, answer.departmentOfRole), function (err, results) {
                            // console.log(answer);
                            db.query('INSERT INTO employeeRole SET ?', answer, function (err, results) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log("Added role to the database.");
                                return searchData();
                            })
                        })
                    })
                } else if (answer.searchDb === "add an employee") {
                    db.query("SELECT * FROM employeeRole JOIN employee ON employeeRole.id = employee.role_id", (err, roles) => {
                        if (err) {
                            console.log(err);
                        };
                        let employeeTitle = roles.map(role => ({
                            name: role.title,
                            value: role.id
                        }));
                        let managerT = roles.map(boss => ({
                            name: boss.first_name,
                            value: boss.manager_id
                        }));
                        return inquirer.prompt([
                            {
                                type: "input",
                                message: "What is the employee's first name?",
                                name: "first_name"
                            },
                            {
                                type: "input",
                                message: "What is the employee's last name?",
                                name: "last_name"
                            },
                            {
                                type: "list",
                                message: "What is the employee's role?",
                                name: "role_id",
                                choices: employeeTitle
                            },
                            {
                                type: "list",
                                message: "Who is the employee's manager?",
                                name: "manager_id",
                                choices: managerT
                            }
                        ])
                        .then((answer) => {
                            // console.log(answer);
                            db.query('INSERT INTO employee SET ?', answer, function (err, results) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log("Added employee to the database.");
                                console.log(answer.manager_id);
                                return searchData();
                            })
                        })
                    })
                }
            })
    };
 
// }
searchData();