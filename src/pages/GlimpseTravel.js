import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 2px solid #FFFFFF;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DownloadButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #000000;
  color: white;
  border: 2px solid #FFFFFF;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.2rem;
  margin-top: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CharacterCount = styled.div`
  font-size: 2.5rem;
  color: #FFD700;
  margin-bottom: 1rem;
`;

function GlimpseTravel() {
  const categories = [
    {
      title: "Historical Figures",
      count: "3",
      description: "Meet famous personalities from the past"
    },
    {
      title: "Local Guides",
      count: "5+",
      description: "Discover hidden gems with knowledgeable locals"
    },
    {
      title: "Mythical Creatures",
      count: "5",
      description: "Encounter legendary beings from folklore"
    },
    {
      title: "Cultural Icons",
      count: "7,000+",
      description: "Interact with beloved cultural figures"
    }
  ];

  return (
    <PageContainer>
      <Hero>
        <Title>Glimpse Travel</Title>
        <Subtitle>
          Explore the world with over 10 characters placed in over 25,000 locations worldwide, from Malta to the Maldives.
          
        </Subtitle>
        <DownloadButton 
          href="https://apps.apple.com/mt/app/glimpse-valletta/id6736998656"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download App
        </DownloadButton>
      </Hero>

      <CategoryGrid>
        {categories.map((category, index) => (
          <CategoryCard key={index}>
            <CharacterCount>{category.count}</CharacterCount>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </PageContainer>
  );
}

export default GlimpseTravel; 