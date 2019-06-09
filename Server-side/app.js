const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const exjwt = require('express-jwt');
var multer  = require('multer');
const app = express();
const PORT = 8080;
const formData = require('express-form-data');

const {postCheckUserAccount} = require('./login');
const {postImageUpload} = require('./imageupload');
const {getEventById, PostAddNewWishToEvent, getAllEventsByUserID, deleteEventbyId, postAddEvent, postAdvSearchEvents} = require('./events');
const {getWishesForEvent} = require('./wishes');
const {postSignUpNewAccount} = require('./signup');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '******',
    database: '******'
});
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.connection = connection;

app.set('port', PORT);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(formData.parse());
const jwtMW = exjwt({
    secret: 'wixwishes is very secret site'
});

app.post('/login', postCheckUserAccount);
app.post('/imageupload', postImageUpload);
app.get('/event/:id', getEventById);
app.post('/event/:id', PostAddNewWishToEvent);
app.get('/wishes/:id', getWishesForEvent);
app.get('/events/:userid', getAllEventsByUserID);
app.delete('/event/:eventid', deleteEventbyId);
app.post('/event', postAddEvent);
app.post('/signup', postSignUpNewAccount);
app.post('/advsearch',postAdvSearchEvents);


app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});


app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Magic happens on port ${PORT}`);
});