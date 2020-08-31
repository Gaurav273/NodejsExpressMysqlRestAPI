const express = require('express');
const bodyParser = require('body-parser');
const packageRouter = require('./package');
const adminRouter = require('./admin');
const userRouter = require('./user');
const feedbackRouter = require('./feedback');
const bookingRouter = require('./booking');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('images'));

app.use(packageRouter);
app.use(adminRouter);
app.use(userRouter);
app.use(feedbackRouter);
app.use(bookingRouter);

app.listen(3000,'0.0.0.0',()=>{
    console.log(`server started on 3000`);
});
