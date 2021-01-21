require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./utils/error-handler";
import bodyParser from "body-parser";
import routes from "./api/routes";
import logger from "./utils/logger";
import rateLimit from "express-rate-limit";
import "./utils/database";
import "./utils/response-handler";

const app: Application = express();
const port: number = +(process.env.PORT || 5000);

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(
    cors({
        origin: "https://basjansen.dev",
    })
);
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(errorHandler);

/**
 * Start server on specified port
 */
app.listen(port, () => {
    const message = `Server started on port ${port}`;
    console.log(message);
    logger.info(message);
});
