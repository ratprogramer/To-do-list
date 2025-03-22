import mysql2 from 'mysql2';

export const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'taskDB'
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
});