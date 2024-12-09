import { Router, Request, Response } from 'express'
import { Message } from '../../chat/src/models/message'
import { Chat } from './models/chat'
import { User } from '../../auth/src/models/user'
import { verifyToken } from '../../auth/src/middleware'

const router = Router()

router.get('/chats', verifyToken, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;

  try {
    const chats = await Chat.find({ participants: user.id }).select('_id participants type createdAt');
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

router.get('/history/:chatId', async (req, res) => {
  const { chatId } = req.params

  try {
    const messages = await Message.find({ chatId }).sort({ timestamp: 1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' })
  }
})

router.post('/create-chat', verifyToken, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user
  const { participants } = req.body

  try {

    const validParticipants = await User.find({ _id: { $in: participants } })
    if (validParticipants.length !== participants.length) {
      res.status(404).json({ error: 'One or more participants not found' })
      return
    }


    const chatParticipants = [...new Set([user.id, ...participants])]


    const chat = new Chat({ participants: chatParticipants })
    await chat.save()

    res.status(201).json({ message: 'Chat created successfully', chatId: chat._id })
  } catch (error) {
    console.error('Error creating chat:', error)
    res.status(500).json({ error: 'Failed to create chat' })
  }
})


router.post('/add-user', verifyToken, async (req: Request, res: Response): Promise<void> => {
  const { chatId, userId } = req.body
  const currentUser = (req as any).user

  try {

    const chat = await Chat.findById(chatId)
    if (!chat) {
      res.status(404).json({ error: 'Chat not found' })
      return
    }

    if (chat.type === 'personal') {
      res.status(400).json({ error: 'Cannot add users to a personal chat' })
      return
    }

    if (chat.participants.includes(userId)) {
      res.status(400).json({ error: 'User is already in the chat' })
      return
    }

    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    chat.participants.push(userId)
    await chat.save()

    res.status(200).json({ message: 'User added to chat successfully', chat })
  } catch (error) {
    console.error('Error adding user to chat:', error)
    res.status(500).json({ error: 'Failed to add user to chat' })
  }
})

export default router
