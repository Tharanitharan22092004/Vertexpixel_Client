import React, { useState, useRef } from 'react';

const Workupload = () => {
  const [files, setFiles] = useState([]);
  const [sendData, setSendData] = useState({
    title: '',
    description: '',
    category: '',
  });

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
        window.location.reload(); // Refresh the page after successful upload
      } else {
        console.error('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
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
      <div style={{ display: 'flex', flexDirection: 'row', gap: '2.25rem', alignItems: 'center', width: '58.3333%', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem', backgroundColor: '#000000' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '91.6667%' }}>
          <div
            style={{ textAlign: 'center', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', height: '500px', overflow: 'auto', borderStyle: 'dashed', borderWidth: '2px', borderRadius: '0.5rem', borderColor: '#d1d5db', width: '100%', cursor: 'pointer' }}
            className="custom-scrollbar"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {files.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', justifyContent: 'center' }}>
                {files.map((file) => (
                  <div style={{ position: 'relative' }} key={file.name}>
                    <img style={{ height: '9rem', width: '9rem', marginBottom: '0.5rem' }} src={URL.createObjectURL(file)} alt="Selected" />
                    <div style={{ display: 'none', backgroundColor: '#f87171', position: 'absolute', right: '0.5rem', top: '0.5rem', padding: '0.25rem', cursor: 'pointer' }} className="delete-btn" onClick={() => deleteFile(file)}>
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
            style={{ marginTop: '1.25rem', backgroundColor: '#000000', border: '1px solid #ffffff', color: '#ffffff', padding: '0.5rem 1rem', transition: 'background-color 0.3s, color 0.3s' }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#000000';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#000000';
              e.target.style.color = '#ffffff';
            }}
          >
            Browse
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ color: '#ffffff', fontSize: '1.5rem' }}>Title</label>
            <input
              style={{ width: '100%', height: '2.5rem', borderRadius: '0.5rem', padding: '0.5rem', border: '1px solid grey', backgroundColor: '#363535a9', color: '#ffffff' }}
              type="text"
              onChange={(e) => setSendData({ ...sendData, title: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ color: '#ffffff', fontSize: '1.5rem' }}>Category</label>
            <input
              style={{ width: '100%', height: '2.5rem', borderRadius: '0.5rem', padding: '0.5rem', border: '1px solid grey', backgroundColor: '#363535a9', color: '#ffffff' }}
              type="text"
              onChange={(e) => setSendData({ ...sendData, category: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ color: '#ffffff', fontSize: '1.5rem' }}>Description</label>
            <textarea
              style={{ width: '100%', height: '15rem', borderRadius: '0.5rem', padding: '0.5rem', border: '1px solid #000000', backgroundColor: '#363535a9', color: '#ffffff' }}
              onChange={(e) => setSendData({ ...sendData, description: e.target.value })}
            />
          </div>
          <button onClick={uploadFilesToBackend} style={{ marginTop: '0.5rem', width: '100%', backgroundColor: '#000000', color: '#ffffff', padding: '0.5rem 1rem', border: '1px solid #ffffff', transition: 'background-color 0.3s, color 0.3s' }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#000000';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#000000';
              e.target.style.color = '#ffffff';
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workupload;
