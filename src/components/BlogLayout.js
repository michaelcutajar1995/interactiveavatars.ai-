// Imports
import React from 'react';
import styled from 'styled-components';

// Styled Components
const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const BlogContent = styled.div`
  .blog-post {
    h1 {
      font-size: 2rem;
      margin-bottom: 0.75rem;
      color: ${props => props.theme.colors.primary};
    }
    
    h2 {
      font-size: 1.5rem;
      margin: 1.5rem 0 0.75rem;
    }
    
    p {
      margin-bottom: 1rem;
      line-height: 1.4;
      font-size: 1rem;
    }

    section {
      margin: 1.5rem 0;
    }
  }
`;

// Component
const BlogLayout = ({ children }) => (
  <BlogContainer>
    <BlogContent>
      {children}
    </BlogContent>
  </BlogContainer>
);

// Export
export { BlogLayout };
export default BlogLayout;