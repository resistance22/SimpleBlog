import express from 'express'

const router = express.Router()

export default () => {
  // @route /admin
  // @desc for admin functionality
  // @access private
  router.get('/', (req, res) => {
    res.render('admin/login', { title: 'admin-login' })
  })

  return router
}
