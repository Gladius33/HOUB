import Gig from '../models/Gig.js';
import { validationResult } from 'express-validator';


export async function getGigs(req, res) {
  try {
    const gigs = await Gig.find().populate('employer', ['companyName', 'logo']);
    res.json(gigs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


export async function getGigById(req, res) {
  try {
    const gig = await Gig.findById(req.params.gigId).populate('employer', ['companyName', 'logo']);

    if (!gig) return res.status(400).json({ msg: 'Gig not found' });

    res.json(gig);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Gig not found' });
    }
    res.status(500).send('Server error');
  }
}


export async function upsertGig(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    description,
    category,
    maxDailyRate,
    duration,
    remote,
    location,
    status
  } = req.body;

  
  const gigFields = {};
  gigFields.employer = req.user.id;
  if (title) gigFields.title = title;
  if (description) gigFields.description = description;
  if (category) gigFields.category = category;
  if (maxDailyRate) gigFields.maxDailyRate = maxDailyRate;
  if (duration) gigFields.duration = duration;
  if (remote !== undefined) gigFields.remote = remote;
  if (location) gigFields.location = location;
  if (status) gigFields.status = status;

  try {
    let gig = await Gig.findById(req.params.gigId);

    if (gig) {
      
      gig = await Gig.findOneAndUpdate(
        { _id: req.params.gigId },
        { $set: gigFields },
        { new: true }
      );

      return res.json(gig);
    }

   
    gig = new Gig(gigFields);

    await gig.save();
    res.json(gig);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


export async function deleteGig(req, res) {
  try {
    await Gig.findByIdAndRemove(req.params.gigId);

    res.json({ msg: 'Gig removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Gig not found' });
    }
    res.status(500).send('Server error');
  }
}

export default {
  getGigs,
  getGigById,
  upsertGig,
  deleteGig
};