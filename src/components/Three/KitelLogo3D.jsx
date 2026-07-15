import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Section 6 — Evolution
 * The network folds back into a beautiful leaf.
 * The leaf transforms into the Kitel logo.
 * Then the tagline appears: Simply Connected
 */

const KitelLogo3D = React.memo(function KitelLogo3D({ scrollProgress = 0 }) {
  const groupRef = useRef();
  
  // Custom organic leaf icon (matches the brand logo)
  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1);
    shape.bezierCurveTo(0.2, -0.6, 0.8, -0.3, 1, 0);
    shape.bezierCurveTo(1.1, 0.3, 0.9, 0.7, 0.5, 1);
    shape.bezierCurveTo(0.2, 1.2, -0.2, 1.2, -0.5, 1);
    shape.bezierCurveTo(-0.9, 0.7, -1.1, 0.3, -1, 0);
    shape.bezierCurveTo(-0.8, -0.3, -0.2, -0.6, 0, -1);
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 4,
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Visibility range for the footer/logo section: 0.85 to 1.0
    const isVisible = scrollProgress >= 0.85;
    const targetGroupScale = isVisible ? 1 : 0;
    const currentGroupScale = groupRef.current.scale.x;
    
    // Smooth pop-in animation as if folding back from the network
    const newGroupScale = THREE.MathUtils.lerp(currentGroupScale, targetGroupScale, delta * 3);
    groupRef.current.scale.setScalar(Math.max(0.001, newGroupScale));
    groupRef.current.visible = currentGroupScale > 0.01;

    if (!isVisible && currentGroupScale < 0.01) return;

    // Majestic slow rotation when visible
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.25) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
        
        {/* Organic Leaf Logo Mark */}
        <group position={[-2.5, 0, 0]} scale={0.8}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[leafShape, extrudeSettings]} />
            <meshStandardMaterial
              color="#436A32"
              emissive="#436A32"
              emissiveIntensity={0.02}
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>
          {/* Subtle accent edge — no glowing wireframes */}
          <mesh>
            <extrudeGeometry args={[leafShape, extrudeSettings]} />
            <meshStandardMaterial
              color="#B4CE4C"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>
        </group>

        {/* 3D Brand Text — Dark Green for White Background */}
        <Text
          position={[0, 0, 0]}
          fontSize={1.5}
          font="https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff" // Montserrat Black
          letterSpacing={0.1}
          color="#1a2e12" // Very dark green
          anchorX="left"
          anchorY="middle"
          castShadow
        >
          KITEL
          <meshStandardMaterial
            attach="material"
            color="#1a2e12"
            roughness={0.8}
            metalness={0.1}
          />
        </Text>
        
        {/* Tagline */}
        <Text
          position={[0, -1, 0]}
          fontSize={0.4}
          font="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff"
          letterSpacing={0.2}
          color="#436A32" // Primary green
          anchorX="left"
          anchorY="middle"
        >
          SIMPLY CONNECTED
          <meshBasicMaterial attach="material" color="#436A32" />
        </Text>
        
      </Float>
    </group>
  );
});

export default KitelLogo3D;
