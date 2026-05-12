const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email y password obligatorios' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email ya registrado' });
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email y password obligatorios' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

module.exports = { register, login };
