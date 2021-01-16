require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./utils/error-handler";
import bodyParser from "body-parser";
import routes from "./api/routes";
import logger from "./utils/logger";
import "./utils/database";
import "./utils/response-handler";

const app: Application = express();
const port: number = +(process.env.PORT || 5000);

// app.use(cors());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

/**
 * Start server on specified port
 */
app.listen(port, () => {
    const message = `Server started on port ${port}`;
    console.log(message);
    logger.info(message);
});
