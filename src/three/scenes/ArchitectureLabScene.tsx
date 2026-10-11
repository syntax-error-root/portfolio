import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { architectureNodes } from '../../config';
import { ArchitectureNode } from '../../types';
import * as THREE from 'three';

interface Props {
  selectedNodeId: string;
  onSelectNode: (node: ArchitectureNode) => void;
}

function ArchBlock({
  node,
  isSelected,
  onSelect,
}: {
  node: ArchitectureNode;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * 1.2 + node.position[0]) * 0.15;
      if (isSelected) {
        groupRef.current.rotation.y += 0.015;
      }
    }
    if (glowMatRef.current) {
      glowMatRef.current.opacity = isSelected
        ? 0.85 + Math.sin(state.clock.elapsedTime * 6) * 0.15
        : 0.25;
    }
  });

  const nodeColor = isSelected ? '#38bdf8' : '#818cf8';

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
      {/* Node Physical Body */}
      <mesh>
        <boxGeometry args={[1.6, 1.2, 1.6]} />
        <meshStandardMaterial
          color={isSelected ? '#1e293b' : '#0f172a'}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe Outline */}
      <mesh>
        <boxGeometry args={[1.64, 1.24, 1.64]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color={nodeColor}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Pulsing indicator orb on top */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={isSelected ? '#38bdf8' : '#34d399'} />
      </mesh>
    </group>
  );
}

export function ArchitectureLabScene({ selectedNodeId, onSelectNode }: Props) {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rootRef.current) return;
    // subtle tilt on pointer
    rootRef.current.rotation.y = state.pointer.x * 0.25;
  });

  return (
    <group ref={rootRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[0, 4, 2]} intensity={2.0} color="#38bdf8" />

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
            <lineBasicMaterial color="#38bdf8" transparent opacity={0.3} />
          </line>
        );
      })}

      {/* Render Architecture Component Blocks */}
      {architectureNodes.map((node) => (
        <ArchBlock
          key={node.id}
          node={node}
          isSelected={node.id === selectedNodeId}
          onSelect={() => onSelectNode(node)}
        />
      ))}
    </group>
  );
}
