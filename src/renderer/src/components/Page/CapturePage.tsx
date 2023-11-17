import React, { useState, useEffect } from 'react';

function CapturePage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [captureStatus, setCaptureStatus] = useState('');

  useEffect(() => {
    window.electron.ipcRenderer.on('capture-response', (event, response) => {
      setCaptureStatus(response);
    });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCaptureClick = async () => {
    setCaptureStatus('Capturing...');
    window.electron.ipcRenderer.send('capture-request', searchQuery);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      <button onClick={handleCaptureClick}>Capture Search</button>
      <p>{captureStatus}</p>
    </div>
  );
}

export default CapturePage;
