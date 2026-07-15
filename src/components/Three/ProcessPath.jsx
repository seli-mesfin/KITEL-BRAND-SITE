import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const ProcessPath = React.memo(function ProcessPath({
  scrollProgress = 0,
}) {
  const groupRef = useRef();
  const pulseRef = useRef();

  // Define 6 node points in a flowing curve (zig-zag / winding path)
  const points = useMemo(() => [
    new THREE.Vector3(-3.5, 1.8, -1),   // Discovery
    new THREE.Vector3(-1.5, 0.8, -0.5),  // Strategy
    new THREE.Vector3(0.5, 1.5, 0),      // Design
    new THREE.Vector3(-0.5, -0.5, 0.5),  // Development
    new THREE.Vector3(1.8, -1.2, -0.5),  // Implementation
    new THREE.Vector3(3.5, -1.8, -1.5),  // Support
  ], []);

  // Generate CatmullRomCurve3 spline through these points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  // Generate spline points for drawing the line
  const linePoints = useMemo(() => {
    return curve.getPoints(100);
  }, [curve]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Visibility range for process section: 0.62 to 0.82
    const isVisible = scrollProgress >= 0.58 && scrollProgress <= 0.84;
    const targetGroupScale = isVisible ? 1 : 0;
    const currentGroupScale = groupRef.current.scale.x;
    const newGroupScale = THREE.MathUtils.lerp(currentGroupScale, targetGroupScale, delta * 3);
    groupRef.current.scale.setScalar(Math.max(0.001, newGroupScale));
    groupRef.current.visible = currentGroupScale > 0.01;

    if (!isVisible && currentGroupScale < 0.01) return;

    // Calculate energy pulse position along spline based on section scroll sub-progress
    if (pulseRef.current) {
      // Map section range 0.62 - 0.80 to curve progress 0 - 1
      const sectionStart = 0.62;
      const sectionEnd = 0.80;
      let pathProgress = 0;

      if (scrollProgress > sectionStart) {
        pathProgress = Math.min((scrollProgress - sectionStart) / (sectionEnd - sectionStart), 1);
      }

      const pulsePos = curve.getPointAt(pathProgress);
      pulseRef.current.position.copy(pulsePos);

      // Pulse breathing scale and intensity
      const time = state.clock.elapsedTime;
      pulseRef.current.scale.setScalar(1 + Math.sin(time * 8) * 0.15);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Curved pathway line */}
      <Line
        points={linePoints}
        color="#436A32"
        lineWidth={2}
        transparent
        opacity={0.6}
      />

      {/* Nodes along the path */}
      {points.map((pos, idx) => (
        <group key={`node-${idx}`} position={pos}>
          {/* Central node sphere */}
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#B4CE4C"
              emissive="#B4CE4C"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Outer glowing halo ring */}
          <mesh>
            <ringGeometry args={[0.22, 0.28, 32]} />
            <meshBasicMaterial
              color="#B4CE4C"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Moving energy pulse indicator */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color="#B4CE4C"
          emissive="#B4CE4C"
          emissiveIntensity={2.0}
        />
        {/* Glow halo */}
        <pointLight color="#B4CE4C" intensity={1.5} distance={3} decay={2} />
      </mesh>
    </group>
  );
});

export default ProcessPath;
