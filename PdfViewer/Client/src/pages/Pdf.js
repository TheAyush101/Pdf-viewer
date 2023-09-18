import React, { useState, useEffect } from "react";
import "./Pdf.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Pdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);
  const [zoom, setZoom] = useState(0.7);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the username from the location state
  const username = location.state ? location.state.emailId : "";
  console.log(username);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  console.log(numPages);
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(URL.createObjectURL(selectedFile));
    setPageNumber(1);
  }

  function handleZoomOut() {
    if (zoom > 0.3) {
      setZoom((prevZoom) => prevZoom - 0.1);
    }
  }

  function handleZoomIn() {
    setZoom((prevZoom) => prevZoom + 0.1);
  }

  function handleLogout() {
    navigate("/login");
  }

  return (
    <div className="pdf-container">
      <div className="pdf-sidebar">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        <div className="toolbar">
          <button className="button" disabled={pageNumber <= 1} onClick={previousPage}>
            Previous Page
          </button>
          <button className="button" disabled={pageNumber >= numPages} onClick={nextPage}>
            Next Page
          </button>
          <button className="button" onClick={handleZoomOut}>Zoom Out</button>
          <button className="button" onClick={handleZoomIn}>Zoom In</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <p>Username: {username}</p>
        </div>
        <div className="page-count">
          Page {pageNumber} of {numPages}
        </div>
      </div>
      <div className="pdf-window">
        {file && (
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              scale={zoom}
              renderTextLayer={false}
            />
          </Document>
        )}
      </div>
    </div>
  );

}

export default Pdf;
