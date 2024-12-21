import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { 
  logEvent, 
  logSocialClick, 
  logDownload, 
  logEmailClick, 
  logButtonClick 
} from '../utils/analytics';
import ComparisonTable from '../components/ComparisonTable';
import ContactForm from '../components/ContactForm';
import { ClientLogoSection } from '../pages/Team';
import { ConvaiHolder } from '../components/ConvaiHolder';
import { words, ideas, userNames, useNotifications } from '../components/wordLists';
import UserFlow from '../pages/userflow';
import FAQ from '../pages/FAQ';
import { Link } from 'react-router-dom'
import Social from '../pages/Social';
import TokenInfo from '../pages/TokenInfo';


const PromoBanner = styled.div`
  background-color: #000000;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  text-align: center;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HomeContainer = styled.div`
  max-width: 1500px;
  margin: 20px auto 2rem auto;
  padding: 0 2rem;
  
  
  @media (max-width: 768px) {
    margin-top: 80px;
    padding: 0 1rem;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const DemoVideoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 1rem;
  

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 1rem;
    text-align: center;
    align-items: center;
  }
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  line-height: 1.5;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0 1rem;
  }
`;
const ActionButton = styled.button`
  padding: 1rem 1rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid white;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  
  &.primary {
    background-color: black;
    color: white;
  }
  
  &.secondary {
    background-color: transparent;
    color: white;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const DemoSection = styled.div`
  flex: 1;
  width: 50%;
  padding: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
  text-align: center;
  position: relative;
  left: -35px;
  margin-top: 100px;
  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding: 0 1rem;
    margin: 5rem 0 1rem;
    left: 0;
  }
`;

const Slogan = styled.h2`
  font-size: 2.2rem;
  margin: 1rem 0;
  text-align: center;
  position: relative;
  left: -85px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding: 0 1rem;
    margin: 1rem 0;
    left: 0;
  }
`;

const Description = styled.p`
  font-size: 2rem;
  margin: 1rem 0;
  line-height: 1.4;
  text-align: center;
  position: relative;
  left: -85px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 1rem;
    margin: 1rem 0;
    left: 0;
  }
`;

const DownloadButton = styled.a`
  position: relative;
  left: -85px;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #FFFFFF;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
  display: inline-block;
  margin-bottom: 1rem;
  
  
  @media (max-width: 768px) {
    left: 0;
    padding: 0.8rem 1.6rem;
    font-size: 1.3rem;
    margin: 1rem;
  }
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 0.5rem;
`;

const ReviewText = styled.span`
  font-size: 0.9rem;
  color: #E0E0E0;
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  left: -20px;
  gap: 3rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    left: 0;
    padding: 0 1rem;
    gap: 1rem;
    margin: 2rem 0;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
`;

const StatNumber = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StatLabel = styled.span`
  font-size: 1rem;
  text-align: center;
  max-width: 120px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const AnimatedWord = styled.span`
  color: #FFFFFF;
  transition: opacity 0.5s ease-in-out;
  font-size: 1.2em;
  border: 3px solid #FFFFFF;
  padding: 0.2em 0.5em;
  border-radius: 4px;
  position: relative;
  top: 2px;
  bottom: 15px;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    display: inline-block;
    position: relative;
    top: 0;
  }
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0;
  position: relative;
  left: -85px;

  @media (max-width: 768px) {
    left: 0;
    margin: 2rem 0;
    align-items: flex-start; // Align items to the left on mobile
  }
`;

const SocialText = styled.p`
  font-size: 1.2rem;
  color: #E0E0E0;
  margin-bottom: 1rem;
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
`;

const SocialButton = styled.a`
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  padding: 1.2rem;
  margin-top: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(255, 105, 180, 0.2);
  }
`;

const ContactButton = styled.a`
  color: #FFFFFF;
  font-size: 1.1rem;
  text-decoration: none;
  margin-top: 1.5rem;
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border: 2px solid #FFFFFF;
  border-radius: 50px;
  transition: all 0.3s ease;
  

  &:hover {
    transform: scale(1.05);
    background-color: rgba(255, 105, 180, 0.1);
  }
`;

const AnimatedArrow = styled.div`
  position: absolute;
  right: 130px;
  top: 40%;
  transform: translateY(-50%);
  font-size: 8rem;
  color: #FFFFFF;
  animation: bounceRight 2s infinite;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 1rem;
    white-space: nowrap;
    color: #FFFFFF;
    font-weight: bold;
    margin-top: -30px;
  }

  &:after {
    content: 'TRY!';
    font-size: 1rem;
    color: #FFFFFF;
    position: absolute;
    bottom: 15px;
    white-space: nowrap;
  }

  @keyframes bounceRight {
    0%, 100% {
      transform: translateX(0) translateY(-50%);
      opacity: 1;
    }
    50% {
      transform: translateX(10px) translateY(-50%);
      opacity: 0.5;
    }
  }

  @media (max-width: 768px) {
    display: none; // Hide arrow on mobile
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 3rem auto;
  max-width: 800px;
  width: 100%;
  padding-left: 20%;  // This will push the content more to the left
`;

const FeatureItem = styled.div`
  font-size: 2rem;
  color: white;
  display: grid;
  grid-template-columns: 50px 1fr;  // Fixed width for emoji column
  align-items: center;
  gap: 1.5rem;
  
  .emoji {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.2rem;  // Slightly larger emojis
  }
  
  .text {
    text-align: left;
    line-height: 1.2;
  }
`;

const BusinessSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  position: relative;
  left: 0%;

  @media (max-width: 768px) {
    left: 0;
    margin: 2rem 0;
    align-items: flex-start;
  }
`;

const BusinessButton = styled.a`
  background-color: #FFD700;
  color: black;
  font-size: 2.3rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  &:hover {
    background-color: #ffd900e6;
  }
`;



const FloatingAppButton = styled.a`
  background-color: #FFFFFF;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  position: fixed;
  bottom: 28rem;
  right: 2rem;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #FFFFFFe6;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    bottom: 1rem;
    right: 1rem;
    opacity: 0.8;
    transform: scale(0.8);
    
    // Add animation to make it appear/disappear
    animation: popIn 5s infinite;
    
    &.show {
      display: flex;
    }
  }

  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.8); }
    20% { opacity: 0.8; transform: scale(0.8); }
    80% { opacity: 0.8; transform: scale(0.8); }
    100% { opacity: 0; transform: scale(0.8); }
  }
`;

const AppIcon = styled.span`
  font-size: 1.5rem;
  position: relative;
  top: -2px;
`;

const NotificationPopup = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  border: 2px solid #FFFFFF;
  border-radius: 10px;
  padding: 15px 20px;
  color: white;
  font-size: 0.9rem;
  z-index: 1000;
  animation: slideIn 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(255, 105, 180, 0.1);

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
    max-width: 250px;
    font-size: 0.8rem;
    padding: 12px 15px;
  }
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

// Button Section to center the button
const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

// Get Character Button with styling
const GetCharacterButton = styled.a`
  background-color: #FFD700;
  color: black;
  padding: 1rem 2rem;
  -radius: 50px;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const HowItWorksContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #FFFFFF;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 10px;
`;

const HowItWorksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 10px;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.5rem;
  color: #FFFFFF;
  text-align: center;
  width: 100%;
`;

const StepNumber = styled.div`
  color: #FFFFFF;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const CTASection = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,215,0,0.1) 100%);

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const CTATitle = styled.h2`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #FFD700;
  color: black;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid #FFD700;
  animation: pulse 2s infinite;

  &:hover {
    background-color: #FFC500;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem 1.5rem;
    width: 90%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  border: 2px solid #FFFFFF;
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    margin: 1rem auto;
  }
`;

const VideoPrompt = styled(AnimatedArrow)`
  right: 20%;
  top: 30%;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  
  &:after {
    content: '45 seconds that might change your perspective...';
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const VideoNotification = styled(NotificationPopup)`
  top: 20%;
  right: 30%;
  background-color: rgba(0, 0, 0, 0.7);
  animation: slideIn 0.5s ease-out, fadeOut 0.5s ease-in 8s forwards;
`;

const VideoHighlight = styled(AnimatedWord)`
  position: absolute;
  right: 25%;
  top: 20%;
  border: none;
  font-size: 1rem;
  opacity: 0.8;
  animation: pulse 2s infinite;
  
  &:after {
    content: '← 45 second overview';
    color: #FFD700;
  }
`;

const VideoArrow = styled.div`
  position: absolute;
  right: 30%;
  top: 25%;
  color: #FFD700;
  opacity: 0.8;
  transform: rotate(180deg);
  animation: bounce 2s infinite;
  
  &:after {
    content: '45s quick demo →';
    transform: rotate(180deg);
    display: inline-block;
    margin-left: 10px;
  }
`;

const PlayPrompt = styled.div`
  position: absolute;
  right: 28%;
  top: 30%;
  color: #FFD700;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: pulse 2s infinite;
  opacity: 0.8;
  
  &:before {
    content: '▶';
    font-size: 1.5rem;
  }
  
  &:after {
    content: '45s overview';
    font-size: 0.9rem;
  }
`;

function Home() {
  const {
    currentWord,
    currentIdea,
    notification,
    showAppButton
  } = useNotifications(userNames);

  const handleDownloadClick = () => {
    logEvent('Button', 'Download Click', 'App Store Download');
  };

  const handleSocialClick = (network) => {
    logEvent('Social Media', 'Click', network);
  };

  const handleEmailClick = () => {
    logEvent('Contact', 'Email Click', 'Contact Email Button');
  };

  const handleVideoClick = () => {
    logEvent('Video', 'Interaction', 'Demo Video Play');
  };

  const handleAnimatedWordClick = (word) => {
    logEvent('Navigation', 'Word Click', word);
  };

  const handleBusinessClick = () => {
    logEvent('Business', 'Calendar Click', 'Business Meeting Schedule');
  };

  return (
    <>

    
      <HomeContainer>
        <DemoVideoContainer>
          <LeftSection >
            <MainTitle>
            We 10x your brand retention with interactive avatars that cost MUCH less than traditional marketing...   </MainTitle>
            <ButtonGroup>
              <ActionButton className="primary" onClick={() => window.location.href='/contactform'}>
                Bring your brand to life for free.
              </ActionButton>
              <ActionButton className="secondary" onClick={() => window.location.href='https://calendly.com/michael-glimpse/30min?month=2024-12'}>
                Book a meeting
              </ActionButton>
              
              <ActionButton className="secondary" onClick={() => window.location.href='/token'}>
                Learn about $AIP
              </ActionButton>
            </ButtonGroup>
          </LeftSection>
          
          <DemoSection>
            <VideoContainer>
              <iframe
                src="https://www.youtube.com/embed/mVA2vkVIR90"
                title="Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoContainer>
          </DemoSection>
        </DemoVideoContainer>
          
        <ConvaiHolder 
              apiKey="4cd14f36757cce3a936054613761cb0b"
              characterId="3db24478-bb7e-11ef-ab86-42010a7be016"
            />
        <ClientLogoSection />

        <ComparisonTable />
       
        
      </HomeContainer>

      {notification && (
        <NotificationPopup>
          <NotificationIcon>👤</NotificationIcon>
          <div>
            <strong>{notification}</strong> just created their interactive avatar for free!
          </div>
        </NotificationPopup>
      )}

<CTASection>
  
  <CTAButton 
    to="/contactform" 
    onClick={() => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }}
  >
   Bring your brand to life for free.
  </CTAButton>
</CTASection>

      <Social />

     
    </>
  );
}

export default Home;