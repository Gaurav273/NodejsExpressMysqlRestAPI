const express = require('express');
const db = require('./db');
const utils = require('./utils');
// const multer = require('multer');
// const upload = multer({dest: 'images/'});

const router = express.Router();

// router.post('/user/profileImage/:userid', upload.single('photo'), (request, response) => {
//     console.log('file uploaded at: ' + request.file.filename);
    
//     const userid = request.params.userid;
//     const statement = `update user set profileImage = '${request.file.filename}' where userid = ${userid}`;
//     const connection = db.connect();
//     connection.query(statement, (error, result) => {
//         connection.end();
//         response.send(utils.createResponse(error, result));
//     });
// });


router.get('/user' , (request,response)=>{
    const connection = db.connect();
    const statement = `select * from user`;
   // console.log("get=" +user)
    connection.query(statement,(error,result)=>{
        connection.end();
        response.send(utils.createResponse(error,result));
    })
});

router.post('/user/signup', (request, response) => {
    const { firstname,lastname, email, password, contact ,address,pincode,gender} = request.body;

    const statement = `
        insert into user 
            (firstname,lastname, email, password, contact,address,pincode,gender) 
            values 
            ('${firstname}','${lastname}', '${email}', '${password}', '${contact}','${address}','${pincode}','${gender}');
    `;
    const connection = db.connect();
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    });
});

router.get('/user/profile/:userid', (request, response) => {
    const userid = request.params.userid;
    const statement = `select * from user where userid = ${userid}`;
    const connection = db.connect();
    connection.query(statement, (error, result) => {
        connection.end();
        if (result.length == 0) {
            response.send(utils.createResponse('user not found', 'user not found'));
        } else {
            const user = result[0];
            response.send(utils.createResponse(error, {
                userid: user.userid,
                firstname: user.firstname,
                email: user.email,
                contact: user.contact,   
                profileimege: user.profileimege
                
            }));
        }
    });
});




router.post('/user/signin', (request, response) => {
    const { email, password } = request.body;

    const statement = `select * from user where email = '${email}' and password = '${password}'`;
    const connection = db.connect();
    connection.query(statement, (error, result) => {
        connection.end();
        console.log(statement);
        console.log(result);


        let status = '';
        let data = null;
        if (error == null) {
            // query got executed successfully
            if (result.length == 0) {
                // error
                status = 'error';
                data = 'Invalid user email or password';
            } else {
                // success
                status = 'success';
                data = result[0]; // send the user details
            }
        } else {
            // error in the statement
            status = 'error';
            data = error;
        }
        response.send({
            status: status,
            data: data
        });
    });
});

router.delete('/user/:userid', (request, response) => {
    const userid = request.params.userid;
    const connection = db.connect();
    const statement = `delete from user where userid = ${userid}`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});



module.exports = router;