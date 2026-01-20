"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshDistortMaterial,
  Sphere,
  Torus,
  Text3D,
  Center,
} from "@react-three/drei";
import { useRef, useMemo } from "react";
import type * as THREE from "three";

function FloatingLotus({
  position,
  scale = 1,
  color,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Lotus petals */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 8) * 0.3,
              0,
              Math.sin((i * Math.PI * 2) / 8) * 0.3,
            ]}
            rotation={[
              -Math.PI / 4,
              (i * Math.PI * 2) / 8,
              Math.PI / 6,
            ]}
          >
            <sphereGeometry args={[0.2, 16, 16, 0, Math.PI]} />
            <MeshDistortMaterial
              color={color}
              speed={2}
              distort={0.1}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        ))}
        {/* Center */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#f4d03f" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function ZenStones() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[3, -1.5, -2]}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#7c8a6e" roughness={0.8} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#8b9a7a" roughness={0.8} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#9caa8b" roughness={0.8} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Green and pink particles
      if (Math.random() > 0.5) {
        colors[i * 3] = 0.45;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 0.4;
      } else {
        colors[i * 3] = 0.9;
        colors[i * 3 + 1] = 0.7;
        colors[i * 3 + 2] = 0.75;
      }
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ring1Ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = state.clock.elapsedTime * -0.2;
      ring2Ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={[-3, 0, -3]}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
        <Torus ref={ring1Ref} args={[1.5, 0.02, 16, 100]}>
          <meshStandardMaterial
            color="#e8b4bc"
            metalness={0.5}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </Torus>
        <Torus ref={ring2Ref} args={[1.2, 0.02, 16, 100]}>
          <meshStandardMaterial
            color="#7c8a6e"
            metalness={0.5}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </Torus>
      </Float>
    </group>
  );
}

function GlowingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime) * 0.05
      );
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, -2]}>
        <MeshDistortMaterial
          color="#a8c69f"
          speed={1.5}
          distort={0.3}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

function YogaText() {
  return (
    <Center position={[0, 2.5, -5]}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.8}
        height={0.1}
        curveSegments={12}
      >
        SERENITE
        <meshStandardMaterial color="#4a5d3f" metalness={0.3} roughness={0.4} />
      </Text3D>
    </Center>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#e8b4bc" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#a8c69f" />

      <Environment preset="sunset" />

      <Particles count={150} />
      <GlowingSphere />
      <FloatingRings />
      <ZenStones />

      <FloatingLotus position={[-2.5, 1, -1]} scale={0.8} color="#e8b4bc" />
      <FloatingLotus position={[2, -0.5, 0]} scale={0.6} color="#f5c6cb" />
      <FloatingLotus position={[0, 1.5, -3]} scale={1} color="#d4a5ab" />

      <YogaText />

      {/* Fog effect */}
      <fog attach="fog" args={["#f5f7f2", 5, 25]} />
    </>
  );
}

export default function Yoga3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
