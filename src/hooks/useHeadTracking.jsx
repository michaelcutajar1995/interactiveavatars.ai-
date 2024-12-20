import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const useHeadTracking = ({ client, nodes, RPM }) => {
  useFrame((state, _delta) => {
    if (
      client?.action?.currentAction &&
      client?.action?.currentAction !== 'None'
    ) {
      return;
    }
    const cameraWorldDirection = state.camera.getWorldDirection(
      new THREE.Vector3()
    );
    const cameraWorldPosition = state.camera.getWorldPosition(
      new THREE.Vector3()
    );
    
    const headNode = nodes.Wolf3D_Head || nodes.Head;
    const npcWorldDirection = headNode.getWorldDirection(new THREE.Vector3());
    const npcWorldPosition = headNode.getWorldPosition(new THREE.Vector3());
    
    cameraWorldDirection.normalize();
    npcWorldDirection.normalize();
    const angle = Math.acos(cameraWorldDirection.dot(npcWorldDirection));
    const angelDegrees = THREE.MathUtils.radToDeg(angle);
    const distance = cameraWorldPosition.distanceTo(npcWorldPosition);
    
    if (client?.isTalking && angelDegrees > 120 && angelDegrees < 260) {
      if (distance < 5) {
        // Head Lock
        if (RPM) {
          headNode.lookAt(cameraWorldPosition);
        }
      }
    } else if (!client?.isTalking && angelDegrees > 120 && angelDegrees < 260)
      if (distance < 5) {
        // Head Lock
        if (RPM) {
          headNode.lookAt(cameraWorldPosition);
        }
      }
  });
};
