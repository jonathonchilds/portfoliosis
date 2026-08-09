import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Float,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";
import StarfieldCanvas from "./StarfieldCanvas";
import { useAnimationState } from "../context/AnimationContext";

export default function Scene() {
  const { blobEnabled } = useAnimationState();

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#020205" }}>
      {/* Three.js scene for the 3D sphere — renders first (bottom layer) */}
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ position: "absolute", inset: 0, filter: "blur(60px)", transform: "scale(1.2)" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.8}
          color="#4338ca"
        />

        <Float 
          speed={blobEnabled ? 1 : 0} 
          rotationIntensity={blobEnabled ? 0.5 : 0} 
          floatIntensity={blobEnabled ? 1 : 0}
        >
          <Sphere args={[1.8, 64, 64]}>
            <MeshDistortMaterial
              color="#7c3aed"
              attach="material"
              distort={blobEnabled ? 0.5 : 0.1}
              speed={blobEnabled ? 0.8 : 0}
              roughness={0.8}
              metalness={0.1}
            />
          </Sphere>
        </Float>

        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={blobEnabled}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* HTML5 canvas starfield — on TOP of WebGL, pointer-events:none so 3D is still interactive */}
      <StarfieldCanvas />
    </div>
  );
}
