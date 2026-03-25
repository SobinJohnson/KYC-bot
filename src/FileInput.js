// FileInput.js
import React, { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

const FileInput = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <label
        htmlFor="fileInput"
        className={`flex items-center justify-center px-4 py-3 border border-white/5 rounded-xl transition-all cursor-pointer font-medium w-full ${
          selectedFile 
            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" 
            : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        {selectedFile ? (
          <>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            <span className="truncate max-w-[120px] text-sm">{selectedFile.name}</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm">Upload File</span>
          </>
        )}
      </label>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileInput;
