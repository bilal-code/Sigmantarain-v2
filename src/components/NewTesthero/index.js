"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./utils.js";

const ParticleRing = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Particle Background */}
      <Canvas camera={{ position: [10, -7.5, -5] }} className="bg-black">
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 px-6">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold bg-white bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,200,255,0.6)]">
          SIGMANTARIAN
        </h1>

        {/* Subtext 1 */}
        <p className="text-lg md:text-xl text-[#9BE8FF] font-medium tracking-wide drop-shadow-[0_0_20px_rgba(0,180,255,0.4)]">
          WHERE YOUR FINANCIAL FREEDOM BEGINS
        </p>

        {/* Subtext 2 */}
        <p className="text-sm md:text-lg text-[#C7BFFF] max-w-3xl leading-relaxed drop-shadow-[0_0_20px_rgba(130,120,255,0.3)]">
          A REVOLUTIONARY CRYPTO PLATFORM OFFERING MAXIMUM REWARDS &
          SUSTAINABILITY
        </p>

        {/* Button */}
        {/* bg-gradient-to-r from-[#00E0FF] via-[#3B82F6] to-[#9333EA] */}
        <button className="mt-6 px-8 py-3 md:px-10 md:py-3 rounded-full font-bold text-lg  bg-white text-sky-600 shadow-[0_0_35px_rgba(0,200,255,0.2)] hover:shadow-[0_0_50px_rgba(0,200,255,0.3)] hover:scale-105 transition-all duration-300">
          Join The Community
        </button>
      </div>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });
  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => (
  <Sphere position={position} args={[0.1, 10, 10]}>
    <meshStandardMaterial
      emissive={color}
      emissiveIntensity={0.5}
      roughness={0.5}
      color={color}
    />
  </Sphere>
);

export default ParticleRing;
