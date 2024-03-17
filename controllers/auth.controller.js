const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    if (!req.file) {
      return res.status(400).send({ message: 'File not provided' });
    }
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      phone &&
      typeof phone === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(req.file.path);
        return res
          .status(409)
          .send({ message: 'User with this login already exists' });
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        phone,
        avatar: req.file.filename,
      });
      res.status(201).send({ message: 'User created: ' + user.login });
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    fs.unlinkSync(req.file.path);
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = { login: user.login, userId: user.id };
          res.status(200).send({ message: 'Login successful' });
        } else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.getUser = async (req, res) => {
  if (req.session && req.session.user) {
    res.json({ login: req.session.user.login });
  } else {
    res.status(401).send({ message: 'Not authenticated' });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.send('You have just logged out');
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  // if (process.env.NODE_ENV !== 'production') await Session.deleteMany({});
};
