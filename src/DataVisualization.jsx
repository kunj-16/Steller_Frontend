import React from "react";

export default function DataVisualization({ result, loading }) {
  if (loading) {
    return (
      <div className="viz-card" style={{ alignItems: "center", justifyContent: "center", minHeight: "240px" }}>
        <div className="rp-loading-rings">
          <span /><span /><span />
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
          Synthesizing planetary model...
        </p>
      </div>
    );
  }

  if (!result) return null;

  const isHabitable = result.habitability_class === "Confirmed";
  const confidence = Math.round((result.habitability_probability || 0) * 100);
  const planetColorStart = isHabitable ? "#4ecb8d" : "#e06b4a";
  const planetColorMid = isHabitable ? "#22c55e" : "#c2410c";
  const planetColorEnd = isHabitable ? "#15803d" : "#991b1b";

  return (
    <div className="viz-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 className="viz-title">Planetary Transit Reconstruction</h4>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: isHabitable ? "var(--color-confirmed)" : "var(--color-false)",
            background: isHabitable ? "rgba(78, 203, 141, 0.1)" : "rgba(224, 107, 74, 0.1)",
            padding: "3px 8px",
            borderRadius: "4px",
            border: `1px solid ${isHabitable ? "rgba(78, 203, 141, 0.3)" : "rgba(224, 107, 74, 0.3)"}`,
          }}
        >
          {result.habitability_class}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
        {/* Planet Sphere Visual */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <svg style={{ width: "100%", maxWidth: "180px", height: "auto" }} viewBox="0 0 200 200">
            <defs>
              <radialGradient id="planetGlow" cx="40%" cy="40%">
                <stop offset="0%" stopColor={planetColorStart} />
                <stop offset="70%" stopColor={planetColorMid} />
                <stop offset="100%" stopColor={planetColorEnd} />
              </radialGradient>
              <filter id="glowFilter">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Atmosphere Layers */}
            <circle
              cx="100"
              cy="100"
              r="82"
              fill="none"
              stroke={isHabitable ? "rgba(78, 203, 141, 0.18)" : "rgba(224, 107, 74, 0.18)"}
              strokeWidth="12"
            />

            {/* Planet Body */}
            <circle cx="100" cy="100" r="64" fill="url(#planetGlow)" filter="url(#glowFilter)" />

            {/* Surface Shading Detail */}
            <ellipse
              cx="108"
              cy="88"
              rx="38"
              ry="28"
              fill={isHabitable ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.25)"}
            />

            {/* Orbit Trace Ring */}
            <circle
              cx="100"
              cy="100"
              r="76"
              fill="none"
              stroke="rgba(212, 132, 74, 0.35)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          </svg>
        </div>

        {/* Metrics Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div
            style={{
              padding: "0.75rem 0.9rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(212, 132, 74, 0.12)",
              borderRadius: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
              }}
            >
              Estimated Radius
            </span>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#f5f0e8",
                marginTop: "2px",
              }}
            >
              {Number(result.predicted_planet_radius || 0).toFixed(3)}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "4px" }}>
                R⊕
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "0.75rem 0.9rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(212, 132, 74, 0.12)",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                }}
              >
                Classification Confidence
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: isHabitable ? "var(--color-confirmed)" : "var(--color-false)",
                  fontWeight: 600,
                }}
              >
                {confidence}%
              </span>
            </div>
            <div
              style={{
                height: "6px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "99px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${confidence}%`,
                  height: "100%",
                  background: isHabitable ? "var(--color-confirmed)" : "var(--color-false)",
                  transition: "width 0.8s ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Status Badges */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
        {isHabitable ? (
          <>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                border: "1px solid rgba(78, 203, 141, 0.35)",
                background: "rgba(78, 203, 141, 0.08)",
                fontSize: "0.72rem",
                color: "var(--color-confirmed)",
                fontFamily: "var(--font-mono)",
              }}
            >
              ✓ Verified Planet Candidate
            </span>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                border: "1px solid rgba(212, 132, 74, 0.35)",
                background: "rgba(212, 132, 74, 0.08)",
                fontSize: "0.72rem",
                color: "var(--accent-light)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Kepler Optical Signal
            </span>
          </>
        ) : (
          <>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                border: "1px solid rgba(224, 107, 74, 0.35)",
                background: "rgba(224, 107, 74, 0.08)",
                fontSize: "0.72rem",
                color: "var(--color-false)",
                fontFamily: "var(--font-mono)",
              }}
            >
              ⚠ False Positive Signal
            </span>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                border: "1px solid rgba(212, 132, 74, 0.25)",
                background: "rgba(212, 132, 74, 0.05)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Non-Planetary Transit
            </span>
          </>
        )}
      </div>
    </div>
  );
}