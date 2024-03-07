const express = require("express");

// Settings
const app = express();
const port = process.env.PORT || 9000;

// Server listening
app.listen(port, () => console.log("Server listening on port", port));