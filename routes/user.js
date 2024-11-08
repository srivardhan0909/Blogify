const { Router } = require('express')
const bcrypt = require('bcryptjs')
const router = Router()

const User = require('../models/user')
const Blog = require('../models/blog')
const { generateToken } = require('../services/auth')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.get('/signup', (req, res) => {
  return res.render('signup')
})

router.get('/logout', (req,res)=>{
    res.clearCookie('token')
    return res.redirect('/user/login')
})

router.get('/profile', async (req, res) => {
  const loginuser = await User.findById(req.user._id)
  return res.render('profile', {
    user: req.user,
    loginuser
  })
})

router.get('/home', async (req, res) => {
  const allBlogs = await Blog.find({})
  return res.render('home', {
    user: req.user,
    blogs: allBlogs,
  })
})

router.post('/signup', async function (req, res) {
  const { name, email, password } = req.body
  await User.create({
    name: name,
    email: email,
    password: await bcrypt.hash(password, 10),
  })
  return res.redirect('/user/login')
})

router.post('/login', async function (req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.render('login', { error: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.render('login', { error: 'Invalid password' })
    }

    const token = generateToken(user)
    res.cookie('token', token)
    const allBlogs = await Blog.find({})
    return res.render('home', {
      user: req.user,
      blogs: allBlogs,
    })
  } catch (error) {
    return res.render('login', { error: 'An error occurred' })
  }
})

module.exports = router
