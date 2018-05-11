
process.on('SIGINT', function() {
  console.log('Naughty SIGINT-handler');
});
process.on('exit', function () {
  console.log('exit');
});
console.log('PID: ', process.pid);

const express = require('express');
const mongoose = require('mongoose');
const app = express();


//Users
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello Testing')
});


app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));

process.on('SIGINT', function() {
  console.log('Nice SIGINT-handler');
  var listeners = process.listeners('SIGINT');
  for (var i = 0; i < listeners.length; i++) {
      console.log(listeners[i].toString());
  }

  process.exit();
});