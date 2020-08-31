const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();


router.get('/feedback',(request,response)=>{
    const connection = db.connect();
    const statement = `select * from feedback`;

    connection.query(statement,(error,result)=>{
        connection.end();
        response.send(utils.createResponse(error,result));
    })
});

router.post('/feedback',(request,response)=>{
    const { name,email,msg} = request.body;

    const statement = `insert into feedback
    (name,email,msg) values ('${name}','${email}','${msg}');`;
    const connection = db.connect();
    connection.query(statement,(error,result)=> {
        connection.end();
        response.send(utils.createResponse(error,result));
    });
});


module.exports = router;

