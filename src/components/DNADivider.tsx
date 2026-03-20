"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * DNAHelix Component
 * Renders two intertwined parametric helixes representing the "DNA of code."
 * Each strand consists of 40 sphere nodes connected by structural bars.
 */
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 40;

  // Pre-calculate helix positions using sine/cosine offsets
  const [pointsA, pointsB] = useMemo(() => {
    const a = [];
    const b = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 4;
      const x = Math.cos(angle) * 1.5;
      const z = Math.sin(angle) * 1.5;
      const y = (i - count / 2) * 0.4;
      a.push(new THREE.Vector3(x, y, z));
      b.push(new THREE.Vector3(-x, y, -z));
    }
    return [a, b];
  }, [count]);

  // Rotate the entire helix group over time
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {pointsA.map((p, i) => (
        <group key={`dna-${i}`}>
            {/* Strand A Node */}
            <mesh position={p}>
                <sphereGeometry args={[0.08, 4, 4]} />
                <meshBasicMaterial color="#00FF94" />
            </mesh>
            {/* Strand B Node */}
            <mesh position={pointsB[i]}>
                <sphereGeometry args={[0.08, 4, 4]} />
                <meshBasicMaterial color="#22D3EE" />
            </mesh>
            {/* Connecting Bar */}
            {i % 2 === 0 && (
                <mesh position={new THREE.Vector3().addVectors(p, pointsB[i]).multiplyScalar(0.5)}>
                    <boxGeometry args={[p.distanceTo(pointsB[i]), 0.02, 0.02]} />
                    <meshBasicMaterial color="#00FF94" transparent opacity={0.2} />
                    {/* Align bar to face the opposite node */}
                    <primitive object={new THREE.Object3D()} onUpdate={(self: any) => self.lookAt(p)} />
                </mesh>
            )}
        </group>
      ))}
    </group>
  );
}

/**
 * DNADivider Export
 * A full-screen canvas wrapper for the DNA helix animation.
 */
export function DNADivider() {
  return (
    <div className="dna-wrap" style={{ height: '400px', width: '100%', position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <DNAHelix />
        </Canvas>
    </div>
  );
}
