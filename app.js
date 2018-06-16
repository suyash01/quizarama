const express = require("express");
const path = require("path");
const morgan = require("morgan");
const env = require("dotenv");
const mongoose = require("mongoose");

// requiring all routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const quizRouter = require("./routes/quiz");

const app = express();
env.config();

// connecting to mongodb
mongoose.connect(process.env.DBURL).then(
    () => {
        console.log("Connected to the db");
    },
    err => {
        console.log(err);
    }
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes setup
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/quiz", quizRouter);

// Setting Up Error Messages and Status
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: 0,
        error: error.message
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server started on port " + port);
});
