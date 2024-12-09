import mongoose, { Schema, Document } from 'mongoose'

export interface IChat extends Document {
  participants: string[]
  type: 'personal' | 'group'
  createdAt: Date
}

const ChatSchema = new Schema<IChat>({
  participants: [{ type: String, required: true }],
  type: { type: String, enum: ['personal', 'group'], default: 'personal' },
  createdAt: { type: Date, default: Date.now },
})

export const Chat = mongoose.model<IChat>('Chat', ChatSchema)
