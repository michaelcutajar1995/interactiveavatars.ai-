import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const TokenContainer = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 2rem;
  color: white;
`;

const TokenHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const TokenTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const TokenSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const TokenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const TokenCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #FFD700;
`;

const TokenMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 15px;
  margin: 2rem 0;
`;

const Metric = styled.div`
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #FFD700;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ActionButton = styled(Link)`
  display: inline-block;
  background: #FFD700;
  color: black;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const WalletButton = styled.button`
  background: #FFD700;
  color: black;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const WalletStatus = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

const BuyForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  input {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const BuyButton = styled(WalletButton)`
  width: 100%;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const RevenueSection = styled.div`
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,215,0,0.05) 100%);
  padding: 4rem 2rem;
  margin: 4rem -2rem;
  border-radius: 20px;
`;

const RevenueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const RevenueCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 215, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: #FFD700;
    transform: translateY(-5px);
  }
`;

const Highlight = styled.span`
  color: #FFD700;
  font-weight: bold;
`;

const ProjectionTable = styled.div`
  margin-top: 3rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 2rem;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid rgba(255, 215, 0, 0.1);
    }

    th {
      color: #FFD700;
    }
  }
`;

const Flywheel = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  margin: 4rem auto;
  
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const FlywheelSegment = styled.div`
  position: absolute;
  width: 200px;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: scale(1.1);
  }

  &.segment-1 { top: 0; left: 50%; transform: translateX(-50%); }
  &.segment-2 { top: 25%; right: 0; }
  &.segment-3 { bottom: 25%; right: 0; }
  &.segment-4 { bottom: 0; left: 50%; transform: translateX(-50%); }
  &.segment-5 { bottom: 25%; left: 0; }
  &.segment-6 { top: 25%; left: 0; }
`;

const FlywheelSection = () => (
  <Flywheel>
    <FlywheelSegment className="segment-1">Hold $AIP</FlywheelSegment>
    <FlywheelSegment className="segment-2">Access Features</FlywheelSegment>
    <FlywheelSegment className="segment-3">Generate Revenue</FlywheelSegment>
    <FlywheelSegment className="segment-4">Earn Rewards</FlywheelSegment>
    <FlywheelSegment className="segment-5">Stake Tokens</FlywheelSegment>
    <FlywheelSegment className="segment-6">Governance Power</FlywheelSegment>
  </Flywheel>
);

const Calculator = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin: 3rem 0;
`;

const SliderContainer = styled.div`
  margin: 2rem 0;
`;

const TokenCalculator = () => {
  const [tokenAmount, setTokenAmount] = useState(1000);
  
  const calculateBenefits = (amount) => ({
    interactions: Math.floor(amount * 10),
    discount: Math.min(Math.floor(amount / 1000), 30),
    revenue: (amount * 0.02).toFixed(2),
    governanceWeight: Math.floor(amount / 100)
  });

  const benefits = calculateBenefits(tokenAmount);

  return (
    <Calculator>
      <h3>Benefit Calculator</h3>
      <SliderContainer>
        <input 
          type="range" 
          min="1000" 
          max="100000" 
          value={tokenAmount}
          onChange={(e) => setTokenAmount(Number(e.target.value))}
        />
        <div>Token Amount: {tokenAmount} $AIP</div>
      </SliderContainer>
      <div>
        <p>Monthly Interactions: {benefits.interactions}</p>
        <p>Platform Discount: {benefits.discount}%</p>
        <p>Revenue Share: ${benefits.revenue}</p>
        <p>Governance Weight: {benefits.governanceWeight}</p>
      </div>
    </Calculator>
  );
};

function TokenInfo() {
  const { connectWallet, account, loading } = useWeb3();

  return (
    <TokenContainer>
      <TokenHeader>
        <TokenTitle>$AIP Token</TokenTitle>
        <TokenSubtitle>Power your interactive avatar experience with $AIP</TokenSubtitle>
        
        <WalletStatus>
          {account ? (
            <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
          ) : (
            <WalletButton onClick={connectWallet} disabled={loading}>
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </WalletButton>
          )}
        </WalletStatus>
      </TokenHeader>

      <TokenMetrics>
        <Metric>
          <MetricValue>$0.10</MetricValue>
          <MetricLabel>Current Price</MetricLabel>
        </Metric>
        <Metric>
          <MetricValue>10M</MetricValue>
          <MetricLabel>Total Supply</MetricLabel>
        </Metric>
        <Metric>
          <MetricValue>15%</MetricValue>
          <MetricLabel>Staking APY</MetricLabel>
        </Metric>
        <Metric>
          <MetricValue>2.5M</MetricValue>
          <MetricLabel>Tokens Staked</MetricLabel>
        </Metric>
      </TokenMetrics>

      <TokenGrid>
        <TokenCard>
          <CardTitle>Token Utility</CardTitle>
          <ul>
            <li>Access premium avatar features</li>
            <li>Participate in governance</li>
            <li>Earn staking rewards</li>
            <li>Get discounts on interactions</li>
            <li>Share platform revenue</li>
          </ul>
        </TokenCard>

        <TokenCard>
          <CardTitle>Staking Benefits</CardTitle>
          <ul>
            <li>15% APY rewards</li>
            <li>Up to 30% discount on interactions</li>
            <li>Enhanced governance weight</li>
            <li>Priority support access</li>
            <li>Early access to new features</li>
          </ul>
        </TokenCard>

        <TokenCard>
          <CardTitle>Governance Rights</CardTitle>
          <ul>
            <li>Vote on platform updates</li>
            <li>Propose new features</li>
            <li>Participate in tokenomics decisions</li>
            <li>Influence avatar customization options</li>
            <li>Shape platform development</li>
          </ul>
        </TokenCard>
      </TokenGrid>

      <TokenCard>
        <CardTitle>How to Get Started</CardTitle>
        <ol>
          <li>Connect your wallet</li>
          <li>Purchase $AIP tokens</li>
          <li>Stake tokens for benefits</li>
          <li>Access premium features</li>
          <li>Participate in governance</li>
        </ol>
        <ActionButton to="/buy-tokens">Buy $AIP Tokens</ActionButton>
      </TokenCard>

      <TokenCard>
        <CardTitle>Buy $AIP Tokens</CardTitle>
        <BuyForm>
          <input type="number" placeholder="Amount in USD" />
          <BuyButton onClick={connectWallet} disabled={!account}>
            Buy Tokens
          </BuyButton>
        </BuyForm>
      </TokenCard>

      <RevenueSection>
        <h2>Revenue Sharing & Business Potential</h2>
        <p>Join the AI revolution and earn from every interaction on our platform</p>

        <RevenueGrid>
          <RevenueCard>
            <h3>Platform Revenue Share</h3>
            <ul>
              <li>Earn <Highlight>2%</Highlight> of all platform fees when holding 10,000+ $AIP</li>
              <li>Earn <Highlight>5%</Highlight> of all platform fees when holding 50,000+ $AIP</li>
              <li>Earn <Highlight>10%</Highlight> of all platform fees when holding 100,000+ $AIP</li>
            </ul>
          </RevenueCard>

          <RevenueCard>
            <h3>Business Integration Benefits</h3>
            <ul>
              <li>Reduce customer service costs by up to <Highlight>60%</Highlight></li>
              <li>Increase customer engagement by <Highlight>300%</Highlight></li>
              <li>24/7 AI-powered business presence</li>
              <li>Priority API access for enterprise integration</li>
            </ul>
          </RevenueCard>

          <RevenueCard>
            <h3>Growth Potential</h3>
            <ul>
              <li>Early access to new AI features</li>
              <li>Governance voting rights on platform development</li>
              <li>Network effect as platform grows</li>
              <li>First-mover advantage in AI avatar space</li>
            </ul>
          </RevenueCard>
        </RevenueGrid>

        <ProjectionTable>
          <h3>Revenue Projection Examples</h3>
          <table>
            <thead>
              <tr>
                <th>Token Holding</th>
                <th>Monthly Platform Interactions</th>
                <th>Your Revenue Share</th>
                <th>Additional Benefits Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10,000 $AIP</td>
                <td>100,000</td>
                <td>$2,000/month</td>
                <td>$1,500/month</td>
              </tr>
              <tr>
                <td>50,000 $AIP</td>
                <td>100,000</td>
                <td>$5,000/month</td>
                <td>$3,750/month</td>
              </tr>
              <tr>
                <td>100,000 $AIP</td>
                <td>100,000</td>
                <td>$10,000/month</td>
                <td>$7,500/month</td>
              </tr>
            </tbody>
          </table>
        </ProjectionTable>
      </RevenueSection>

      <FlywheelSection />

      <TokenCalculator />
    </TokenContainer>
  );
}

export default TokenInfo; 