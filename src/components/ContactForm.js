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

const ProgressBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    z-index: 0;
  }
`;

const Step = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.active ? '#FFD700' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#000' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  &::after {
    content: '${props => props.label}';
    position: absolute;
    top: 45px;
    white-space: nowrap;
    color: ${props => props.active ? '#FFD700' : '#fff'};
    font-size: 0.8rem;
  }
`;

const StepContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavButton = styled(SubmitButton)`
  width: 120px;
  background: ${props => props.back ? 'rgba(255, 255, 255, 0.1)' : '#FFD700'};
`;

const ValidationMessage = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid #FFD700;
  color: white;
  font-size: 1rem;
  z-index: 1000;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from { transform: translate(-50%, -100%); }
    to { transform: translate(-50%, 0); }
  }
`;

const OptionGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Option = styled.button`
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#FFD700' : 'rgba(255, 255, 255, 0.1)'};
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
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
    imageChoice: null,
  });

  const RPM_API_KEY = process.env.REACT_APP_RPM_API_KEY;

  const [formState, handleFormspreeSubmit] = useForm("xbljeznb");

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const steps = {
    1: "Basic Information",
    2: "Voice Selection",
    3: "Avatar Creation"
  };

  const [validationMessage, setValidationMessage] = useState(null);

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
      
      // Upload all images to Cloudinary (if any)
      if (formData.imageChoice === 'upload' && formData.savedImages.length > 0) {
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
      }

      // Handle voice data
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

      // Prepare submission data
      const submissionData = {
        ...formData,
        uploadedImages: uploadedImageUrls,
        voiceData: voiceData
      };

      // Submit to Formspree
      const result = await handleFormspreeSubmit(submissionData);
      
      if (result.response?.ok) {
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
          imageChoice: null,
        });
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setState({ 
        succeeded: false, 
        submitting: false,
        errors: [] // Don't show error message since Formspree will handle it
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

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        const hasRequiredInfo = Boolean(
          formData.brand_website?.trim() && 
          formData.email?.trim()
        );
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(formData.email || '');
        
        if (!isValidEmail && formData.email?.trim()) {
          showValidation('Please enter a valid email address');
          return false;
        }
        return hasRequiredInfo;
      case 2:
        return Boolean(formData.voiceId || formData.voiceFile);
      case 3:
        return true;
      default:
        return false;
    }
  };

  const showValidation = (message) => {
    setValidationMessage(message);
    setTimeout(() => setValidationMessage(null), 3000); // Hide after 3 seconds
  };

  return (
    <FormContainer>
      {validationMessage && (
        <ValidationMessage>
          {validationMessage}
        </ValidationMessage>
      )}

      <ProgressBar>
        {Object.entries(steps).map(([key, label]) => (
          <Step 
            key={key} 
            active={currentStep >= parseInt(key)}
            label={label}
          >
            {key}
          </Step>
        ))}
      </ProgressBar>

      <Form onSubmit={handleFormSubmit}>
        {/* Step 1: Basic Information */}
        <StepContent active={currentStep === 1}>
          <QuestionGroup>
            <QuestionLabel>What's your full name? / Brand name? *</QuestionLabel>
            <AnswerInput 
              type="text"
              name="brand_website"
              placeholder="Enter your name or brand name" 
              required 
              value={formData.brand_website || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                brand_website: e.target.value
              }))}
            />
          </QuestionGroup>

          <QuestionGroup>
            <QuestionLabel>What's your email address? *</QuestionLabel>
            <AnswerInput 
              type="email"
              name="email" 
              placeholder="Enter your email" 
              required 
              value={formData.email || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                email: e.target.value
              }))}
            />
          </QuestionGroup>

          <QuestionGroup>
            <QuestionLabel>Describe your character (optional)</QuestionLabel>
            <TextArea
              name="character_description"
              placeholder="Example: We sell real estate in the city of San Francisco. We've been in business for 10 years and have a team of 10 agents."
              maxLength={5000}
              value={formData.character_description || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                character_description: e.target.value
              }))}
            />
          </QuestionGroup>
        </StepContent>

        {/* Step 2: Voice Selection */}
        <StepContent active={currentStep === 2}>
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
        </StepContent>

        {/* Step 3: Avatar Creation */}
        <StepContent active={currentStep === 3}>
          <QuestionGroup>
            <QuestionLabel>Would you like to upload your own photo or let us choose for you?</QuestionLabel>
            <OptionGroup>
              <Option 
                type="button"
                selected={formData.imageChoice === 'upload'}
                onClick={() => setFormData(prev => ({ ...prev, imageChoice: 'upload' }))}
              >
                Upload My Own Photo
              </Option>
              <Option 
                type="button"
                selected={formData.imageChoice === 'auto'}
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  imageChoice: 'auto',
                  savedImages: [], // Clear any uploaded images
                  avatarImage: null,
                  selectedImageUrl: null
                }))}
              >
                Let Interactive Avatars Choose For Me
              </Option>
            </OptionGroup>
          </QuestionGroup>

          {formData.imageChoice === 'upload' && (
            <>
              <QuestionGroup>
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
            </>
          )}

          {formData.imageChoice === 'auto' && (
            <QuestionGroup>
              <p style={{ color: 'white', opacity: 0.8 }}>
                Based on your character description, we'll generate an appropriate avatar for you.
                You'll have the opportunity to review and adjust it later.
              </p>
            </QuestionGroup>
          )}
        </StepContent>

        <NavigationButtons>
          {currentStep > 1 && (
            <NavButton 
              type="button" 
              back 
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Back
            </NavButton>
          )}
          {currentStep < totalSteps ? (
            <NavButton 
              type="button" 
              onClick={() => {
                if (canProceedToNextStep()) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  showValidation('Please complete all required fields');
                }
              }}
            >
              Next
            </NavButton>
          ) : (
            <SubmitButton type="submit" disabled={formState.submitting}>
              {formState.submitting ? "Creating..." : "Complete"}
            </SubmitButton>
          )}
        </NavigationButtons>
      </Form>
      
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
    </FormContainer>
  );
}