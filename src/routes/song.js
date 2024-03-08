const express = require("express");
const songSchema = require("../models/song");

const router = express.Router();

// Create song
router.post("/song", (req, res) => {
    const song = songSchema(req.body);
    song
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// Get all songs
router.get("/songs", (req, res) => {
    songSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// Get a song by ID
router.get("/songs/:id", (req, res) => {
    const { id } = req.params;
    songSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

// Delete a song by ID
router.delete("/songs/:id", (req, res) => {
        const { id } = req.params;
        songSchema
            .deleteOne({ _id: id })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    });

// Update a Song
router.put("/songs/:id", (req, res) => {
        const { id } = req.params;
        const { name, genre, artist, artists, dateReleased } = req.body;
        songSchema
            .updateOne({ _id: id }, { $set: { name, genre, artist, artists, dateReleased } })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
});

module.exports = router;