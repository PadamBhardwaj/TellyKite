const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const errorMiddleware = require("./middleware/error")
