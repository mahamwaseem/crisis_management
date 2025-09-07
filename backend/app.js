const express = require('express');
require("dotenv").config();
const cors = require('cors');
const AuthRouter = require('./routes/authRouter');
const ReportRouter = require('./routes/reportRoutes');


const connectDB = require ("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/report', ReportRouter);


module. exports = app;