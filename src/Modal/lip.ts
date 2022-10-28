import { AnnotatedPrediction } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import {
  Coord2D,
  Coords3D,
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";

export const drawUpper1 = (
  ctx: CanvasRenderingContext2D,
  keypointsUpper1: Coords3D,
  distance: number
) => {
  const upperPoints1 = [61, 76, 62, 78, 191, 80, 81, 82, 13, 0, 12, 11, 37, 39];

  ctx.moveTo(keypointsUpper1[37][0], keypointsUpper1[37][1]);
  for (let i = 0; i < upperPoints1.length; i++) {
    if (i < upperPoints1.length / 2) {
      ctx.lineTo(
        keypointsUpper1[upperPoints1[i]][0] - distance,
        keypointsUpper1[upperPoints1[i]][1] + distance
      );
    } else {
      ctx.lineTo(
        keypointsUpper1[upperPoints1[i]][0] + distance,
        keypointsUpper1[upperPoints1[i]][1] + distance
      );
    }
  }
};
export const drawUpper2 = (
  ctx: CanvasRenderingContext2D,
  keypointsUpper2: Coords3D,
  distance: number
) => {
  const upperPoints2 = [0, 12, 11, 13, 312, 311, 310, 415, 308, 291];

  ctx.moveTo(keypointsUpper2[267][0], keypointsUpper2[267][1]);
  for (let i = 0; i < upperPoints2.length; i++) {
    if (i < upperPoints2.length / 2) {
      ctx.lineTo(
        keypointsUpper2[upperPoints2[i]][0] - distance,
        keypointsUpper2[upperPoints2[i]][1] + distance
      );
    } else {
      ctx.lineTo(
        keypointsUpper2[upperPoints2[i]][0] + distance,
        keypointsUpper2[upperPoints2[i]][1] + distance
      );
    }
  }
};
export const drawLower1 = (
  ctx: CanvasRenderingContext2D,
  keypointsLower1: Coords3D,
  distance: number
) => {
  const lowerPoints1 = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];

  ctx.moveTo(keypointsLower1[14][0], keypointsLower1[14][1]);
  for (let i = 0; i < lowerPoints1.length; i++) {
    if (i < lowerPoints1.length / 2) {
      ctx.lineTo(
        keypointsLower1[lowerPoints1[i]][0] - distance,
        keypointsLower1[lowerPoints1[i]][1] + distance
      );
    } else {
      ctx.lineTo(
        keypointsLower1[lowerPoints1[i]][0] + distance,
        keypointsLower1[lowerPoints1[i]][1] + distance
      );
    }
  }
};
export const drawLips = (
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
      ctx.fillStyle = "pink";
      ctx.save();
      ctx.beginPath();
      drawUpper1(ctx, keypoints as Coords3D, distance);
      drawUpper2(ctx, keypoints as Coords3D, distance);
      drawLower1(ctx, keypoints as Coords3D, distance);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }
};
