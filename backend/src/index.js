import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from "../routes/auth.route.js"
import messageRoutes from "../routes/message.route.js"
import { connectDB } from '../lib/db.lib.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"
import {exec} from "child_process"
import { WebSocketServer } from "ws"
import fs from "fs"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use body-parser middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.get('/', (req, res) => { res.send('Welcome to chatApp!') });

try {
        const wss = new WebSocketServer({port:8080})
        wss.on("connection",(ws)=>{
            console.log("connection established.")
        
            ws.on("message",async(data)=>{
                console.log(`Here the ${data}`)
                    const temp_file = `./uploads/audio-${Date.now()}.wav`
                    fs.writeFileSync(temp_file,data);
        
                    exec(`python3 transcribe.py ${temp_file}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error: ${stderr}`);
                            ws.send(JSON.stringify({ error: "Failed to transcribe audio" }));
                        } else {
                            ws.send(JSON.stringify({ text: stdout.trim() }));
                        }

                        fs.unlink(temp_file, (err) => {
                            if (err) console.error(`Failed to delete temp file: ${err}`);
                        });
                    });
                    ws.on("close", () => {
                        console.log("WebSocket connection closed");
                    });
                    wss.on("error", (error) => {
                        console.error(`WebSocket error: ${error.message}`);
                    });
            })
        })
    } catch (error) {
        console.log(error)
        
    }

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
})