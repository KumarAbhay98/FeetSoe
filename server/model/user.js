const mongoose = require('mongoose'); // Import Mongoose library for MongoDB interaction
const { isEmail } = require('validator'); // Import validator for email validation
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Define a user schema using Mongoose
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'please enter a username'],
        unique: false,
        lowercase: false,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

// Fire a function before doc saved to db (hashing the password)
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10); // You can adjust the number of rounds as needed (e.g., 10)
    //this is to convert the password into hash function
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



//we gonna be creating a static model to perform our login operations 
userSchema.statics.login = async function(email, password) {
    //we are finding an user with the same email
    const user = await this.findOne({ email });
    if (user) {
        //now our password in database is hashed so we need to hash the entered password during login and then comparing both password(database) and user.password(entered by user)
        //bcrypt module is used to do so
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
// Create a User model based on the user schema
const User = mongoose.model('user', userSchema);

module.exports = User; // Export the User model to be used in other parts of the application
