const express = require("express");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const helmet = require("helmet");
const xss = require("xss-clean");

const hpp = require("hpp");
const cors = require("cors");
const uploadCenter = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config({
  path: "./config/config.env",
  // debug: true,
});

app.use(express.json({ limit: "25mb" }));

// Cookie parser
app.use(cookieParser());
// app.use(checkLimitationSpot);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Prevent http param pollution
app.use(hpp());
app.use(cors());

//route handelert
const public = path.join(__dirname, "public");
app.use(express.static(public));
app.use("/api/v1/upload", uploadCenter);

const PORT = process.env.PORT || 8010;

const expressServer = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close expressServer & exit process
  // expressServer.close(() => process.exit(1));
});

module.exports = {
  app,
};
