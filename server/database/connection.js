const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        //will connect with databse using our connection string here from env file
        //process.env.variablename in order to use the config.env data
        //the second argument in mongoose.connect is used to stop warnings in the console when you are working with mongodb
        const con = await mongoose.connect(process.env.Mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        //this is to print when our mongodb running (use variable con.connection.host to get the portname)
        console.log(`MOngoDB connected : ${con.connection.host}`)
    }

    catch (err) {
        //this is when we encounter any error
        console.log(err);
        //process.exit(1) this is used to exit 1 represets true
        process.exit(1)
    }
}
module.exports = connectDB