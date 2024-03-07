const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Settings
const app = express();
const port = process.env.PORT || 9000;

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to MusicAPI");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// Server listening
app.listen(port, () => console.log("Server listening on port", port));