import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { architectureNodes } from '../../config';
import { ArchitectureNode } from '../../types';
import * as THREE from 'three';

interface Props {
  selectedNodeId: string;
  onSelectNode: (node: ArchitectureNode) => void;
}

function ArchNodeMesh({
  node,
  isSelected,
  onSelect,
}: {
  node: ArchitectureNode;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = node.position[1] + Math.sin(t * 1.2 + node.position[0]) * 0.1;
      if (isSelected) {
        groupRef.current.rotation.y += 0.015;
      }
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * (isSelected ? 1.5 : 0.5);
    }
  });

  return (
    <group
      ref={groupRef}
      position={node.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Sleek Node Hex Chassis */}
      <mesh>
        <cylinderGeometry args={[0.9, 1.1, 0.7, 6]} />
        <meshStandardMaterial
          color={isSelected ? '#0c1a30' : '#080d1a'}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Outer Luminous Wireframe Cage */}
      <mesh>
        <cylinderGeometry args={[0.92, 1.12, 0.72, 6]} />
        <meshBasicMaterial
          color={isSelected ? '#00f2fe' : '#38bdf8'}
          wireframe
          transparent
          opacity={isSelected ? 0.9 : 0.3}
        />
      </mesh>

      {/* Orbital Rotating Beacon Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 12, 36]} />
        <meshBasicMaterial
          color={isSelected ? '#00f2fe' : '#818cf8'}
          transparent
          opacity={isSelected ? 0.8 : 0.35}
        />
      </mesh>

      {/* Floating Center Indicator */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={isSelected ? '#ffffff' : '#00f2fe'} />
      </mesh>
    </group>
  );
}

// Luminous Data Pipeline Pulse
function PipelineStream({
  start,
  end,
  active,
}: {
  start: [number, number, number];
  end: [number, number, number];
  active: boolean;
}) {
  const packetRef = useRef<THREE.Mesh>(null);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  const lineGeo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([startVec, endVec]);
  }, [startVec, endVec]);

  useFrame((state) => {
    if (!packetRef.current) return;
    const t = (state.clock.elapsedTime * 0.8) % 1;
    packetRef.current.position.lerpVectors(startVec, endVec, t);
  });

  return (
    <group>
      {/* @ts-ignore */}
      <line geometry={lineGeo}>
        <lineBasicMaterial
          color={active ? '#00f2fe' : '#38bdf8'}
          transparent
          opacity={active ? 0.6 : 0.25}
        />
      </line>

      <mesh ref={packetRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export function ArchitectureLabScene({ selectedNodeId, onSelectNode }: Props) {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rootRef.current) return;
    rootRef.current.rotation.y = state.pointer.x * 0.25;
  });

  return (
    <group ref={rootRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.8} color="#ffffff" />
      <pointLight position={[0, 2, 3]} intensity={3.0} color="#00f2fe" distance={15} />
      <pointLight position={[0, -2, -3]} intensity={2.0} color="#818cf8" distance={15} />

      {/* Nodes Array */}
      {architectureNodes.map((n) => (
        <ArchNodeMesh
          key={n.id}
          node={n}
          isSelected={n.id === selectedNodeId}
          onSelect={() => onSelectNode(n)}
        />
      ))}

      {/* Pipeline Data Connections */}
      {architectureNodes.map((n, i) => {
        if (i === architectureNodes.length - 1) return null;
        const nextNode = architectureNodes[i + 1];
        const isCurrentOrNextActive = n.id === selectedNodeId || nextNode.id === selectedNodeId;
        return (
          <PipelineStream
            key={`${n.id}-${nextNode.id}`}
            start={n.position}
            end={nextNode.position}
            active={isCurrentOrNextActive}
          />
        );
      })}
    </group>
  );
}
