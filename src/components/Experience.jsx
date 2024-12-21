import {
  ContactShadows,
  Grid,
  OrbitControls,
  Sky,
  Html,
} from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { ConvaiFPS } from '../fps/convaifps.jsx';

import { Eman } from './models/Eman';
import Mans from './models/Mans';

export const Experience = ({ client, character = 'eman' }) => {
  const [gravity, setGravity] = useState([0, 0, 0]);

  useEffect(() => {
    setGravity([0, -9.81, 0]);
  }, []);

  const renderCharacter = () => {
    switch(character) {
      case 'mans':
        return <Mans client={client} position={[0, 0, 1]} />;
      case 'eman':
      default:
        return <Eman client={client} position={[0, 0, 1.5]} />;
    }
  };

  return (
    <>
      {/* lights */}
      <ambientLight intensity={0.2} />
      <hemisphereLight
        skyColor={'#ffffff'}
        groundColor={'#333333'}
        intensity={0.5}
        castShadow
      />
      <directionalLight
        position={[50, 50, 50]}
        color={'#ffffff'}
        intensity={1.0}
        castShadow
      />

      {/* models */}
      <OrbitControls />
      <Suspense>
        <Physics gravity={gravity}>
          <ConvaiFPS />
          {renderCharacter()}
          
          <Grid 
            followCamera 
            infiniteGrid 
            fadeDistance={30}
            cellColor={'#000000'}
            sectionColor={'#000000'}
            fadeStrength={2}
            cellSize={0.3}
            sectionSize={1.5}
          />
          <RigidBody type="fixed">
            <CuboidCollider args={[5, 5, 0.1]} position={[0, 1.5, 1]} />
            <CuboidCollider
              args={[5, 5, 0.1]}
              position={[0, 1.5, 4]}
              rotation={[-Math.PI / 8, 0, 0]}
            />
            <CuboidCollider
              args={[5, 5, 0.1]}
              position={[0, -0.2, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <CuboidCollider
              args={[5, 5, 0.1]}
              position={[3, 1.5, 0]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <CuboidCollider
              args={[5, 5, 0.1]}
              position={[-3, 1.5, 0]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </RigidBody>
        </Physics>
      </Suspense>
      <ContactShadows opacity={0.7} />
    </>
  );
};
