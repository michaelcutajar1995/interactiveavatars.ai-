import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { uploadVoiceRecording } from '../services/recordingService';

const RecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploadLabel = styled.label`
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
`;

const StatusText = styled.p`
  color: #E0E0E0;
  font-size: 0.9rem;
  margin: 0;
`;

const VoiceRecorder = ({ onVoiceAdded }) => {
  const [status, setStatus] = useState('');
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('audio/')) {
      setStatus('Please upload an audio file (MP3, WAV, M4A, FLAC, or WEBM)');
      return;
    }

    setStatus('Uploading voice file...');
    
    try {
      const voiceId = await uploadVoiceRecording(file);
      setStatus('Voice successfully added!');
      onVoiceAdded(voiceId);
    } catch (error) {
      console.error('Error uploading voice file:', error);
      setStatus('Error uploading voice file');
    }
  };

  return (
    <RecorderContainer>
      <FileInput 
        type="file"
        id="voiceFile"
        accept="audio/*"
        onChange={handleFileUpload}
      />
      <FileUploadLabel htmlFor="voiceFile">
        Upload Voice File
      </FileUploadLabel>
      {status && <StatusText>{status}</StatusText>}
    </RecorderContainer>
  );
};

export default VoiceRecorder; 