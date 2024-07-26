import Chat from '../models/Chat.js';
import User from '../models/User.js';
import Job from '../models/Job.js';

export async function createChat(req, res) {
  const { employerId, freelancerId, jobId } = req.body;

  try {
    const employer = await User.findById(employerId);
    const freelancer = await User.findById(freelancerId);
    const job = await Job.findById(jobId);

    if (!employer || !freelancer || !job) {
      return res.status(404).json({ msg: 'User or job not found' });
    }

    const newChat = new Chat({
      employer: employerId,
      freelancer: freelancerId,
      job: jobId
    });

    const chat = await newChat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getChats(req, res) {
  try {
    const chats = await Chat.find({
      $or: [
        { employer: req.user.id },
        { freelancer: req.user.id }
      ]
    }).populate('employer freelancer job messages.sender', 'name email');

    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function sendMessage(req, res) {
  const { chatId, text } = req.body;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    chat.messages.push({
      sender: req.user.id,
      text
    });

    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export default {
  createChat,
  getChats,
  sendMessage
};