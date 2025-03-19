// const mysql = require('mysql');
import mysql from "mysql2/promise";

const db=mysql.createPool({
    host:'todo-project.c1ksyqm6o1bw.ap-southeast-2.rds.amazonaws.com',
    port:'3306',
    user:'scoda',
    password:'11111111',
    database:'users_data',
    waitForConnections:true
});


// module.exports = db;
export default db;