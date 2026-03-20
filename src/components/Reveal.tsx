"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export function Reveal({ children, delay = 0, className = "", id }: RevealProps) {
  return (
    <motion.div
      id={id}
      className={`rv ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -24px 0px" }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}
