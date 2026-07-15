import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Lighting = React.memo(function Lighting({
  scrollProgress = 0,
  mouse = { x: 0, y: 0 },
}) {
  const keyLightRef = useRef();

  useFrame((state, delta) => {
    if (!keyLightRef.current) return;

    // Gentle key light shift based on scroll — very subtle
    const scrollAngle = scrollProgress * Math.PI * 0.3;
    
    keyLightRef.current.position.x = THREE.MathUtils.lerp(
      keyLightRef.current.position.x,
      5 + mouse.x * 1.5,
      delta * 2
    );
    keyLightRef.current.position.y = THREE.MathUtils.lerp(
      keyLightRef.current.position.y,
      8 + Math.sin(scrollAngle) * 2 + mouse.y * 1,
      delta * 2
    );
  });

  return (
    <>
      {/* NO fog — clean white environment */}

      {/* Bright ambient — airy daylight feel */}
      <ambientLight intensity={0.9} color="#ffffff" />

      {/* Key directional — warm white, soft shadows */}
      <directionalLight
        ref={keyLightRef}
        color="#fff8f0"
        intensity={1.0}
        position={[5, 8, 6]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />

      {/* Subtle fill from below — prevents harsh bottom shadows */}
      <directionalLight
        color="#f0f4ec"
        intensity={0.3}
        position={[0, -4, 2]}
      />

      {/* Gentle green rim light — brand presence without drama */}
      <pointLight
        color="#436A32"
        intensity={0.4}
        position={[-5, 3, -3]}
        distance={20}
        decay={2}
      />

      {/* Very subtle accent — adds warmth */}
      <pointLight
        color="#B4CE4C"
        intensity={0.2}
        position={[4, -2, -5]}
        distance={15}
        decay={2}
      />
    </>
  );
});

export default Lighting;
