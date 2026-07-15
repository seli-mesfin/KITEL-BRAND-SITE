import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Section 4 — Digital Services
 * Objects emerge FROM the network, as if growing from the leaf.
 * Laptop → Web Dev, Cylinder → Custom Systems, 
 * Octahedron → Access Control, Cloud → IT Services
 * 
 * Matte, organic materials. Frosted/acrylic feel.
 */

const ServiceObjects = React.memo(function ServiceObjects({
  activeService = null,
  scrollProgress = 0,
}) {
  const groupRef = useRef();

  const positions = useMemo(() => [
    [-3, 0.5, 0],
    [-1, -0.5, 0.5],
    [1, 0.5, -0.3],
    [3, -0.3, 0.2],
  ], []);

  const meshRefs = [useRef(), useRef(), useRef(), useRef()];
  const scales = useRef([0.8, 0.8, 0.8, 0.8]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Visible in section 4 range (0.35 to 0.65)
    const isVisible = scrollProgress >= 0.35 && scrollProgress <= 0.65;
    const targetGroupScale = isVisible ? 1 : 0;
    const currentGroupScale = groupRef.current.scale.x;
    const newGroupScale = THREE.MathUtils.lerp(currentGroupScale, targetGroupScale, delta * 3);
    groupRef.current.scale.setScalar(Math.max(0.001, newGroupScale));
    groupRef.current.visible = currentGroupScale > 0.01;

    if (!isVisible && currentGroupScale < 0.01) return;

    // Individual object animations
    for (let i = 0; i < 4; i++) {
      const meshGroup = meshRefs[i].current;
      if (!meshGroup) continue;

      const isActive = activeService === i;
      const isAnyActive = activeService !== null;

      const targetScale = isActive ? 1.3 : (isAnyActive ? 0.6 : 0.9);
      scales.current[i] = THREE.MathUtils.lerp(scales.current[i], targetScale, delta * 4);
      meshGroup.scale.setScalar(scales.current[i]);

      // Slow organic rotations
      if (i === 0) {
        meshGroup.rotation.y = time * 0.3;
        meshGroup.rotation.x = time * 0.1;
      } else if (i === 1) {
        meshGroup.rotation.y = -time * 0.2;
        meshGroup.rotation.z = time * 0.15;
      } else if (i === 2) {
        meshGroup.rotation.y = time * 0.35;
        meshGroup.rotation.x = Math.sin(time * 0.5) * 0.15;
      } else if (i === 3) {
        meshGroup.rotation.y = time * 0.15;
      }
    }
  });

  // Shared matte material properties
  const primaryMat = { color: '#436A32', roughness: 0.65, metalness: 0.05 };
  const accentMat = { color: '#B4CE4C', roughness: 0.5, metalness: 0.1 };

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {/* 1. Web Development — Globe/Sphere */}
      <group position={positions[0]} ref={meshRefs[0]}>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.55, 20, 20]} />
            <meshStandardMaterial {...primaryMat} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.65, 10, 10]} />
            <meshStandardMaterial {...accentMat} wireframe transparent opacity={0.3} />
          </mesh>
        </Float>
      </group>

      {/* 2. Custom Systems — Database Cylinder */}
      <group position={positions[1]} ref={meshRefs[1]}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.8, 16]} />
            <meshStandardMaterial {...primaryMat} />
          </mesh>
          {/* Top cap accent */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.06, 16]} />
            <meshStandardMaterial {...accentMat} />
          </mesh>
        </Float>
      </group>

      {/* 3. Access Control — Shield/Octahedron */}
      <group position={positions[2]} ref={meshRefs[2]}>
        <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.35}>
          <mesh castShadow receiveShadow>
            <octahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial {...primaryMat} />
          </mesh>
          {/* Ring around it */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.72, 0.025, 8, 32]} />
            <meshStandardMaterial {...accentMat} />
          </mesh>
        </Float>
      </group>

      {/* 4. IT Services — Connected Cloud Cluster */}
      <group position={positions[3]} ref={meshRefs[3]}>
        <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.2}>
          {/* Central hub */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.3, 14, 14]} />
            <meshStandardMaterial {...accentMat} />
          </mesh>
          {/* Satellite nodes */}
          {[
            [0.5, 0.4, 0],
            [-0.5, -0.3, 0],
            [0.4, -0.4, 0.3],
            [-0.4, 0.4, -0.3],
          ].map((pos, idx) => (
            <mesh key={`sat-${idx}`} position={pos} castShadow>
              <sphereGeometry args={[0.13, 10, 10]} />
              <meshStandardMaterial {...primaryMat} />
            </mesh>
          ))}
          {/* Subtle connecting structure */}
          <mesh>
            <octahedronGeometry args={[0.65, 1]} />
            <meshStandardMaterial color="#B4CE4C" wireframe transparent opacity={0.15} />
          </mesh>
        </Float>
      </group>
    </group>
  );
});

export default ServiceObjects;
