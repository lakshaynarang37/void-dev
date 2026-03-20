"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function Scanlines() {
  return (
    <>
      <div id="v-sl" aria-hidden="true" />
      <div id="v-vg" aria-hidden="true" />
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div id="v-sp" style={{ scaleX }} aria-hidden="true" />
  );
}
