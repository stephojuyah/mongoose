
const mongoose = require("mongoose");
require(`dotenv`).config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .catch(error=> console.log(`DB connection Error: ` + error));
        console.log("MongoDB connected successfully");

        mongoose.connection.on("error", (error) => {
            if (!error){
                console.log(`mongoDB connected successfully`)
            } else {
                console.log(`Error connecting to DB: ` + error)
            }
        });
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
};

module.exports = connectDB;