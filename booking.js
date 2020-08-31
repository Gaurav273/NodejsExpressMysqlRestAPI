const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();


router.get('/booking',(request,response)=>{
    const connection = db.connect();
    const statement = `select * from booking`;

    connection.query(statement,(error,result)=>{
        connection.end();
        response.send(utils.createResponse(error,result));
    })
});

router.post('/booking',(request,response)=>{
    const {email,BookDate,pay,package} = request.body;

    const statement = `insert into booking
    (email,BookDate,pay,package) values ('${email}','${BookDate}','${pay}','${package}');`;
    const connection = db.connect();
    connection.query(statement,(error,result)=> {
        connection.end();
        response.send(utils.createResponse(error,result));
    });
});


module.exports = router;

