import mongoose  from "mongoose";
import app from "./app.js"

(async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/gitsteup")
        console.log("DATABASE CONNECT");

        const onListening = () => {
            console.log("Listening on port5000");
        }

        app.listen(5000, onListening)
    }
    catch (error) {
        console.error("error: ", error);
        throw err; 
    }
    
})()