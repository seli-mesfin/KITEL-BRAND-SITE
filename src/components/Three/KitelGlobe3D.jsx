import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

class GlobeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Globe Canvas Recovered:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// ── 3D Earth Globe with Kitel Leaf Crown & Ethiopia Beacon ──
function EarthLeafCrownModel() {
  const globeRef = useRef();
  const pulseRef = useRef();
  const crownRef = useRef();
  const raysRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (globeRef.current) {
      globeRef.current.rotation.y = Math.sin(t * 0.25) * 0.2 + (state.pointer.x * 0.2);
      globeRef.current.rotation.x = Math.cos(t * 0.2) * 0.1 - (state.pointer.y * 0.15);
    }
    if (pulseRef.current) {
      const s = 1 + Math.sin(t * 3.5) * 0.2;
      pulseRef.current.scale.set(s, s, s);
    }
    if (crownRef.current) {
      crownRef.current.rotation.z += delta * 0.12;
    }
    if (raysRef.current) {
      raysRef.current.rotation.z -= delta * 0.08;
    }
  });

  // 360° Signal Rays emanating from Ethiopia node
  const ethiopiaRays = useMemo(() => {
    const list = [];
    const rayCount = 16;
    const hubPos = new THREE.Vector3(0.18, 0.38, 1.45); // East Africa / Ethiopia position

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const len = 2.6 + Math.random() * 0.8;
      const endPos = new THREE.Vector3(
        hubPos.x + Math.cos(angle) * len,
        hubPos.y + Math.sin(angle) * len,
        hubPos.z + (Math.random() - 0.5) * 0.6
      );

      const curve = new THREE.CatmullRomCurve3([
        hubPos,
        new THREE.Vector3(
          hubPos.x + Math.cos(angle) * (len * 0.5),
          hubPos.y + Math.sin(angle) * (len * 0.5),
          hubPos.z + 0.3
        ),
        endPos
      ]);

      list.push({ curve, endPos });
    }
    return list;
  }, []);

  // Crown of 10 Kitel Circuit Leaves encircling the Earth
  const leafCrown = useMemo(() => {
    const list = [];
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.05;
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
      <group ref={globeRef}>
        {/* 1. Main Earth Sphere (Kitel Forest Green Body) */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#436a32"
            roughness={0.25}
            metalness={0.4}
            clearcoat={0.8}
          />
        </mesh>

        {/* Continents Grid (Lime Green) */}
        <mesh>
          <sphereGeometry args={[1.52, 24, 24]} />
          <meshBasicMaterial color="#b4ce4c" transparent opacity={0.35} wireframe />
        </mesh>

        {/* 2. Ethiopia Beacon Node (Glowing Light Origin) */}
        <group position={[0.18, 0.38, 1.48]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
          </mesh>
          <mesh ref={pulseRef}>
            <ringGeometry args={[0.18, 0.28, 32]} />
            <meshBasicMaterial color="#b4ce4c" side={THREE.DoubleSide} transparent opacity={0.85} />
          </mesh>
        </group>

        {/* 3. Crown Ring of 10 Kitel Circuit Leaves */}
        <group ref={crownRef}>
          {leafCrown.map((l, idx) => (
            <group key={idx} position={[l.x, l.y, 0]} rotation={[0, 0, l.rotZ]}>
              <mesh>
                <coneGeometry args={[0.22, 0.55, 16]} />
                <meshStandardMaterial color="#436a32" roughness={0.2} metalness={0.3} />
              </mesh>
              <mesh position={[0, 0.28, 0]}>
                <sphereGeometry args={[0.07, 12, 12]} />
                <meshBasicMaterial color="#b4ce4c" />
              </mesh>
            </group>
          ))}
        </group>

        {/* 4. 360° Signal Rays Emanating from Ethiopia Hub across the World */}
        <group ref={raysRef}>
          {ethiopiaRays.map((r, idx) => (
            <React.Fragment key={idx}>
              <mesh>
                <tubeGeometry args={[r.curve, 32, 0.022, 8, false]} />
                <meshBasicMaterial
                  color={idx % 2 === 0 ? '#b4ce4c' : '#ffffff'}
                  transparent
                  opacity={0.75}
                />
              </mesh>
              <mesh position={r.endPos.toArray()}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial color="#b4ce4c" />
              </mesh>
            </React.Fragment>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function KitelGlobe3D() {
  return (
    <GlobeErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Soft Ambient Radial Backlight Glow (No Black Background!) */}
        <div
          style={{
            position: 'absolute',
            width: '85%',
            height: '85%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(180, 206, 76, 0.25) 0%, rgba(67, 106, 50, 0.12) 55%, transparent 75%)',
            filter: 'blur(35px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <Canvas
          camera={{ position: [0, 0, 6.4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 8, 6]} intensity={1.4} />
          <pointLight position={[-5, 5, 3]} intensity={1.2} color="#b4ce4c" />
          <pointLight position={[5, -5, 3]} intensity={0.9} color="#436a32" />

          <EarthLeafCrownModel />
        </Canvas>
      </div>
    </GlobeErrorBoundary>
  );
}
