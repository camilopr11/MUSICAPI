const express = require("express");
const artistSchema = require("../models/artist");

const router = express.Router();

// Create artist
router.post("/artist", (req, res) => {
    const artist = artistSchema(req.body);
    artist
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// Todo: Get all artists,  Get artist by ID, Update artist, Delete artist

module.exports = router;