const express = require("express");
const app = express();

const taskRoute = require("./routes/tasks");

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (_req, res)=> res.send("<p>Go to /v1/tasks endpoints</p>"))

app.use("/v1/tasks", taskRoute);

module.exports = app;
