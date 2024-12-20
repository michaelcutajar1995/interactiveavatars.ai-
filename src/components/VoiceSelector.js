import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import VoiceRecorder from './VoiceRecorder';

const SelectVoice = styled.select`
  padding: 0.8rem;
  border-radius: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  appearance: none;
  cursor: pointer;
  margin-bottom: 1rem;
  text-align: left;
  padding-left: 1rem;
  width: 100%;
  
  /* Add a custom dropdown arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  option {
    background-color: #1a1a1a;
    padding: 0.5rem;
  }
`;

const VoiceSelector = ({ onVoiceSelect }) => {
    const [voices, setVoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState('');

    const ELEVEN_LABS_API_KEY = process.env.REACT_APP_ELEVEN_LABS_API_KEY;

    useEffect(() => {
        fetchVoices();
    }, []);

    const fetchVoices = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
                headers: {
                    'xi-api-key': ELEVEN_LABS_API_KEY
                }
            });
            setVoices(response.data.voices);
        } catch (error) {
            console.error('Error fetching voices:', error);
        }
        setLoading(false);
    };

    const handleVoiceChange = (e) => {
        const selectedVoiceId = e.target.value;
        const voice = voices.find(v => v.voice_id === selectedVoiceId);
        if (voice) {
            setSelectedVoice(selectedVoiceId);
            onVoiceSelect(voice);
        }
    };

    const handleVoiceAdded = (voiceId) => {
        fetchVoices();
        setSelectedVoice(voiceId);
        onVoiceSelect({ voice_id: voiceId });
    };

    return (
        <div>
            {loading ? (
                <p>Loading voices...</p>
            ) : (
                <SelectVoice
                    value={selectedVoice}
                    onChange={handleVoiceChange}
                >
                    <option value="">Select a voice</option>
                    {voices.map((voice) => (
                        <option 
                            key={voice.voice_id} 
                            value={voice.voice_id}
                        >
                            {voice.name}
                        </option>
                    ))}
                </SelectVoice>
            )}
        </div>
    );
};

export default VoiceSelector;