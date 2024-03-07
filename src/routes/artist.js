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

// Get all artists
router.get("/artists", (req, res) => {
    artistSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// Get an artist by ID
router.get("/artists/:id", (req, res) => {
    const { id } = req.params;
    artistSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// Todo: Update artist, Delete artist

module.exports = router;