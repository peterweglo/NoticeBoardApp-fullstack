const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const User = require('../models/user.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    const { title, content, publishDate, price, location, seller } = req.body;
    if (!req.file) {
      return res.status(400).send({ message: 'File not provided' });
    }
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (
      title &&
      typeof title === 'string' &&
      content &&
      typeof content === 'string' &&
      publishDate &&
      typeof publishDate === 'string' &&
      price &&
      typeof price === 'string' &&
      location &&
      typeof location === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType)
    ) {
      const loggedUser = await User.findOne({ login: seller });

      if (!loggedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const newAd = new Ad({
        title: title,
        content: content,
        publishDate: publishDate,
        price: price,
        image: req.file.filename,
        location: location,
        seller: loggedUser.login,
      });
      await newAd.save();
      res.json({ message: 'OK' });
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    fs.unlinkSync(req.file.path);
    res.status(500).send({ message: err.message });
  }
};

exports.editById = async (req, res) => {
  const { title, content, publishDate, price, location, seller } = req.body;
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Not found' });
    }

    let updateFields = {
      title,
      content,
      publishDate,
      price,
      location,
      seller,
    };

    if (req.file) {
      const fileType = await getImageFileType(req.file);
      if (
        !['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(
          fileType
        )
      ) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Invalid file type' });
      }
      updateFields.image = req.file.filename;
    }

    await Ad.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json({ message: 'Ad updated', ...updateFields });
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.deleteOne({ _id: req.params.id });
      res.json(ad);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.getAdsBySearch = async (req, res) => {
  try {
    const { searchPhrase } = req.params;
    const results = await Ad.fuzzySearch(searchPhrase);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};
