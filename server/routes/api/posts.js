const express = require("express");
const mongodb = require("mongodb");

const { CONNECTION_STRING } = process.env;

const router = express.Router();

// GET posts
router.get("/", async (req, res) => {
  // '/' actually references '/api/posts' --> set up in index.js
  try {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// ADD post
router.post("/", async (req, res) => {
  try {
    const posts = await loadPostsCollection();
    await posts.insertOne({
      text: req.body.text,
      createdAt: new Date()
    });
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// DELETE post
router.delete("/:id", async (req, res) => {
  try {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(404).send();
  }
});

async function loadPostsCollection() {
  // console.log(CONNECTION_STRING)
  try {
    const client = await mongodb.MongoClient.connect(`${CONNECTION_STRING}`, {
      useNewUrlParser: true
    });
    return client.db("VEM-fullstack").collection("posts");
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
