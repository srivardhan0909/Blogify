const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')

const User = require('./models/user')
const Blog = require('./models/blog')
const Comments= require('./models/comment')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const { checkAuthCookie } = require('./middlewares/auth')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkAuthCookie('token'))
app.use(express.static(path.join('./public/public')))

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to database')
})

app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.get('/home', async (req, res) => {
  const allBlogs = await Blog.find({})
  res.render('home',{
    user: req.user,
    blogs: allBlogs,
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
