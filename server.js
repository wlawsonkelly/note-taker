// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

var notes = []

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.json(notes);
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  notes.push(newNote);
  res.json(newNote);
});

app.delete("/api/notes/:note", function(req, res) {
  var chosen = req.params.note;
  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    if (chosen.id === notes[i].id) {
      return notes.filter(function(note){
        return note !== notes[i];
      })
    }
  }

  return res.json(false);

});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});