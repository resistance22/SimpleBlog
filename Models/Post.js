import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  id: { type: String, required: true, index: { unique: true } },
  title: { type: String, required: true, index: { unique: true } },
  body: { type: String, required: true },
  tags: { type: [String] },
  author: { type: String, index: true },
  published: { type: Boolean, required: true }
}, { timestamps: true })

postSchema.pre('save', function (next) {
  const work = this
  if (!work.isModified('title')) return next()
  const replacedStr = work.title.replace(/ /g, '-')
  work.id = encodeURI(replacedStr)
  return next()
})

export default model('posts', postSchema)
