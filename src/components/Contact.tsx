"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSent(true);
        (e.target as HTMLFormElement).reset();
      } else {
        const errData = await res.json();
        setError(errData.message || "Transmission failed. Code: 500");
      }
    } catch (err) {
      setError("Network interruption detected. [ERR_CONN]");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="w">
        <Reveal className="slbl">open channel</Reveal>
        <Reveal delay={0.1} className="stitle">Contact</Reveal>
        <Reveal delay={0.2} className="scmd">$ ssh operator@void.dev <span style={{ color: "var(--t3)" }}>→ connection open</span></Reveal>
        <div className="cg">
          <Reveal className="tf">
            <div className="tfb">
              <div className="td" style={{ width: 9, height: 9, background: "#FF5F57" }} />
              <div className="td" style={{ width: 9, height: 9, background: "#FFBD2E" }} />
              <div className="td" style={{ width: 9, height: 9, background: "#28C840" }} />
              <span style={{ fontSize: 10, color: "var(--t3)", marginLeft: 10 }}>$ compose_message --secure</span>
            </div>
            {isSent ? (
              <div className="tfd t-success">
                <div style={{ color: "var(--acid)", fontSize: 18, marginBottom: 12 }}>▸ Transmission Successful</div>
                <p style={{ color: "var(--t3)", fontSize: 13 }}>Message indexed and encrypted. High priority delivery confirmed.</p>
                <button className="fsub" style={{ marginTop: 24 }} onClick={() => setIsSent(false)}>▸ Send Another Message</button>
              </div>
            ) : (
              <form className="tfd" onSubmit={handleSubmit}>
                <div className="ff">
                  <label className="fl">Sender Name</label>
                  <div className="fw">
                    <span className="fp">$ name:</span>
                    <input type="text" name="name" className="fi" placeholder="Your name" required />
                  </div>
                </div>
                <div className="ff">
                  <label className="fl">Sender Email</label>
                  <div className="fw">
                    <span className="fp">$ email:</span>
                    <input type="email" name="email" className="fi" placeholder="you@email.com" required />
                  </div>
                </div>
                <div className="ff">
                  <label className="fl">Message</label>
                  <div className="fw">
                    <span className="fp">$ msg:</span>
                    <textarea name="message" className="fi" placeholder="Compose message..." required></textarea>
                  </div>
                </div>
                {error && <div className="f-err" style={{ color: "#FF5F57", fontSize: 11, marginBottom: 16 }}>!! {error}</div>}
                <button type="submit" className={`fsub ${isSubmitting ? "fsub-s" : ""}`} disabled={isSubmitting}>
                  {isSubmitting ? "▸ transmitting..." : "▸ transmit --encrypted --destination=lakshay"}
                </button>
              </form>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="ci-h">Let{"'"}s build<br />something real.</div>
            <p className="ci-b">Open to frontend internships, freelance UI projects, and collaborations. Replies within 24 hours.</p>
            <div className="socials">
              <a href="mailto:lakshaynarang6523@gmail.com" className="slink"><span className="sk2">[E]</span>lakshaynarang6523@gmail.com</a>
              <a href="https://github.com/lakshaynarang37" className="slink" target="_blank" rel="noopener noreferrer"><span className="sk2">[G]</span>github.com/lakshaynarang37</a>
              <a href="https://linkedin.com/in/lakshaynarang37" className="slink" target="_blank" rel="noopener noreferrer"><span className="sk2">[L]</span>linkedin.com/in/lakshaynarang37</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
