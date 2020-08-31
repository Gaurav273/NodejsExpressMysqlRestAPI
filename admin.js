const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.post('/admin/signup', (request, response) => {
    const {email, password } = request.body;

    const statement = `
        insert into admin 
            (email, password) 
            
            values 
            (${email}', '${password}');
    `;
    const connection = db.connect();
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    });
});
//ii

router.post('/admin/register', (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    const statement = `insert into admin 
        (email, password) values
        ('${email}', '${password}')`;
    const connection = db.connect();
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    });
});


router.post('/admin/signin', (request, response) => {
    const { email, password } = request.body;

    const statement = `select * from admin where email = '${email}' and password = '${password}'`;
    const connection = db.connect();
    connection.query(statement, (error, result) => {
        connection.end();

        let status = '';
        let data = null;
        if (error == null) {
            if (result.length == 0) {

                status = 'error';
                data = 'Invalid user email or password';
            } else {
                status = 'success';
                data = result[0]; 
            }
        } else {
            status = 'error';
            data = error;
        }
        response.send({
            status: status,
            data: data
        });
    });
});


module.exports = router;