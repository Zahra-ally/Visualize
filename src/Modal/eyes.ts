import { AnnotatedPrediction } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import {
  Coord2D,
  Coords3D,
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";

export const drawREye = (
  ctx: CanvasRenderingContext2D,
  keypointsREye: Coords3D,
  distance: number
) => {
  const rEyePoints = [130,33,246,161,160,159,158,157,173,133,243,190,56,28,27,29,30,247];

  ctx.moveTo(keypointsREye[27][0], keypointsREye[27][1]);
  for (let i = 0; i < rEyePoints.length; i++) {
    if (i < rEyePoints.length / 2) {
      ctx.lineTo(
        keypointsREye[rEyePoints[i]][0] - distance,
        keypointsREye[rEyePoints[i]][1] + distance
      );
    } else {
      ctx.lineTo(
        keypointsREye[rEyePoints[i]][0] + distance,
        keypointsREye[rEyePoints[i]][1] + distance
      );
    }
  }
};
export const drawLEye = (
  ctx: CanvasRenderingContext2D,
  keypointsLEye: Coords3D,
  distance: number
) => {
  const upperPoints2 = [463,263,466,388,387,386,385,384,398,362,414,286,258,257,259,260,467,359];

  ctx.moveTo(keypointsLEye[267][0], keypointsLEye[267][1]);
  for (let i = 0; i < upperPoints2.length; i++) {
    if (i < upperPoints2.length / 2) {
      ctx.lineTo(
        keypointsLEye[upperPoints2[i]][0] - distance,
        keypointsLEye[upperPoints2[i]][1] + distance
      );
    } else {
      ctx.lineTo(
        keypointsLEye[upperPoints2[i]][0] + distance,
        keypointsLEye[upperPoints2[i]][1] + distance
      );
    }
  }
};

export const drawEyes = (
  predictions: AnnotatedPrediction[],
  ctx: CanvasRenderingContext2D,
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
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "blue";
      ctx.save();
      ctx.beginPath();
      drawREye(ctx, keypoints as Coords3D, distance);
      drawLEye(ctx, keypoints as Coords3D, distance);
     
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }
};
