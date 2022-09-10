const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./api/');

const server = express();
const port = 4000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/api', apiRouter)

// __dirname gets the current directory of the file (index.js in this case).
server.use('/', express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})