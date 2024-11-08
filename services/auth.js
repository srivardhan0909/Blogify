const JWT = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImg: user.profileImg,
    role: user.role,
  }
  const token = JWT.sign(payload, secret)
  return token
}

function verifyToken(token) {
  const payload = JWT.verify(token, secret)
  return payload
}

module.exports = {
  generateToken,
  verifyToken,
}
