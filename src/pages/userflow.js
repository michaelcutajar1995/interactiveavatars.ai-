import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 7rem;
  width: 100%;
  padding: 2rem;
  position: relative;
  left: -85px;
  margin: 2rem 0;
  margin-left: 6rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; // Change from center to flex-start
    gap: 2rem;
    left: 0;
    margin-left: 2rem; // Add smaller left margin on mobile
    padding: 1rem; // Reduce padding on mobile
  }
`;

const StepCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 90%; // Make cards slightly less than full width
    align-items: flex-start; // Align contents to the left
    text-align: left; // Align text to the left
    padding: 1.5rem; // Slightly reduce padding on mobile
  }

  &:hover {
    transform: translateY(-10px);
  }
`;

const StepTitle = styled.h3`
  color: #FFFFFF;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    text-align: left;
    margin-top: 0.5rem;
  }
`;

const StepDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #E0E0E0;

  @media (max-width: 768px) {
    text-align: left; // Ensure description is left-aligned on mobile
  }
`;

const StepImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 1.5rem;
  object-fit: contain;
`;

const Arrow = styled.div`
  display: none; // Hidden by default for mobile

  @media (min-width: 769px) {
    display: block;
    position: relative;
    top: 35%;
    width: 50px;
    height: 2px;
    background-color: #E0E0E0;
    margin: 0 -2rem;
    align-self: flex-start;

    &::after {
      content: '';
      position: absolute;
      right: -5px;
      top: 150px;
      width: 10px;
      height: 10px;
      border-top: 2px solid #E0E0E0;
      border-right: 2px solid #E0E0E0;
      transform: rotate(45deg);
    }
  }
`;

const SectionTitle = styled.h2`
  color: #FFFFFF;
  font-size: 2.5rem;
  text-align: center;
  margin-top: 100px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: left;
    margin-left: 2rem;
  }
`;

const UserFlow = () => {
  return (
    <>
      <SectionTitle>How It Works</SectionTitle>
      <StepsContainer>
        <StepCard>
          <StepTitle>Fill Up Character Info</StepTitle>
          <StepImage src="/othersiteimages/cat.PNG" alt="Character Info" />
          <StepDescription>
            Enter all the necessary details to bring your character to life. Customize it to match your brand's personality.
          </StepDescription>
        </StepCard>

        <Arrow />

        <StepCard>
          <StepTitle>Receive Link</StepTitle>
          <StepImage src="/qrcode/step1.png" alt="Receive Link" />
          <StepDescription>
            Get a unique link to your experience. Share it with your audience to engage them in a new way.
          </StepDescription>
        </StepCard>

        <Arrow />

        <StepCard>
          <StepTitle>Share to People</StepTitle>
          <StepImage src="/qrcode/step2.png" alt="Share" />
          <StepDescription>
            Distribute your  experience link through social media, email, or any platform to reach a wider audience.
          </StepDescription>
        </StepCard>
      </StepsContainer>
    </>
  );
}

export default UserFlow;