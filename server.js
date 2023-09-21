const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
dotenv.config({ path: 'config.env' });
const connectDB = require('./server/database/connection');



const app = express();
const PORT = process.env.PORT || 8080;



// For consoling your log requests
app.use(morgan('tiny'));

// Database connection
connectDB();

// Parse requests using body-parser
app.use(bodyparser.urlencoded({ extended: true }));


// Serve static assets using middleware
app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.json());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Use cookie parser middleware
app.use(cookieParser());

// Include your routes
app.use('/', require('./server/routes/router'));

// Start the server
app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`);
});
