const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const userRouter = require('./routes/api/user');

require('dotenv').config();
require('./db');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// Вивести поточне значення SECRET_KEY
// console.log('Поточне значення SECRET_KEY:', process.env.SECRET_KEY);

app.use('/api/contacts', contactsRouter)
app.use('/api/users', userRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message })
})

module.exports = app