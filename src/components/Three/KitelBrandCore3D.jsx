import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ── 3D Globe with Ethiopia Focal Hub & Kitel Leaf Crown ──
function EthiopiaGlobalHubModel() {
  const globeGroupRef = useRef();
  const ethiopiaPulseRef = useRef();
  const leafRingRef = useRef();
  const signalRaysRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (globeGroupRef.current) {
      // Rotate globe slowly, keeping East Africa/Ethiopia facing forward
      globeGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.25 + (state.pointer.x * 0.25);
      globeGroupRef.current.rotation.x = Math.cos(t * 0.2) * 0.1 - (state.pointer.y * 0.15);
    }
    if (ethiopiaPulseRef.current) {
      // Pulse East Africa focal node
      const scale = 1 + Math.sin(t * 3) * 0.25;
      ethiopiaPulseRef.current.scale.set(scale, scale, scale);
    }
    if (leafRingRef.current) {
      leafRingRef.current.rotation.z += delta * 0.15;
    }
    if (signalRaysRef.current) {
      signalRaysRef.current.rotation.z -= delta * 0.1;
    }
  });

  // 360° Radial Signal Lines emanating outwards from East Africa / Ethiopia hub
  const radialRays = useMemo(() => {
    const list = [];
    const rayCount = 14;
    // East Africa hub position on globe surface
    const hubPos = new THREE.Vector3(0.2, 0.4, 1.4);

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const endPos = new THREE.Vector3(
        hubPos.x + Math.cos(angle) * 2.8,
        hubPos.y + Math.sin(angle) * 2.8,
        hubPos.z + (Math.random() - 0.5) * 0.8
      );

      const curve = new THREE.CatmullRomCurve3([
        hubPos,
        new THREE.Vector3(
          hubPos.x + Math.cos(angle) * 1.4,
          hubPos.y + Math.sin(angle) * 1.4,
          hubPos.z + 0.3
        ),
        endPos
      ]);

      list.push({ curve, endPos });
    }
    return list;
  }, []);

  // Crown of 8 Kitel Leaves encircling the globe
  const leafRing = useMemo(() => {
    const list = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.95;
      list.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotZ: angle + Math.PI / 2
      });
    }
    return list;
  }, []);

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={globeGroupRef}>
        {/* 1. Main 3D Digital Globe */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#273d1c"
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Holographic Continents Grid Wireframe */}
        <mesh>
          <sphereGeometry args={[1.52, 24, 24]} />
          <meshBasicMaterial color="#b4ce4c" transparent opacity={0.35} wireframe />
        </mesh>

        {/* 2. East Africa / Ethiopia Focal Hub Pulse Node */}
        <group position={[0.2, 0.4, 1.45]}>
          {/* Central Glowing Core */}
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#00e5ff" emissiveIntensity={2.0} />
          </mesh>
          {/* Pulsing Beacon Ring */}
          <mesh ref={ethiopiaPulseRef}>
            <ringGeometry args={[0.2, 0.28, 32]} />
            <meshBasicMaterial color="#b4ce4c" side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
        </group>

        {/* 3. Crown of 8 Kitel Leaves Encircling Globe */}
        <group ref={leafRingRef}>
          {leafRing.map((l, idx) => (
            <group key={idx} position={[l.x, l.y, 0]} rotation={[0, 0, l.rotZ]}>
              <mesh>
                <coneGeometry args={[0.18, 0.5, 16]} />
                <meshStandardMaterial color="#436a32" roughness={0.2} metalness={0.4} />
              </mesh>
              <mesh position={[0, 0.25, 0]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial color="#b4ce4c" />
              </mesh>
            </group>
          ))}
        </group>

        {/* 4. 360° 3D Signal Lines Emanating Outward from Ethiopia Hub */}
        <group ref={signalRaysRef}>
          {radialRays.map((r, idx) => (
            <React.Fragment key={idx}>
              <mesh>
                <tubeGeometry args={[r.curve, 32, 0.025, 8, false]} />
                <meshBasicMaterial
                  color={idx % 2 === 0 ? '#b4ce4c' : '#00e5ff'}
                  transparent
                  opacity={0.7}
                />
              </mesh>
              <mesh position={r.endPos.toArray()}>
                <sphereGeometry args={[0.07, 12, 12]} />
                <meshBasicMaterial color="#b4ce4c" />
              </mesh>
            </React.Fragment>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function KitelBrandCore3D() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Volumetric Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, rgba(180, 206, 76, 0.25) 40%, rgba(67, 106, 50, 0.12) 70%, transparent 85%)',
          filter: 'blur(35px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 6]} intensity={1.5} />
        <pointLight position={[-5, 5, 3]} intensity={1.4} color="#b4ce4c" />
        <pointLight position={[5, -5, 3]} intensity={1.2} color="#00e5ff" />

        <EthiopiaGlobalHubModel />
      </Canvas>
    </div>
  );
}
