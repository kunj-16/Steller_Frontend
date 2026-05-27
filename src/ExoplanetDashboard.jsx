import { useState } from "react";
import PredictionForm from "./PredictionForm";
import PredictionResult from "./PredictionResult";
import DataVisualization from "./DataVisualization";

export default function ExoplanetDashboard() {
  const [formValues, setFormValues] = useState({
    koi_period: "",
    koi_duration: "",
    koi_depth: "",
    koi_impact: "",
    koi_model_snr: "",
    koi_num_transits: "",
    koi_ror: "",
    st_teff: "",
    st_logg: "",
    st_met: "",
    st_mass: "",
    st_radius: "",
    st_dens: "",
    teff_err1: "",
    teff_err2: "",
    logg_err1: "",
    logg_err2: "",
    feh_err1: "",
    feh_err2: "",
    mass_err1: "",
    mass_err2: "",
    radius_err1: "",
    radius_err2: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [expandedSection, setExpandedSection] = useState("dashboard");

  const handlePredictionSubmit = async () => {
    setApiError(null);
    setErrors({});

    const hasValue = Object.values(formValues).some((v) => v !== "" && v !== null);
    if (!hasValue) {
      setErrors({ general: "Please enter at least one parameter" });
      return;
    }

    setLoading(true);

    const requestData = {};
    Object.keys(formValues).forEach((key) => {
      requestData[key] = formValues[key] ? parseFloat(formValues[key]) : null;
    });

    try {
      const response = await fetch("https://steller-backend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setApiError("Failed to connect to API. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormValues({
      koi_period: "",
      koi_duration: "",
      koi_depth: "",
      koi_impact: "",
      koi_model_snr: "",
      koi_num_transits: "",
      koi_ror: "",
      st_teff: "",
      st_logg: "",
      st_met: "",
      st_mass: "",
      st_radius: "",
      st_dens: "",
      teff_err1: "",
      teff_err2: "",
      logg_err1: "",
      logg_err2: "",
      feh_err1: "",
      feh_err2: "",
      mass_err1: "",
      mass_err2: "",
      radius_err1: "",
      radius_err2: "",
    });
    setResult(null);
    setErrors({});
    setApiError(null);
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <div style={styles.logo}>
            <span style={styles.logoSymbol}>⬡</span>
            <span style={styles.logoText}>EcoPlanet</span>
          </div>
        </div>
        <div style={styles.navRight}>
          <button style={styles.navBtn}>Documentation</button>
          <button style={styles.navBtn}>Settings</button>
          <button style={styles.navBtn}>Profile</button>
        </div>
      </nav>

      {/* Main Layout */}
      <div style={styles.mainWrapper}>
        {/* Left Panel - Form and Controls */}
        <aside style={styles.leftPanel}>
          <div style={styles.panelCard}>
            <h2 style={styles.panelTitle}>Analysis Parameters</h2>
            
            {/* Quick Stats */}
            <div style={styles.quickStats}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Parameters</div>
                <div style={styles.statValue}>23</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Status</div>
                <div style={styles.statValue} style={{ color: result ? "#10b981" : "#6b7280" }}>
                  {result ? "Analyzed" : "Ready"}
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={styles.formSection}>
              <h3 style={styles.formTitle}>Input Stellar Data</h3>
              <PredictionForm 
                values={formValues}
                setValues={setFormValues}
                errors={errors}
                setErrors={setErrors}
              />
            </div>

            {/* Error Alert */}
            {apiError && (
              <div style={styles.alert}>
                <span style={styles.alertIcon}>⚠️</span>
                <span>{apiError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={styles.buttonContainer}>
              <button 
                onClick={handleReset}
                style={styles.secondaryBtn}
              >
                Clear
              </button>
              <button 
                onClick={handlePredictionSubmit}
                disabled={loading}
                style={{...styles.primaryBtn, ...(loading && styles.primaryBtnLoading)}}
              >
                {loading ? "Processing..." : "Predict"}
              </button>
            </div>
          </div>
        </aside>

        {/* Center Panel - Visualization and Results */}
        <main style={styles.centerPanel}>
          {/* Top Results Cards */}
          <div style={styles.topResultsGrid}>
            <ResultCard 
              title="Habitability Status"
              value={result?.habitability_class || "Not Analyzed"}
              color={result?.habitability_class === "Confirmed" ? "#10b981" : "#ef4444"}
              icon="🌍"
            />
            <ResultCard 
              title="Confidence Score"
              value={`${Math.round((result?.habitability_probability || 0) * 100)}%`}
              color="#06d6ff"
              icon="📊"
            />
            <ResultCard 
              title="Planet Radius"
              value={`${(result?.predicted_planet_radius || 0).toFixed(2)} R⊕`}
              color="#8b5cf6"
              icon="🪐"
            />
          </div>

          {/* Central Visualization */}
          <div style={styles.visualizationCard}>
            <DataVisualization result={result} loading={loading} />
          </div>

          {/* Bottom Metrics Grid */}
          <div style={styles.metricsGrid}>
            <MetricBox 
              title="Surface Temperature"
              value={formValues.st_teff || "—"}
              unit="K"
              trend="stable"
            />
            <MetricBox 
              title="Orbital Period"
              value={formValues.koi_period || "—"}
              unit="days"
              trend="stable"
            />
            <MetricBox 
              title="Stellar Mass"
              value={formValues.st_mass || "—"}
              unit="M☉"
              trend="stable"
            />
            <MetricBox 
              title="Water Content"
              value="0.72"
              unit="index"
              trend="high"
            />
          </div>
        </main>

        {/* Right Panel - Insights and Analysis */}
        <aside style={styles.rightPanel}>
          <div style={styles.panelCard}>
            <h2 style={styles.panelTitle}>AI Insights</h2>

            {/* Key Metrics */}
            <div style={styles.insightSection}>
              <h3 style={styles.insightTitle}>Habitability Factors</h3>
              
              <InsightItem 
                label="Biosignature Potential"
                value="0.78"
                status="High"
                statusColor="#10b981"
              />
              <InsightItem 
                label="Atmospheric Retention"
                value="0.82"
                status="Excellent"
                statusColor="#06d6ff"
              />
              <InsightItem 
                label="Radiation Exposure"
                value="0.45"
                status="Moderate"
                statusColor="#f59e0b"
              />
            </div>

            {/* Analysis Summary */}
            <div style={styles.summaryBox}>
              <h3 style={styles.insightTitle}>Analysis Summary</h3>
              <p style={styles.summaryText}>
                {result 
                  ? "This exoplanet shows promising characteristics for habitability with moderate to high potential for supporting life-forms similar to Earth."
                  : "Run analysis to generate insights about this exoplanet's habitability potential."
                }
              </p>
            </div>

            {/* Data Quality */}
            <div style={styles.qualityBox}>
              <h3 style={styles.insightTitle}>Data Quality</h3>
              <div style={styles.qualityBar}>
                <div style={{...styles.qualityFill, width: "85%"}}></div>
              </div>
              <p style={styles.qualityText}>85% - Good</p>
            </div>

            {/* Related Exoplanets */}
            <div style={styles.relatedBox}>
              <h3 style={styles.insightTitle}>Similar Exoplanets</h3>
              <div style={styles.relatedItem}>
                <span>Kepler-186f</span>
                <span style={styles.similarityBadge}>92%</span>
              </div>
              <div style={styles.relatedItem}>
                <span>TRAPPIST-1e</span>
                <span style={styles.similarityBadge}>88%</span>
              </div>
              <div style={styles.relatedItem}>
                <span>Proxima Centauri b</span>
                <span style={styles.similarityBadge}>79%</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style>{globalStyles}</style>
    </div>
  );
}

// Components
function ResultCard({ title, value, color, icon }) {
  return (
    <div style={styles.resultCard}>
      <div style={styles.resultIcon}>{icon}</div>
      <div style={styles.resultContent}>
        <p style={styles.resultTitle}>{title}</p>
        <p style={{ ...styles.resultValue, color }}>{value}</p>
      </div>
    </div>
  );
}

function MetricBox({ title, value, unit, trend }) {
  return (
    <div style={styles.metricBox}>
      <p style={styles.metricTitle}>{title}</p>
      <div style={styles.metricDisplay}>
        <span style={styles.metricValue}>{value}</span>
        <span style={styles.metricUnit}>{unit}</span>
      </div>
      <div style={styles.metricTrend}>
        {trend === "high" && <span style={{color: "#10b981"}}>↑ High</span>}
        {trend === "stable" && <span style={{color: "#8b7ca4"}}>→ Stable</span>}
      </div>
    </div>
  );
}

function InsightItem({ label, value, status, statusColor }) {
  return (
    <div style={styles.insightItem}>
      <div>
        <p style={styles.insightLabel}>{label}</p>
        <p style={styles.insightValue}>{value}</p>
      </div>
      <div style={{...styles.insightStatus, color: statusColor}}>
        {status}
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "#0d1117",
    color: "#c9d1d9",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  navbar: {
    height: "65px",
    background: "rgba(22, 27, 50, 0.9)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(99, 102, 241, 0.15)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
    zIndex: 100,
  },

  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "1.3rem",
    fontWeight: 700,
  },

  logoSymbol: {
    color: "#06d6ff",
    fontSize: "1.5rem",
  },

  logoText: {
    background: "linear-gradient(135deg, #06d6ff, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  navRight: {
    display: "flex",
    gap: "1rem",
  },

  navBtn: {
    background: "transparent",
    border: "none",
    color: "#8b949e",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "color 0.2s",
  },

  mainWrapper: {
    display: "grid",
    gridTemplateColumns: "320px 1fr 300px",
    gap: "1.5rem",
    padding: "1.5rem",
    flex: 1,
    overflow: "hidden",
  },

  leftPanel: {
    overflowY: "auto",
    paddingRight: "0.5rem",
  },

  centerPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    overflowY: "auto",
    paddingRight: "0.5rem",
  },

  rightPanel: {
    overflowY: "auto",
    paddingLeft: "0.5rem",
  },

  panelCard: {
    background: "rgba(22, 27, 50, 0.6)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(99, 102, 241, 0.15)",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
  },

  panelTitle: {
    fontSize: "1.15rem",
    fontWeight: 700,
    margin: "0 0 1.25rem 0",
    color: "#e6edf3",
    borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
    paddingBottom: "1rem",
  },

  quickStats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },

  statCard: {
    background: "rgba(99, 102, 241, 0.08)",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid rgba(99, 102, 241, 0.12)",
    textAlign: "center",
  },

  statLabel: {
    fontSize: "0.75rem",
    color: "#8b949e",
    marginBottom: "0.35rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  statValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#58a6ff",
  },

  formSection: {
    marginBottom: "1.5rem",
  },

  formTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#c9d1d9",
    margin: "0 0 1rem 0",
  },

  alert: {
    padding: "1rem",
    background: "rgba(248, 81, 73, 0.12)",
    border: "1px solid rgba(248, 81, 73, 0.3)",
    borderRadius: "8px",
    color: "#f85149",
    fontSize: "0.85rem",
    marginBottom: "1rem",
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
  },

  alertIcon: {
    fontSize: "1.1rem",
    flexShrink: 0,
  },

  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "0.75rem",
  },

  primaryBtn: {
    padding: "0.8rem 1rem",
    background: "linear-gradient(135deg, #58a6ff, #1f6feb)",
    border: "none",
    color: "white",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(88, 166, 255, 0.25)",
  },

  primaryBtnLoading: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  secondaryBtn: {
    padding: "0.8rem 1rem",
    background: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    color: "#79c0ff",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  topResultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
  },

  resultCard: {
    background: "rgba(22, 27, 50, 0.6)",
    border: "1px solid rgba(99, 102, 241, 0.15)",
    borderRadius: "10px",
    padding: "1.25rem",
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },

  resultIcon: {
    fontSize: "2rem",
  },

  resultContent: {
    flex: 1,
  },

  resultTitle: {
    fontSize: "0.85rem",
    color: "#8b949e",
    margin: "0 0 0.35rem 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  resultValue: {
    fontSize: "1.4rem",
    fontWeight: 700,
    margin: 0,
  },

  visualizationCard: {
    background: "rgba(22, 27, 50, 0.6)",
    border: "1px solid rgba(99, 102, 241, 0.15)",
    borderRadius: "10px",
    padding: "2rem",
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
  },

  metricBox: {
    background: "rgba(22, 27, 50, 0.6)",
    border: "1px solid rgba(99, 102, 241, 0.15)",
    borderRadius: "10px",
    padding: "1.25rem",
  },

  metricTitle: {
    fontSize: "0.8rem",
    color: "#8b949e",
    margin: "0 0 0.75rem 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  metricDisplay: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.5rem",
    marginBottom: "0.75rem",
  },

  metricValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#79c0ff",
  },

  metricUnit: {
    fontSize: "0.8rem",
    color: "#8b949e",
  },

  metricTrend: {
    fontSize: "0.75rem",
    fontWeight: 600,
  },

  insightSection: {
    marginBottom: "1.5rem",
  },

  insightTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#c9d1d9",
    margin: "0 0 1rem 0",
  },

  insightItem: {
    padding: "0.9rem",
    background: "rgba(99, 102, 241, 0.08)",
    border: "1px solid rgba(99, 102, 241, 0.12)",
    borderRadius: "8px",
    marginBottom: "0.75rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  insightLabel: {
    fontSize: "0.8rem",
    color: "#8b949e",
    margin: "0 0 0.25rem 0",
  },

  insightValue: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#79c0ff",
    margin: 0,
  },

  insightStatus: {
    fontSize: "0.8rem",
    fontWeight: 600,
  },

  summaryBox: {
    background: "rgba(99, 102, 241, 0.08)",
    border: "1px solid rgba(99, 102, 241, 0.12)",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
  },

  summaryText: {
    fontSize: "0.85rem",
    color: "#8b949e",
    lineHeight: 1.6,
    margin: 0,
  },

  qualityBox: {
    background: "rgba(99, 102, 241, 0.08)",
    border: "1px solid rgba(99, 102, 241, 0.12)",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
  },

  qualityBar: {
    height: "6px",
    background: "rgba(99, 102, 241, 0.15)",
    borderRadius: "3px",
    overflow: "hidden",
    marginBottom: "0.5rem",
  },

  qualityFill: {
    height: "100%",
    background: "linear-gradient(90deg, #58a6ff, #1f6feb)",
  },

  qualityText: {
    fontSize: "0.75rem",
    color: "#8b949e",
    margin: 0,
  },

  relatedBox: {
    background: "rgba(99, 102, 241, 0.08)",
    border: "1px solid rgba(99, 102, 241, 0.12)",
    borderRadius: "8px",
    padding: "1rem",
  },

  relatedItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.65rem 0",
    borderBottom: "1px solid rgba(99, 102, 241, 0.08)",
    fontSize: "0.85rem",
    color: "#8b949e",
  },

  similarityBadge: {
    background: "rgba(58, 166, 255, 0.2)",
    color: "#58a6ff",
    padding: "0.25rem 0.6rem",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
};

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #0d1117;
    color: #c9d1d9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.5);
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;