const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const notes = require("../db/db.json");
const uuid = require("uuid");
const { json } = require("express");

router.get("/notes", (req, res) => {
  // fs.readFile("./db/db.json", "utf8", (err, data) => {
  //   if (err) throw err;
  //   console.log(data);
  res.json(notes);
  // });
});

router.get("/notes/:id", (req, res) => {
  res.json(notes.filter((note) => note.id === req.params.id));
  // res.json(notes)
});

router.post("/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuid.v1();
  let updatedArray = notes;
  updatedArray.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(updatedArray), (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

router.delete("/notes/:id", (req, res) => {
  let updatedArray = notes.filter((note) => note.id !== req.params.id);
  fs.writeFile("./db/db.json", JSON.stringify(updatedArray), (err, data) => {
    if (err) throw err;
    res.json(data);
    res.redirect("back");
  });
});
module.exports = router;
