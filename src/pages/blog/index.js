import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Define all styled components first
const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;


  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
`;

const BlogCard = styled(Link)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  aspect-ratio: 1;
  background: #2D2D3A;
  border: 3px solid #FFFFFF;

  &:hover {
    transform: translateY(-4px);
    transition: transform 0.2s ease;
  }

  @media (max-width: 480px) {
    aspect-ratio: auto;
    border-radius: 8px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
`;

const Category = styled.div`
  display: inline-block;
  background: rgba(255,255,255,0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

// Add new styled component for the counter
const CounterText = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #FFFFFF;  // Using the yellow color from the site
  margin-top: 5rem;
  margin-bottom: 1rem;
  margin-left: 50px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  &:after {
    content: ' articles';
    font-size: 1rem;
    font-weight: normal;
    color: #fff;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-left: 20px;
    margin-top: 2rem;
  }
`;

// Sample data
export const blogPosts = [
  {
    id: 1,
    title: "The Future of Personalized Virtual Assistants: What You Need to Know..",
    category: "Insights",
    backgroundImage: "/blogimages/blog1.jpg",
    slug: "future-of-personalized-virtual-assistants"
  },
  {
    id: 2,
    title: "Revolutionizing Education using Augmented Intelligence",
    category: "Education",
    backgroundImage: "/blogimages/DunKarmteaching.png",
    slug: "augmented-intelligence-classroom-revolution"
  },
  {
    id: 3,
    title: "Top 5 Ways Immersive Travel Experiences Will Change Your Journeys",
    category: "Travel",
    backgroundImage: "/blogimages/speakingatevent.png",
    slug: "immersive-travel-experiences"
  },
  {
    id: 4,
    title: "Augmented Intelligent Reality (AIR): The Future of AI Meets AR",
    category: "Technology",
    backgroundImage: "/othersiteimages/careers.jpg",
    slug: "augmented-intelligent-reality-future"
  },
  {
    id: 5,
    title: "24/7 Virtual Spa Assistants: Revolutionizing Hotel Wellness Services",
    category: "Hospitality",
    backgroundImage: "/blogimages/SpasAr.jpg",
    slug: "virtual-spa-assistants"
  },
  {
    id: 6,
    title: "How Augmented Intelligent Reality with Glimpse Can Revolutionize Retail Shopping",
    category: "Retail",
    backgroundImage: "/blogimages/ShoppingAR.webp",
    slug: "revolutionize-retail-shopping"
  },
  {
    id: 7,
    title: "How Augmented Intelligent Reality Can Revolutionize Dining with Glimpse",
    category: "Hospitality",
    backgroundImage: "/blogimages/ArDinig.jpg",
    slug: "revolutionize-dining-experience"
  }
];

// Component definition after all styled components
const BlogIndex = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <CounterText>{blogPosts.length}</CounterText>
      <h1 style={{ marginBottom: '2rem', marginLeft: '50px' }}>Blogs: News, Insights, Fun</h1>
      <BlogGrid>
        {blogPosts.map((post) => (
          <BlogCard key={post.id} to={`/blog/${post.slug}`}>
            <CardImage 
              src={post.backgroundImage}
              alt={post.title}
            />
            <CardContent>
              <Category>{post.category}</Category>
              <Title>{post.title}</Title>
            </CardContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </div>
  );
};

export default BlogIndex; 