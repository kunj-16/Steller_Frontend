export default function DataVisualization({ result, loading }) {
  return (
    <div style={styles.container}>
      {loading ? (
        <LoadingState />
      ) : result ? (
        <ResultVisualization result={result} />
      ) : (
        <EmptyState />
      )}
      <style>{styles.keyframes}</style>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={styles.centerContent}>
      <div style={styles.spinner} />
      <p style={styles.loadingText}>Analyzing exoplanet data...</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={styles.centerContent}>
      <div style={styles.emptyIcon}>🔭</div>
      <p style={styles.emptyText}>Enter parameters and run prediction</p>
    </div>
  );
}

function ResultVisualization({ result }) {
  const isHabitable = result.habitability_class === "Confirmed";
  const confidence = Math.round(result.habitability_probability * 100);

  return (
    <div style={styles.resultWrapper}>
      <div style={styles.visualGrid}>
        {/* Left Column - Planet Sphere */}
        <div style={styles.planetContainer}>
          <svg style={styles.planetSvg} viewBox="0 0 200 200">
            <defs>
              <radialGradient id="planet" cx="40%" cy="40%">
                <stop offset="0%" stopColor={isHabitable ? "#4ade80" : "#ef4444"} />
                <stop offset="70%" stopColor={isHabitable ? "#22c55e" : "#dc2626"} />
                <stop offset="100%" stopColor={isHabitable ? "#16a34a" : "#991b1b"} />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Atmosphere Layers */}
            <circle cx="100" cy="100" r="85" fill="none" stroke={isHabitable ? "rgba(74, 222, 128, 0.2)" : "rgba(239, 68, 68, 0.2)"} strokeWidth="15" />
            
            {/* Planet */}
            <circle cx="100" cy="100" r="65" fill="url(#planet)" filter="url(#glow)" />
            
            {/* Surface Details */}
            <ellipse cx="110" cy="85" rx="40" ry="30" fill={isHabitable ? "rgba(34, 197, 94, 0.3)" : "rgba(185, 28, 28, 0.3)"} />
            
            {/* Orbit Ring */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Right Column - Metrics */}
        <div style={styles.metricsColumn}>
          <div style={styles.metricRow}>
            <span style={styles.metricLabel}>Classification</span>
            <span style={{...styles.metricValueBig, color: isHabitable ? "#10b981" : "#ef4444"}}>
              {result.habitability_class}
            </span>
          </div>
          
          <div style={styles.metricRow}>
            <span style={styles.metricLabel}>Confidence</span>
            <div style={styles.confidenceBar}>
              <div style={{...styles.confidenceFill, width: `${confidence}%`, background: isHabitable ? "#10b981" : "#ef4444"}}></div>
            </div>
            <span style={styles.confidenceText}>{confidence}%</span>
          </div>

          <div style={styles.metricRow}>
            <span style={styles.metricLabel}>Radius</span>
            <span style={styles.metricValueBig}>{result.predicted_planet_radius.toFixed(2)} R⊕</span>
          </div>

          <div style={styles.metricRow}>
            <span style={styles.metricLabel}>Probability</span>
            <span style={styles.metricValueBig}>{(result.habitability_probability * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom - Analysis Tags */}
      <div style={styles.tagsContainer}>
        {isHabitable && (
          <>
            <span style={styles.tag}>✓ Potentially Habitable</span>
            <span style={styles.tag}>Earth-like</span>
            <span style={styles.tag}>🌍 Life Potential</span>
          </>
        )}
        {!isHabitable && (
          <>
            <span style={{...styles.tag, borderColor: "#ef4444", color: "#ef4444"}}>⚠ Low Probability</span>
            <span style={{...styles.tag, borderColor: "#ef4444", color: "#ef4444"}}>False Positive</span>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  centerContent: {
    textAlign: "center",
  },

  spinner: {
    width: "50px",
    height: "50px",
    border: "3px solid rgba(99, 102, 241, 0.2)",
    borderTopColor: "#58a6ff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 1rem",
  },

  loadingText: {
    color: "#8b949e",
    fontSize: "0.95rem",
  },

  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },

  emptyText: {
    color: "#8b949e",
    fontSize: "1rem",
  },

  resultWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },

  visualGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    alignItems: "center",
  },

  planetContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  planetSvg: {
    width: "100%",
    maxWidth: "200px",
    height: "auto",
  },

  metricsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },

  metricRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    background: "rgba(99, 102, 241, 0.08)",
    borderRadius: "8px",
    border: "1px solid rgba(99, 102, 241, 0.12)",
  },

  metricLabel: {
    fontSize: "0.85rem",
    color: "#8b949e",
    fontWeight: 600,
  },

  metricValueBig: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#58a6ff",
  },

  confidenceBar: {
    flex: 1,
    height: "8px",
    background: "rgba(99, 102, 241, 0.15)",
    borderRadius: "4px",
    overflow: "hidden",
    margin: "0 1rem",
  },

  confidenceFill: {
    height: "100%",
    transition: "width 1s ease-out",
  },

  confidenceText: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#58a6ff",
    minWidth: "50px",
    textAlign: "right",
  },

  tagsContainer: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  tag: {
    padding: "0.5rem 1rem",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    borderRadius: "20px",
    fontSize: "0.8rem",
    color: "#10b981",
    fontWeight: 600,
  },

  keyframes: `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
};