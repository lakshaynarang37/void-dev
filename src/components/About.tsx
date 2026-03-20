"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SkillConstellation } from "./SkillConstellation";

export function About() {
  return (
    <section id="about">
      <div className="w">
        <Reveal className="slbl">operator profile</Reveal>
        <Reveal delay={0.1} className="stitle">About</Reveal>
        <Reveal delay={0.2} className="scmd">$ whoami <span style={{ color: "var(--t3)" }}>→ profile loaded</span></Reveal>
        
        <div className="ag">
          <Reveal>
            <div className="hxw">
              <div className="hxo" />
              <div className="hxm" />
              <div className="hxi">👨‍💻</div>
            </div>
            <div className="whoami">
              <div className="wi"><span className="wk">NAME</span><span className="weq">=</span><span className="wv">{'"Lakshay Narang"'}</span></div>
              <div className="wi"><span className="wk">ROLE</span><span className="weq">=</span><span className="wv">{'"Frontend Dev"'}</span></div>
              <div className="wi"><span className="wk">COLLEGE</span><span className="weq">=</span><span className="wv">{'"IIITDM Jabalpur"'}</span></div>
              <div className="wi"><span className="wk">SPI</span><span className="weq">=</span><span className="wv" style={{ color: "var(--acid)" }}>7.8 / 10.0</span></div>
              <div className="wi"><span className="wk">PROJECTS</span><span className="weq">=</span><span className="wv">3 live</span></div>
              <div className="wi"><span className="wk">STATUS</span><span className="weq">=</span><span className="wv" style={{ color: "var(--acid)" }}>{'"open_intern"'}</span></div>
            </div>
            <div className="ach2">
              <span className="ach2-b">[ Achievement Unlocked ]</span>
              <div className="ach2-t">IIT Bombay Techfest 2025</div>
              <div className="ach2-s">Boeing Aeromodelling — India{"'"}s largest tech festival, Year 1 of college.</div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ fontSize: 10, color: "var(--t3)", letterSpacing: ".15em", marginBottom: 8 }}>
              // Skill Constellation — drag to rotate · click a node
            </div>
            <SkillConstellation />
            <div className="exp-wrap">
              <div className="exp-hdr">
                <div className="td" style={{ width: 9, height: 9, background: "#FF5F57" }} />
                <div className="td" style={{ width: 9, height: 9, background: "#FFBD2E" }} />
                <div className="td" style={{ width: 9, height: 9, background: "#28C840" }} />
                <span style={{ fontSize: 10, color: "var(--t3)", marginLeft: 8, letterSpacing: ".06em" }}>~/experience.log</span>
              </div>
              <div className="exp-items">
                <div className="exp-i"><span className="exp-yr">2025–now</span><div><span className="exp-role">B.Tech Student</span><span className="exp-place">PDPM IIITDM Jabalpur · SPI 7.8</span></div></div>
                <div className="exp-i"><span className="exp-yr">2025</span><div><span className="exp-role">Self-taught React Developer</span><span className="exp-place">3 live deployed apps · Cloudflare Pages</span></div></div>
                <div className="exp-i"><span className="exp-yr">2025</span><div><span className="exp-role">IIT Bombay Techfest</span><span className="exp-place">Boeing Aeromodelling Competition</span></div></div>
              </div>
            </div>
            <div className="tn-wrap">
              <div className="tn-grid">
                {/* CORE CATEGORY */}
                <div className="tn-cat">
                  <span className="tn-cl">// core_stack</span>
                  <div className="tn-items">
                    <NexusItem icon="⚛️" name="React.js" />
                    <NexusItem icon="📜" name="JS/ES6+" />
                    <NexusItem icon="🌊" name="Tailwind" />
                    <NexusItem icon="⚡" name="Vite" />
                    <NexusItem icon="🏷️" name="HTML5" />
                    <NexusItem icon="🎨" name="CSS3" />
                  </div>
                </div>

                {/* SPECIALTIES */}
                <div className="tn-cat">
                  <span className="tn-cl">// motion_physics</span>
                  <div className="tn-items">
                    <NexusItem icon="🎬" name="Framer Motion" />
                    <NexusItem icon="✨" name="GSAP" />
                    <NexusItem icon="🌐" name="Three.js" />
                    <NexusItem icon="🏔️" name="R3F" />
                    <NexusItem icon="💧" name="Lenis" />
                  </div>
                </div>

                {/* LANGUAGES */}
                <div className="tn-cat">
                  <span className="tn-cl">// languages</span>
                  <div className="tn-items">
                    <NexusItem icon="🔷" name="C++" />
                    <NexusItem icon="🐍" name="Python" />
                    <NexusItem icon="🐙" name="Git/GitHub" />
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * NexusItem: Individual skill tile for the Tech Nexus bento grid.
 * Features glassmorphism and spring hover effects.
 */
function NexusItem({ icon, name }: { icon: string, name: string }) {
  return (
    <motion.div 
      className="tn-i"
      whileHover={{ y: -2, scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <span className="tn-ic">{icon}</span>
      <span className="tn-n">{name}</span>
    </motion.div>
  );
}
