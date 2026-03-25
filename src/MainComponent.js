import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import FileInput from "./FileInput";
import { Camera, RefreshCw, ScanSearch } from "lucide-react";
import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";
import { BlobServiceClient } from "@azure/storage-blob";

const MainComponent = ({ onDocumentAnalyzed }) => {
  const webcamRef = useRef(null);
  const [file, setFile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)

  useEffect(() => {
    let timer;
    if (showLoader && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (!showLoader) {
      setTimeLeft(300); // Reset timer when loader is hidden
    }
    return () => clearInterval(timer);
  }, [showLoader, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const onFileChange = (selectedFile) => {
    setFile(selectedFile);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setFile(null);
  };

  const analyzeDocument = async () => {
    try {
      setShowLoader(true);
      const endpoint = "https://aadharpan-data-extraction.cognitiveservices.azure.com/";
      const apiKey = "d7935cc898aa4d1888bdbd3d09403532";
      let blobUrl = "";

      if (capturedImage) {
        blobUrl = await uploadImageToBlob(capturedImage);
      } else {
        blobUrl = await uploadFileToBlob();
      }

      const client = new DocumentAnalysisClient(
        endpoint,
        new AzureKeyCredential(apiKey)
      );
      const poller = await client.beginAnalyzeDocument(
        "prebuilt-idDocument",
        blobUrl
      );

      const {
        documents: [result],
      } = await poller.pollUntilDone();
      setShowLoader(false);
      onDocumentAnalyzed(result);
      console.log(result);
    } catch (error) {
      console.error("An error occurred:", error);
      setShowLoader(false);
    }
  };

  const uploadFileToBlob = async () => {
    try {
      const connectionString = "BlobEndpoint=https://aadharpandata.blob.core.windows.net/;QueueEndpoint=https://aadharpandata.queue.core.windows.net/;FileEndpoint=https://aadharpandata.file.core.windows.net/;TableEndpoint=https://aadharpandata.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bf&srt=sco&sp=rwdlaciytfx&se=2025-07-05T03:26:19Z&st=2024-07-04T19:26:19Z&spr=https,http&sig=y0G9rpGEZWDTygq8Mb4q%2FPx9ZbxlENrGNqxdgUnXwTQ%3D";
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      const containerName = "data";
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(file.name);
      await blockBlobClient.uploadBrowserData(file);
      return blockBlobClient.url;
    } catch (error) {
      console.error("Error uploading file to Azure Blob Storage:", error);
      throw error;
    }
  };

  const uploadImageToBlob = async (imageSrc) => {
    try {
      const connectionString = "BlobEndpoint=https://aadharpandata.blob.core.windows.net/;QueueEndpoint=https://aadharpandata.queue.core.windows.net/;FileEndpoint=https://aadharpandata.file.core.windows.net/;TableEndpoint=https://aadharpandata.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bf&srt=sco&sp=rwdlaciytfx&se=2025-07-05T03:26:19Z&st=2024-07-04T19:26:19Z&spr=https,http&sig=y0G9rpGEZWDTygq8Mb4q%2FPx9ZbxlENrGNqxdgUnXwTQ%3D";
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      const containerName = "data";
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const fileName = `captured_image_${Date.now()}.png`;

      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      await blockBlobClient.uploadBrowserData(blob);

      return blockBlobClient.url;
    } catch (error) {
      console.error("Error uploading image to Azure Blob Storage:", error);
      throw error;
    }
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-40 flex items-center justify-center animate-fade-in-up">
      <div className="bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-2xl w-full mx-4 neon-border relative overflow-hidden">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Secure Identity Capture
          </h2>
          <p className="text-gray-400 text-sm">Align your identity document within the frame to continue.</p>
        </div>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/5 shadow-inner mb-8">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            className={`w-full h-full object-cover transition-opacity duration-500 ${capturedImage ? 'opacity-0' : 'opacity-100'}`}
            videoConstraints={{ width: 1280, height: 720 }}
          />
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured Document"
              className="absolute inset-0 w-full h-full object-cover animate-fade-in-up"
            />
          )}

          {/* Aiming Reticle UI overlay */}
          {!capturedImage && (
            <div className="absolute inset-0 border-2 border-dashed border-white/20 m-4 rounded-lg pointer-events-none" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <button
            className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/5"
            onClick={capturePhoto}
          >
            {capturedImage ? <RefreshCw className="mr-2 w-4 h-4 text-blue-400" /> : <Camera className="mr-2 w-4 h-4 text-blue-400" />}
            {capturedImage ? <span className="text-sm">Retake</span> : <span className="text-sm">Capture</span>}
          </button>
          
          <div className="flex items-center justify-center h-full">
            <FileInput onFileChange={onFileChange} />
          </div>

          <button
            className="group flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            onClick={analyzeDocument}
            disabled={(!capturedImage && !file) || showLoader}
          >
            <ScanSearch className="mr-2 w-4 h-4" />
            <span className="text-sm font-semibold">Verify Identity</span>
          </button>
        </div>

        {/* Cinematic Loading Overlay */}
        {showLoader && (
          <div className="absolute inset-0 bg-[#09090b]/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            <h3 className="font-bold tracking-widest text-sm text-blue-400 uppercase mb-4">Analyzing Document</h3>
            <div className="text-4xl font-mono text-white tracking-widest bg-black/50 px-8 py-4 rounded-xl border border-white/10 shadow-inner mb-6 transition-all duration-300">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-gray-500 max-w-xs text-center leading-relaxed">
              Running highly secure AI extraction algorithms. Processing and verification may take up to 5 minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
