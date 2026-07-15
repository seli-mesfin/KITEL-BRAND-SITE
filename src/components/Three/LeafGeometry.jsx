import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Organic leaf shape using bezier curves
 */
function createLeafShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -1.8);
  // Right side
  shape.bezierCurveTo(0.3, -1.2, 1.2, -0.6, 1.4, 0);
  shape.bezierCurveTo(1.5, 0.4, 1.3, 1.0, 1.0, 1.4);
  shape.bezierCurveTo(0.7, 1.8, 0.3, 2.1, 0, 2.3);
  // Left side (mirror)
  shape.bezierCurveTo(-0.3, 2.1, -0.7, 1.8, -1.0, 1.4);
  shape.bezierCurveTo(-1.3, 1.0, -1.5, 0.4, -1.4, 0);
  shape.bezierCurveTo(-1.2, -0.6, -0.3, -1.2, 0, -1.8);
  return shape;
}

/**
 * Vein paths — these will animate from organic to geometric
 */
function createVeinPaths() {
  const veins = [];

  // Center stem (midrib)
  veins.push([
    new THREE.Vector3(0, -1.8, 0.12),
    new THREE.Vector3(0, -1.0, 0.12),
    new THREE.Vector3(0, 0, 0.12),
    new THREE.Vector3(0, 1.0, 0.12),
    new THREE.Vector3(0, 2.0, 0.12),
    new THREE.Vector3(0, 2.3, 0.12),
  ]);

  // Right-side lateral veins
  const rightVeins = [
    [[0, -0.8, 0.12], [0.4, -0.3, 0.12], [0.9, 0.0, 0.12]],
    [[0, 0.0, 0.12], [0.5, 0.4, 0.12], [1.0, 0.6, 0.12]],
    [[0, 0.6, 0.12], [0.4, 1.0, 0.12], [0.8, 1.2, 0.12]],
    [[0, 1.2, 0.12], [0.3, 1.5, 0.12], [0.5, 1.7, 0.12]],
  ];

  // Left-side lateral veins (mirror)
  const leftVeins = rightVeins.map((vein) =>
    vein.map(([x, y, z]) => [-x, y, z])
  );

  [...rightVeins, ...leftVeins].forEach((vein) => {
    veins.push(vein.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  });

  return veins;
}

/**
 * Generate particle positions along veins for glowing dots
 */
function createVeinParticles(veins) {
  const particles = [];
  veins.forEach((vein) => {
    for (let i = 0; i < vein.length; i++) {
      const pos = vein[i] instanceof THREE.Vector3 ? vein[i] : new THREE.Vector3(...vein[i]);
      particles.push(pos.x, pos.y, pos.z + 0.02);
      if (i < vein.length - 1) {
        const next = vein[i + 1] instanceof THREE.Vector3 ? vein[i + 1] : new THREE.Vector3(...vein[i + 1]);
        const mid = pos.clone().lerp(next, 0.5);
        particles.push(mid.x, mid.y, mid.z + 0.02);
      }
    }
  });
  return new Float32Array(particles);
}

const LeafGeometry = React.memo(function LeafGeometry({
  mouse = { x: 0, y: 0 },
  scrollProgress = 0,
}) {
  const groupRef = useRef();
  const materialRef = useRef();
  const particleRef = useRef();

  const leafShape = useMemo(() => createLeafShape(), []);
  const extrudeSettings = useMemo(() => ({
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  }), []);

  const veins = useMemo(() => createVeinPaths(), []);
  const veinParticlePositions = useMemo(() => createVeinParticles(veins), [veins]);
  const veinParticleCount = useMemo(() => veinParticlePositions.length / 3, [veinParticlePositions]);

  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Section 1 (0-0.125): Small leaf, calm, camera approaches
    // Section 2 (0.125-0.375): Leaf grows, veins illuminate (About Section = 0.25)
    // After 0.375: Leaf fades as network takes over

    // Mouse tracking — gentle rotation
    targetRotation.current.y = mouse.x * 0.2;
    targetRotation.current.x = -mouse.y * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      delta * 2
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      delta * 2
    );

    // Scale: starts small (0.6), grows to full (1.2) by section 2, then shrinks away
    let targetScale;
    if (scrollProgress < 0.125) {
      // Section 1: Small seed, gently growing
      targetScale = 0.6 + scrollProgress * 3.2; // 0.6 → 1.0
    } else if (scrollProgress < 0.375) {
      // Section 2: Full growth
      targetScale = 1.0 + (scrollProgress - 0.125) * 1.2; // 1.0 → 1.3
    } else if (scrollProgress < 0.5) {
      // Fading out as network takes over (0.375 - 0.5)
      targetScale = Math.max(0, 1.3 - (scrollProgress - 0.375) * 10);
    } else {
      targetScale = 0;
    }

    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 3);
    groupRef.current.scale.setScalar(Math.max(0.001, newScale));

    // Opacity — fade with scale
    if (materialRef.current) {
      const targetOpacity = scrollProgress < 0.375 ? 1 : Math.max(0, 1 - (scrollProgress - 0.375) * 8);
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        targetOpacity,
        delta * 3
      );
    }

    // Vein particles — pulse gently, brighter in section 2
    if (particleRef.current && particleRef.current.material) {
      const veinBrightness = scrollProgress > 0.125 && scrollProgress < 0.45
        ? 0.8 + Math.sin(time * 3) * 0.2  // Illuminated
        : 0.3 + Math.sin(time * 2) * 0.1;  // Subtle
      particleRef.current.material.opacity = veinBrightness;
      
      // Size increases as veins illuminate
      particleRef.current.material.size = scrollProgress > 0.125 ? 0.08 : 0.04;
    }
  });

  // Vein color shifts from organic to geometric based on scroll
  const veinColor = scrollProgress > 0.2 ? '#B4CE4C' : '#5a8a45';

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.3}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={groupRef} castShadow>
        {/* Main leaf body — matte organic material */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[leafShape, extrudeSettings]} />
          <meshStandardMaterial
            ref={materialRef}
            color="#436A32"
            emissive="#436A32"
            emissiveIntensity={0.03}
            metalness={0.05}
            roughness={0.7}
            transparent
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Vein lines — organic green, become brighter as scroll progresses */}
        {veins.map((vein, index) => (
          <Line
            key={`vein-${index}`}
            points={vein}
            color={veinColor}
            lineWidth={index === 0 ? 2.0 : 1.2}
            transparent
            opacity={scrollProgress > 0.125 ? 0.9 : 0.4}
          />
        ))}

        {/* Glowing dots along veins — become visible in Section 2 */}
        <points ref={particleRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={veinParticleCount}
              array={veinParticlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            color="#B4CE4C"
            transparent
            opacity={0.3}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      </group>
    </Float>
  );
});

export default LeafGeometry;
