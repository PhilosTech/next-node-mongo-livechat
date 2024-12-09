import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  chatId: string
  senderId: string
  content: string
  timestamp: Date
}

const MessageSchema = new Schema<IMessage>({
  chatId: { type: String, required: true },
  senderId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
})

export const Message = mongoose.model<IMessage>('Message', MessageSchema)
