import React, { useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket';

const SpeechToText = () => {
  const socketRef = useRef<any>();
  const [text,setText] = useState("");
  const [isRecording, setIsRecording] = useState<boolean>();
  let mediaRecorder: MediaRecorder;
  const ws = new WebSocket("ws://localhost:8000");

  useEffect(() => {
    // socketRef.current = new WebSocket("ws://localhost:8080");

    // socketRef.current.onmessage = (event: { data: any; }) => {
    //     const { text, error } = JSON.parse(event.data);
    //     console.log(event)
    //     if (error) {
    //         console.error("Error:", error);
    //     } else {
    //         setText((prev) => prev + text + " ");
    //     }
    // };

    // return () => socketRef.current.close();
}, []);
  // const stopRecording = () => {
  //   setIsRecording(false);
  //   if (mediaRecorder) {
  //       mediaRecorder.stop();
  //   }
  // };
  // const startRecording = async () =>{
  //   setIsRecording(true);
  //   const stream = await navigator.mediaDevices.getUserMedia({audio:true});
  //   mediaRecorder = new MediaRecorder(stream);
  //   mediaRecorder.ondataavailable = (event) => {
  //     if (socketRef.current.readyState === WebSocket.OPEN) {
  //         socketRef.current.send(event.data);
  //     }
  //     mediaRecorder.start(250);
  // };

  // }

  return (
    <div>
         
    </div>
  )
}

export default SpeechToText
