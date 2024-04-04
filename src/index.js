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

function getAllRoutes() {
  const routes = [];
  app._router.stack.forEach((middleware) => {
      if (middleware.route) {
          routes.push(`${Object.keys(middleware.route.methods)[0].toUpperCase()} - ${middleware.route.path}`);
      }
  });
  return routes;
}

function loadRoutes() {
  const routers = [artistRoutes, songRoutes];
  routers.forEach((router) => {
      router.stack.forEach((middleware) => {
          if (middleware.route) {
              app._router.stack.push(middleware);
          }
      });
  });
}

loadRoutes();

// Endpoint de health check
app.get("/api/test", (req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;
  const availableRoutes = getAllRoutes();

  if (isDatabaseConnected) {
      res.status(200).json({ status: 'UP', message: 'MusicAPI TEST is running', availableRoutes });
  } else {
      res.status(500).json({ status: 'DOWN', message: 'Database connection failed' });
  }
});

app.get("/api/prod", (req, res) => {
      res.status(500).json({ status: 'ERROR', message: 'RUNNING IN TEST ENVIRONMENT' });
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
