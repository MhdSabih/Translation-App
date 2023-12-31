import React, { useState } from "react";
import "./css/DocumentTranslator.css";
import "@fortawesome/fontawesome-free/css/all.css";
import UploadedFile from "./UploadedFile";
import Spinner from "../loader/Spinner";

const DocumentTranslator = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const handleFileUpload = (e) => {
    setIsLoad(true);
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (
        (file && file.type.includes("image/png")) ||
        file.type.includes("image/jpeg") ||
        file.type.toLowerCase().includes("image/jpg") ||
        file.type.includes("application/pdf")
      ) {
        setSelectedFile(file);
        setIsLoad(false);
      }
    }
  };
  const handleFileRemove = () => {
    setSelectedFile(null);
  };
  return (
    <div className="scanner-area">
      {selectedFile ? (
        <UploadedFile
          selectedFile={selectedFile}
          handleFileRemove={handleFileRemove}
        />
      ) : (
        <div className="main-translator">
          <h2 className="main-translator-heading">
            Get the new touch, Translate here your files
          </h2>
          <div className="icon-section">
            <span className="icon">
              <i className="fas fa-arrow-down"></i>
            </span>
          </div>
          <div className="uploading-area">
            <span className="upload-span">
              Upload a file below (recommended .png, .jpg)
            </span>
            {isLoad ? (
              <Spinner isLoad={isLoad} />
            ) : (
              <div className="upload-input">
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  accept=".png, .jpg, .pdf"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-input" className="custom-upload-button">
                  Choose File
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTranslator;
