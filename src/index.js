const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const artistRoutes = require("./routes/artist");
const songRoutes = require("./routes/song");

// Settings
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use('/api', artistRoutes, songRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to MusicAPI");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// Export the Express app
module.exports = app;

// Server listening
app.listen(port, () => console.log("Server listening on port", port));