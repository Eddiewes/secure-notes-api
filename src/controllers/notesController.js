const { notes } = require("../data");

exports.createNote = (req, res) => {
  const note = {
    id: notes.length + 1,
    content: req.body.content,
    user: req.user.email
  };

  notes.push(note);
  res.status(201).json(note);
};

exports.getNotes = (req, res) => {
  const userNotes = notes.filter(note => note.user === req.user.email);
  res.json(userNotes);
};