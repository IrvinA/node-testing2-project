const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const sampleRouter = require('./samples/samples-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/samples', sampleRouter);

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
