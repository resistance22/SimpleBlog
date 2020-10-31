import express from 'express'
import Post from '../../../Models/Post'

// import authenticate from '../../../middlewares/authenticate'

const router = express.Router()

export default () => {
  router.get('/', (req, res) => {
    res.render('works/archive', { title: 'works' })
  })

  router.get('/:post', (req, res) => {
    const { post } = req.params
    console.log(post)
    res.json({ test: post })
  })

  router.get('/exists/:id', async (req, res) => {
    const { id } = req.params
    try {
      const q = await Post.findOne({
        id: id
      })
      q ? res.json({ result: true }) : res.json({ result: false })
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })

  router.post('/', async (req, res) => {
    const dataExpected = {
      title: true,
      body: true,
      tags: true,
      author: true,
      published: true
    }
    const dataRequired = {
      title: true,
      body: true,
      author: true,
      published: true
    }

    for (const key in dataRequired) {
      if (!(key in req.body)) {
        res.status(422).json({ message: `${key} parameter is required` })
      }
    }
    for (const key in req.body) {
      if (!dataExpected[key]) {
        res.status(422).json({ message: `Wrong body parameters: ${key}` })
      }
    }

    const { title, body, tags, author, published } = req.body

    const newPost = new Post({
      title,
      id: title,
      body,
      tags,
      author,
      published
    })
    try {
      const result = await newPost.save()
      console.log(result)
      res.json({
        title,
        body,
        tags,
        author,
        published
      })
    } catch (e) {
      res.json(e)
    }
  })

  return router
}
