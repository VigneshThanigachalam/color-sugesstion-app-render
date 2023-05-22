import express from "express"; // "type": "module"
import { db_connect } from "./config/db_connect.js";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { authRouter } from "./routes/authRoutes.js";
import { urlRouter } from "./routes/urlRouter.js";
import { urlAuthRouter } from "./routes/urlAuthRouter.js";
import { urlIndexRouter } from "./routes/urlIndexRouter.js";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { addDressRouter } from "./routes/addDressRoutes.js";
import cron from "node-cron";
import { suggestionMail } from "./utils/suggestionMail.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const app = express();
dotenv.config();

db_connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieparser());

const PORT = process.env.PORT;
app.get("/", function (req, res) {
  // res.cookie("name","na");
  res.send("🙋‍♂️, 🌏 🎊✨");
});

// for suggestion app
app.use("/api/user", authRouter);
app.use("/api/user-request", addDressRouter);


// for url trim app
app.use("/api/url-user", urlAuthRouter);
app.use('/api', urlIndexRouter);
app.use('/api/create', urlRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

// schedule a mail for every day 7 o clock

cron.schedule("0 0 12 * * *", () => {
  suggestionMail();
});
