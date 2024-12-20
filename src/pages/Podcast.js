import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const PodcastContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PodcastHeader = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  color: white;
  margin-top: 7rem;
`;

const PodcastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const EpisodeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EpisodeTitle = styled.h2`
  font-size: 1.5rem;
  color: #FFD700;
  margin-bottom: 1rem;
`;

const EpisodeDescription = styled.p`
  color: white;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const EpisodeDate = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const ListenButton = styled.a`
  display: inline-block;
  background: #FFD700;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-left: 2rem;
  text-decoration: none;
  margin-top: 1rem;
  
  &:hover {
    background: #FFC700;
  }
`;

// Sample podcast episodes data
const podcastEpisodes = [
  {
    id: 1,
    title: "Coming Soon: The Future of Augmented Intelligent Reality",
    description: "Exploring how AIR is revolutionizing the way we interact with digital information and reshaping our daily experiences.",
    date: "September 15th, 2024",
    link: "#"
  },
  {
    id: 2,
    title: "Coming Soon: From Finance to Tech - A Journey into AI",
    description: "Michael shares his personal journey from chartered accountancy to founding a cutting-edge AI company.",
    date: "October 1st, 2024",
    link: "#"
  },
  {
    id: 3,
    title: "Coming Soon: Education in the Age of AI",
    description: "How augmented intelligence is transforming learning experiences and creating new possibilities in education.",
    date: "October 15th, 2024",
    link: "#"
  },

];

function Podcast() {
  return (
    <PodcastContainer>
      <Helmet>
        <title>Glimpse</title>
        <meta name="description" content="Join Michael Cutajar for discussions about augmented intelligence, virtual reality, and the future of human-AI interaction." />
      </Helmet>

      <PodcastHeader>The Glimpse Podcast - a focus on AR, VR and AI</PodcastHeader>
      
      <PodcastGrid>
        {podcastEpisodes.map((episode) => (
          <EpisodeCard key={episode.id}>
            <EpisodeTitle>{episode.title}</EpisodeTitle>
            <EpisodeDescription>{episode.description}</EpisodeDescription>
            <EpisodeDate>{episode.date}</EpisodeDate>
            <ListenButton href={episode.link} target="_blank" rel="noopener noreferrer">
              Listen Now
            </ListenButton>
          </EpisodeCard>
        ))}
      </PodcastGrid>
    </PodcastContainer>
  );
}

export default Podcast;
