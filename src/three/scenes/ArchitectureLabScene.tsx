import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { architectureNodes } from '../../config';
import { ArchitectureNode } from '../../types';
import * as THREE from 'three';

interface Props {
  selectedNodeId: string;
  onSelectNode: (node: ArchitectureNode) => void;
}

function ArchMonolith({
  node,
  isSelected,
  onSelect,
}: {
  node: ArchitectureNode;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * 1.0 + node.position[0]) * 0.12;
      if (isSelected) {
        groupRef.current.rotation.y += 0.01;
      }
    }
    if (wireMatRef.current) {
      wireMatRef.current.opacity = isSelected ? 0.8 : 0.25;
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
      {/* Monolith Body */}
      <mesh>
        <boxGeometry args={[1.6, 1.4, 1.6]} />
        <meshStandardMaterial
          color={isSelected ? '#1a1d24' : '#0b0c0f'}
          metalness={0.92}
          roughness={0.15}
        />
      </mesh>

      {/* Industrial Cage Wireframe */}
      <mesh>
        <boxGeometry args={[1.62, 1.42, 1.62]} />
        <meshBasicMaterial
          ref={wireMatRef}
          color={isSelected ? '#ff2a2a' : '#38bdf8'}
          wireframe
          transparent
        />
      </mesh>

      {/* Target Crosshair Marker on Top */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color={isSelected ? '#ff2a2a' : '#38bdf8'} />
      </mesh>
    </group>
  );
}

export function ArchitectureLabScene({ selectedNodeId, onSelectNode }: Props) {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rootRef.current) return;
    rootRef.current.rotation.y = state.pointer.x * 0.2;
  });

  return (
    <group ref={rootRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.6} />
      <pointLight position={[0, 3, 2]} intensity={2.5} color="#ff2a2a" />

      {/* Pipeline Connector Lines */}
      {architectureNodes.map((n, i) => {
        if (i === architectureNodes.length - 1) return null;
        const nextNode = architectureNodes[i + 1];
        const points = [
          new THREE.Vector3(...n.position),
          new THREE.Vector3(...nextNode.position),
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        return (
          // @ts-ignore
          <line key={`line-${n.id}`} geometry={lineGeo}>
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.35} />
          </line>
        );
      })}

      {/* Monolith Blocks */}
      {architectureNodes.map((node) => (
        <ArchMonolith
          key={node.id}
          node={node}
          isSelected={node.id === selectedNodeId}
          onSelect={() => onSelectNode(node)}
        />
      ))}
    </group>
  );
}
