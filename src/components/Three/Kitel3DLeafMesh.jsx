import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

class ThreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Canvas Recovered:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/kitel-leaf-only.png" alt="Kitel Leaf" style={{ maxHeight: '550px', width: 'auto', objectFit: 'contain' }} />
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Floating Enlarged 3D Kitel Leaf Component with Signal Rays ──
export function LeafMesh({ scale = 1.45 }) {
  const meshRef = useRef();
  const raysRef = useRef();
  const [texture, setTexture] = useState(null);
  const [aspect, setAspect] = useState(1);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = '/kitel-leaf-only.png';
    img.onload = () => {
      try {
        setAspect(img.width / img.height);

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        const w = canvas.width;
        const h = canvas.height;
        const visited = new Uint8Array(w * h);
        const queue = [];

        const isWhitish = (pIdx) => {
          return data[pIdx] > 215 && data[pIdx + 1] > 215 && data[pIdx + 2] > 215;
        };

        const checkAndPush = (x, y) => {
          if (x < 0 || x >= w || y < 0 || y >= h) return;
          const idx = y * w + x;
          if (visited[idx]) return;

          const pIdx = idx * 4;
          if (isWhitish(pIdx)) {
            visited[idx] = 1;
            queue.push([x, y]);
            data[pIdx + 3] = 0; // Make transparent
          }
        };

        for (let x = 0; x < w; x++) {
          checkAndPush(x, 0);
          checkAndPush(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          checkAndPush(0, y);
          checkAndPush(w - 1, y);
        }

        let head = 0;
        while (head < queue.length) {
          const [cx, cy] = queue[head++];
          checkAndPush(cx + 1, cy);
          checkAndPush(cx - 1, cy);
          checkAndPush(cx, cy + 1);
          checkAndPush(cx, cy - 1);
          checkAndPush(cx + 1, cy + 1);
          checkAndPush(cx - 1, cy - 1);
          checkAndPush(cx + 1, cy - 1);
          checkAndPush(cx - 1, cy + 1);
        }

        ctx.putImageData(imgData, 0, 0);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        setTexture(tex);
      } catch (err) {
        console.warn('Texture processing error:', err);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.05);
      mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.05);

      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x = mouseRef.current.y * 0.22;
      meshRef.current.rotation.z = -mouseRef.current.x * 0.15;
    }
    if (raysRef.current) {
      raysRef.current.rotation.z += delta * 0.25;
    }
  });

  const planeW = 4.6;
  const planeH = planeW / aspect;

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.65}>
      <group ref={meshRef} scale={scale}>
        {/* Main Floating 3D Leaf Mesh */}
        {texture && (
          <mesh>
            <planeGeometry args={[planeW, planeH]} />
            <meshBasicMaterial
              map={texture}
              transparent
              alphaTest={0.05}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Radiating Signal Node Rays (Emanating from veins outwards) */}
        <group ref={raysRef} position={[-0.2, 0.3, -0.1]}>
          {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, idx) => (
            <group key={idx} rotation={[0, 0, angle]}>
              <mesh position={[1.4, 0, 0]}>
                <boxGeometry args={[1.2, 0.025, 0.02]} />
                <meshBasicMaterial color={idx % 2 === 0 ? '#b4ce4c' : '#436a32'} transparent opacity={0.6} />
              </mesh>
              <mesh position={[2.1, 0, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#b4ce4c" transparent opacity={0.9} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function Kitel3DLeafMeshScene({ height = '620px' }) {
  return (
    <ThreeErrorBoundary>
      <div style={{ width: '100%', height, position: 'relative' }}>
        <Canvas
          camera={{ position: [0, 0, 6.8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 8, 6]} intensity={1.2} />
          <pointLight position={[-5, 5, 3]} intensity={0.8} color="#b4ce4c" />
          <pointLight position={[5, -5, 3]} intensity={0.6} color="#436a32" />

          <LeafMesh scale={1.45} />
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
}
