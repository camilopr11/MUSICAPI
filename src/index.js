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

// Health check endpoint
app.get('/test', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'MusicAPI TEST is running, entities: /artists /songs' });
});

// Health check endpoint
app.get('/prod', (req, res) => {
  res.status(200).json({ status: 'DOWN', message: 'ERROR: TEST ENV' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// Export the Express app
module.exports = app;

// Start the server if this file is run directly
if (require.main === module) {
    app.listen(port, () => console.log("Server listening on port", port));
}
