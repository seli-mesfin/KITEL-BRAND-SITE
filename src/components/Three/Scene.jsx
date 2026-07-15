import React, { useMemo, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import Lighting from './Lighting';
import LeafGeometry from './LeafGeometry';
import NetworkGraph from './NetworkGraph';
import ServiceObjects from './ServiceObjects';
import FloatingCards from './FloatingCards'; // Now ConnectedBusinesses
import KitelLogo3D from './KitelLogo3D';

const Scene = React.memo(function Scene({
  scrollProgress = 0,
  mouse = { x: 0, y: 0 },
  activeService = null,
}) {
  const { camera, viewport } = useThree();
  const isMobile = viewport.width < viewport.height;
  const mobileScale = isMobile ? 0.6 : 1.0;

  // Cinematic Camera Path (moving deeper as we scroll)
  const cameraPathPoints = useMemo(() => [
    new THREE.Vector3(0, 0, 8),      // Sec 1: Hero (0.0)
    new THREE.Vector3(0, 0.2, 5),    // Sec 2: About (0.25)
    new THREE.Vector3(0, -0.2, 2),   // Sec 3/4: Services (0.50)
    new THREE.Vector3(0, 0.3, -2),   // Sec 5: Why Kitel (0.75)
    new THREE.Vector3(0, 0, -6),     // Transition (0.85)
    new THREE.Vector3(0, 0, -10),    // Sec 6: Contact/Logo (1.0)
  ], []);

  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3(cameraPathPoints);
  }, [cameraPathPoints]);

  useFrame((state, delta) => {
    const clampedProgress = Math.max(0, Math.min(scrollProgress, 1));
    const targetCameraPos = cameraPath.getPointAt(clampedProgress);

    // Smooth camera dolly
    camera.position.lerp(targetCameraPos, delta * 3.5);

    // LookAt follows the mouse for subtle parallax
    const lookAtTarget = new THREE.Vector3(0, 0, targetCameraPos.z - 5);
    lookAtTarget.x += mouse.x * 0.15;
    lookAtTarget.y += mouse.y * 0.15;

    camera.lookAt(lookAtTarget);
  });

  return (
    <>
      <Lighting scrollProgress={scrollProgress} mouse={mouse} />
      
      {/* Wrap everything in a group that scales down on mobile */}
      <group scale={mobileScale}>
        {/* Sec 1 & 2: The Seed & Growth (0.0 to 0.5) */}
        <LeafGeometry scrollProgress={scrollProgress} mouse={mouse} />
        
        {/* Sec 3 & 4: Connection (0.2 to 0.8) */}
        <NetworkGraph scrollProgress={scrollProgress} visible={scrollProgress > 0.2 && scrollProgress < 0.8} />
        
        <Suspense fallback={null}>
          {/* Sec 4: Digital Services (0.35 to 0.65) */}
          <ServiceObjects scrollProgress={scrollProgress} activeService={activeService} />
          
          {/* Sec 5: Connected Businesses (0.6 to 0.9) */}
          <FloatingCards scrollProgress={scrollProgress} />
          
          {/* Sec 6: Evolution (0.85 to 1.0) */}
          <KitelLogo3D scrollProgress={scrollProgress} />
        </Suspense>
      </group>
    </>
  );
});

export default Scene;
