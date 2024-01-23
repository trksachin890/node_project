require('dotenv').config()
const express = require("express");

const app = express();

app.set("view engine", "ejs");

const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const db = require("./database");


app.listen(port, () => {
  console.log(`Server started successfully at http://localhost:${port}`);
});

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/", employeeRoutes);
