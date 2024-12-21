import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TickerBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  color: #FFD700;
  padding: 5px 0;
  font-family: 'Roboto Mono', monospace;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceDisplay = styled.span`
  font-size: 14px;
  font-weight: bold;
  ${props => props.isUp ? 'color: #00ff00;' : 'color: #ff0000;'}
  transition: color 0.3s ease;
`;

const Change = styled.span`
  margin-left: 10px;
  font-size: 12px;
  ${props => props.isUp ? 'color: #00ff00;' : 'color: #ff0000;'}
`;

const Arrow = styled.span`
  margin-left: 5px;
`;

function PriceBar() {
  const [price, setPrice] = useState(0.10);
  const [prevPrice, setPrevPrice] = useState(0.10);
  const [isUp, setIsUp] = useState(true);

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevPrice(price);
      const change = (Math.random() - 0.5) * 0.001;
      const newPrice = Math.max(0.095, Math.min(0.105, price + change));
      setPrice(newPrice);
      setIsUp(newPrice > prevPrice);
    }, 2000);

    return () => clearInterval(interval);
  }, [price, prevPrice]);

  const calculateChange = () => {
    const change = ((price - 0.10) / 0.10) * 100;
    return change.toFixed(2);
  };

  return (
    <TickerBar>
      <PriceDisplay isUp={isUp}>
        $AIP: ${price.toFixed(4)}
      </PriceDisplay>
      <Change isUp={isUp}>
        {calculateChange()}%
        <Arrow>{isUp ? '↑' : '↓'}</Arrow>
      </Change>
    </TickerBar>
  );
}

export default PriceBar; 