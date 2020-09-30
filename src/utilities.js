export const drawMesh = (predictions, context) => {
	if (predictions.length) {
		predictions.forEach((prediction) => {
			const keyPoint = prediction.scaledMesh;
			for (let i = 0; i < keyPoint.length; i++) {
				const x = keyPoint[i][0];
				const y = keyPoint[i][1];

				context.beginPath();
				context.arc(x,y,1,0,3 * Math.PI);
				context.fillStyle = 'red';
				context.fill();
			}
		})
	}
}
