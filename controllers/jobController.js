import Job from '../models/Job';
import User from '../models/User';

export async function createJob(req, res) {
  const {
    title,
    description,
    category,
    maxDailyRate,
    duration,
    remote,
    onsiteAddress,
    workingHours,
    companyName,
    companyLogo,
    shortDescription,
    detailedDescription,
    sector,
    city,
    region,
    country
  } = req.body;

  const jobFields = {};
  jobFields.employer = req.user.id;
  if (title) jobFields.title = title;
  if (description) jobFields.description = description;
  if (category) jobFields.category = category;
  if (maxDailyRate) jobFields.maxDailyRate = maxDailyRate;
  if (duration) jobFields.duration = duration;
  if (remote !== undefined) jobFields.remote = remote;
  if (onsiteAddress) jobFields.onsiteAddress = onsiteAddress;
  if (workingHours) jobFields.workingHours = workingHours;
  if (companyName) jobFields.companyName = companyName;
  if (companyLogo) jobFields.companyLogo = companyLogo;
  if (shortDescription) jobFields.shortDescription = shortDescription;
  if (detailedDescription) jobFields.detailedDescription = detailedDescription;
  if (sector) jobFields.sector = sector;
  if (city) jobFields.city = city;
  if (region) jobFields.region = region;
  if (country) jobFields.country = country;

  try {
    let job = new Job(jobFields);
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getJobs(req, res) {
  try {
    const jobs = await Job.find().sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getJob(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
