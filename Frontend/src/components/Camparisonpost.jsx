import React, { useState, useRef } from 'react';

const Comparisonpost = () => {
  const [files, setFiles] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const fileList = event.target.files;
    if (fileList) {
      const newFiles = Array.from(fileList).slice(0, 2);
      setFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 2));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    if (fileList) {
      const newFiles = Array.from(fileList).slice(0, 2);
      setFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 2));
    }
  };

  const deleteFile = (file) => {
    const nameToDelete = file.name;
    setFiles((prevFiles) => prevFiles.filter((item) => item.name !== nameToDelete));
  };

  const uploadFilesToBackend = async () => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('http://localhost:5000/api/images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Files uploaded successfully');
        window.location.reload(); // Refresh the page after successful upload
      } else {
        console.error('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleNavClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#111111]">
      <style>
        {`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #444 #201f1f;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #201f1f;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #444;
            border-radius: 10px;
            border: 3px solid #201f1f;
          }

          .relative:hover .delete-btn {
            display: block;
          }

          .delete-btn {
            display: none;
          }
        `}
      </style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-menu fixed top-1 left-1 z-30 cursor-pointer ${showMenu ? 'rotate-180' : ''}`}
        onClick={handleNavClick}
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
      <div className="flex flex-col gap-4 items-center w-7/12 rounded-lg p-4 mb-4 bg-[#000000]">
        <div className="flex flex-col items-center w-full">
          <div
            className="text-center p-4 flex flex-col items-center justify-center text-blue-500 h-[500px] overflow-auto border-dashed border-2 rounded border-gray-300 w-full cursor-pointer custom-scrollbar"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {files.length > 0 ? (
              <div className="flex flex-wrap gap-1 justify-center">
                {files.map((file) => (
                  <div className="relative" key={file.name}>
                    <img className="h-36 w-36 mb-2" src={URL.createObjectURL(file)} alt="Selected" />
                    <div className="delete-btn bg-red-300 absolute right-2 top-2 p-1 cursor-pointer" onClick={() => deleteFile(file)}>
                      x
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="flex flex-col justify-center items-center h-full w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload text-white h-24 w-36">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m16 16-4-4-4 4" />
                </svg>
                <p className="text-white">Drag & Drop images here</p>
              </span>
            )}
            <input ref={fileInputRef} type="file" id="file-input" accept="image/*" multiple onChange={handleFileInputChange} className="hidden" />
          </div>
          <button
            className="mt-5 bg-black border border-white text-white px-4 py-2 hover:bg-white hover:text-black"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            Browse
          </button>
        </div>
        <button onClick={uploadFilesToBackend} className="w-full bg-black text-white px-4 py-2 border hover:bg-white hover:text-black">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Comparisonpost;
