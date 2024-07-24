const Chat = require('../models/Chat');
const Job = require('../models/Job');
const User = require('../models/User');

exports.createChat = async (req, res) => {
  const { jobId, message } = req.body;
  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    const chatFields = {
      employer: job.employer,
      freelancer: req.user.id,
      job: jobId,
      messages: [{ sender: req.user.id, text: message }],
    };

    let chat = new Chat(chatFields);
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ $or: [{ employer: req.user.id }, { freelancer: req.user.id }] })
      .populate('employer', 'name')
      .populate('freelancer', 'name')
      .populate('job', 'title');
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId, message } = req.body;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ msg: 'Chat not found' });

    chat.messages.push({ sender: req.user.id, text: message });
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
