import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Loader } from '@react-three/drei';
import { Experience } from './Experience';
import ChatBubblev1 from '../chat/ChatBubblev1';
import ResetButton from '../chat/Chat';
import { useConvaiClient } from '../hooks/useConvaiclient';

export function ConvaiHolder({ apiKey, characterId, character = 'eman' }) {
  const { client } = useConvaiClient(characterId, apiKey);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`convai-holder ${isMobile ? 'mobile-layout' : 'desktop-layout'}`}>
      <div className="canvas-container" style={{ position: 'relative' }}>
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
              position: isMobile ? [0, 1.2, 8] : [0, 1.8, 3],
              fov: isMobile ? 90 : 75,
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