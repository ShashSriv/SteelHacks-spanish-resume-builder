import React, { useEffect, useMemo, useRef, useState } from "react";
import { FileText, Download, Eye } from 'lucide-react';

/** ===== Config ===== */
const API_URL = "http://localhost:8000/latest"; // adjust if needed
const BASE_POLL_MS = 2000; // 1–3s window
const MAX_BACKOFF_MS = 16000; // cap backoff at 16s

function nextDelay(curr) {
  return Math.min(curr * 2, MAX_BACKOFF_MS);
}


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

  const hasContent = personal?.name || 
                    work.length > 0 || 
                    (edu?.school || edu?.degree) || 
                    skills.length > 0 || 
                    summaryText;

  return (
    <div className="card">
      <div className="card-header">
        <div className="resume-preview-header">
          <h3 className="card-title">Live Resume Preview</h3>
          <div className="preview-actions">
            <button className="btn" onClick={refresh}>
              <Eye size={16} />
              Refresh
            </button>
          </div>
        </div>
        {lastUpdated && (
          <p className="card-subtitle">
            Last updated: {lastUpdated}
          </p>
        )}
        {error && (
          <p className="card-subtitle" style={{ color: "#991B1B" }}>
            (auto-retrying in ~{Math.min(delay / 1000, MAX_BACKOFF_MS / 1000)}s)
          </p>
        )}
      </div>

      {error && (
        <div role="alert" className="banner" style={{
          background: "#FEF2F2",
          color: "#991B1B",
          border: "1px solid #FCA5A5",
          borderRadius: 8,
          padding: "10px 12px",
          margin: "12px 24px",
          fontSize: 14,
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="resume-preview-container">
        {hasContent ? (
          <div className="resume-preview-content">
            {/* Contact Information */}
            {personal?.name && (
              <div className="resume-section">
                <div className="resume-name">{personal.name}</div>
                <div className="resume-contact">{contactLine || <span style={{ color: "#6b7280" }}>location • email • phone</span>}</div>
              </div>
            )}

            {/* Professional Summary */}
            {summaryText && (
              <div className="resume-section">
                <div className="resume-section-title">Professional Summary</div>
                <div className="resume-item-description">{summaryText}</div>
              </div>
            )}

            {/* Education */}
            {(edu?.school || edu?.degree || edu?.start || edu?.end) && (
              <div className="resume-section">
                <div className="resume-section-title">Education</div>
                <div className="resume-item">
                  <div className="resume-item-title">{edu?.school}</div>
                  <div className="resume-item-company">{edu?.degree}</div>
                  <div className="resume-item-dates">{dateRange(edu?.start, edu?.end)}</div>
                </div>
              </div>
            )}

            {/* Experience */}
            {work.filter(w => w && (w.role || w.start || w.end || w.description1 || w.description2)).length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">Work Experience</div>
                {work.map((w, i) => {
                  const hasContent = w && (w.role || w.start || w.end || w.description1 || w.description2);
                  if (!hasContent) return null;
                  return (
                    <div key={i} className="resume-item">
                      <div className="resume-item-title">{w.role}</div>
                      <div className="resume-item-dates">{dateRange(w.start, w.end)}</div>
                      <div className="resume-item-description">
                        <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                          {w.description1 && <li style={{ margin: "2px 0" }}>{w.description1}</li>}
                          {w.description2 && <li style={{ margin: "2px 0" }}>{w.description2}</li>}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Certifications */}
            {certs.some(c => c && (c.name || c.issuer || c.year)) && (
              <div className="resume-section">
                <div className="resume-section-title">Certifications</div>
                <ul style={{ margin: "8px 0 0 18px", padding: 0 }}>
                  {certs.map((c, i) => {
                    const line = [c?.name, c?.issuer, c?.year].filter(Boolean).join(" — ");
                    if (!line) return null;
                    return (
                      <li key={i} style={{ margin: "2px 0" }}>
                        {line}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">Skills</div>
                <div className="resume-skills">
                  {skills.map((sk, i) => (
                    <span key={i} className="resume-skill">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <FileText className="empty-state-icon" />
            <h4 className="empty-state-title">Loading Resume</h4>
            <p className="empty-state-description">
              {!data && !error ? "Loading latest résumé…" : "Start adding information to see the preview here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
