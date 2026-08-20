const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const authRoute = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);

if (process.env.NODE_ENV !== 'production') {
    app.listen(4000, () => {
        console.log("Server running on port 4000...");
    });
}

module.exports = serverless(app);