import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const TierContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 300px));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const TierCard = styled.div`
  background: ${props => props.featured ? '#1A1A1A' : '#111111'};
  border: ${props => props.featured ? '2px solid #FFD700' : '1px solid #333'};
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  
  ${props => props.featured && `
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
  `}
`;

const TierBadge = styled.div`
  position: absolute;
  top: -12px;
  right: 20px;
  background: #FFD700;
  color: black;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #FFD700 0%, #FFC000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 2rem 0;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: left;
  font-size: 0.9rem;
`;

const FeatureIcon = styled.div`
  font-size: 1.8rem;
  margin-right: 1rem;
  color: #FFD700;
  min-width: 40px;
`;

const FeatureText = styled.div`
  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #FFFFFF;
  }
  
  p {
    margin: 0.5rem 0 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
`;

const PriceTag = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1.5rem 0;
  
  span {
    font-size: 0.9rem;
    opacity: 0.7;
  }
`;

const SubscribeButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: #FFD700;
  color: #000000;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
    background: #FFC000;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 1rem;
`;

function PremiumUpgrade() {
  const { user } = useAuth();
  
  const tiers = [
    {
      name: "Free",
      price: "0",
      features: [
        "A maximum of 50 interactions",
        "Personal avatar link",
        "Basic profile description",
        "Default avatar appearance",
        "Default voice",
      ],
      buttonText: "Get Started",
      stripeLink: "/contactform"
    },
    {
      name: "Business",
      price: "1,250",
      pricePerInteraction: "0.42USD",
      featured: true,
      features: [
        "3000 total interactions",
        "Interactive avatar, with picture resemblance",
        "Monthly user interaction data",
        "Enhanced profile customization",
        "Priority support",
        "Custom voice creation",
        "Website integration options"
      ],
      buttonText: "Upgrade to Business",
      stripeLink: "https://buy.stripe.com/3cs5mh6Sa5jE8CsbIK",
      hasGuarantee: true
    },
    {
      name: "Pro",
      price: "2,999",
      pricePerInteraction: "0.33USD",
      features: [
        "5000 total interactions",
        "Business QR code",
        "Monthly user interaction data",
        "Professional 3D modeling work for extra detail.",
        "Custom voice creation",
        "Premium support",
        "Free Website integration options"
      ],
      buttonText: "Upgrade to Pro",
      stripeLink: "https://buy.stripe.com/aEUg0V7WebI2cSI4gk",
      hasGuarantee: true
    }
  ];

  const handleSubscribe = async (stripeLink) => {
    const urlWithEmail = `${stripeLink}?prefilled_email=${encodeURIComponent(user.email)}`;
    window.location.href = urlWithEmail;
  };

  return (
    <PageContainer>
      <Title>Choose Your Plan</Title>
      <TierContainer>
        {tiers.map((tier, index) => (
          <TierCard key={index} featured={tier.featured}>
            {tier.featured && <TierBadge>Most Popular</TierBadge>}
            <h2>{tier.name}</h2>
            <PriceTag>
              ${tier.price} <span>{tier.price === "0" ? "" : "one-time payment"}</span>
            </PriceTag>
            <FeatureGrid>
              {tier.features.map((feature, featureIndex) => (
                <FeatureItem key={featureIndex}>
                  <FeatureIcon>✓</FeatureIcon>
                  <FeatureText>
                    <p>{feature}</p>
                  </FeatureText>
                </FeatureItem>
              ))}
            </FeatureGrid>
            <SubscribeButton 
              onClick={() => handleSubscribe(tier.stripeLink)}
              style={{
                background: "#FFD700"
              }}
            >
              {tier.buttonText}
            </SubscribeButton>
          </TierCard>
        ))}
      </TierContainer>
      <Disclaimer>
        7 day money back guarantee. All paid tiers are one-time purchases. Access features immediately after payment.
      </Disclaimer>
    </PageContainer>
  );
}

export default PremiumUpgrade; 