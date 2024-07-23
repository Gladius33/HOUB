const Employer = require('../models/Employer');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all employers
exports.getEmployers = async (req, res) => {
  try {
    const employers = await Employer.find().populate('user', ['name', 'avatar']);
    res.json(employers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get employer by user ID
exports.getEmployerById = async (req, res) => {
  try {
    const employer = await Employer.findOne({ user: req.params.userId }).populate('user', ['name', 'avatar']);

    if (!employer) return res.status(400).json({ msg: 'Employer profile not found' });

    res.json(employer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Employer profile not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create or update employer profile
exports.upsertEmployer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    companyName,
    shortDescription,
    detailedDescription,
    sector,
    location,
    logo
  } = req.body;

  // Build employer object
  const employerFields = {};
  employerFields.user = req.user.id;
  if (companyName) employerFields.companyName = companyName;
  if (shortDescription) employerFields.shortDescription = shortDescription;
  if (detailedDescription) employerFields.detailedDescription = detailedDescription;
  if (sector) employerFields.sector = sector;
  if (location) employerFields.location = location;
  if (logo) employerFields.logo = logo;

  try {
    let employer = await Employer.findOne({ user: req.user.id });

    if (employer) {
      // Update
      employer = await Employer.findOneAndUpdate(
        { user: req.user.id },
        { $set: employerFields },
        { new: true }
      );

      return res.json(employer);
    }

    // Create
    employer = new Employer(employerFields);

    await employer.save();
    res.json(employer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
