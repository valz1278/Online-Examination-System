require('dotenv').config()

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

require('./auth')
require('./models/db')

app.use('/', require('./routes'))

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
