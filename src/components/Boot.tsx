"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BLINES = [
  { t: "[BIOS]  VOID.DEV v1.0 — kernel loading...", c: "", d: 0 },
  { t: "[OK]    React 19 + Next.js 15 initialized", c: "bok", d: 90 },
  { t: "[OK]    Framer Motion v12 engine online", c: "bok", d: 80 },
  { t: "[OK]    Three.js WebGL — particle field active", c: "bok", d: 75 },
  { t: "[OK]    Three.js WebGL — skill constellation ready", c: "bok", d: 70 },
  { t: "[OK]    GSAP ScrollTrigger mounted", c: "bok", d: 65 },
  { t: "[!!]    Scanning project modules...", c: "bwn", d: 160 },
  { t: "[OK]    MODULE: SignMind — LOADED", c: "bok", d: 100 },
  { t: "[OK]    MODULE: Capacitor Simulator — LOADED", c: "bok", d: 80 },
  { t: "[OK]    MODULE: Portfolio v1 — LOADED", c: "bok", d: 70 },
  { t: "[OK]    Design tokens VOID_DARK — active", c: "bok", d: 75 },
  { t: "[!!]    SYSTEM READY — LAKSHAY_NARANG — CLEARED", c: "bok", d: 120 },
];

export function Boot({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [prog, setProg] = useState(0);
  const [booted, setBooted] = useState(false);
  const [ready, setReady] = useState(false);
  const skipRef = useRef(false);

  useEffect(() => {
    const runBoot = async () => {
      for (let i = 0; i < BLINES.length; i++) {
        if (skipRef.current) break;
        await new Promise(r => setTimeout(r, BLINES[i].d || 60));
        setLogs(prev => [...prev, BLINES[i]]);
        setProg(((i + 1) / BLINES.length) * 100);
      }
      if (!skipRef.current) {
        setReady(true);
        await new Promise(r => setTimeout(r, 900));
        handleSkip();
      }
    };

    runBoot();

    const handleKey = () => handleSkip();
    window.addEventListener("keydown", handleKey, { once: true });
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSkip = () => {
    if (booted) return;
    skipRef.current = true;
    setBooted(true);
    setTimeout(onComplete, 530);
  };

  return (
    <AnimatePresence>
      {!booted && (
        <motion.div 
          id="boot"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.7, 0, 1, 1] }}
        >
          <div id="bi">
            <div className="b-logo">
                <span className="bv">VOID</span>
                <span className="bd">.DEV</span>
            </div>
            <div className="b-sub">Portfolio Runtime v1.0 // Initializing</div>
            <div id="blog" style={{ overflowY: "auto" }}>
              {logs.map((l, i) => (
                <div key={i} className={`bl ${l.c}`}>{l.t}</div>
              ))}
            </div>
            <div id="bpw">
              <div id="bpl">Loading Modules</div>
              <div id="bb">
                <div id="bbf" style={{ width: `${prog}%` }} />
              </div>
            </div>
            {ready && <div id="brd" style={{ opacity: 1 }}>▸ System Ready — Operator Cleared</div>}
          </div>
          <div id="bsk" onClick={handleSkip}>[ Press any key to skip ]</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
