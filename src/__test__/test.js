// unit.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

// Import models
const Artist = require('../models/artist');
const Song = require('../models/song');

// Define a test artist
const testArtistData = {
  name: 'Test Artist',
  type: 'Solo',
  area: 'Test Area',
  genres: ['Test Genre'],
  active: true,
};

// Define a test song
const testSongData = {
  name: 'Test Song',
  genre: 'Test Genre',
  artist: mongoose.Types.ObjectId(),
  dateReleased: new Date(),
};

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Artist endpoints', () => {
  // Test POST /api/artist
  test('Create a new artist', async () => {
    const res = await request(app)
      .post('/api/artist')
      .send(testArtistData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  // Test GET /api/artists
  test('Get all artists', async () => {
    const res = await request(app).get('/api/artists');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test GET /api/artists/:id
  test('Get an artist by ID', async () => {
    const artist = await Artist.create(testArtistData);
    const res = await request(app).get(`/api/artists/${artist._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(testArtistData.name);
  });

  // Test DELETE /api/artists/:id
  test('Delete an artist by ID', async () => {
    const artist = await Artist.create(testArtistData);
    const res = await request(app).delete(`/api/artists/${artist._id}`);
    expect(res.statusCode).toEqual(200);
  });
});

describe('Song endpoints', () => {
  // Test POST /api/song
  test('Create a new song', async () => {
    const res = await request(app)
      .post('/api/song')
      .send(testSongData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  // Test GET /api/songs
  test('Get all songs', async () => {
    const res = await request(app).get('/api/songs');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test GET /api/songs/:id
  test('Get a song by ID', async () => {
    const song = await Song.create(testSongData);
    const res = await request(app).get(`/api/songs/${song._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(testSongData.name);
  });

  // Test DELETE /api/songs/:id
  test('Delete a song by ID', async () => {
    const song = await Song.create(testSongData);
    const res = await request(app).delete(`/api/songs/${song._id}`);
    expect(res.statusCode).toEqual(200);
  });

  // Test DELETE /api/songs/
  test('Delete a song by ID', async () => {
    const song = await Song.create(testSongData);
    const res = await request(app).delete(`/api/songs/`);
    expect(res.statusCode).toEqual(200);
  });

});
