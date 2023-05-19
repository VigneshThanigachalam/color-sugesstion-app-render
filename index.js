import express from "express"; // "type": "module"
import { db_connect } from "./config/db_connect.js";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { authRouter } from "./routes/authRoutes.js";
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
let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "vigneshthanika03@gmail.com", // generated ethereal user
      pass: "iqvupukrkfbugsjt", // generated ethereal password
    },
  });
const mailOption= {
    from: "vigneshthanika03@gmail.com", // sender address
    to: "vigneshthanika03@gmail.com", // list of receivers
    subject: "datasubject", // Subject line
    text: "datahtml", // html body
  }
 await  transporter.sendMail(mailOption, (error, info)=>{
  if(error){
  console.log(error)
  }
    else{
    console.log("hi"+info.response)
    }
  })
const PORT = process.env.PORT;
app.get("/", function (req, res) {
  // res.cookie("name","na");
  res.send("🙋‍♂️, 🌏 🎊✨");
});
app.use("/api/user", authRouter);
app.use("/api/user-request", addDressRouter);
// app.use("/api/user/:id", authMiddleware, addDressRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

// schedule a mail for every day 7 o clock

cron.schedule("* 5 * * *", () => {
  suggestionMail();
});
