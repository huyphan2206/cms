//Import modules

const { globalVariables } = require("./config/configuration");

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const { mongoDbUrl } = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const { selectOption } = require('./config/customFunctions');
const fileUpload = require('express-fileupload')

const app = express();

//Connect to mongoose
mongoose.connect(mongoDbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connect");
    }
);
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});



//Configure express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



//Flash and session

app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
//Global variable
app.use(globalVariables);


//file upload
app.use(fileUpload());


//Setup view engine to use handlebars
app.engine('handlebars', hbs.engine({ defaultLayout: "default", helpers: { select: selectOption } }));
app.set('view engine', "handlebars");



//Method Override Middleware
app.use(methodOverride('newMethod'));


//Routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);



app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});