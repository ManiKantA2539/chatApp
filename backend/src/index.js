import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from "../routes/auth.route.js"
import messageRoutes from "../routes/message.route.js"
import { connectDB } from '../lib/db.lib.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"
import {app,server} from "../lib/socket.js"

dotenv.config();

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use body-parser middleware
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps or Postman)
        if (!origin) return callback(null, true);
        callback(null, true); // Allow all origins
    },
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors(corsOptions));
// Routes
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.get('/', (req, res) => { res.send('Welcome to chatApp!') });

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
})