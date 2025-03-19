// const mysql = require('mysql');
import mysql from "mysql";

const db=mysql.createConnection({
    host:'todo-project.c1ksyqm6o1bw.ap-southeast-2.rds.amazonaws.com',
    port:'3306',
    user:'scoda',
    password:'11111111',
    database:'users_data'
});


// module.exports = db;
export default db;