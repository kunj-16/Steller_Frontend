import { useState } from "react";
import PredictionForm from "./PredictionForm";
import PredictionResult from "./PredictionResult";
import DataVisualization from "./DataVisualization";
import {
  ProbabilityBarChart,
  ComparisonChart,
  ConfidenceRing,
} from "./Charts";

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
  const [resultView, setResultView] = useState("overview"); // "overview" | "visualizer" | "charts"

  const handlePredictionSubmit = async () => {
    setApiError(null);
    setErrors({});

    const hasValue = Object.values(formValues).some((v) => v !== "" && v !== null);
    if (!hasValue) {
      setErrors({ general: "Please enter at least one parameter to run the classifier." });
      return;
    }

    setLoading(true);

    const requestData = {};
    Object.keys(formValues).forEach((key) => {
      requestData[key] = formValues[key] !== "" && formValues[key] !== null
        ? parseFloat(formValues[key])
        : null;
    });

    try {
      const response = await fetch("https://steller-backend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Prediction failed. The server returned an error.");
      }

      const data = await response.json();
      setResult(data);
      setResultView("overview");
    } catch {
      setApiError("Failed to connect to classifier API. Check your internet connection.");
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
    <div className="app-container">
      {/* ─────────────────────────────────────────────
          Centered Scientific Header
          ───────────────────────────────────────────── */}
      <header className="page-header">
        <div className="page-eyebrow">
          <span className="page-eyebrow-line" />
          <span>Kepler Object of Interest · Classifier</span>
          <span className="page-eyebrow-line" />
        </div>
        <h1 className="page-title">
          Exoplanet <em>Candidate Analysis</em>
        </h1>
        <p className="page-subtitle">
          Input photometric and stellar parameters to evaluate whether a transit signal
          is a confirmed planet, false positive, or candidate.
        </p>
      </header>

      {/* ─────────────────────────────────────────────
          Main Two-Column Grid
          ───────────────────────────────────────────── */}
      <main className="main-grid">
        {/* LEFT PANEL: 01 Input Parameters */}
        <div className="left-panel">
          <div className="panel-section-head">
            <span className="panel-tag">01</span>
            <div className="panel-head-text">
              <h2 className="panel-section-title">Input Parameters</h2>
              <p className="panel-section-desc">Photometric and stellar measurements</p>
            </div>
          </div>

          <PredictionForm
            values={formValues}
            setValues={setFormValues}
            errors={errors}
            setErrors={setErrors}
            onSubmit={handlePredictionSubmit}
            onReset={handleReset}
            loading={loading}
            apiError={apiError}
          />
        </div>

        {/* RIGHT PANEL: 02 Analysis Result */}
        <div className="right-panel">
          <div className="panel-section-head">
            <span className="panel-tag">02</span>
            <div className="panel-head-text">
              <h2 className="panel-section-title">Analysis Result</h2>
              <p className="panel-section-desc">Classification output and feature attribution</p>
            </div>
          </div>

          <div className="rp-root">
            {/* Loading State */}
            {loading && (
              <div className="rp-state rp-loading">
                <div className="rp-loading-rings">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="rp-state-label">Running classifier...</p>
                <p className="rp-state-sub">Evaluating transit parameters against trained model</p>
              </div>
            )}

            {/* Error State */}
            {apiError && !loading && !result && (
              <div className="rp-state rp-error">
                <span className="rp-error-icon">!</span>
                <p className="rp-state-label">Prediction Failed</p>
                <p className="rp-state-sub">{apiError}</p>
              </div>
            )}

            {/* Idle State (Awaiting Parameters) */}
            {!loading && !result && !apiError && (
              <div className="rp-state rp-idle">
                <svg
                  className="rp-idle-svg"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="100"
                    cy="100"
                    rx="80"
                    ry="30"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="rp-orbit rp-orbit--1"
                  />
                  <ellipse
                    cx="100"
                    cy="100"
                    rx="55"
                    ry="20"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    className="rp-orbit rp-orbit--2"
                  />
                  <circle cx="100" cy="100" r="14" fill="currentColor" className="rp-star" />
                  <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.12" className="rp-star-glow" />
                  <circle cx="100" cy="100" r="26" fill="currentColor" opacity="0.06" className="rp-star-glow" />
                  <circle cx="180" cy="100" r="7" fill="currentColor" className="rp-planet rp-planet--1" />
                  <circle cx="100" cy="80" r="4.5" fill="currentColor" opacity="0.6" className="rp-planet rp-planet--2" />
                  <line x1="100" y1="36" x2="100" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <line x1="164" y1="68" x2="160" y2="75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <line x1="164" y1="132" x2="160" y2="125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <line x1="100" y1="164" x2="100" y2="156" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <line x1="36" y1="132" x2="40" y2="125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <line x1="36" y1="68" x2="40" y2="75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                </svg>
                <p className="rp-state-label">Awaiting Parameters</p>
                <p className="rp-state-sub">
                  Fill in the transit and stellar parameters on the left, then run the classifier to view the result here.
                </p>
                <ul className="rp-idle-hints">
                  <li><span>•</span> Enter photometric measurements</li>
                  <li><span>•</span> Add stellar properties</li>
                  <li><span>•</span> Run classifier for analysis</li>
                </ul>
              </div>
            )}

            {/* Result Present */}
            {!loading && result && (
              <div className="rp-result">
                {/* Result Section Navigation Tabs */}
                <div className="rp-view-nav">
                  <button
                    type="button"
                    className={`rp-tab-btn ${resultView === "overview" ? "rp-tab-btn--active" : ""}`}
                    onClick={() => setResultView("overview")}
                  >
                    Report & Features
                  </button>
                  <button
                    type="button"
                    className={`rp-tab-btn ${resultView === "visualizer" ? "rp-tab-btn--active" : ""}`}
                    onClick={() => setResultView("visualizer")}
                  >
                    Planetary Sphere
                  </button>
                  <button
                    type="button"
                    className={`rp-tab-btn ${resultView === "charts" ? "rp-tab-btn--active" : ""}`}
                    onClick={() => setResultView("charts")}
                  >
                    Analytical Charts
                  </button>
                </div>

                {/* View 1: Verdict & Feature Attribution */}
                {resultView === "overview" && (
                  <PredictionResult result={result} />
                )}

                {/* View 2: Planetary Sphere Reconstruction */}
                {resultView === "visualizer" && (
                  <DataVisualization result={result} loading={loading} />
                )}

                {/* View 3: Analytical Charts */}
                {resultView === "charts" && (
                  <div>
                    <ConfidenceRing
                      probability={result.habitability_probability}
                      habitabilityClass={result.habitability_class}
                    />
                    <ProbabilityBarChart
                      probability={result.habitability_probability}
                      habitabilityClass={result.habitability_class}
                    />
                    <ComparisonChart
                      predictedRadius={result.predicted_planet_radius}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}