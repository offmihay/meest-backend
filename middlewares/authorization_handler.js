// In authorization_handler.js
const jwt = require('jsonwebtoken')

module.exports = models => async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Non-authorized. Please provide a token.' })
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)

    const user = await models.users.findOne({ where: { id: decoded.id } })
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    if (user.permission !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' })
    } // Перевірка на адміна - (забрати пізніше)

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  return
}
