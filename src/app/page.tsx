"use client";

import { useState } from "react";
import { Boot } from "@/components/Boot";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { BackgroundParticles } from "@/components/BackgroundParticles";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "../components/Footer";
import { MatrixRain } from "@/components/MatrixRain";

import { DNADivider } from "@/components/DNADivider";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <Cursor />
      <BackgroundParticles />
      
      {!booted ? (
        <Boot onComplete={() => setBooted(true)} />
      ) : (
        <SmoothScroll>
          <div id="main" className="vis">
            <Navigation />
            <Hero />
            
            <MatrixRain id="r1" label="// projects" />
            <Projects />
            
            <MatrixRain id="r2" label="// about" />
            <About />
            
            <DNADivider />
            
            <MatrixRain id="r3" label="// contact" />
            <Contact />
            
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
