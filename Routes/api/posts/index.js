import express from 'express'
import Post from '../../../Models/Post'

// import authenticate from '../../../middlewares/authenticate'

const router = express.Router()

export default () => {
  router.get('/', async (req, res) => {
    try {
      const result = await Post.find()
      const posts = result.map(item => {
        return {
          title: item.title,
          createdAt: item.createdAt,
          id: item.id,
          published: item.published,
          tags: item.tags,
          author: item.author
        }
      })
      res.json({ posts: posts })
    } catch (e) {
      console.log(e)
    }
  })

  router.get('/:post', async (req, res) => {
    const { post } = req.params
    try {
      const result = await Post.findOne({
        id: post
      })
      res.json({ post: result })
    } catch (e) {
      console.log(e)
    }
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

  router.put('/', async (req, res) => {
    const dataExpected = {
      title: true,
      body: true,
      tags: true,
      author: true,
      published: true,
      id: true
    }
    const dataRequired = {
      title: true,
      body: true,
      author: true,
      published: true,
      id: true
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

    const { title, body, tags, author, published, id } = req.body

    try {
      const result = await Post.findOne({ id: id })
      result.title = title
      result.id = title
      result.body = body
      result.tags = tags
      result.author = author
      result.published = published
      const updated = await result.save()
      res.json({
        success: true,
        id: updated.id
      })
    } catch (e) {
      res.json({
        error: e.message,
        success: false
      })
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
        success: true
      })
    } catch (e) {
      res.json({
        error: e.message,
        success: false
      })
    }
  })

  return router
}
