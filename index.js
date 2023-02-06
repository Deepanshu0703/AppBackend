
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');


const errorHandler = require('./middleware/error');
const dbConn = require('./dbs/dbConn');
dbConn();

// Load env vars
dotenv.config();


// Route files
const bootcamps = require('./routes/bootcamp');
const courses = require('./routes/course');
const auth = require('./routes/auth');
const users = require('./routes/user');
const reviews = require('./routes/review');



const app = express();
app.use(express.json());
app.use(cookieParser());

// File uploading
app.use(fileupload());

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running on port ${PORT}`
    )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1));
});


