import React, { useState } from 'react';
import styled from 'styled-components';
import { useWeb3 } from '../context/Web3Context';

const StakingContainer = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 2rem;
  color: white;
`;

const StakingHero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const StakingProcess = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 4rem 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FFD700, transparent);
    z-index: -1;
  }
`;

const ProcessStep = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 215, 0, 0.1);

  .step-number {
    background: #FFD700;
    color: black;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-weight: bold;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 4rem 0;
`;

function StakingPage() {
  return (
    <StakingContainer>
      <StakingHero>
        <h1>Stake $AIP, Unlock Benefits</h1>
        <p>Earn rewards while powering the future of interactive AI</p>
      </StakingHero>

      <StakingProcess>
        <ProcessStep>
          <div className="step-number">1</div>
          <h3>Stake Tokens</h3>
          <p>Lock your $AIP tokens in the staking contract</p>
          <ul>
            <li>Minimum stake: 5,000 $AIP</li>
            <li>Lock period: 30 days minimum</li>
            <li>Flexible withdrawal after lock period</li>
          </ul>
        </ProcessStep>

        <ProcessStep>
          <div className="step-number">2</div>
          <h3>Earn Benefits</h3>
          <p>Immediately unlock platform benefits</p>
          <ul>
            <li>20-30% interaction discount</li>
            <li>Priority support access</li>
            <li>Enhanced features</li>
          </ul>
        </ProcessStep>

        <ProcessStep>
          <div className="step-number">3</div>
          <h3>Grow Revenue</h3>
          <p>Generate passive income</p>
          <ul>
            <li>15% APY rewards</li>
            <li>Platform fee sharing</li>
            <li>Compound your earnings</li>
          </ul>
        </ProcessStep>
      </StakingProcess>

      <BenefitsGrid>
        <div>
          <h2>Staking Tiers</h2>
          <table>
            <thead>
              <tr>
                <th>Tier</th>
                <th>Amount</th>
                <th>Benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Silver</td>
                <td>5,000 $AIP</td>
                <td>20% discount on interactions</td>
              </tr>
              <tr>
                <td>Gold</td>
                <td>15,000 $AIP</td>
                <td>30% discount + revenue sharing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BenefitsGrid>
    </StakingContainer>
  );
}

export default StakingPage; 