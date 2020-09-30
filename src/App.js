import React, {useRef} from 'react';
import './App.css';
// eslint-disable-next-line no-unused-vars
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import {drawMesh} from "./utilities";

function App() {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

	const style = {
		position: 'absolute',
		marginLeft: 'auto',
		marginRight: 'auto',
		left: 0,
		right: 0,
		textAlign: 'center',
		width: 640,
		height: 480,
	}

	const loadFaceMash = async () => {
		const net = await facemesh.load({
			inputResolution: {
				width: 640,
				height: 480,
			},
			scale: 0.8
		});

		setInterval(() => {
			detect(net);
		}, 100)
	}

	const detect = async (net) => {
		if (webcamRef.current && webcamRef.current.video.readyState === 4) {
			const { video } = webcamRef.current;
			const { videoWidth, videoHeight } = video;

			webcamRef.current.video.width = canvasRef.current.width = videoWidth;
			webcamRef.current.video.height = canvasRef.current.height = videoHeight;

			const face = await net.estimateFaces(video);
			const context = canvasRef.current.getContext('2d');
			drawMesh(face, context);
		}
	}

	loadFaceMash();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef} style={{...style, zIndex: 1}} />
        <canvas ref={canvasRef} style={{...style, zIndex: 1}} />
      </header>
    </div>
  );
}

export default App;
