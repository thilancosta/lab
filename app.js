const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to'+config.database)
});

//On error
mongoose.connection.on('error', (err)=>{
    console.log('databse error'+err)
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//cors middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//body parser midleware
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session()); 

require('./config/passport')(passport);

app.use('/users',users);

//index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server started on port '+port);

});