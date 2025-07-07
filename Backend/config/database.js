const mongoose = require("mongoose")
require("dotenv").config()

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB Connection Successfully")
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
}