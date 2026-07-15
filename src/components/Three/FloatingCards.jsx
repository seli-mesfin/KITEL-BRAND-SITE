import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Section 5 — Connected Businesses
 * The network extends into abstract buildings.
 * Light pulses travel through the network.
 * Message: Kitel connects businesses through technology.
 * 
 * Clean, frosted acrylic/glass buildings with matte network lines.
 */

const ConnectedBusinesses = React.memo(function ConnectedBusinesses({
  scrollProgress = 0,
}) {
  const groupRef = useRef();

  // Generate building data
  const buildings = useMemo(() => {
    return [
      { pos: [-2.5, 0, -1], scale: [0.8, 2.5, 0.8], rot: [0, 0.2, 0] },
      { pos: [-1.2, -0.5, -0.5], scale: [0.6, 1.5, 0.6], rot: [0, -0.1, 0] },
      { pos: [0, 0.2, -1.5], scale: [1.2, 3.2, 1.2], rot: [0, 0.5, 0] }, // Main tower
      { pos: [1.5, -0.3, -0.8], scale: [0.7, 1.8, 0.7], rot: [0, -0.3, 0] },
      { pos: [2.8, 0.4, -0.2], scale: [0.9, 2.2, 0.9], rot: [0, 0.1, 0] },
    ];
  }, []);

  const pulseRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Visibility range for Connected Businesses section: 0.6 to 0.9
    const isVisible = scrollProgress >= 0.6 && scrollProgress <= 0.9;
    const targetGroupScale = isVisible ? 1 : 0;
    const currentGroupScale = groupRef.current.scale.x;
    const newGroupScale = THREE.MathUtils.lerp(currentGroupScale, targetGroupScale, delta * 3);
    groupRef.current.scale.setScalar(Math.max(0.001, newGroupScale));
    groupRef.current.visible = currentGroupScale > 0.01;

    if (!isVisible && currentGroupScale < 0.01) return;

    // Gentle global rotation on scroll to pan across the "city"
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (scrollProgress - 0.75) * Math.PI * 0.4,
      delta * 2
    );

    // Animate light pulse traveling through network
    if (pulseRef.current) {
      pulseRef.current.position.x = Math.sin(time * 1.5) * 3;
      pulseRef.current.position.y = Math.cos(time * 2) * 1.5 - 1;
      pulseRef.current.position.z = Math.sin(time * 1.2) * 1 - 0.5;
    }
  });

  const buildingMat = {
    color: '#ffffff',
    roughness: 0.2,
    metalness: 0.1,
    transmission: 0.9,
    opacity: 0.8,
    transparent: true,
  };

  return (
    <group ref={groupRef} position={[0, -1, -2]}>
      {/* Abstract Buildings */}
      {buildings.map((data, idx) => (
        <group key={`building-${idx}`} position={data.pos} rotation={data.rot}>
          <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
            <mesh castShadow receiveShadow position={[0, data.scale[1]/2, 0]}>
              <boxGeometry args={data.scale} />
              <meshPhysicalMaterial {...buildingMat} />
            </mesh>
            {/* Subtle brand-colored base/core */}
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[data.scale[0]*0.9, 0.2, data.scale[2]*0.9]} />
              <meshStandardMaterial color="#436A32" roughness={0.8} />
            </mesh>
          </Float>
        </group>
      ))}

      {/* Network lines connecting them at the base */}
      <mesh position={[0, -0.1, -0.5]}>
        <cylinderGeometry args={[4, 4, 0.05, 32]} />
        <meshStandardMaterial color="#B4CE4C" transparent opacity={0.15} />
      </mesh>

      {/* Light pulse traversing the network */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#B4CE4C" />
      </mesh>
    </group>
  );
});

export default ConnectedBusinesses;
