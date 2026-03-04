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

exports.updateNote = (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId && n.user === req.user.email);

  if (!note) return res.status(404).json({ message: "Note not found" });

  note.content = req.body.content;
  res.json(note);
};

exports.deleteNote = (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === noteId && n.user === req.user.email);

  if (index === -1) return res.status(404).json({ message: "Note not found" });

  notes.splice(index, 1);
  res.json({ message: "Note deleted" });
};