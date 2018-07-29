const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();

//DB config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo DB COnnected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));
