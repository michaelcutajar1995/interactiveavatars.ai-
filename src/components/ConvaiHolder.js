import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Loader } from '@react-three/drei';
import { Experience } from './Experience';
import ChatBubblev1 from '../chat/ChatBubblev1';
import ResetButton from '../chat/Chat';
import { useConvaiClient } from '../hooks/useconvaiclient';

export function ConvaiHolder({ apiKey, characterId, character = 'eman' }) {
  const { client } = useConvaiClient(characterId, apiKey);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className={`convai-holder ${isMobile ? 'mobile-layout' : 'desktop-layout'}`}
      style={{ 
        pointerEvents: isInteracting ? 'none' : 'auto',
        touchAction: isInteracting ? 'none' : 'auto'
      }}
    >
      <div 
        className="canvas-container" 
        style={{ 
          position: 'relative',
          pointerEvents: 'none' 
        }}
        onMouseDown={() => setIsInteracting(true)}
        onMouseUp={() => setIsInteracting(false)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
        onTouchCancel={() => setIsInteracting(false)}
      >
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
            { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
            { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
            { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
            { name: 'sprint', keys: ['Shift'] },
            { name: 'jump', keys: ['Space'] },
          ]}
        >
          <Loader />
          <Canvas
            shadows
            camera={{
              position: isMobile ? [0, 1.2, 8] : [0, 1.8, 2],
              fov: isMobile ? 90 : 75,
            }}
            style={{ 
              pointerEvents: isInteracting ? 'auto' : 'none'
            }}
          >
            <Experience client={client} character={character} />
          </Canvas>
          <div className="chat-interface">
            <ChatBubblev1 
              client={client} 
              isMobile={isMobile}
            />
          </div>
        </KeyboardControls>
      </div>
    </div>
  );
}