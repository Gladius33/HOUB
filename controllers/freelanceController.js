const Freelance = require('../models/Freelance');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all freelances
exports.getFreelances = async (req, res) => {
  try {
    const freelances = await Freelance.find().populate('user', ['name', 'avatar']);
    res.json(freelances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get freelance by user ID
exports.getFreelanceById = async (req, res) => {
  try {
    const freelance = await Freelance.findOne({ user: req.params.userId }).populate('user', ['name', 'avatar']);

    if (!freelance) return res.status(400).json({ msg: 'Freelance profile not found' });

    res.json(freelance);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Freelance profile not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create or update freelance profile
exports.upsertFreelance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    shortDescription,
    detailedDescription,
    skills,
    hourlyRate,
    minDuration,
    maxDuration,
    availability,
    location,
    remote,
    paymentInfo
  } = req.body;

  // Build freelance object
  const freelanceFields = {};
  freelanceFields.user = req.user.id;
  if (shortDescription) freelanceFields.shortDescription = shortDescription;
  if (detailedDescription) freelanceFields.detailedDescription = detailedDescription;
  if (skills) {
    freelanceFields.skills = skills.split(',').map(skill => skill.trim());
  }
  if (hourlyRate) freelanceFields.hourlyRate = hourlyRate;
  if (minDuration) freelanceFields.minDuration = minDuration;
  if (maxDuration) freelanceFields.maxDuration = maxDuration;
  if (availability) freelanceFields.availability = availability;
  if (location) freelanceFields.location = location;
  if (remote) freelanceFields.remote = remote;
  if (paymentInfo) {
    freelanceFields.paymentInfo = {};
    if (paymentInfo.bankAccount) freelanceFields.paymentInfo.bankAccount = paymentInfo.bankAccount;
    if (paymentInfo.btcWallet) freelanceFields.paymentInfo.btcWallet = paymentInfo.btcWallet;
    if (paymentInfo.xmrWallet) freelanceFields.paymentInfo.xmrWallet = paymentInfo.xmrWallet;
  }

  try {
    let freelance = await Freelance.findOne({ user: req.user.id });

    if (freelance) {
      // Update
      freelance = await Freelance.findOneAndUpdate(
        { user: req.user.id },
        { $set: freelanceFields },
        { new: true }
      );

      return res.json(freelance);
    }

    // Create
    freelance = new Freelance(freelanceFields);

    await freelance.save();
    res.json(freelance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
