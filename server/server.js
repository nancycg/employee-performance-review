/*
 * Author : Nancy Chauhan
 * This is starting point for server to run.
 * Using Mongo DB.
 * 
 * Using cors module:
 * Cross-origin resource sharing (CORS) allows requests to skip the Same-origin policy 
 * and access resources from remote hosts. CORS is a node.js package for providing 
 * a Connect/Express middleware
 */

const mongoose = require("mongoose");
const employee = require("./routes/employee");
const express = require("express");
const cors = require("cors");
const app = express();

//The database name = reviewdb
mongoose
  .connect("mongodb://localhost/reviewdb", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(cors());
app.use(express.json());
app.use("/emp", employee);

//using this port in 'cofig.json' as "http://localhost:3900" to start server...
//if you changed this then you need to change in 'config.json' file as well.
const port = 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));



/* 
EXTRA NOTES:

To remove following error : use 'cors' module.

Access to XMLHttpRequest at 'http://localhost:3900/emp' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the 
requested resource.
*/
