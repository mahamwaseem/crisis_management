const express = require('express');
require("dotenv").config();
const cors = require('cors');
const AuthRouter = require('./routes/authRouter');
const ReportRouter = require('./routes/reportRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require("./routes/adminRoutes");
const { initSocket } = require("./utils/socket");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();

const http = require("http");
const server = http.createServer(app);
initSocket(server); 

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/auth', AuthRouter);
app.use('/report', ReportRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/comment', commentRoutes);
app.use('/notification', notificationRoutes);
app.use("/admin", adminRoutes);


module.exports = app;
