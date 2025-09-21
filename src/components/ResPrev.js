import React, { useEffect, useMemo, useRef, useState } from "react";

/** ===== Config ===== */
const API_URL = "http://localhost:8000/latest"; // adjust if needed
const BASE_POLL_MS = 2000; // 1–3s window
const MAX_BACKOFF_MS = 16000; // cap backoff at 16s

function nextDelay(curr) {
  return Math.min(curr * 2, MAX_BACKOFF_MS);
}

/** ===== Minimal inline styles ===== */
const s = {
  page: {
    maxWidth: 800,
    margin: "24px auto",
    padding: "28px 32px",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    color: "#111827",
    background: "#ffffff",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    borderBottom: "2px solid #111827",
    paddingBottom: 10,
    marginBottom: 16,
  },
  name: { fontSize: 28, fontWeight: 800, lineHeight: 1.15 },
  contact: { textAlign: "right", fontSize: 14, lineHeight: 1.6 },
  section: { marginTop: 18 },
  sectionTitle: { fontWeight: 700, fontSize: 16, letterSpacing: 0.4 },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 8,
  },
  role: { fontWeight: 600 },
  date: { color: "#374151", whiteSpace: "nowrap" },
  bulletList: { margin: "6px 0 0 18px" },
  bullet: { margin: "2px 0" },
  pillWrap: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  pill: {
    border: "1px solid #d1d5db",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 13,
    color: "#111827",
    background: "#f9fafb",
  },
  summary: { marginTop: 8, fontSize: 14, color: "#111827" },
  small: { fontSize: 13, color: "#4b5563" },
  faint: { color: "#6b7280" },
  hr: { border: 0, height: 1, background: "#e5e7eb", margin: "12px 0" },
  muted: { color: "#6b7280", fontSize: 13 },
  banner: {
    background: "#FEF2F2",
    color: "#991B1B",
    border: "1px solid #FCA5A5",
    borderRadius: 8,
    padding: "10px 12px",
    marginBottom: 12,
    fontSize: 14,
  },
  controls: { display: "flex", gap: 8, alignItems: "center", marginBottom: 8 },
  btn: {
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
  },
};

// Utility: safe join date range
function dateRange(start, end) {
  const a = (start || "").trim();
  const b = (end || "").trim();
  if (!a && !b) return "";
  if (a && !b) return a;
  if (!a && b) return b;
  return `${a} – ${b}`;
}

export default function LiveResumePreview() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [delay, setDelay] = useState(BASE_POLL_MS);
  const timeoutRef = useRef(null);

  // Manual refresh
  const refresh = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
      setLastUpdated(new Date().toLocaleTimeString());
      setDelay(BASE_POLL_MS); // reset backoff on success
    } catch (e) {
      setError(e?.message || "Failed to fetch");
      setDelay((d) => nextDelay(d));
    }
  };

  // Poll with exponential backoff
  useEffect(() => {
    let alive = true;

    const tick = async () => {
      await refresh();
      if (alive) {
        timeoutRef.current = setTimeout(tick, delay);
      }
    };

    tick();

    return () => {
      alive = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  const personal = data?.personal;
  const edu = data?.education;
  const work = data?.work || [];
  const certs = data?.certifications || [];
  const skills = (data?.skills && data.skills.skills) || [];
  const summaryText = (data?.summary || "").trim();

  const contactLine = useMemo(() => {
    if (!personal) return "";
    const items = [];
    if (personal.location) items.push(<span key="loc">{personal.location}</span>);
    if (personal.email)
      items.push(
        <a key="email" href={`mailto:${personal.email}`} style={{ color: "#1f2937", textDecoration: "none" }}>
          {personal.email}
        </a>
      );
    if (personal.phone)
      items.push(
        <a key="phone" href={`tel:${personal.phone}`} style={{ color: "#1f2937", textDecoration: "none" }}>
          {personal.phone}
        </a>
      );
    return items.reduce((acc, node, idx) => {
      if (idx > 0) acc.push(<span key={`sep-${idx}`}> | </span>);
      acc.push(node);
      return acc;
    }, []);
  }, [personal]);

  return (
    <main style={s.page} aria-busy={!data && !error} aria-live="polite">
      {/* Controls & status */}
      <div style={s.controls}>
        <button style={s.btn} onClick={refresh}>Refresh now</button>
        {lastUpdated && <span style={s.muted}>Last updated: {lastUpdated}</span>}
        {error && (
          <span style={{ ...s.muted, color: "#991B1B" }}>
            (auto-retrying in ~{Math.min(delay / 1000, MAX_BACKOFF_MS / 1000)}s)
          </span>
        )}
      </div>
      {error && (
        <div role="alert" style={s.banner}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Header */}
      <header style={s.headerRow}>
        <div>
          <div style={s.name}>{personal?.name || "Your Name"}</div>
        </div>
        <div style={s.contact}>{contactLine || <span style={s.muted}>location | email | phone</span>}</div>
      </header>

      {/* Summary (optional) */}
      {summaryText && (
        <section style={s.section}>
          <div style={s.sectionTitle}>SUMMARY</div>
          <p style={s.summary}>{summaryText}</p>
          <hr style={s.hr} />
        </section>
      )}

      {/* Education */}
      {(edu?.school || edu?.degree || edu?.start || edu?.end) && (
        <section style={s.section}>
          <div style={s.sectionTitle}>EDUCATION</div>
          <div style={s.rowBetween}>
            <div>
              <div style={s.role}>{edu?.school}</div>
              <div style={s.small}>{edu?.degree}</div>
            </div>
            <div style={s.date}>{dateRange(edu?.start, edu?.end)}</div>
          </div>
          <hr style={s.hr} />
        </section>
      )}

      {/* Experience (up to 3 from backend) */}
      {work.filter(w => w && (w.role || w.start || w.end || w.description1 || w.description2)).length > 0 && (
        <section style={s.section}>
          <div style={s.sectionTitle}>EXPERIENCE</div>
          {work.map((w, i) => {
            const hasContent = w && (w.role || w.start || w.end || w.description1 || w.description2);
            if (!hasContent) return null;
            return (
              <div key={i} style={{ marginTop: 8 }}>
                <div style={s.rowBetween}>
                  <div style={s.role}>{w.role}</div>
                  <div style={s.date}>{dateRange(w.start, w.end)}</div>
                </div>
                <ul style={s.bulletList}>
                  {w.description1 && <li style={s.bullet}>{w.description1}</li>}
                  {w.description2 && <li style={s.bullet}>{w.description2}</li>}
                </ul>
              </div>
            );
          })}
          <hr style={s.hr} />
        </section>
      )}

      {/* Certifications */}
      {certs.some(c => c && (c.name || c.issuer || c.year)) && (
        <section style={s.section}>
          <div style={s.sectionTitle}>CERTIFICATIONS</div>
          <ul style={{ marginTop: 8, marginLeft: 18 }}>
            {certs.map((c, i) => {
              const line = [c?.name, c?.issuer, c?.year].filter(Boolean).join(" — ");
              if (!line) return null;
              return (
                <li key={i} style={s.bullet}>
                  {line}
                </li>
              );
            })}
          </ul>
          <hr style={s.hr} />
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={s.section}>
          <div style={s.sectionTitle}>SKILLS</div>
          <div style={s.pillWrap}>
            {skills.map((sk, i) => (
              <span key={i} style={s.pill}>
                {sk}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Loading */}
      {!data && !error && <p style={s.faint}>Loading latest résumé…</p>}
    </main>
  );
}
