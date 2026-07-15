import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 400;
const SPHERE_RADIUS = 15;

const ParticleField = React.memo(function ParticleField({ scrollProgress = 0 }) {
  const pointsRef = useRef();
  const materialRef = useRef();

  const { positions, frequencies, phases, basePositions } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const basePos = new Float32Array(PARTICLE_COUNT * 3);
    const freq = new Float32Array(PARTICLE_COUNT * 3);
    const ph = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute particles in a sphere using spherical coordinates
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * SPHERE_RADIUS;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      // Varying frequencies for organic floating motion
      freq[i * 3] = 0.1 + Math.random() * 0.3;     // x frequency
      freq[i * 3 + 1] = 0.15 + Math.random() * 0.25; // y frequency
      freq[i * 3 + 2] = 0.08 + Math.random() * 0.2;  // z frequency

      // Random phase offset per particle
      ph[i] = Math.random() * Math.PI * 2;
    }

    return {
      positions: pos,
      frequencies: freq,
      phases: ph,
      basePositions: basePos,
    };
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    const primaryColor = new THREE.Color('#436A32');
    const secondaryColor = new THREE.Color('#B4CE4C');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = Math.random();
      const color = primaryColor.clone().lerp(secondaryColor, t * 0.6);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return cols;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      s[i] = 0.015 + Math.random() * 0.03;
    }
    return s;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const positionAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionAttr.array;

    // Scroll-based vertical and depth shift
    const scrollShiftY = scrollProgress * 3.0;
    const scrollShiftZ = scrollProgress * 2.0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = phases[i];

      // Slow sine wave floating motion
      const dx = Math.sin(time * frequencies[i3] + phase) * 0.5;
      const dy = Math.cos(time * frequencies[i3 + 1] + phase * 1.3) * 0.4;
      const dz = Math.sin(time * frequencies[i3 + 2] + phase * 0.7) * 0.3;

      posArray[i3] = basePositions[i3] + dx;
      posArray[i3 + 1] = basePositions[i3 + 1] + dy - scrollShiftY;
      posArray[i3 + 2] = basePositions[i3 + 2] + dz - scrollShiftZ;
    }

    positionAttr.needsUpdate = true;

    // Subtle opacity pulsation
    if (materialRef.current) {
      materialRef.current.opacity = 0.4 + Math.sin(time * 0.5) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

export default ParticleField;
