
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { blogContent } from '../blogdata/blogContent.mjs';

const BlogContainer = styled.div`
  width: 100%;
  padding: 1rem 5%;
  margin: 0;
`;

const BlogHeader = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: rem;
  line-height: 1.1;
  color: white;
  margin-top: 7rem;
`;

const Content = styled.div`
  line-height: 1.4;
  color: white;
  width: 100%;
  
  p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  h2, h3 {
    font-size: 2rem;
    margin: 1.5rem 0 0.75rem 0;
    color: white;
  }
  
  ul {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  a {
    color: #6B5FFF;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthorSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  text-align: left;
  font-style: italic;
`;

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogContent[slug];

  if (!post) {
    console.log('Post not found for slug:', slug);
    return <Navigate to="/blog" replace />;
  }

  return (
    <BlogContainer>
      <BlogHeader>
        <Title>{post.title}</Title>
      </BlogHeader>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Content>
      <AuthorSection>
        <p>Written by Michael Cutajar</p>
      </AuthorSection>
    </BlogContainer>
  );
};

export default BlogPost;