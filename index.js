const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override'); 
const session = require('express-session');
const passport = require('passport');
const path = require('path');


// Question === >  Why do we need to set global vars using app.use()

// Database pre-req
require('./models/User')
require('./models/Stories')

// passport for authentication logic
require('./config/passport')(passport);

const stories = require('./routes/stories')
const index = require('./routes/app');
const auth = require('./routes/auth');
const keys = require('./config/keys');


const {truncate, stripTags, formatDate, select, editIcon} = require('./helpers/hbs')


// Database Logic
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then((data) => console.log('MongoDb connected database : ', data.connections[0].name))
.catch(err => console.log(err))

const app = express();

app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select,
        editIcon: editIcon
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
 
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized : false
}))

// Passport MIddleware Logic
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// Middleware Logic
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });
  
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);


// POrt Logic
const port = process.env.PORT || 5000
app.listen(port , ()=>{
    console.log(`Server started at ${port}`);
})

