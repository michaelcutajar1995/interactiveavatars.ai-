import React from 'react';
import styled from 'styled-components';
import { ConvaiHolder } from '../components/ConvaiHolder';

const PageContainer = styled.div`
  padding: 6rem 2rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const ConvaiContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 80vh;
  position: relative;
  
`;

function Mans() {
  return (
    <PageContainer>
      <ConvaiContainer>
        <ConvaiHolder 
          apiKey="4cd14f36757cce3a936054613761cb0b" 
          characterId="e2fa5248-bedc-11ef-8179-42010a7be016"
          character="mans"
        />
      </ConvaiContainer>
    </PageContainer>
  );
}

export default Mans; 