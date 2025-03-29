"use client";
import WalletConnect from "@/components/Connect";
import Aurora from "@/components/Aurora";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FolderStack from "@/components/FolderStack";

export default function Home() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <Aurora
          colorStops={["#b2ff14", "#9ef01a", "#70e000"]}
          amplitude={1.5}
          blend={0.4}
        />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-8 lg:gap-16">
        {/* Text Content */}
        <div className="flex-1 max-w-2xl xl:max-w-3xl space-y-6 lg:space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-mono">
            <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
              Step into
            </span>
            <br />
            <span className="text-white/90 mt-2 lg:mt-4 block">
              the future of digital art.
            </span>
          </h1>

          <p className="text-lg md:text-xl font-mono text-lime-100/80 font-light">
            Create, collect, and trade unique digital assets secured by blockchain technology.
            Experience art in motion with our immersive NFT platform.
          </p>

          <div className="relative inline-block">
            <WalletConnect className="rounded-xl bg-gradient-to-br from-lime-500/30 to-emerald-600/20 backdrop-blur-xl border border-lime-400/20 px-8 py-4 hover:border-lime-400/40 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(190,255,100,0.3)] hover:shadow-[0_0_50px_-5px_rgba(190,255,100,0.5)]" />
            <div className="absolute inset-0 -z-10 bg-lime-500/10 blur-3xl animate-pulse" />
          </div>
        </div>

        {/* FolderStack Component */}
        {/* In your Home component */}
        {/* In your Home component */}
        <div className="flex-1 flex items-center justify-center lg:justify-end w-full h-full">
          <FolderStack className="w-[250px] h-[300px] md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[500px]" />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-lime-400/40 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}