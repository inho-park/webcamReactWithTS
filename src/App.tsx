import React from "react";
import {CAMERA_STATUS, RecordWebcamHook, RecordWebcamOptions, useRecordWebcam} from "react-record-webcam";
import "./App.css";

const OPTIONS: RecordWebcamOptions = {
    filename: "test-filename",
    fileType: "mp4",
    width: 640,
    height: 480
}

export const App = () => {

    const recordWebcam: RecordWebcamHook = useRecordWebcam(OPTIONS);
    const getRecordingFileHooks = async () => {
        const blob = await recordWebcam.getRecording();
        console.log(blob);
    }

    return (
        <div className={"demo-section"}>
            <h1>Webcam Recorder</h1>
            <p>Camera Status : {recordWebcam.status}</p>
            <div>
                <button onClick={recordWebcam.open} disabled={
                    recordWebcam.status === CAMERA_STATUS.OPEN ||
                    recordWebcam.status === CAMERA_STATUS.RECORDING ||
                    recordWebcam.status === CAMERA_STATUS.PREVIEW
                }>
                    Open Camera
                </button>
                <button onClick={recordWebcam.close} disabled={
                    recordWebcam.status === CAMERA_STATUS.CLOSED ||
                    recordWebcam.status === CAMERA_STATUS.PREVIEW
                }>
                    Close Camera
                </button>
                <button onClick={recordWebcam.start} disabled={
                    recordWebcam.status === CAMERA_STATUS.CLOSED ||
                    recordWebcam.status === CAMERA_STATUS.RECORDING ||
                    recordWebcam.status === CAMERA_STATUS.PREVIEW
                }>
                    Start Recording
                </button>
                <button onClick={recordWebcam.stop} disabled={
                    recordWebcam.status !== CAMERA_STATUS.RECORDING
                }>
                    Stop Recording
                </button>
                <button onClick={recordWebcam.retake} disabled={
                    recordWebcam.status !== CAMERA_STATUS.PREVIEW
                }>
                    Retake
                </button>
                <button onClick={recordWebcam.download} disabled={
                    recordWebcam.status !== CAMERA_STATUS.PREVIEW
                }>
                    Download Recording
                </button>
                <button onClick={getRecordingFileHooks} disabled={
                    recordWebcam.status !== CAMERA_STATUS.PREVIEW
                }>
                    Get Recording
                </button>
            </div>

            <video ref={recordWebcam.webcamRef} autoPlay src={""}
            style={{
                display: `${recordWebcam.status === CAMERA_STATUS.OPEN || 
                    recordWebcam.status === CAMERA_STATUS.RECORDING
                    ? "block"
                    : "none"
                }`
            }}></video>

            <video autoPlay ref={recordWebcam.previewRef}
            style = {{
                display: `${recordWebcam.status === CAMERA_STATUS.PREVIEW 
                    ? "block"
                    : "none"
                }`
            }}></video>
        </div>
    )
}