const express = require('express');
const db = require('./db');
const utils = require('./utils');
const multer = require('multer');
const upload = multer({dest: 'images/'});
const notification = require('./notification');


const router = express.Router();

router.get('/package' ,(request,response)=>{
    const connection = db.connect();
    const statement = `select * from package`;
    connection.query(statement ,(error,result)=>{
        connection.end();
        response.send(utils.createResponse(error,result));
    }) 
});


router.get('/package/search/:text' ,(request,response)=>{
    const text = request.params.text;
    const connection = db.connect();
    const statement = `select * from package where LOWER(place) like '%${text}%'`;
    connection.query(statement ,(error,result)=>{
        connection.end();
        response.send(utils.createResponse(error,result));
    }) 
});


router.get('/package/:pckid' ,(request,response)=>{
    const pckid = request.params.pckid;
    const connection = db.connect();
    const statement = `select pckid,place,adults,child,Description,stayamt,foodamt,busamt,trainamt,flightamt,noOfDays,noOfnights,image,TotalAmount from package where pckid = ${pckid}`;
    connection.query(statement ,(error,result)=>{
        connection.end();
        response.send(utils.createResponse(error,result[0]));
    }) 
});



router.put('/package/:pckid',(request,response)=>{
    const pckid = request.params.pckid;
    const{place,adults,child,Description,stayamt,foodamt,busamt,trainamt,flightamt,TotalAmount} = request.body;
    const connection = db.connect();
    const statement = `update package 
        set 
            place = '${place}',
            adults = '${adults}',
            child = '${child}',
            Description = '${Description}',
            stayamt = '${stayamt}',
            foodamt = '${foodamt}',
            busamt = '${busamt}',
            trainamt = '${trainamt}',
            flightamt = '${flightamt}',
            Totalamount= '${TotalAmount}'
        where pckid = ${pckid}`;
        connection.query(statement,(error,result)=>{
            connection.end();
            response.send(utils.createResponse(error,result));
        })
});

router.delete('/package/:pckid',(request,response)=>{
    const pckid = request.params.pckid;
    const connection = db.connect();
    const statement = `delete from package where pckid = ${pckid}`;
    connection.query(statement,(error,result)=>{
        connection.end();
        response.send(utils.createResponse(error,result));
    })
});

router.post('/package', upload.single('image'), (request, response) => {
    const{place,adults,child,Description,stayamt,foodamt,busamt,trainamt,flightamt,noOfDays,noOfnights,TotalAmount}= request.body;
    const connection = db.connect();
    const statement = `insert into package(place,adults,child,Description,stayamt,foodamt,busamt,trainamt,flightamt,noOFDays,noOFnights,image,TotalAmount) values('${place}','${adults}','${child}','${Description}','${stayamt}','${foodamt}','${busamt}','${trainamt}','${flightamt}','${noOfDays}','${noOfnights}','${request.file.filename}',${TotalAmount})`;
    connection.query(statement, (error, result) => {
        connection.end();
        notification.send(() => {
            response.send(utils.createResponse(error, result));
        });
    })
});


module.exports = router;


