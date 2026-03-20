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

## 🚀 100% Free Deployment (Google Sheets + Cloudflare)

This portfolio uses a completely free backend (zero signups, zero limits). 

### Step 1: Create your "Excel" Sheet
1. Open [Google Sheets](https://sheets.new) and create a new sheet.
2. Go to **Extensions > Apps Script**.
3. Paste the following code and click **Deploy > New Deployment**:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     // Log to sheet: Date, Name, Email, Message
     sheet.appendRow([new Date(), data.name, data.email, data.message]);
     
     // Send Email Notification (Gmail is free!)
     MailApp.sendEmail({
       to: "lakshaynarang6523@gmail.com",
       subject: "New Transmission from " + data.name,
       body: "Sender: " + data.name + " (" + data.email + ")\n\nMessage: " + data.message
     });
     
     return ContentService.createTextOutput(JSON.stringify({result: "success"}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
4. Copy the **Web App URL**.

### Step 2: Configure Cloudflare
In the Cloudflare Dashboard, add this **Environment Variable**:

| Variable | Description |
| --- | --- |
| `GOOGLE_SCRIPT_URL` | The Web App URL from Step 1 |

### Local Setup
1. Clone the repo
2. `npm install`
3. `npm run dev`

---
*Built with precision by VOID.DEV Core.*
