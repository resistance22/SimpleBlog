import express from 'express'
import auth from './api/auth'
import profile from './profile'
import posts from './api/posts'

const router = express.Router()

export default () => {
  router.get('/', (req, res) => {
    res.render('index', { title: 'homepage', bundle: 'home' })
  })

  router.use('/profile*', profile())
  router.use('/login', auth())
  router.use('/posts', posts())
  return router
}
