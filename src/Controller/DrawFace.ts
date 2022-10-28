import { AnnotatedPrediction } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import {
  Coord2D,
  Coords3D,
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";
import { drawLower1, drawUpper1, drawUpper2 } from "../Modal/lip";

export const drawFace = (
  predictions: AnnotatedPrediction[],
  ctxlip: CanvasRenderingContext2D,

  width: number,
  height: number
) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction: AnnotatedPrediction) => {
      const keypoints = prediction.scaledMesh;
      const boundingBox = prediction.boundingBox;
      const bottomRight = boundingBox.bottomRight as Coord2D;
      const topLeft = boundingBox.topLeft as Coord2D;
      const distance =
        Math.sqrt(
          Math.pow(bottomRight[0] - topLeft[0], 2) +
            Math.pow(topLeft[1] - topLeft[1], 2)
        ) * 0.005;
     

      ctxlip.clearRect(0, 0, width, height);
      ctxlip.fillStyle = "pink";
      ctxlip.save();
      ctxlip.beginPath();


      drawUpper1(ctxlip, keypoints as Coords3D, distance);
      drawUpper2(ctxlip, keypoints as Coords3D, distance);
      drawLower1(ctxlip, keypoints as Coords3D, distance);
    
      ctxlip.closePath();
      ctxlip.fill();
      ctxlip.restore();
    });
  }
};
