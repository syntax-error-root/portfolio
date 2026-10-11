import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Data packet moving along network line with trailing glow
function NetworkEdge({
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
    const t = (state.clock.elapsedTime * speed * 0.45) % 1;
    packetRef.current.position.lerpVectors(startVec, endVec, t);
  });

  return (
    <group>
      {/* Network Light Conduit */}
      {/* @ts-ignore */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </line>

      {/* High-intensity Light Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Compute Server Rack / High-Detail Monolithic Node Module
function ServerRack({
  position,
  label,
  isCore = false
}: {
  position: [number, number, number],
  label: string,
  isCore?: boolean
}) {
  const meshRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.75 + position[0]) * 0.15;
    }
    if (pulseRef.current) {
      pulseRef.current.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 3.5 + position[0]) * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main Server Chassis Monolith */}
      <mesh>
        <boxGeometry args={[1.3, 2.0, 1.3]} />
        <meshStandardMaterial
          color={isCore ? '#111827' : '#090d16'}
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>

      {/* Precision Structural Wireframe Outer Shell */}
      <mesh>
        <boxGeometry args={[1.32, 2.02, 1.32]} />
        <meshBasicMaterial
          color={isCore ? '#a855f7' : '#38bdf8'}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Internal Blade Server Ribs */}
      {[-0.6, -0.2, 0.2, 0.6].map((offsetY, idx) => (
        <mesh key={idx} position={[0, offsetY, 0.66]}>
          <boxGeometry args={[1.0, 0.04, 0.02]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? '#38bdf8' : '#34d399'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Server Status Telemetry LED Array */}
      <mesh position={[0.4, 0.82, 0.67]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial
          ref={pulseRef}
          color={isCore ? '#c084fc' : '#38bdf8'}
          transparent
        />
      </mesh>
    </group>
  );
}

// Atmospheric Ambient Data Particles
function AtmosphericDust({ count = 350 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorCyan = new THREE.Color('#38bdf8');
    const colorViolet = new THREE.Color('#818cf8');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const rand = Math.random();
      const c = rand > 0.6 ? colorCyan : (rand > 0.3 ? colorViolet : colorWhite);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function InfrastructureHeroScene() {
  const rootGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Smooth pointer-based parallax
  useFrame((state) => {
    if (!rootGroupRef.current) return;
    const targetX = state.pointer.x * 0.45;
    const targetY = state.pointer.y * 0.3;
    rootGroupRef.current.rotation.y += (targetX - rootGroupRef.current.rotation.y) * 0.04;
    rootGroupRef.current.rotation.x += (-targetY - rootGroupRef.current.rotation.x) * 0.04;

    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.006;
    if (ring2Ref.current) ring2Ref.current.rotation.x += 0.008;
  });

  // Architectural Nodes in 3D Space
  const nodes: { pos: [number, number, number]; label: string; isCore?: boolean }[] = [
    { pos: [0, 0, 0], label: "Core Control Plane", isCore: true },
    { pos: [-3.6, 1.6, -1.2], label: "Ingress Gateway" },
    { pos: [3.6, 1.8, -1.0], label: "K8s Worker Node" },
    { pos: [-3.0, -1.9, 1.4], label: "Observability Telemetry" },
    { pos: [3.2, -1.6, 1.5], label: "Persistent State DB" },
    { pos: [0, 3.2, -2.5], label: "Anycast DNS Edge" },
    { pos: [0, -2.8, -2.2], label: "CI/CD Auto-Rollout" },
  ];

  return (
    <group ref={rootGroupRef}>
      {/* Dynamic Lighting Setup */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 12, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 3]} intensity={3.0} color="#38bdf8" distance={18} />
      <pointLight position={[-5, 3, -2]} intensity={2.2} color="#818cf8" distance={15} />
      <pointLight position={[5, -3, 2]} intensity={2.5} color="#34d399" distance={15} />

      {/* Atmospheric Star Dust */}
      <AtmosphericDust count={350} />

      {/* Central Quantum Orbital Rings surrounding Core */}
      <group position={[0, 0, 0]}>
        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.4, 0.035, 16, 80]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.7, 0.025, 16, 80]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.55} />
        </mesh>
      </group>

      {/* Render High-Detail Server Monoliths */}
      {nodes.map((n, i) => (
        <ServerRack key={i} position={n.pos} label={n.label} isCore={n.isCore} />
      ))}

      {/* Interconnecting Network Beams with Moving Packets */}
      <NetworkEdge start={nodes[1].pos} end={nodes[0].pos} speed={1.2} color="#38bdf8" />
      <NetworkEdge start={nodes[0].pos} end={nodes[2].pos} speed={1.4} color="#38bdf8" />
      <NetworkEdge start={nodes[0].pos} end={nodes[3].pos} speed={0.9} color="#818cf8" />
      <NetworkEdge start={nodes[0].pos} end={nodes[4].pos} speed={1.1} color="#34d399" />
      <NetworkEdge start={nodes[5].pos} end={nodes[1].pos} speed={1.5} color="#38bdf8" />
      <NetworkEdge start={nodes[6].pos} end={nodes[0].pos} speed={1.3} color="#c084fc" />
      <NetworkEdge start={nodes[3].pos} end={nodes[4].pos} speed={0.8} color="#818cf8" />
    </group>
  );
}
