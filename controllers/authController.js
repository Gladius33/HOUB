const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  // registration logic
};

exports.login = async (req, res) => {
  // login logic
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  const {
    name,
    email,
    avatar,
    shortDescription,
    detailedDescription,
    education,
    experience,
    dailyRateMin,
    dailyRateMax,
    maxDuration,
    minDuration,
    fullTime,
    partTime,
    remote,
    onsite,
    geoZone,
    paymentInfo
  } = req.body;

  const profileFields = {};
  if (name) profileFields.name = name;
  if (email) profileFields.email = email;
  if (avatar) profileFields.avatar = avatar;
  if (shortDescription) profileFields.shortDescription = shortDescription;
  if (detailedDescription) profileFields.detailedDescription = detailedDescription;
  if (education) profileFields.education = education;
  if (experience) profileFields.experience = experience;
  if (dailyRateMin) profileFields.dailyRateMin = dailyRateMin;
  if (dailyRateMax) profileFields.dailyRateMax = dailyRateMax;
  if (maxDuration) profileFields.maxDuration = maxDuration;
  if (minDuration) profileFields.minDuration = minDuration;
  if (fullTime !== undefined) profileFields.fullTime = fullTime;
  if (partTime !== undefined) profileFields.partTime = partTime;
  if (remote !== undefined) profileFields.remote = remote;
  if (onsite !== undefined) profileFields.onsite = onsite;
  if (geoZone) profileFields.geoZone = geoZone;
  if (paymentInfo) profileFields.paymentInfo = paymentInfo;

  try {
    let user = await User.findById(req.user.id);
    if (user) {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true }
      );
      return res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
