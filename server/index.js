require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { SERVER_PORT } = process.env;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/posts");

app.use("/api/posts", posts);

app.listen(SERVER_PORT, () =>
  console.log(`Port ${SERVER_PORT} reporting for duty!`)
);
