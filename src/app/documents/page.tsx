"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Document: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]); // State for storing documents
  const [file, setFile] = useState<File | null>(null); // State for the selected file
  const [uploadError, setUploadError] = useState<string | null>(null); // State for error messages
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null); // State for success messages

  // Fetch existing documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/documents'); // Adjust the API path if necessary
        setDocuments(response.data);
      } catch (error: any) {
        console.error('Error fetching documents:', error);
        setUploadError('Failed to fetch documents. Please try again later.');
      }
    };

    fetchDocuments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadError(null); // Reset error on file selection
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the API returns the uploaded document details
      const newDocument = response.data; 
      setDocuments((prevDocuments) => [...prevDocuments, newDocument]); // Update documents state
      setUploadSuccess('File uploaded successfully!');
      setFile(null); // Reset file input
    } catch (error: any) {
      console.error(error);
      setUploadError('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-white text-center">Documents</h1>
        
        {uploadError && <p className="text-red-500 text-center">{uploadError}</p>}
        {uploadSuccess && <p className="text-green-500 text-center">{uploadSuccess}</p>}

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 text-white"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload Document
        </button>

        <h2 className="text-xl font-semibold mt-6 text-white text-center">Uploaded Documents</h2>
        {documents.length === 0 ? (
          <p className="text-white text-center mt-2">No documents available.</p>
        ) : (
          <ul className="space-y-2 mt-4">
            {documents.map(doc => (
              <li key={doc.id} className="flex justify-between items-center bg-gray-700 p-4 rounded">
                <div>
                  <h2 className="text-white">{doc.title}</h2>
                  <p className="text-gray-400 text-sm">Uploaded on: {doc.date}</p>
                </div>
                <a
                  href={doc.url}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Document;
