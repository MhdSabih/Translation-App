import React, { useState } from "react";
import axios from "axios";
import { createWorker } from "tesseract.js";
import { Document, Page, pdfjs } from "react-pdf";
import TranslatedText from "./translated-text/TranslatedText";
import "./css/UploadedFile.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadedFile = ({ selectedFile, handleFileRemove }) => {
  const [numPages, setNumPages] = useState(null);
  const [extractedText, setExtractedText] = useState(null);
  const [onClickOfTranslate, setonClickOfTranslate] = useState(false);

  const textToImage = async () => {
    if(!selectedFile){
      alert('select a file');
    }
    else{
    const worker = await createWorker();
    setonClickOfTranslate(true);
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(URL.createObjectURL(selectedFile));
    await worker.terminate();
    setExtractedText(text);
  }
    // console.log(text);
  };
  const fetchResponse = async () => {
    try {
      textToImage();
      const requestBody = {
        currentLang: extractedText,
        targetLang: "",
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/translator`,
        requestBody
      );
    } catch (error) {
      console.log("Error in fetching response");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  // console.log(extractedText);
  return (
    <div className="upload-main-area">
      <div className="main-area">
        <div className="sub-img-render-area">
          {selectedFile.type === "application/pdf" ? (
            <Document
              file={URL.createObjectURL(selectedFile)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
              <Page pageNumber={1} />
            </Document>
          ) : (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded file"
              className="uploaded-file"
            />
          )}
        </div>
        <div className="border">{/* border */}</div>
        {onClickOfTranslate ? (
          <TranslatedText extractedText={extractedText} />
        ) : (
          <div className="img-side-area">
            <div className="img-inside">
              <h1>Choose Language</h1>
              <input
                type="text"
                placeholder="i.e. en"
                className="language-selector"
              />
              <div className="btn-container">
                <div className="scan-btn">
                  <button className="button" onClick={fetchResponse}>
                    translate
                  </button>
                </div>
                <div className="remove-btn">
                  <button className="button-remove" onClick={handleFileRemove}>
                    remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadedFile;
