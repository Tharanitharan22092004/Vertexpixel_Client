import React, { useState, useRef } from 'react';

const Adminpost = () => {
  const [files, setFiles] = useState([]);
  const [sendData, setSendData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [showMenu, setShowMenu] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const fileList = event.target.files;
    if (fileList) {
      const newFiles = Array.from(fileList);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    if (fileList) {
      const newFiles = Array.from(fileList);
      setFiles([...files, ...newFiles]);
    }
  };

  const deleteFile = (file) => {
    const nameToDelete = file.name;
    setFiles(files.filter((item) => item.name !== nameToDelete));
  };

  const uploadFilesToBackend = async () => {
    try {
      const formData = new FormData();
      formData.append('title', sendData.title || '');
      formData.append('description', sendData.description || '');
      formData.append('category', sendData.category || '');

      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Files uploaded successfully');
        // Clear input fields and reset state
        setSendData({ title: '', description: '', category: '' });
        setFiles([]);
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#111111' }}>
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
        style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: '30', cursor: 'pointer', transform: showMenu ? 'rotate(180deg)' : 'none' }}
        onClick={handleNavClick}
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
      <div className="flex flex-row gap-9 items-center w-7/12 rounded-lg p-4 mb-4 bg-[#000000]">
        <div className="flex flex-col items-center w-11/12">
          <div
            className="text-center p-4 flex flex-col items-center justify-center text-blue-500 h-[500px] overflow-auto border-dashed border-2 rounded border-gray-300 w-full cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#444 #201f1f' }}
          >
            {files.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', justifyContent: 'center' }}>
                {files.map((file, index) => (
                  <div style={{ position: 'relative' }} key={index}>
                    <img style={{ height: '9rem', width: '9rem', marginBottom: '2px' }} src={URL.createObjectURL(file)} alt="Selected" />
                    <div style={{ display: 'none', backgroundColor: '#f87171', position: 'absolute', right: '0.5rem', top: '0.5rem', padding: '1px', cursor: 'pointer' }} className="delete-btn" onClick={() => deleteFile(file)}>
                      x
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload text-white h-24 w-36"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
                <p style={{ color: '#ffffff' }}>Drag & Drop images here </p>
              </span>
            )}
            <input ref={fileInputRef} type="file" id="file-input" accept="image/*" multiple onChange={handleFileInputChange} style={{ display: 'none' }} />
          </div>
          <button
            className="mt-5 bg-black border border-white text-white px-4 py-2 hover:bg-white hover:text-black"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            Browse
          </button>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-3">
            <label className="text-white text-2xl">Title</label>
            <input
              style={{ width: '100%', height: '2.5rem', borderRadius: '0.5rem', padding: '0.5rem', border: '1px solid grey', backgroundColor: '#363535a9', color: '#ffffff' }}
              type="text"
              value={sendData.title}
              onChange={(e) => setSendData({ ...sendData, title: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-white text-2xl">Category</label>
            <input
              style={{ width: '100%', height: '2.5rem', borderRadius: '0.5rem', padding: '0.5rem', border: '1px solid grey', backgroundColor: '#363535a9',color: '#ffffff' }}
              type="text"
              value={sendData.category}
              onChange={(e) => setSendData({ ...sendData, category: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-white text-2xl">Description</label>
            <textarea
              style={{ width: '100%', height: '10rem', borderRadius: '0.5rem', padding: '0.5rem', border: '1px solid grey', backgroundColor: '#363535a9', color: '#ffffff' }}
              value={sendData.description}
              onChange={(e) => setSendData({ ...sendData, description: e.target.value })}
            />
          </div>
          <button style={{ width: '100%', backgroundColor: '#000000', color: '#ffffff', border: '1px solid #ffffff', padding: '0.5rem', borderRadius: '0.5rem' }} onClick={uploadFilesToBackend}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adminpost;

