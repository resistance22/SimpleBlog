import { Schema, model } from 'mongoose'

const workSchema = new Schema({
  title: { type: String, required: true, index: { unique: true } },
  body: { type: String, required: true }
}, { timestamps: true })

export default model('work', workSchema)
