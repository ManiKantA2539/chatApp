import {exec} from "child_process"
import { WebSocket } from "ws"
import fs from "fs"

export const audioController = async(req,res)=>{
    try {
        const wss = new WebSocket.server({port:8000})
        wss.on("connection",(ws)=>{
            console.log("connection established.")
        
            ws.on("message",async(data)=>{
                    const temp_file = `../uploads/audio-${Date.now()}.wav`
                    fs.writeFileSync(temp_file,data);
        
                    exec(`python transcribe.py ${temp_file}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error: ${stderr}`);
                            ws.send(JSON.stringify({ error: "Failed to transcribe audio" }));
                            return;
                        }
                        ws.send(JSON.stringify({ text: stdout.trim() }));
                    });
                    ws.on("close", () => {
                        console.log("WebSocket connection closed");
                    });
            })
        })
    } catch (error) {
        console.log(error)
        
    }
}
