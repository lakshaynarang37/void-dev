"use client";

import { useEffect, useState, useRef } from "react";
import { Reveal } from "./Reveal";

function useTypingEffect(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 44 : 72);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return text;
}

function CountUp({ target, decimals = false, delay = 0 }: { target: number, decimals?: boolean, delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start: number | null = null;
        const duration = 1200;
        const animate = (now: number) => {
          if (!start) start = now;
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(target * ease);
          if (p < 1) requestAnimationFrame(animate);
        };
        setTimeout(() => requestAnimationFrame(animate), delay);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, delay]);

  return <span ref={ref}>{decimals ? count.toFixed(1) : Math.round(count)}</span>;
}

export function Hero() {
  const typedRole = useTypingEffect([
    "Frontend Developer_",
    "React Engineer_",
    "UI Craftsman_",
    "Creative Coder_",
    "Motion Designer_",
  ]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero">
      <div 
        className="amb amb-a parallax-bg" 
        style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px)` }} 
      />
      <div 
        className="amb amb-c parallax-bg" 
        style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }} 
      />
      <div className="w hg">
        <div>
          <Reveal className="h-eye glitc-text">B.Tech — IIITDM Jabalpur // Year 1</Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-name glitch-text" id="hero-name">
              <span>LAKSHAY</span>
              <span className="acid" data-t="NARANG">NARANG</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="h-role">
            <span className="h-role-pre">›</span>
            <span id="tc">{typedRole}</span>
          </Reveal>
          <Reveal delay={0.2} className="h-bio">
            <p>
              Building interfaces people actually <span className="em">feel</span>. 
              Self-taught React developer — shipped 3 live projects in Year 1. 
              Motion design, inclusive engineering, custom UI systems.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="h-ctas">
            <a href="#projects" className="btn btn-p">View Projects</a>
            <a href="#contact" className="btn btn-g">Initiate Contact</a>
          </Reveal>
          <Reveal delay={0.4} className="stats">
            <div className="stat">
              <span className="sn"><CountUp target={3} delay={400} /></span>
              <span className="sl">Live Projects</span>
            </div>
            <div className="stat">
              <span className="sn" style={{ color: "var(--acid)" }}>
                <CountUp target={7.8} decimals delay={600} />
              </span>
              <span className="sl">SPI Score</span>
            </div>
            <div className="stat">
              <span className="sn" style={{ color: "var(--cyan)" }}>
                <CountUp target={1} delay={800} />
              </span>
              <span className="sl">Year · B.Tech</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="hr">
          <div className="tw">
            <div className="twb">
              <div className="td" style={{ width: 9, height: 9, background: "#FF5F57" }} />
              <div className="td" style={{ width: 9, height: 9, background: "#FFBD2E" }} />
              <div className="td" style={{ width: 9, height: 9, background: "#28C840" }} />
              <span className="twp">~/identity.json</span>
            </div>
            <div className="twc">
              <div><span className="tp">$</span>&nbsp;<span style={{ color: "var(--t2)" }}>cat identity.log</span></div>
              <div className="log-stream">
                  <div className="log-l">[ 0.001 ] AUTH_KEY_ACCEPTED: LAKSHAY_NARANG</div>
                  <div className="log-l">[ 0.004 ] BOOT_SEQUENCE: NEXT_JS_15_RUNTIME</div>
                  <div className="log-l">[ 0.012 ] LOAD_MODULE: THREE_JS_CORE</div>
                  <div className="log-l">[ 0.045 ] INDEXING_PROJECTS: 3_SUCCESS</div>
                  <div className="log-l">[ 0.089 ] UI_RENDER: JETBRAINS_MONO</div>
                  <div className="log-l">[ 0.122 ] STATUS: OPEN_TO_INTERNS_2026</div>
              </div>
              <div style={{ marginTop: 12 }}><span className="tv">{"{"}</span></div>
              <div>&nbsp;&nbsp;<span className="tp">{'"name"'}</span><span className="tc">:</span>&nbsp;<span className="tv">{'"Lakshay Narang"'}</span>,</div>
              <div>&nbsp;&nbsp;<span className="tp">{'"role"'}</span><span className="tc">:</span>&nbsp;<span className="tv">{'"Frontend Developer"'}</span>,</div>
              <div>&nbsp;&nbsp;<span className="tp">{'"college"'}</span><span className="tc">:</span>&nbsp;<span className="tv">{'"IIITDM Jabalpur"'}</span>,</div>
              <div>&nbsp;&nbsp;<span className="tp">{'"stack"'}</span><span className="tc">:</span>&nbsp;<span className="tv">{'["React","Tailwind","Vite"]'}</span>,</div>
              <div>&nbsp;&nbsp;<span className="tp">{'"spi"'}</span><span className="tc">:</span>&nbsp;<span className="tv">7.8</span>,</div>
              <div>&nbsp;&nbsp;<span className="tp">{'"status"'}</span><span className="tc">:</span>&nbsp;<span className="tv" style={{ color: "var(--acid)" }}>{'"open_intern"'}</span></div>
              <div><span className="tv">{"}"}</span></div>
            </div>
          </div>
          <div className="ach">
            <div className="ach-i">⚡</div>
            <div>
              <span className="ach-t">IIT Bombay Techfest 2025</span>
              <span className="ach-s">Boeing Aeromodelling — India{"'"}s largest tech fest</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
