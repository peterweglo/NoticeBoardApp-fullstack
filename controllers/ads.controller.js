const Ad = require('../models/ad.model');

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
    const newAd = new Ad({
      title: title,
      content: content,
      publishDate: publishDate,
      price: price,
      //   photo: photo,
      location: location,
      seller: seller,
    });
    await newAd.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.editById = async (req, res) => {
  const { title, content, publishDate, price, location, seller } = req.body;
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: title,
            content: content,
            publishDate: publishDate,
            price: price,
            //   photo: photo,
            location: location,
            seller: seller,
          },
        }
      );
      res.json(ad);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
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
