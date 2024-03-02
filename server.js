const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.get('/', (req, res) => {
  res.send('NoticeBoard!');
});

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

// connects our backend code with the database
mongoose.connect('mongodb://localhost:27017/noticeBoard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', (err) => console.log('Error ' + err));
