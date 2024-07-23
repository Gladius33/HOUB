const express = require('express');
const connectDB = require('./config/db');
const config = require('config')
const path = require('path');

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.use('/api/index', require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gigs', require('./routes/gigs'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/currencies', require('./routes/currencies'));
app.use('/api/translations', require('./routes/translations'));
app.use('/api/chats', require('./routes/chats'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/employers', require('./routes/employers'));
app.use('/api/freelances', require('./routes/freelances'));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));