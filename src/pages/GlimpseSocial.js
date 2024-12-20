import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 6rem 2rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #FFD700;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 2px solid #FFFFFF;
`;

const DownloadButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #000000;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  border: 2px solid #FFFFFF;
  font-size: 1.2rem;
  margin-top: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

function GlimpseSocial() {
  const categories = [
    {
      title: "Educational Journey",
      description: "Learn history with Professor Maggie, your time-traveling teacher",
    },
    {
      title: "Fun & Games",
      description: "Play and compete with Cat-Woman, your energetic game master",
    },
    {
      title: "Time Travel Adventures",
      description: "Explore different eras with Lincoln,  your historical guide",
    },
    {
      title: "Social Interactions",
      description: "Connect with others alongside Skibidi, your social companion",
    }
  ];

  return (
    <PageContainer>
      <Hero>
        <Title>Glimpse Social</Title>
        <Subtitle>
          Experience history through four unique lenses, each with its own AR guide
        </Subtitle>
        <DownloadButton 
          href="https://apps.apple.com/mt/app/glimpse-valletta/id6736998656"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download App
        </DownloadButton>
      </Hero>

      <FeatureGrid>
        {categories.map((category, index) => (
          <FeatureCard key={index}>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <p style={{ color: '#FFD700', marginTop: '1rem' }}>
              {category.character}
            </p>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </PageContainer>
  );
}

export default GlimpseSocial; 