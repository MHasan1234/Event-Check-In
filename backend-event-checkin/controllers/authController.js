const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { loginSchema } = require("../validators/authValidator");

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ name, email });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token, user });
};

module.exports = { login };
