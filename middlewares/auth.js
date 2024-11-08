const { verifyToken } = require('../services/auth')

function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName]
    if (!token) {
      return next()
    }
    try {
      const payload = verifyToken(token)
      req.user = payload
    } catch (error) {}
    return next()
  }
}

module.exports = {
  checkAuthCookie
}
