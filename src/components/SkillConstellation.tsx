"use client";

import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Sphere, Torus, Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * SKILLS DATA
 * Strictly following the Lakshay_Narang_TechStack.docx requirements.
 * Levels (prof) are used to determine node scale and aura intensity.
 */
const SKILLS = [
  { name: "React.js", color: "#61DAFB", prof: 90 },
  { name: "Tailwind", color: "#38BDF8", prof: 86 },
  { name: "Vite", color: "#A78BFA", prof: 82 },
  { name: "JavaScript", color: "#F7DF1E", prof: 88 },
  { name: "CSS3", color: "#2965F1", prof: 92 },
  { name: "HTML5", color: "#E34F26", prof: 94 },
  { name: "Framer", color: "#FF0055", prof: 88 },
  { name: "Three.js", color: "#00FF94", prof: 78 },
  { name: "GSAP", color: "#81C000", prof: 82 },
  { name: "Python", color: "#3776AB", prof: 70 },
  { name: "C++", color: "#00599C", prof: 76 },
  { name: "Git/GitHub", color: "#F05032", prof: 83 },
  { name: "SEO", color: "#00FF94", prof: 85 },
  { name: "A11y", color: "#FFFFFF", prof: 90 },
  { name: "Responsive", color: "#22D3EE", prof: 72 },
  { name: "Optimisation", color: "#F7DF1E", prof: 75 },
  { name: "Inclusive", color: "#FFFFFF", prof: 80 },
];

/**
 * Fibonacci Sphere Algorithm
 * Evenly distributes N points on a sphere of radius R.
 * Used here to place skill nodes in a balanced constellation.
 */
function fibPos(i: number, n: number, r: number) {
  const phi = Math.acos(1 - 2 * (i + 0.5) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
  return new THREE.Vector3(
    Math.cos(theta) * Math.sin(phi) * r,
    Math.sin(theta) * Math.sin(phi) * r,
    Math.cos(phi) * r
  );
}

/**
 * SkillNode Component
 * Represents a single interactive technology sphere in the 3D space.
 */
function SkillNode({ skill, index, total, onHover, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  
  const basePos = useMemo(() => fibPos(index, total, 1.05 + Math.random() * 0.22), [index, total]);
  const orbitalAxis = useMemo(() => new THREE.Vector3(Math.random() * 0.5, 1 + Math.random() * 0.5, Math.random() * 0.5).normalize(), []);
  const orbitalSpeed = useMemo(() => (Math.random() * 0.0006 + 0.0003) * (Math.random() > 0.5 ? 1 : -1), []);
  const orbitalAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const ang = orbitalAngle + t * orbitalSpeed * 60;
    const quat = new THREE.Quaternion().setFromAxisAngle(orbitalAxis, ang);
    const newPos = basePos.clone().applyQuaternion(quat);
    
    meshRef.current.position.copy(newPos);
    wireRef.current.position.copy(newPos);
    ringRef.current.position.copy(newPos);

    const targetScale = hovered ? 2.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.11);
    wireRef.current.scale.lerp(new THREE.Vector3(targetScale * 1.25, targetScale * 1.25, targetScale * 1.25), 0.11);

    if (hovered) {
      const rp = (t * 1.25) % 1;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - rp);
      ringRef.current.scale.setScalar(1 + rp * 0.9);
    } else {
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
    }
  });

  return (
    <>
      <mesh 
        ref={meshRef} 
        onPointerOver={() => { setHovered(true); onHover(skill, index); }}
        onPointerOut={() => { setHovered(false); onHover(null, -1); }}
        onClick={() => onClick(skill, index)}
      >
        <icosahedronGeometry args={[0.13, 1]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.92} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.13, 1]} />
        <meshBasicMaterial color={skill.color} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.22, 0.015, 8, 32]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0} />
      </mesh>
    </>
  );
}

function ConstellationContent({ onSelectSkill }: any) {
  const groupRef = useRef<THREE.Group>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);
  const [hoveredSkill, setHoveredSkill] = useState<any>(null);
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  const linePositions = useMemo(() => new Float32Array(200 * 6), []);

  useFrame(() => {
    // Rotation logic
    groupRef.current.rotation.y += 0.0006;
    
    // Connection lines
    const nodes = groupRef.current.children.filter(c => c.type === "Mesh" && !((c as THREE.Mesh).geometry instanceof THREE.TorusGeometry));
    let ci = 0;
    const MAX_CONN = 100;
    const lp = lineRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < SKILLS.length && ci < MAX_CONN; i++) {
        const meshI = nodes[i * 2]; // Each skill has mesh and wire
        if (!meshI) continue;
        for (let j = i + 1; j < SKILLS.length && ci < MAX_CONN; j++) {
            const meshJ = nodes[j * 2];
            if (!meshJ) continue;
            const pi = meshI.position;
            const pj = meshJ.position;
            const distSq = pi.distanceToSquared(pj);
            if (distSq < 1.9 * 1.9) {
                lp[ci * 6] = pi.x; lp[ci * 6 + 1] = pi.y; lp[ci * 6 + 2] = pi.z;
                lp[ci * 6 + 3] = pj.x; lp[ci * 6 + 4] = pj.y; lp[ci * 6 + 5] = pj.z;
                ci++;
            }
        }
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
    lineRef.current.geometry.setDrawRange(0, ci * 2);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="#00FF94" wireframe transparent opacity={0.045} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#020C10" transparent opacity={0.65} side={THREE.BackSide} />
      </mesh>
      {SKILLS.map((sk, i) => (
        <SkillNode 
          key={sk.name} 
          skill={sk} 
          index={i} 
          total={SKILLS.length} 
          onHover={(s: any, idx: number) => { setHoveredSkill(s); setHoveredIdx(idx); }}
          onClick={onSelectSkill}
        />
      ))}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200 * 2}
            array={linePositions}
            itemSize={3}
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22D3EE" transparent opacity={0.16} />
      </lineSegments>
      {hoveredSkill && (
        <Html distanceFactor={10} position={[0, 0, 0]}>
            <div id="g-lbl" style={{ display: 'block', color: hoveredSkill.color, position: 'relative', top: -20, left: 20 }}>
                {hoveredSkill.name} — {hoveredSkill.prof}%
            </div>
        </Html>
      )}
    </group>
  );
}

export function SkillConstellation() {
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [profProg, setProfProg] = useState(0);

  const handleSelect = useCallback((skill: any) => {
    setSelectedSkill(skill);
    setProfProg(0);
    let start: number | null = null;
    const duration = 800;
    const animate = (ts: number) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        setProfProg(skill.prof * ease);
        if (prog < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <div id="globe-wrap">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ConstellationContent onSelectSkill={handleSelect} />
      </Canvas>
      <div id="globe-hint">drag to rotate</div>
      
      {selectedSkill && (
        <div id="prof-panel" className="show">
          <span id="prof-close" onClick={() => setSelectedSkill(null)}>[ close × ]</span>
          <div id="prof-name" style={{ color: selectedSkill.color }}>{selectedSkill.name}</div>
          <div id="prof-ring">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"/>
              <circle 
                id="prof-arc" 
                cx="40" cy="40" r="32" 
                fill="none" 
                stroke={selectedSkill.color} 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeDasharray="201" 
                strokeDashoffset={201 * (1 - profProg / 100)}
              />
            </svg>
            <div id="prof-pct">{Math.round(profProg)}%</div>
          </div>
          <div id="prof-label">Proficiency</div>
        </div>
      )}
    </div>
  );
}
