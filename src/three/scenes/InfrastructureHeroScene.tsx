import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural Network Data Cable with Pulse
function NetworkBeam({
  start,
  end,
  speed = 1,
  color = '#38bdf8'
}: {
  start: [number, number, number],
  end: [number, number, number],
  speed?: number,
  color?: string
}) {
  const packetRef = useRef<THREE.Mesh>(null);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);
  
  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([startVec, endVec]);
  }, [startVec, endVec]);

  useFrame((state) => {
    if (!packetRef.current) return;
    const t = (state.clock.elapsedTime * speed * 0.4) % 1;
    packetRef.current.position.lerpVectors(startVec, endVec, t);
  });

  return (
    <group>
      {/* @ts-ignore */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </line>
      <mesh ref={packetRef}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Tactical Server Monolith Node
function TacticalNode({
  position,
  label,
  isCore = false,
  code
}: {
  position: [number, number, number],
  label: string,
  isCore?: boolean,
  code: string
}) {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.1;
    }
    if (beaconRef.current) {
      beaconRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4 + position[0]) * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Monolithic Server Body */}
      <mesh>
        <boxGeometry args={[1.4, 2.4, 1.4]} />
        <meshStandardMaterial
          color={isCore ? '#121214' : '#0d0e12'}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Industrial Cage Wireframe */}
      <mesh>
        <boxGeometry args={[1.42, 2.42, 1.42]} />
        <meshBasicMaterial
          color={isCore ? '#ff2a2a' : '#38bdf8'}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Horizontal Rack Blades */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.72]}>
          <boxGeometry args={[1.2, 0.05, 0.02]} />
          <meshBasicMaterial color={idx === 2 ? '#ff2a2a' : '#38bdf8'} transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Tactical Status LED */}
      <mesh position={[0.5, 1.0, 0.73]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshBasicMaterial
          ref={beaconRef}
          color={isCore ? '#ff2a2a' : '#22c55e'}
          transparent
        />
      </mesh>
    </group>
  );
}

// Tactical Radar Rings
function RadarRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (r1.current) r1.current.rotation.z = state.clock.elapsedTime * 0.2;
    if (r2.current) r2.current.rotation.z = -state.clock.elapsedTime * 0.15;
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Radar Ring 1 */}
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.24, 64]} />
        <meshBasicMaterial color="#1e242f" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>

      {/* Radar Ring 2 */}
      <mesh ref={r2} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.5, 6.54, 64]} />
        <meshBasicMaterial color="#ff2a2a" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Low-density High-Performance Dust Matrix
function TechnicalDust() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.08} color="#94a3b8" transparent opacity={0.4} />
    </points>
  );
}

export function InfrastructureHeroScene() {
  const rootGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rootGroupRef.current) return;
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.25;
    rootGroupRef.current.rotation.y += (targetX - rootGroupRef.current.rotation.y) * 0.04;
    rootGroupRef.current.rotation.x += (-targetY - rootGroupRef.current.rotation.x) * 0.04;
  });

  const nodes: { pos: [number, number, number]; label: string; code: string; isCore?: boolean }[] = [
    { pos: [0, 0, 0], label: "CONTROL PLANE", code: "CTRL-00", isCore: true },
    { pos: [-4.0, 1.4, -1.0], label: "EDGE INGRESS", code: "ING-01" },
    { pos: [4.0, 1.6, -1.2], label: "CONTAINER CLUSTER", code: "POD-X4" },
    { pos: [-3.4, -1.8, 1.2], label: "TELEMETRY EXPORTER", code: "PROM-9" },
    { pos: [3.4, -1.6, 1.4], label: "PERSISTENT DB", code: "WAL-02" },
    { pos: [0, 3.2, -2.4], label: "ANYCAST DNS", code: "DNS-53" },
  ];

  return (
    <group ref={rootGroupRef}>
      {/* Precision Illumination */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[12, 16, 12]} intensity={1.8} color="#ffffff" />
      <pointLight position={[0, 0, 2.5]} intensity={2.5} color="#ff2a2a" distance={15} />
      <pointLight position={[-4, 2, -1]} intensity={2.0} color="#38bdf8" distance={15} />

      {/* Radar concentric rings */}
      <RadarRings />

      {/* Ambient Data Grid Particles */}
      <TechnicalDust />

      {/* Render Server Monoliths */}
      {nodes.map((n, i) => (
        <TacticalNode key={i} position={n.pos} label={n.label} code={n.code} isCore={n.isCore} />
      ))}

      {/* Network Pathways */}
      <NetworkBeam start={nodes[1].pos} end={nodes[0].pos} speed={1.2} color="#38bdf8" />
      <NetworkBeam start={nodes[0].pos} end={nodes[2].pos} speed={1.4} color="#38bdf8" />
      <NetworkBeam start={nodes[0].pos} end={nodes[3].pos} speed={0.9} color="#ff2a2a" />
      <NetworkBeam start={nodes[0].pos} end={nodes[4].pos} speed={1.1} color="#38bdf8" />
      <NetworkBeam start={nodes[5].pos} end={nodes[1].pos} speed={1.5} color="#38bdf8" />
      <NetworkBeam start={nodes[3].pos} end={nodes[4].pos} speed={0.7} color="#94a3b8" />
    </group>
  );
}
