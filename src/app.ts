import express from "express";
import { PORT } from "./config/env";
import connectDB from "./config/db";


const app = express();




app.get("/", (req, res) => {
    res.send("Welcome to Subscription Tracker!");
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});