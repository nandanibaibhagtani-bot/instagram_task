const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);

app.listen(4000, () => {
    console.log("Server running on port 4000...");
});