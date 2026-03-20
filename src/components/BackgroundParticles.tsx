"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

/**
 * Particles Component
 * Renders a volumetric cloud of 3,000 drifting points.
 * Optimized with BufferGeometry and a single draw call for high-performance rendering.
 */
function Particles() {
  const count = 3000;
  
  // Generate a random position buffer for 3,000 points
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null!);

  // Drifting animation loop for the entire particle field
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color="#00FF94" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
      />
    </points>
  );
}

/**
 * FloatingGeometry Component
 * Renders slow-drifting wireframe shapes to add cinematic depth to the background.
 * Icosahedrons and Toruses are used for a geometric "void" aesthetic.
 */
function FloatingGeometry() {
  return (
    <group>
      {/* Drifting Icosahedron (Secondary Layer) */}
      <mesh position={[-15, 8, -20]} rotation={[0.4, 0.2, 0.1]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#00FF94" wireframe transparent opacity={0.05} />
      </mesh>
      {/* Drifting Torus (Distant Layer) */}
      <mesh position={[18, -10, -25]} rotation={[0.8, 0.5, 0.2]}>
        <torusGeometry args={[5, 0.2, 16, 50]} />
        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

/**
 * BackgroundParticles Export
 * A performant 3D background layer that fills the viewport with cinematic depth.
 * Optimized for 60FPS by disabling antialiasing for the background pass.
 */
export function BackgroundParticles() {
  return (
    <div id="pc-wrap" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: false }}
      >
        <Particles />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
