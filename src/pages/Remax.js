import React from 'react';
import styled from 'styled-components';
import { ConvaiHolder } from '../components/ConvaiHolder';

const PageContainer = styled.div`
  padding: 6rem 2rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #FFD700;
  text-align: center;
`;

const ConvaiContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 80vh;
  position: relative;
`;

function Remax() {
  return (
    <PageContainer>
      <ConvaiContainer>
        <ConvaiHolder 
          apiKey="4cd14f36757cce3a936054613761cb0b" 
          characterId="3db24478-bb7e-11ef-ab86-42010a7be016"
        />
      </ConvaiContainer>
    </PageContainer>
  );
}

export default Remax; 