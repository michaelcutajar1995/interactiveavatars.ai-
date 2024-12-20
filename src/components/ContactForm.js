import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, ValidationError } from '@formspree/react';
import VoiceSelector from './VoiceSelector';
import { generateVoice } from '../services/voiceService';
import axios from 'axios';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 10px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #FFFFFF;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
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

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  padding: 1rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  text-align: left;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  border-radius: 50px;
  border: none;
  background-color: #FFD700;
  color: black;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const QuestionLabel = styled.label`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const AnswerInput = styled(Input)`
  margin-bottom: 1.5rem;
`;

const QuestionGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const VoiceSelectorContainer = styled.div`
  margin: .5rem 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const VoicePreview = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;

  audio {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const PreviewButton = styled(SubmitButton)`
  background-color: #FFFFFF;
  margin: 1rem 0;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 200px;
  width: 100%;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const AvatarCreatorContainer = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  height: 600px;
  position: relative;
`;

const AvatarPreview = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 1rem;
  overflow: hidden;
`;

const SavedImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const SavedImageContainer = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: rgba(255, 0, 0, 0.9);
    }
  }
`;

const SuccessPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.95);
  padding: 2rem;
  border-radius: 15px;
  border: 2px solid #4CAF50;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  max-width: 90%;
  width: 400px;
  text-align: center;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const SuccessIcon = styled.div`
  color: #4CAF50;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h3`
  color: #4CAF50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const SuccessMessage = styled.p`
  color: white;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const VoiceOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const VoiceOption = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const VoiceOptionTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export default function ContactForm() {
  const [state, setState] = useState({
    succeeded: false,
    submitting: false,
    errors: []
  });

  const [formData, setFormData] = useState({
    website: '',
    email: '',
    description: '',
    voiceId: null,
    voiceName: '',
    avatarUrl: null,
    avatarCustomizations: null,
    avatarImage: null,
    voiceFile: null,
    selectedImageUrl: null,
    savedImages: [],
  });

  const RPM_API_KEY = process.env.REACT_APP_RPM_API_KEY;

  const [formState, handleFormspreeSubmit] = useForm("xbljeznb");

  const handleGenerateVoicePreview = async () => {
    if (!formData.voiceId || !formData.previewText) return;

    try {
      const previewAudioUrl = await generateVoice(formData.previewText, formData.voiceId);
      setFormData(prev => ({
        ...prev,
        voicePreview: previewAudioUrl
      }));
    } catch (error) {
      console.error('Error generating voice preview:', error);
      // Optionally add some user feedback here
      alert('Error generating voice preview. Please try again.');
    }
  };

  // Handle Ready Player Me avatar creation
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'v1.avatar.exported') {
        setFormData(prev => ({
          ...prev,
          avatarUrl: event.data.data.url,
          avatarCustomizations: event.data.data.assets
        }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Handle voice selection
  const handleVoiceSelect = (voice) => {
    setFormData(prev => ({
      ...prev,
      voiceId: voice.voice_id,
      voiceName: voice.name
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          avatarImage: file,
          selectedImageUrl: imageUrl,
          savedImages: [...prev.savedImages, {
            file: file,
            url: imageUrl
          }]
        }));
      }
    });
  };

  const handleVoiceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the audio file is at least 1 minute long
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener('loadedmetadata', () => {
        if (audio.duration < 60) { // 60 seconds = 1 minute
          alert('Please upload a voice recording that is at least 1 minute long.');
          e.target.value = ''; // Clear the file input
          return;
        }
        setFormData(prev => ({
          ...prev,
          voiceFile: file,
          voiceId: null, // Clear selected voice when uploading own voice
          voiceName: ''
        }));
      });
    }
  };

  // Custom submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setState({ succeeded: false, submitting: true, errors: [] });
    
    try {
      const uploadedImageUrls = [];
      let voiceData = null;
      
      // Upload all images to Cloudinary
      for (const imageData of formData.savedImages) {
        const cloudinaryData = new FormData();
        cloudinaryData.append('file', imageData.file);
        cloudinaryData.append('upload_preset', 'ml_default');

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dpqlbny40/image/upload`,
          {
            method: 'POST',
            body: cloudinaryData,
          }
        );

        const imageResponse = await cloudinaryResponse.json();
        uploadedImageUrls.push(imageResponse.secure_url);
      }

      // Upload voice file to Cloudinary if it exists
      if (formData.voiceFile) {
        const voiceCloudinaryData = new FormData();
        voiceCloudinaryData.append('file', formData.voiceFile);
        voiceCloudinaryData.append('upload_preset', 'ml_default');
        voiceCloudinaryData.append('resource_type', 'video');

        const voiceCloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dpqlbny40/video/upload`,
          {
            method: 'POST',
            body: voiceCloudinaryData,
          }
        );

        const voiceResponse = await voiceCloudinaryResponse.json();
        voiceData = {
          type: 'uploaded',
          url: voiceResponse.secure_url
        };
      } else if (formData.voiceId) {
        voiceData = {
          type: 'selected',
          voiceId: formData.voiceId,
          voiceName: formData.voiceName
        };
      }

      // Prepare form data for Formspree
      const submissionData = {
        ...formData,
        uploadedImages: uploadedImageUrls,
        voiceData: voiceData
      };

      // Submit to Formspree
      const result = await handleFormspreeSubmit(submissionData);
      
      if (result.ok) {
        setState({ 
          succeeded: true, 
          submitting: false, 
          errors: [] 
        });
        
        // Clear form data after successful submission
        setFormData({
          website: '',
          email: '',
          description: '',
          voiceId: null,
          voiceName: '',
          avatarUrl: null,
          avatarCustomizations: null,
          avatarImage: null,
          voiceFile: null,
          selectedImageUrl: null,
          savedImages: [],
        });
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setState({ 
        succeeded: false, 
        submitting: false,
        errors: ['There was an error saving your character. Please try again.'] 
      });
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      savedImages: prev.savedImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Add this function to handle popup closure
  const handleClosePopup = () => {
    setState(prev => ({ ...prev, succeeded: false }));
    // Reset Formspree state by refreshing the form
    window.location.reload();
  };

  return (
    <FormContainer>
 
      
      <Form onSubmit={handleFormSubmit}>
        <QuestionGroup>
          <QuestionLabel>What's your full name? / Brand name?</QuestionLabel>
          <AnswerInput 
            type="text"
            name="brand_website"
            placeholder="Enter your website URL" 
            required 
          />
        </QuestionGroup>

        <QuestionGroup>
          <QuestionLabel>What's your email address?</QuestionLabel>
          <AnswerInput 
            type="email"
            name="email" 
            placeholder="Enter your email" 
            required 
          />
        </QuestionGroup>

        <QuestionGroup>
          <QuestionLabel>Describe your character (max 1000 words)</QuestionLabel>
          <TextArea
            name="character_description"
            placeholder="Example: We sell real estate in the city of San Francisco. We've been in business for 10 years and have a team of 10 agents."
            maxLength={5000} // approximately 1000 words
            required
          />
        </QuestionGroup>

        <VoiceSelectorContainer>
          
          <VoiceOptionsContainer>
            <VoiceOption>
              <VoiceOptionTitle>Option 1: Upload your own voice (business and pro plan only)</VoiceOptionTitle>
              <FileInput
                type="file"
                id="voiceFile"
                name="voiceFile"
                accept="audio/*"
                onChange={handleVoiceUpload}
              />
              <FileLabel htmlFor="voiceFile">Upload Voice File (minimum 1 minute)</FileLabel>
              {formData.voiceFile && (
                <p style={{ color: 'white', marginTop: '0s.5rem' }}>
                  Selected file: {formData.voiceFile.name}
                </p>
              )}
            </VoiceOption>

            <VoiceOption>
              <VoiceOptionTitle>Option 2: Select from our voice library (free plan))</VoiceOptionTitle>
              <VoiceSelector onVoiceSelect={handleVoiceSelect} />
              {formData.voiceId && (
                <QuestionGroup>
                  <QuestionLabel>Test the voice</QuestionLabel>
                  <AnswerInput
                    type="text"
                    placeholder="Enter text to preview voice"
                    value={formData.previewText}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      previewText: e.target.value
                    }))}
                  />
                  <PreviewButton 
                    type="button"
                    onClick={handleGenerateVoicePreview}
                  >
                    Generate Preview
                  </PreviewButton>
                </QuestionGroup>
              )}
            </VoiceOption>
          </VoiceOptionsContainer>

          {formData.voicePreview && (
            <VoicePreview>
              <QuestionLabel>Voice Preview</QuestionLabel>
              <audio controls src={formData.voicePreview} />
            </VoicePreview>
          )}
        </VoiceSelectorContainer>

        <QuestionGroup>
          <QuestionLabel>Upload a photo of yourself, or we can select a default one based on your information</QuestionLabel>
          <FileInput 
            type="file" 
            accept="image/*" 
            id="avatarImage" 
            onChange={handleImageUpload} 
          />
          <FileLabel htmlFor="avatarImage">Choose Image</FileLabel>
        </QuestionGroup>

        {formData.savedImages.length > 0 && (
          <SavedImagesGrid>
            {formData.savedImages.map((image, index) => (
              <SavedImageContainer key={index}>
                <img 
                  src={image.url} 
                  alt={`Uploaded ${index + 1}`} 
                />
                <button onClick={() => handleRemoveImage(index)}>×</button>
              </SavedImageContainer>
            ))}
          </SavedImagesGrid>
        )}

        <SubmitButton type="submit" disabled={formState.submitting}>
          {formState.submitting ? "Bare with us...soon there" : "GET MY FREE DEMO"}
        </SubmitButton>

        {state.errors && state.errors.length > 0 && (
          <ErrorMessage>
            {state.errors.join(", ")}
          </ErrorMessage>
        )}

        {formState.errors && formState.errors.length > 0 && (
          <ErrorMessage>
            {formState.errors.map(error => error.message).join(", ")}
          </ErrorMessage>
        )}

        {(state.succeeded || formState.succeeded) && (
          <SuccessPopup>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessTitle>Thank you for your submission!</SuccessTitle>
            <SuccessMessage>
              We've received your character preferences and will be in touch within 24 hours.
              <br /><br />
              Please check your emails
            </SuccessMessage>
            <CloseButton onClick={handleClosePopup}>
              Got it!
            </CloseButton>
          </SuccessPopup>
        )}
      </Form>
    </FormContainer>
  );
}