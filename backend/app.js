const express = require('express');
require("dotenv").config();
const cors = require('cors');

const connectDB = require ("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use('/auth, ')

module. exports= app;