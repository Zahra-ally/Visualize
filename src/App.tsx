import { useRef, useEffect } from "react";
import "./App.css";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/types";
import logo from "./logo/logo.jpg";
import { Button } from "rsuite";
import { drawFace as DrawFace } from "./Controller/DrawFace";


function App() {
  const webcam = useRef<Webcam>(null);
  const canvas = useRef<HTMLCanvasElement>(null);



  const runFaceDetect = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
    detect(model);
  };

  const detect = async (model: MediaPipeFaceMesh) => {
    if (webcam.current && canvas.current) {
      const webcamCurrent = webcam.current as any;
      if (webcamCurrent.video.readyState === 4) {
        const video = webcamCurrent.video;
        const videoWidth = webcamCurrent.video.videoWidth;
        const videoHeight = webcamCurrent.video.videoHeight;
        canvas.current.width = videoWidth;
        canvas.current.height = videoHeight;
        const predictions = await model.estimateFaces({
          input: video,
        });
        const ctxLip = canvas.current.getContext(
          "2d"
        ) as CanvasRenderingContext2D;
        
        requestAnimationFrame(() => {
          DrawFace(predictions, ctxLip, videoWidth, videoHeight);
         
        });
        detect(model);
      }
    }
  };

  useEffect(() => {
    runFaceDetect();

  }, [webcam.current?.video?.readyState]);

  return (
   
    <div className="App">
      <header className="header">
        <img
          src={logo}
          alt="logo"
          style={{ alignItems: "center", justifyContent: "center", left: -640 }}
        ></img>
        <div className="title">Welcome to the Visualize App</div>
      </header>

      <Button
        appearance="primary"
        style={{ top: 130, left: 50, color: "#f26d9e" }}
      >
        {" "}
        Red
      </Button>
      <Button color="violet" appearance="primary" style={{ top: 170 }}>
        Violet
      </Button>

      <Webcam
        audio={false}
        ref={webcam}
        style={{
          position: "absolute",
          margin: "auto",
          textAlign: "center",
          top: 300,
          left: 0,
          right: 0,
          zIndex: 9,
        }}
      />
      <canvas
        ref={canvas}
        style={{
          position: "absolute",
          margin: "auto",
          textAlign: "center",
          top: 300,
          left: 0,
          right: 0,
          zIndex: 9,
        }}
      />
    </div>
  );
 
}

export default App;
