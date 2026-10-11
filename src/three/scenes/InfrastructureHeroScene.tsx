import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Luminous Data Stream Conduit with Pulsing Data Packets
function LuminousConduit({
  start,
  end,
  speed = 1.2,
  color = '#00f2fe'
}: {
  start: [number, number, number];
  end: [number, number, number];
  speed?: number;
  color?: string;
}) {
  const packetRef = useRef<THREE.Mesh>(null);
  const packet2Ref = useRef<THREE.Mesh>(null);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([startVec, endVec]);
  }, [startVec, endVec]);

  useFrame((state) => {
    if (packetRef.current) {
      const t = (state.clock.elapsedTime * speed * 0.45) % 1;
      packetRef.current.position.lerpVectors(startVec, endVec, t);
    }
    if (packet2Ref.current) {
      const t2 = (state.clock.elapsedTime * speed * 0.45 + 0.5) % 1;
      packet2Ref.current.position.lerpVectors(startVec, endVec, t2);
    }
  });

  return (
    <group>
      {/* Base Conduit Glow Line */}
      {/* @ts-ignore */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>

      {/* Primary Glowing Data Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Secondary Trailing Data Packet */}
      <mesh ref={packet2Ref}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Holographic Central Core (Control Plane)
function HolographicCore({ position }: { position: [number, number, number] }) {
  const coreRef = useRef<THREE.Group>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.12;
    }
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = t * 0.3;
      innerSphereRef.current.rotation.x = t * 0.2;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.35;
    if (ring3Ref.current) ring3Ref.current.rotation.y = -t * 0.25;
  });

  return (
    <group ref={coreRef} position={position}>
      {/* Central Luminous Energy Sphere */}
      <mesh ref={innerSphereRef}>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#00f2fe"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Inner Solid Nucleus */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Gyroscopic Orbital Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[2.1, 0.02, 16, 64]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// Floating Distributed Node Module
function DistributedModule({
  position,
  accentColor = '#38bdf8',
  subColor = '#818cf8',
  scale = 1
}: {
  position: [number, number, number];
  accentColor?: string;
  subColor?: string;
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.7 + position[0]) * 0.15;
      groupRef.current.rotation.y = Math.sin(t * 0.3 + position[2]) * 0.15;
    }
    if (beaconRef.current) {
      beaconRef.current.opacity = 0.4 + Math.sin(t * 3 + position[0]) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Sleek Dark Cyber Chassis */}
      <mesh>
        <boxGeometry args={[1.2, 1.8, 1.2]} />
        <meshStandardMaterial
          color="#0c1222"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Luminous Chamfer Frame */}
      <mesh>
        <boxGeometry args={[1.24, 1.84, 1.24]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Server Blade Horizontal LED Slots */}
      {[-0.6, -0.2, 0.2, 0.6].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.62]}>
          <boxGeometry args={[1.0, 0.04, 0.02]} />
          <meshBasicMaterial color={idx % 2 === 0 ? accentColor : subColor} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Status Activity Beacon */}
      <mesh position={[0.45, 0.75, 0.63]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial
          ref={beaconRef}
          color={accentColor}
          transparent
        />
      </mesh>
    </group>
  );
}

// Atmospheric Nebula & Data Particles
function CinematicDataDust() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorCyan = new THREE.Color('#38bdf8');
    const colorViolet = new THREE.Color('#818cf8');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const pick = Math.random();
      const c = pick > 0.6 ? colorCyan : pick > 0.3 ? colorViolet : colorWhite;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function InfrastructureHeroScene() {
  const rootGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rootGroupRef.current) return;
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.25;
    rootGroupRef.current.rotation.y += (targetX - rootGroupRef.current.rotation.y) * 0.035;
    rootGroupRef.current.rotation.x += (-targetY - rootGroupRef.current.rotation.x) * 0.035;
  });

  const nodes: {
    pos: [number, number, number];
    accent: string;
    sub: string;
    scale?: number;
  }[] = [
    { pos: [-4.2, 1.8, -1.2], accent: '#38bdf8', sub: '#0284c7', scale: 0.9 }, // Ingress Gateway
    { pos: [4.4, 1.6, -1.0], accent: '#818cf8', sub: '#6366f1', scale: 0.9 },  // Container Mesh
    { pos: [-3.5, -2.0, 1.0], accent: '#38bdf8', sub: '#818cf8', scale: 0.8 },  // Observability
    { pos: [3.8, -1.8, 1.2], accent: '#c084fc', sub: '#a855f7', scale: 0.85 }, // Persistent DB
    { pos: [0, 3.4, -2.0], accent: '#38bdf8', sub: '#ffffff', scale: 0.75 },   // DNS Anycast
  ];

  return (
    <group ref={rootGroupRef}>
      {/* Cinematic Sci-Fi Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={2.0} color="#ffffff" />
      <pointLight position={[0, 0, 3]} intensity={3.5} color="#00f2fe" distance={18} />
      <pointLight position={[-6, 3, -2]} intensity={2.5} color="#38bdf8" distance={15} />
      <pointLight position={[6, -3, 2]} intensity={2.5} color="#818cf8" distance={15} />

      {/* Atmospheric Star & Data Particle Field */}
      <CinematicDataDust />

      {/* Central Core: Holographic Control Plane */}
      <HolographicCore position={[0, 0, 0]} />

      {/* Distributed Compute Nodes */}
      {nodes.map((node, i) => (
        <DistributedModule
          key={i}
          position={node.pos}
          accentColor={node.accent}
          subColor={node.sub}
          scale={node.scale}
        />
      ))}

      {/* Interconnecting Luminous Data Beams */}
      <LuminousConduit start={nodes[0].pos} end={[0, 0, 0]} speed={1.3} color="#38bdf8" />
      <LuminousConduit start={[0, 0, 0]} end={nodes[1].pos} speed={1.5} color="#818cf8" />
      <LuminousConduit start={[0, 0, 0]} end={nodes[2].pos} speed={1.0} color="#00f2fe" />
      <LuminousConduit start={[0, 0, 0]} end={nodes[3].pos} speed={1.2} color="#c084fc" />
      <LuminousConduit start={nodes[4].pos} end={nodes[0].pos} speed={1.6} color="#38bdf8" />
      <LuminousConduit start={nodes[2].pos} end={nodes[3].pos} speed={0.9} color="#818cf8" />
    </group>
  );
}
