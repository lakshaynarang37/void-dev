# VOID.DEV — Lakshay Narang Portfolio

A high-performance, maximalist portfolio built with **Next.js 15**, **Three.js**, and **Framer Motion**. Designed with a futuristic "hacker" aesthetic, featuring interactive 3D systems and a robust serverless backend.

![Portfolio Preview](public/preview.png)

## 🌌 Core Features

### 1. 3D Systems (R3F)
- **Skill Constellation**: An interactive 3D globe of 20+ technologies with Fibonacci-distributed nodes.
- **DNA Helix Divider**: A parametric double-helix section transition symbolizing "Code DNA."
- **Volumetric Particles**: A drifting field of 3,000 particles and floating wireframe geometry for deep parallax.

### 2. High-Tech UI (Framer Motion + GSAP)
- **Identity Terminal**: Live-boot sequencing and scrolling diagnostic logs.
- **Tech Nexus**: A structured bento-style grid for comprehensive skill visualization.
- **Smooth Interaction**: Integrated **Lenis** for high-fidelity inertial scrolling.

### 3. Serverless Backend
- **Airtable Integration**: Real-time storage of contact form submissions in a spreadsheet format.
- **Resend Notifications**: Instant email alerts for every new transmission.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **3D Engine**: [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) & [Three.js](https://threejs.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Backend**: Airtable API & Resend API

## 🚀 Deployment (Cloudflare Pages)

To deploy this portfolio on Cloudflare Pages, ensure the following **Environment Variables** are configured:

| Variable | Description |
| --- | --- |
| `AIRTABLE_API_KEY` | Your Airtable Personal Access Token |
| `AIRTABLE_BASE_ID` | The ID of your Airtable Base |
| `AIRTABLE_TABLE_NAME` | Name of the table (default: `Submissions`) |
| `RESEND_API_KEY` | Your Resend API Key for email alerts |

### Local Setup
1. Clone the repo
2. `npm install`
3. `npm run dev`

---
*Built with precision by VOID.DEV Core.*
