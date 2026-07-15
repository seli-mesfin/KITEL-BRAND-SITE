import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingShapes({ scrollProgress = 0 }) {
  const groupRef = useRef();

  // Create an array of random positions for our shapes
  const shapesData = useMemo(() => {
    const data = [];
    // 5 Cubes
    for (let i = 0; i < 5; i++) {
      data.push({
        type: 'cube',
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15 - 5
        ],
        scale: Math.random() * 1.5 + 0.5,
        color: i % 2 === 0 ? '#436A32' : '#121c0d',
      });
    }
    // 5 Spheres
    for (let i = 0; i < 5; i++) {
      data.push({
        type: 'sphere',
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15 - 5
        ],
        scale: Math.random() * 1.5 + 0.5,
        color: i % 2 === 0 ? '#B4CE4C' : '#436A32',
      });
    }
    // 3 Torus (Rings)
    for (let i = 0; i < 3; i++) {
      data.push({
        type: 'torus',
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15 - 5
        ],
        scale: Math.random() * 1.5 + 0.5,
        color: '#436A32',
      });
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate the entire group slowly
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;

      // Parallax effect based on scroll
      groupRef.current.position.y = scrollProgress * 5;
    }
  });

  return (
    <group ref={groupRef}>
      {shapesData.map((data, index) => (
        <Shape key={index} data={data} index={index} />
      ))}
    </group>
  );
}

function Shape({ data, index }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (0.1 + index * 0.01);
      meshRef.current.rotation.y += delta * (0.1 + index * 0.01);
    }
  });

  return (
    <Float
      speed={1 + index * 0.1}
      rotationIntensity={1}
      floatIntensity={2}
      position={data.position}
    >
      <mesh ref={meshRef} scale={data.scale}>
        {data.type === 'cube' && <boxGeometry args={[1, 1, 1]} />}
        {data.type === 'sphere' && <sphereGeometry args={[0.7, 32, 32]} />}
        {data.type === 'torus' && <torusGeometry args={[0.7, 0.25, 16, 50]} />}
        
        <meshStandardMaterial 
          color={data.color}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}
