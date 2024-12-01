import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from "../routes/auth.route.js"
import { connectDB } from '../lib/db.lib.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use body-parser middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes)

app.get('/', (req, res) => { res.send('Welcome to chatApp!') });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
})