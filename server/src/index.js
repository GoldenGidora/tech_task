const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db');

app.use(cors());
app.use(bodyParser.json());

const usersRouter = require('./routes/usersRouter');
const ordersRouter = require('./routes/ordersRouter');

app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

db.any('SELECT version()')
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error(err));
