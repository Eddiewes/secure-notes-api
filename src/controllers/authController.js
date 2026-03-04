const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../data");

const SECRET = "supersecret";

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  users.push({ email, password: hashed });

  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET);

  res.json({ token });
};