import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const products = [
  { name: 'Brand Mark', position: [0, 1.25, 2.3], color: '#90ee90' },
  { name: 'Identity', position: [-2, 0.25, 1.3], color: '#ffffff' },
  { name: 'Motion', position: [2, 0.15, 0.5], color: '#004d00' },
  { name: 'System', position: [-1.3, -1.15, -0.8], color: '#90ee90' },
  { name: 'Guidance', position: [1.6, -0.7, -2], color: '#ffffff' },
  { name: 'Focus', position: [0.2, -1.6, -3.3], color: '#004d00' },
];

export default function MerchandiseShowroom3D({ scrollProgress = 0 }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.025;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.sin(state.clock.elapsedTime * 0.15) * 0.02, delta * 2.5);
    }
  });

  return (
    <group ref={group}>
      {products.map((prod, index) => (
        <ProductPlane key={index} product={prod} index={index} scrollProgress={scrollProgress} />
      ))}
    </group>
  );
}

function ProductPlane({ product, index, scrollProgress }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const entry = Math.min(1, Math.max(0, (scrollProgress - 0.08 + index * 0.08) / 0.8));
    const eased = 1 - Math.pow(1 - entry, 3);
    const startPosition = new THREE.Vector3(0, 0.8, 3.6 + index * 0.08);
    const targetPosition = new THREE.Vector3(product.position[0], product.position[1], product.position[2]);

    const animatedPosition = new THREE.Vector3(
      THREE.MathUtils.lerp(startPosition.x, targetPosition.x, eased),
      THREE.MathUtils.lerp(startPosition.y, targetPosition.y, eased),
      THREE.MathUtils.lerp(startPosition.z, targetPosition.z, eased)
    );

    group.position.lerp(animatedPosition, delta * 3.5);
    const scaleAmount = eased * 1.05;
    group.scale.lerp(new THREE.Vector3(scaleAmount, scaleAmount, scaleAmount), delta * 3.5);
    group.lookAt(state.camera.position);
  });

  return (
    <group ref={groupRef} scale={[0.001, 0.001, 0.001]}>
      <mesh position={[0, 0, -0.015]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial color={product.color === '#ffffff' ? 0xffffff : 0x004d00} emissive={product.color === '#ffffff' ? 0x90ee90 : 0x002700} emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[0.95, 0.95]} />
        <meshStandardMaterial color={product.color === '#ffffff' ? 0x004d00 : 0xffffff} transparent opacity={0.95} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
