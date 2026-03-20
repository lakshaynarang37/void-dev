"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 55);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? "sc" : ""}>
      <Link href="#hero" className="nl">
        <span className="v">VOID</span>
        <span className="d">.DEV</span>
      </Link>
      <div className="nr">
        <Link href="#hero">home</Link>
        <Link href="#projects">projects</Link>
        <Link href="#about">about</Link>
        <Link href="#contact">contact</Link>
        <div className="nbadge">
          <div className="ndot" />
          Open to Work
        </div>
      </div>
    </nav>
  );
}
