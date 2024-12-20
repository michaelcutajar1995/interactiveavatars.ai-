import styled from 'styled-components';

const TableContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  overflow-x: auto; // Enables horizontal scroll on mobile if needed
  border: 3px solid #FFFFFF;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const PriceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border: 2px solid ${props => props.isGlimpse ? '#FFFFFF' : 'rgba(255, 255, 255, 0.1)'};

  h3 {
    color: ${props => props.isGlimpse ? '#FFFFFF' : 'white'};
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .price {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  .features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .feature-item {
    display: flex;s
    align-items: center;
    gap: 0.5rem;
    
    &:before {
      content: "✓";
      color: ${props => props.isGlimpse ? '#FFFFFF' : 'white'};
    }
  }
`;

function ComparisonTable() {
  const glimpseFeatures = [
    "Two-way  engagement",
    "Tailored to brand",
    "Immersive yet, ease to use keeps users engaged",
    "Gamified rewards increase recall",
    "Real-time data insights",
    "Data and conversations stored",
    "Reusable avatars"
  ];

  const traditionalFeatures = [
    "Static and passive",
    "Generic campaigns",
    "Limited attention span",
    "Local or limited channels",
    "Low retention",
    "Delayed or minimal tracking",
    "Recurring high costs"
  ];

  return (
    <TableContainer>
      <Table>
        <PriceCard isGlimpse={true}>
          <h3>Glimpse Interactive Characters</h3>
          <div className="price">$200/month</div>
          <div className="features">
            {glimpseFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                {feature}
              </div>
            ))}
          </div>
        </PriceCard>

        <PriceCard isGlimpse={false}>
          <h3>Traditional Marketing</h3>
          <div className="price">$1,000+/month</div>
          <div className="features">
            {traditionalFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                {feature}
              </div>
            ))}
          </div>
        </PriceCard>
      </Table>
    </TableContainer>
  );
}

export default ComparisonTable; 