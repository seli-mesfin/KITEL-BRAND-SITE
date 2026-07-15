import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Section 3 — Connection
 * The leaf veins expand into a beautiful network.
 * Nodes connect. Lines animate.
 * Resembles both leaf veins AND computer networks.
 */

const NODE_COUNT = 24;
const CONNECTION_DISTANCE = 2.5;

function generateNodes() {
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    // Distribute nodes in an organic, vein-like pattern
    const angle = (i / NODE_COUNT) * Math.PI * 2;
    const radius = 1.5 + Math.random() * 3;
    
    nodes.push({
      position: new THREE.Vector3(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 1,
        (Math.random() - 0.5) * 2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.005
      ),
      orbitSpeed: 0.08 + Math.random() * 0.15,
      orbitRadius: 0.15 + Math.random() * 0.3,
      orbitPhase: Math.random() * Math.PI * 2,
    });
  }
  return nodes;
}

const nodeGeometry = new THREE.SphereGeometry(0.06, 10, 10);

const NetworkGraph = React.memo(function NetworkGraph({
  visible = false,
  scrollProgress = 0,
}) {
  const groupRef = useRef();
  const nodeRefs = useRef([]);
  const lineRefs = useRef([]);

  const nodes = useMemo(() => generateNodes(), []);

  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#436A32',
        emissive: '#436A32',
        emissiveIntensity: 0.05,
        metalness: 0.1,
        roughness: 0.6,
        transparent: true,
        opacity: 1,
      }),
    []
  );

  // Calculate connections
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < CONNECTION_DISTANCE) {
          conns.push({ from: i, to: j, distance: dist });
        }
      }
    }
    return conns;
  }, [nodes]);

  // Animated line positions
  const [linePoints, setLinePoints] = useState(() =>
    connections.map((conn) => [
      nodes[conn.from].position.toArray(),
      nodes[conn.to].position.toArray(),
    ])
  );

  const currentScale = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Smooth visibility transition
    const targetScale = visible ? 1 : 0;
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale,
      delta * 2.5
    );
    groupRef.current.scale.setScalar(Math.max(0.001, currentScale.current));
    groupRef.current.visible = currentScale.current > 0.01;

    if (!visible && currentScale.current < 0.01) return;

    // Expansion logic: network starts bunched at the center (like leaf veins)
    // and spreads outwards to form the base of the connected town buildings.
    const expansionProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.5));
    const expansionFactor = 0.1 + (expansionProgress * 1.7); // Starts at 0.1, grows to 1.8

    // Animate nodes — slow, organic drift + outward expansion
    const newLinePoints = [];

    nodes.forEach((node, i) => {
      const orbitX = Math.sin(time * node.orbitSpeed + node.orbitPhase) * node.orbitRadius;
      const orbitY = Math.cos(time * node.orbitSpeed * 0.7 + node.orbitPhase) * node.orbitRadius * 0.5;
      const orbitZ = Math.sin(time * node.orbitSpeed * 0.4 + node.orbitPhase * 1.3) * node.orbitRadius * 0.2;

      // Base position expanded by scroll
      const basePos = node.position.clone().multiplyScalar(expansionFactor);

      const newPos = new THREE.Vector3(
        basePos.x + orbitX,
        basePos.y + orbitY,
        basePos.z + orbitZ
      );

      if (nodeRefs.current[i]) {
        nodeRefs.current[i].position.lerp(newPos, delta * 2);
      }
    });

    // Update connection lines
    connections.forEach((conn) => {
      if (nodeRefs.current[conn.from] && nodeRefs.current[conn.to]) {
        newLinePoints.push([
          nodeRefs.current[conn.from].position.toArray(),
          nodeRefs.current[conn.to].position.toArray(),
        ]);
      }
    });

    if (newLinePoints.length === connections.length) {
      setLinePoints(newLinePoints);
    }

    // Pulse line opacity — gentle breathing
    connections.forEach((conn, idx) => {
      if (lineRefs.current[idx] && lineRefs.current[idx].material) {
        lineRefs.current[idx].material.opacity =
          0.25 + Math.sin(time * 1.2 + idx * 0.4) * 0.1;
      }
    });

    // Subtle rotation with scroll
    groupRef.current.rotation.y = scrollProgress * Math.PI * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Nodes — small matte spheres */}
      {nodes.map((node, i) => (
        <mesh
          key={`node-${i}`}
          ref={(el) => (nodeRefs.current[i] = el)}
          geometry={nodeGeometry}
          material={nodeMaterial}
          position={node.position.toArray()}
          castShadow
        />
      ))}

      {/* Connection lines — brand accent green, subtle */}
      {linePoints.map((points, i) => (
        <Line
          key={`line-${i}`}
          ref={(el) => (lineRefs.current[i] = el)}
          points={points}
          color="#B4CE4C"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
});

export default NetworkGraph;
