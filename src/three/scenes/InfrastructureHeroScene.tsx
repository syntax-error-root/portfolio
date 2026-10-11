import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Data packet moving along network line
function NetworkEdge({ start, end, speed = 1, color = '#38bdf8' }: { start: [number, number, number], end: [number, number, number], speed?: number, color?: string }) {
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
      {/* Network Cable / Beam */}
      {/* @ts-ignore */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </line>

      {/* Traveling Data Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Compute Server Rack / Node Module
function ServerRack({ position, label, isCore = false }: { position: [number, number, number], label: string, isCore?: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.12;
    }
    if (ledRef.current) {
      ledRef.current.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 4 + position[0]) * 0.4;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Outer Server Chassis */}
      <mesh>
        <boxGeometry args={[1.2, 1.8, 1.2]} />
        <meshStandardMaterial
          color={isCore ? '#1e1b4b' : '#0f172a'}
          metalness={0.85}
          roughness={0.25}
          wireframe={false}
        />
      </mesh>

      {/* Glowing Chassis Edges */}
      <mesh>
        <boxGeometry args={[1.22, 1.82, 1.22]} />
        <meshBasicMaterial
          color={isCore ? '#a855f7' : '#38bdf8'}
          wireframe={true}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Activity Status LEDs */}
      <mesh position={[0, 0.65, 0.62]}>
        <boxGeometry args={[0.8, 0.08, 0.02]} />
        <meshBasicMaterial
          ref={ledRef}
          color={isCore ? '#c084fc' : '#38bdf8'}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// Atmospheric Ambient Constellation Particles
function AtmosphericDust({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorCyan = new THREE.Color('#38bdf8');
    const colorViolet = new THREE.Color('#818cf8');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const c = Math.random() > 0.5 ? colorCyan : colorViolet;
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
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function InfrastructureHeroScene() {
  const rootGroupRef = useRef<THREE.Group>(null);

  // Smooth mouse parallax
  useFrame((state) => {
    if (!rootGroupRef.current) return;
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.35;
    rootGroupRef.current.rotation.y += (targetX - rootGroupRef.current.rotation.y) * 0.04;
    rootGroupRef.current.rotation.x += (-targetY - rootGroupRef.current.rotation.x) * 0.04;
  });

  // Node Positions across 3D infrastructure cluster
  const nodes: { pos: [number, number, number]; label: string; isCore?: boolean }[] = [
    { pos: [0, 0, 0], label: "Core Control Plane", isCore: true },
    { pos: [-3.2, 1.4, -1.2], label: "Ingress Gateway" },
    { pos: [3.2, 1.6, -1.0], label: "K8s Worker 01" },
    { pos: [-2.6, -1.8, 1.2], label: "Observability Hub" },
    { pos: [2.8, -1.5, 1.4], label: "Stateful Storage" },
    { pos: [0, 2.8, -2.5], label: "Anycast DNS" },
    { pos: [0, -2.6, -2.0], label: "CI/CD Deployment" },
  ];

  return (
    <group ref={rootGroupRef}>
      {/* Lighting Rig */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={2.5} color="#38bdf8" distance={15} />
      <pointLight position={[-4, 2, -2]} intensity={2.0} color="#818cf8" distance={12} />
      <pointLight position={[4, -2, 2]} intensity={2.0} color="#34d399" distance={12} />

      {/* Atmospheric Space Dust */}
      <AtmosphericDust count={280} />

      {/* Central Quantum Reactor Ring around Core */}
      <group position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.2, 0.03, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.5, 0.025, 16, 64]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Render Server Modules */}
      {nodes.map((n, i) => (
        <ServerRack key={i} position={n.pos} label={n.label} isCore={n.isCore} />
      ))}

      {/* Interconnecting Network Pathways with Traveling Data Packets */}
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
