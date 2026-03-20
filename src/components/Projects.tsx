"use client";

import { Reveal } from "./Reveal";

const PROJECTS = [
  {
    id: "001",
    name: "SignMind",
    path: "~/projects/signmind",
    desc: "Mental health platform for the Deaf and Hard of Hearing community. Custom UI system with midnight navy palette, noise grain texture, emotion tracking, AI Insights dashboard, and Crisis Support modal.",
    tags: ["React", "HTML5", "CSS3", "JavaScript", "Accessibility"],
    live: "https://signmind.pages.dev",
    source: "https://github.com/lakshaynarang37"
  },
  {
    id: "002",
    name: "Capacitor Simulator",
    path: "~/projects/capacitor-simulator",
    desc: "Interactive physics engine visualising capacitor charging and discharging curves. Animated waveforms respond to live-adjusted parameters. Physics translated into clean, intuitive UI.",
    tags: ["React", "CSS Animations", "JavaScript", "Physics UI"],
    live: "https://capacitor-simulator.pages.dev",
    source: "https://github.com/lakshaynarang37"
  },
  {
    id: "003",
    name: "Portfolio v1",
    path: "~/projects/portfolio-v1",
    desc: "Responsive dark-themed portfolio with custom animations, Tailwind CSS styling, and optimised Vite build pipeline. Deployed via Cloudflare Pages with automatic CI/CD on Git push.",
    tags: ["React", "Tailwind CSS", "Vite", "Cloudflare Pages"],
    live: "https://portfolio-1jx.pages.dev",
    source: "https://github.com/lakshaynarang37"
  }
];

export function Projects() {
  return (
    <section id="projects">
      <div className="w">
        <Reveal className="slbl">loaded modules</Reveal>
        <Reveal delay={0.1} className="stitle">Projects</Reveal>
        <Reveal delay={0.2} className="scmd">$ ls -la ~/projects/ <span>→ 3 modules indexed</span></Reveal>

        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1} className="pc">
            <div className="pc-acc" />
            <div className="pcb">
              <div className="td" style={{ width: 9, height: 9, background: "#FF5F57" }} />
              <div className="td" style={{ width: 9, height: 9, background: "#FFBD2E" }} />
              <div className="td" style={{ width: 9, height: 9, background: "#28C840" }} />
              <span className="pcp">{p.path}</span>
              <span className="pcbadge">LIVE</span>
            </div>
            <div className="pcd">
              <div className="pcprev">
                {/* Simplified mock UI previews for each project */}
                {i === 0 && ( /* SignMind */
                    <div className="mock">
                        <div className="mnav"><div className="td" style={{ width: 7, height: 7, background: "#FF5F57" }} /><div className="td" style={{ width: 7, height: 7, background: "#FFBD2E" }} /><div className="td" style={{ width: 7, height: 7, background: "#28C840" }} /></div>
                        <div className="mc">
                        <div className="ml a" style={{ width: "52%" }}></div><div className="ml g" style={{ width: "82%" }}></div><div className="ml g" style={{ width: "90%" }}></div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginTop: 4 }}>
                            <div style={{ background: "rgba(0,255,148,.08)", border: "1px solid rgba(0,255,148,.18)", height: 26 }}></div>
                            <div style={{ background: "rgba(34,211,238,.06)", border: "1px solid rgba(34,211,238,.14)", height: 26 }}></div>
                            <div style={{ background: "rgba(167,139,250,.05)", border: "1px solid rgba(167,139,250,.12)", height: 26 }}></div>
                            <div style={{ background: "rgba(0,255,148,.04)", border: "1px solid rgba(0,255,148,.1)", height: 26 }}></div>
                        </div>
                        <div className="ml cy" style={{ width: "55%", marginTop: 5 }}></div>
                        </div>
                    </div>
                )}
                {i === 1 && ( /* Capacitor */
                    <div className="mock">
                        <div className="mnav"><div className="td" style={{ width: 7, height: 7, background: "#FF5F57" }} /><div className="td" style={{ width: 7, height: 7, background: "#FFBD2E" }} /><div className="td" style={{ width: 7, height: 7, background: "#28C840" }} /></div>
                        <div className="mc">
                        <div style={{ background: "rgba(34,211,238,.07)", border: "1px solid rgba(34,211,238,.18)", height: 52, overflow: "hidden" }}>
                            <svg width="100%" height="52" viewBox="0 0 200 52"><path d="M0 48 Q18 48 38 26 Q58 8 88 6 Q118 5 155 9 Q178 11 200 12" stroke="#22D3EE" fill="none" strokeWidth="1.5"/><path d="M0 48 Q18 48 38 26 Q58 8 88 6 Q118 5 155 9 Q178 11 200 12 L200 52 L0 52Z" fill="rgba(34,211,238,0.07)"/></svg>
                        </div>
                        <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
                            <div style={{ flex: 1, background: "var(--s2)", padding: "3px 7px", fontSize: 9, color: "var(--t3)" }}>C:<span style={{ color: "var(--cyan)" }}>100μF</span></div>
                            <div style={{ flex: 1, background: "var(--s2)", padding: "3px 7px", fontSize: 9, color: "var(--t3)" }}>V:<span style={{ color: "var(--acid)" }}>12V</span></div>
                        </div>
                        </div>
                    </div>
                )}
                {i === 2 && ( /* Portfolio v1 */
                    <div className="mock">
                        <div className="mnav"><div className="td" style={{ width: 7, height: 7, background: "#FF5F57" }} /><div className="td" style={{ width: 7, height: 7, background: "#FFBD2E" }} /><div className="td" style={{ width: 7, height: 7, background: "#28C840" }} /></div>
                        <div className="mc">
                        <div style={{ fontFamily: "var(--disp)", fontSize: 15, letterSpacing: -1, marginBottom: 5 }}><span style={{ color: "var(--acid)" }}>VOID</span><span style={{ color: "var(--cyan)" }}>.DEV</span></div>
                        <div className="ml a" style={{ width: "60%" }}></div><div className="ml g" style={{ width: "78%" }}></div>
                        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                            <div style={{ background: "rgba(0,255,148,.1)", border: "1px solid rgba(0,255,148,.25)", padding: "2px 6px", fontSize: 8, color: "var(--acid)" }}>React</div>
                            <div style={{ background: "rgba(0,255,148,.06)", border: "1px solid rgba(0,255,148,.18)", padding: "2px 6px", fontSize: 8, color: "var(--acid)" }}>Tailwind</div>
                            <div style={{ background: "rgba(0,255,148,.03)", border: "1px solid rgba(0,255,148,.1)", padding: "2px 6px", fontSize: 8, color: "var(--acid)" }}>Vite</div>
                        </div>
                        </div>
                    </div>
                )}
              </div>
              <div className="pci">
                <div>
                  <div className="pcn">Module_{p.id}</div>
                  <div className="pct">{p.name}</div>
                  <p className="pcdesc">{p.desc}</p>
                  <div className="tags">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div className="plinks">
                  <a href={p.live} className="plink" target="_blank" rel="noopener noreferrer">launch live</a>
                  <a href={p.source} className="plink" target="_blank" rel="noopener noreferrer">view source</a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
