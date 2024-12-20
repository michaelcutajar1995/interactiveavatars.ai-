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

const BookButton = styled.a`
  display: inline-block;
  padding: 1.2rem 2.5rem;
  background-color: #FFD700;
  color: black;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const UseCaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const UseCaseCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 2px solid #FFFFFF;
`;

function GlimpseBusiness() {
  const useCases = [
    {
      title: "Virtual Staff",
      description: "Create AI-powered characters to assist customers 24/7"
    },
    {
      title: "Brand Ambassadors",
      description: "Custom characters that represent your brand personality"
    },
    {
      title: "Interactive Guides",
      description: "Location-based characters to enhance customer experience"
    }
  ];

  return (
    <PageContainer>
      <Hero>
        <Title>Glimpse Business</Title>
        <Subtitle>
          Custom AR characters tailored for your business needs
        </Subtitle>
        <BookButton 
          href="https://calendly.com/michael-glimpse/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Meeting Now
        </BookButton>
      </Hero>

      <UseCaseGrid>
        {useCases.map((useCase, index) => (
          <UseCaseCard key={index}>
            <h3>{useCase.title}</h3>
            <p>{useCase.description}</p>
          </UseCaseCard>
        ))}
      </UseCaseGrid>
    </PageContainer>
  );
}

export default GlimpseBusiness; 