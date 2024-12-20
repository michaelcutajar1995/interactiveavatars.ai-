import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaSnapchatGhost } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { logSocialClick } from '../utils/analytics';

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  gap: 2rem;
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const ContactText = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  text-align: center;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem 0;
`;

const SocialIcon = styled.a`
  font-size: 1.8rem;
  color: white;
  text-decoration: none;
  padding: 0.8rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(255, 105, 180, 0.2);
  }
`;

function Social() {
  const socialPlatforms = [
    {
      title: "Twitter",
      icon: <FaTwitter />,
      link: "https://x.com/Meta_MikeM"
    },
    {
      title: "Facebook",
      icon: <FaFacebook />,
      link: "https://www.facebook.com/glimpse.wiki"
    },
    {
      title: "Instagram",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/glimpse.stories//"
    },
    {
      title: "Snapchat",
      icon: <FaSnapchatGhost />,
      link: "interactive-ai"
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/company/glimpsewiki/?viewAsMember=true"
    },
    {
      title: "Email",
      icon: <MdEmail />,
      link: `mailto:michael@glimpse.wiki?subject=${encodeURIComponent('Contact from Website')}&body=${encodeURIComponent('Hello,\n\n')}`
    }
  ];

  return (
    <SocialSection>
      <ContactTitle>Get in Touch</ContactTitle>
      <ContactText>
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </ContactText>
      <SocialContainer>
        {socialPlatforms.map((platform, index) => (
          <SocialIcon
            key={index}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => logSocialClick(platform.title)}
            aria-label={platform.title}
          >
            {platform.icon}
          </SocialIcon>
        ))}
      </SocialContainer>
    </SocialSection>
  );
}

export default Social; 