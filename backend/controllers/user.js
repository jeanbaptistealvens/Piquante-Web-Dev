const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.signup = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({ email: req.body.email, password: hash })
    res.status(201).json({ message: 'Utilisateur créé !', userId: user._id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé !' })
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) return res.status(401).json({ error: 'Mots de passe incorrect !' })
    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}