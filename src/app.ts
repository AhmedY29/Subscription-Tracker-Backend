import express from "express";
import { PORT } from "./config/env";
import connectDB from "./config/db";
import authRouter from "./routers/auth.route";
import usersRouter from "./routers/users.route";
import subscriptionsRouter from "./routers/subscription.route";
import errorMiddleware from "./middlewares/error.middleware";
import arcjetMiddleware from "./middlewares/arject.middleware";

const app = express();

app.use(express.json());
app.use(arcjetMiddleware);


app.use("/api/auth", authRouter );
app.use("/api/users", usersRouter );
app.use("/api/subscriptions", subscriptionsRouter );

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to Subscription Tracker!");
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});