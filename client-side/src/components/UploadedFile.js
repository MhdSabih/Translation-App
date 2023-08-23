import React, { useState } from "react";
import { createWorker } from "tesseract.js";
import { Document, Page, pdfjs } from "react-pdf";
import TranslatedText from "./translated-text/TranslatedText";
import "./css/UploadedFile.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadedFile = ({ selectedFile, handleFileRemove }) => {
  const [numPages, setNumPages] = useState(null);
  const [extractedText, setExtractedText] = useState(null);
  const [onClickOfScan, setonClickOfScan] = useState(false);

  const textToImage = async () => {
    const worker = await createWorker();
    setonClickOfScan(true);
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(URL.createObjectURL(selectedFile));
    await worker.terminate();
    // setExtractedText(text);
    // console.log(text);
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
        {onClickOfScan ? (
          <TranslatedText />
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
                  <button className="button" onClick={textToImage}>
                    scan
                  </button>
                </div>
                <div className="remove-btn">
                  <button className="button-remove" onClick={handleFileRemove}>
                    remove
                  </button>
                  {extractedText && <p>Extracted Text: {extractedText}</p>}
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
