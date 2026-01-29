"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshDistortMaterial,
  Sphere,
  Torus,
  MeshTransmissionMaterial,
  Trail,
} from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// Silhouette de yoga en position lotus
function YogaPose({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={0.8}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#e8d4c4" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Body/Torso */}
      <mesh position={[0, 1.2, 0]}>
        <capsuleGeometry args={[0.2, 0.5, 16, 32]} />
        <meshStandardMaterial color="#d4a5ab" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Left leg (crossed) */}
      <mesh position={[-0.25, 0.4, 0.1]} rotation={[0, 0, Math.PI / 6]}>
        <capsuleGeometry args={[0.1, 0.6, 16, 32]} />
        <meshStandardMaterial color="#e8d4c4" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Right leg (crossed) */}
      <mesh position={[0.25, 0.4, -0.1]} rotation={[0, 0, -Math.PI / 6]}>
        <capsuleGeometry args={[0.1, 0.6, 16, 32]} />
        <meshStandardMaterial color="#e8d4c4" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Left arm (meditation pose) */}
      <mesh position={[-0.4, 0.9, 0.15]} rotation={[0, 0, Math.PI / 3]}>
        <capsuleGeometry args={[0.06, 0.4, 16, 32]} />
        <meshStandardMaterial color="#e8d4c4" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Right arm (meditation pose) */}
      <mesh position={[0.4, 0.9, 0.15]} rotation={[0, 0, -Math.PI / 3]}>
        <capsuleGeometry args={[0.06, 0.4, 16, 32]} />
        <meshStandardMaterial color="#e8d4c4" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Aura glow */}
      <Sphere args={[1, 32, 32]} position={[0, 1, 0]}>
        <MeshDistortMaterial
          color="#a8c69f"
          speed={1}
          distort={0.2}
          transparent
          opacity={0.15}
        />
      </Sphere>
    </group>
  );
}

// Mandala rotatif
function Mandala({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const rings = 5;
  const petalsPerRing = [8, 12, 16, 20, 24];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {Array.from({ length: rings }).map((_, ringIndex) => (
        <group key={ringIndex}>
          {Array.from({ length: petalsPerRing[ringIndex] }).map((_, petalIndex) => {
            const angle = (petalIndex / petalsPerRing[ringIndex]) * Math.PI * 2;
            const radius = 0.5 + ringIndex * 0.4;
            const colors = ["#e8b4bc", "#a8c69f", "#d4a5ab", "#7c8a6e", "#f5c6cb"];
            
            return (
              <mesh
                key={petalIndex}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius,
                  0
                ]}
                rotation={[0, 0, angle + Math.PI / 2]}
              >
                <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
                <meshStandardMaterial
                  color={colors[ringIndex]}
                  metalness={0.3}
                  roughness={0.4}
                  transparent
                  opacity={0.8 - ringIndex * 0.1}
                />
              </mesh>
            );
          })}
        </group>
      ))}
      {/* Center lotus */}
      <mesh>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#f4d03f" metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Fleur de lotus amelioree
function EnhancedLotus({
  position,
  scale = 1,
  color,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      const targetScale = hovered ? scale * 1.2 : scale;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group 
        ref={groupRef} 
        position={position} 
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Multiple layers of petals */}
        {[0, 1, 2].map((layer) => (
          <group key={layer} position={[0, layer * 0.08, 0]}>
            {Array.from({ length: 8 + layer * 4 }).map((_, i) => {
              const totalPetals = 8 + layer * 4;
              const angle = (i / totalPetals) * Math.PI * 2;
              const petalScale = 1 - layer * 0.2;
              
              return (
                <mesh
                  key={i}
                  position={[
                    Math.cos(angle) * (0.25 + layer * 0.1),
                    0,
                    Math.sin(angle) * (0.25 + layer * 0.1),
                  ]}
                  rotation={[-Math.PI / 4 + layer * 0.1, angle, Math.PI / 6]}
                  scale={petalScale}
                >
                  <sphereGeometry args={[0.15, 16, 16, 0, Math.PI]} />
                  <MeshDistortMaterial
                    color={color}
                    speed={2}
                    distort={0.05}
                    roughness={0.3}
                    metalness={0.1}
                    transparent
                    opacity={0.9 - layer * 0.1}
                  />
                </mesh>
              );
            })}
          </group>
        ))}
        {/* Golden center */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="#f4d03f" metalness={0.5} roughness={0.3} emissive="#f4d03f" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// Pierres zen empilees
function ZenStones() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const stones = [
    { y: 0, size: 0.5, color: "#5a6b52" },
    { y: 0.7, size: 0.4, color: "#6b7c62" },
    { y: 1.25, size: 0.3, color: "#7c8d73" },
    { y: 1.65, size: 0.2, color: "#8d9e84" },
  ];

  return (
    <group ref={groupRef} position={[4, -2, -3]}>
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
        {stones.map((stone, i) => (
          <mesh key={i} position={[0, stone.y, 0]}>
            <sphereGeometry args={[stone.size, 32, 32]} />
            <meshStandardMaterial color={stone.color} roughness={0.9} metalness={0} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

// Particules de lumiere
function LightParticles({ count = 100 }) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 8;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 2;
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      light.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
    }
  });

  return (
    <>
      <pointLight ref={light} position={[0, 2, 0]} intensity={0.5} color="#f4d03f" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.sizes.length}
            array={particles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#f4d03f"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  );
}

// Anneaux energetiques
function EnergyRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.2;
      ring1.current.rotation.y = t * 0.3;
    }
    if (ring2.current) {
      ring2.current.rotation.x = t * -0.15;
      ring2.current.rotation.z = t * 0.25;
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.2;
      ring3.current.rotation.z = t * -0.15;
    }
  });

  return (
    <group position={[-4, 0.5, -2]}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Trail width={0.5} length={8} color="#e8b4bc" attenuation={(t) => t * t}>
          <Torus ref={ring1} args={[1.8, 0.015, 16, 100]}>
            <meshStandardMaterial color="#e8b4bc" metalness={0.6} roughness={0.2} transparent opacity={0.6} />
          </Torus>
        </Trail>
        <Trail width={0.5} length={8} color="#a8c69f" attenuation={(t) => t * t}>
          <Torus ref={ring2} args={[1.4, 0.015, 16, 100]}>
            <meshStandardMaterial color="#a8c69f" metalness={0.6} roughness={0.2} transparent opacity={0.6} />
          </Torus>
        </Trail>
        <Trail width={0.5} length={8} color="#f4d03f" attenuation={(t) => t * t}>
          <Torus ref={ring3} args={[1, 0.015, 16, 100]}>
            <meshStandardMaterial color="#f4d03f" metalness={0.6} roughness={0.2} transparent opacity={0.6} />
          </Torus>
        </Trail>
      </Float>
    </group>
  );
}

// Sphere centrale de cristal
function CrystalSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = state.clock.elapsedTime * -0.15;
      innerRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[0, 0, -3]}>
        <Sphere ref={sphereRef} args={[1.2, 64, 64]}>
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#a8c69f"
            transmission={0.95}
            roughness={0.1}
          />
        </Sphere>
        {/* Inner geometric shape */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#e8b4bc"
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
}

// Camera animation responsive au scroll
function CameraController() {
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    const targetY = scrollY * 0.002;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -scrollY * 0.0002, 0.05);
  });

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 5, 5]} intensity={0.4} color="#e8b4bc" />
      <pointLight position={[5, -5, 5]} intensity={0.4} color="#a8c69f" />
      <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.5} penumbra={1} color="#f4d03f" />

      <Environment preset="dawn" />
      <CameraController />

      <LightParticles count={80} />
      <CrystalSphere />
      <EnergyRings />
      <ZenStones />
      <YogaPose position={[0, -1, 0]} />
      <Mandala position={[0, 3, -6]} scale={1.5} />

      <EnhancedLotus position={[-2, 0.5, 1]} scale={0.7} color="#e8b4bc" />
      <EnhancedLotus position={[2.5, -0.5, 0]} scale={0.5} color="#f5c6cb" />
      <EnhancedLotus position={[1, 2, -2]} scale={0.9} color="#d4a5ab" />
      <EnhancedLotus position={[-3, 1.5, -3]} scale={0.6} color="#e8b4bc" />

      <fog attach="fog" args={["#f5f7f2", 8, 30]} />
    </>
  );
}

export default function Yoga3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
