const express = require('express');
const connectToDB = require('./config/db');
require ('dotenv').config();
const bcrypt = require('bcrypt');



const app = express();

connectToDB();

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
