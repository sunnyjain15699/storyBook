const express = require('express');
const app = express();
const mongoose = require('mongoose');


const passport = require('passport');
require('./config/passport')(passport);


const auth = require('./routes/auth')

app.get('/', (req, res)=>{
    res.send('it works');
})

app.use('/auth', auth)

const port = process.env.PORT || 5000
app.listen(port , ()=>{
    console.log(`Server started at ${port}`);
})

