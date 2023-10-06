require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const transactionsRouter = require('./routes/transactions');
const authRouter = require('./routes/auth');

app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/authenticate', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
