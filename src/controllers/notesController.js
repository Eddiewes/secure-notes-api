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