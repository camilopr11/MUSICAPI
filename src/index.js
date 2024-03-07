const express = require("express");

// Settings
const app = express();
const port = process.env.PORT || 9000;

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to MusicAPI");
});

// Server listening
app.listen(port, () => console.log("Server listening on port", port));