const Translation = require('../backend/models/Translation');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/translations/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage }).single('file');

exports.uploadTranslation = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const { language } = req.body;
    const filePath = req.file.path;

    try {
      const translation = new Translation({ language, filePath });
      await translation.save();
      res.json(translation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
};

exports.getTranslations = async (req, res) => {
  try {
    const translations = await Translation.find();
    res.json(translations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
