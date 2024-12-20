import React, { useState } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const PageContainer = styled.div`
  padding: 4rem 10%;
  color: white;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 2rem 5%;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 76.25%;
  height: 0;
  overflow: hidden;
  width: 100%;
  max-width: 500px;
  background: black;
  border-radius: 15px;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoInfo = styled.div`
  font-size: 0.8rem;
  max-width: 500px;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    max-width: 100%;
    font-size: 0.9rem;
  }
`;

const ChatSection = styled.div`
  grid-column: 1 / -1;  // Makes it span full width
  margin-top: 2rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 15px;
`;

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

const CharacterDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const CharacterAvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  
  canvas {
    touch-action: none;
  }
`;

const CharacterAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const CharacterInfo = styled.div`
  flex: 1;
`;

const MessageList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 1rem;
  color: white;
`;

const Message = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: ${props => props.isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(91, 33, 182, 0.3)'};
  ${props => props.emotion && `
    border-left: 3px solid ${getEmotionColor(props.emotion)};
  `}
`;

// Helper function to get color based on emotion
const getEmotionColor = (emotion) => {
  const emotionColors = {
    JOY: '#4CAF50',
    ANGER: '#F44336',
    SURPRISE: '#FFC107',
    SADNESS: '#2196F3',
    // Add more emotions as needed
  };
  return emotionColors[emotion] || 'transparent';
};

function VideoDisplay() {
  const videos = [
    { id: 1, src: "https://www.youtube.com/embed/F7sr6saktg0", title: "Abraham Lincoln talking about Elon Musk in Sf", character: "Lincoln AKA Big Linc", description: "His take on Elon Musk" },
    { id: 2, src: "https://www.youtube.com/embed/MX_L6-E0EiM", title: "Princess Leia's IN THE BAY AREA", character: "Princess Leia", description: "She's only got one mission" },
    { id: 3, src: "https://www.youtube.com/embed/pKcH9R-WsTE", title: "Interactive Priest in the Bay Area", character: "The Priest", description: "Over 200 years old" },
    { id: 4, src: "https://www.tiktok.com/embed/7428954864807349546", title: "Skibidi ..talks?", character: "Skibidi", description: "We've given him a new mission" },
    { id: 5, src: "https://www.youtube.com/embed/2zyPDclRmHk", title: "Why is Catwoman hanging around San Francisco?", character: "Catwoman", description: "Catwoman prowling SF" },
  ];

  return (
    <PageContainer>
      {videos.map(video => (
        <div key={video.id} style={{ gridColumn: video.id === 4 ? '1' : 'auto' }}>
          <VideoWrapper>
            <Iframe
              src={video.src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </VideoWrapper>
          <VideoInfo>
            <p><strong>Character:</strong> {video.character}</p>
            <p><strong>Description:</strong> {video.description}</p>
          </VideoInfo>
        </div>
      ))}

     
    </PageContainer>
  );
}

// Create a new component for the 3D model
function Character({ url }) {
  const { scene } = useGLTF(url);
  
  useFrame((state) => {
    if (scene) {
      scene.rotation.y += 0.005;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <primitive object={scene} scale={2} position={[0, -2, 0]} />
    </>
  );
}

const InworldChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [character, setCharacter] = useState({
    name: 'Cat-Woman',
    modelUrl: '/Catwoman.glb',
    currentEmotion: null
  });

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { text: inputText, isUser: true }]);

    try {
      const response = await fetch('https://api.inworld.ai/v1/workspaces/93d1d545-c522-4d79-ac90-c66a599310be/characters/ronald_mcdonald:simpleSendText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Basic MElhaWtSTkxsbDR6TXpQNEJuQ1BIcGkyTWpNZFE1UXo6dkZBOW5FVVNhd2d2dVkzdm5BVVBGZWxFZkpnTWphd01waXpqYXpZZzFiWW9vQ01NWUd6bDN4cDlkVGxCU0hYWA=='
        },
        body: JSON.stringify({
          character: "workspaces/93d1d545-c522-4d79-ac90-c66a599310be/characters/ronald_mcdonald",
          text: inputText,
          endUserFullname: "Website Visitor",
          endUserId: "12345"
        })
      });

      const data = await response.json();
      
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      if (data.textList && data.textList.length > 0) {
        // Update character's emotion if present
        if (data.emotion) {
          setCharacter(prev => ({
            ...prev,
            currentEmotion: data.emotion
          }));
        }

        // Add AI response with emotion
        setMessages(prev => [...prev, { 
          text: data.textList[0], 
          isUser: false,
          emotion: data.emotion
        }]);
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        isUser: false 
      }]);
    }

    setInputText('');
  };

  return (
    <>
      <CharacterDisplay>
        <CharacterAvatarContainer>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Character url={character.modelUrl} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </CharacterAvatarContainer>
        <CharacterInfo>
          <h3>{character.name}</h3>
          {character.currentEmotion && (
            <small>Current mood: {character.currentEmotion.behavior} ({character.currentEmotion.strength})</small>
          )}
        </CharacterInfo>
      </CharacterDisplay>

      <MessageList>
        {messages.map((msg, index) => (
          <Message 
            key={index} 
            isUser={msg.isUser}
            emotion={msg.emotion?.behavior}
          >
            <strong>{msg.isUser ? 'You' : character.name}:</strong> {msg.text}
          </Message>
        ))}
      </MessageList>
      
      <ChatInput>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </ChatInput>
    </>
  );
};

const ChatInput = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #5B21B6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #4C1D95;
  }
`;

export default VideoDisplay;