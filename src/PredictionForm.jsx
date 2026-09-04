import { useState, useRef, useEffect } from "react";

const FEATURE_GROUPS = [
  {
    id: "transit",
    label: "Transit Parameters",
    tag: "01",
    description: "Photometric measurements from Kepler light curves",
    defaultOpen: true,
    features: [
      { name: "koi_period", label: "Orbital Period", unit: "days", tooltip: "Time for one complete orbit around the host star. Derived from the spacing between transit events in the light curve." },
      { name: "koi_duration", label: "Transit Duration", unit: "hrs", tooltip: "Total time the planet spends crossing the stellar disk, from first to last contact." },
      { name: "koi_depth", label: "Transit Depth", unit: "ppm", tooltip: "Fractional decrease in stellar flux during transit, in parts per million. Scales with (Rp/Rs)²." },
      { name: "koi_impact", label: "Impact Parameter", unit: "b", tooltip: "Projected sky-plane distance between planet and stellar center at mid-transit, in units of stellar radius. 0 = central transit." },
      { name: "koi_model_snr", label: "Signal-to-Noise Ratio", unit: "SNR", tooltip: "Ratio of the transit signal strength to the photometric noise level. Higher values indicate a more confident detection." },
      { name: "koi_num_transits", label: "Number of Transits", unit: "N", tooltip: "Count of observed transit events used in the model fit. More transits improve period precision." },
      { name: "koi_ror", label: "Planet/Star Radius Ratio", unit: "Rp/Rs", tooltip: "Ratio of the planet radius to the stellar radius. Directly related to transit depth: depth ∝ (Rp/Rs)²." },
    ],
  },
  {
    id: "stellar",
    label: "Stellar Properties",
    tag: "02",
    description: "Physical characteristics of the host star",
    defaultOpen: true,
    features: [
      { name: "st_teff", label: "Effective Temperature", unit: "K", tooltip: "The blackbody temperature of the stellar surface. Solar Teff ≈ 5778 K. Determines stellar spectral type." },
      { name: "st_logg", label: "Surface Gravity", unit: "log g", tooltip: "Logarithm (base 10) of surface gravitational acceleration in cm/s². Solar log g ≈ 4.44. Lower values indicate giant stars." },
      { name: "st_met", label: "Metallicity", unit: "[Fe/H]", tooltip: "Iron abundance relative to the Sun on a log scale. [Fe/H] = 0 means solar metallicity; negative values indicate metal-poor stars." },
      { name: "st_mass", label: "Stellar Mass", unit: "M☉", tooltip: "Mass of the host star in solar masses. Critical for deriving the planet orbital semi-major axis via Kepler's third law." },
      { name: "st_radius", label: "Stellar Radius", unit: "R☉", tooltip: "Radius of the host star in solar radii. Combined with Rp/Rs, this gives absolute planet radius." },
      { name: "st_dens", label: "Stellar Density", unit: "g/cm³", tooltip: "Mean density of the host star. Can be estimated independently from transit shape, providing a model consistency check." },
    ],
  },
  {
    id: "errors",
    label: "Measurement Uncertainties",
    tag: "03",
    description: "1σ upper and lower error bounds on stellar parameters",
    defaultOpen: false,
    features: [
      { name: "teff_err1", label: "Temp Error (+)", unit: "+σ K", tooltip: "Upper 1σ uncertainty on effective temperature measurement." },
      { name: "teff_err2", label: "Temp Error (-)", unit: "-σ K", tooltip: "Lower 1σ uncertainty on effective temperature measurement. Typically negative." },
      { name: "logg_err1", label: "Gravity Error (+)", unit: "+σ", tooltip: "Upper 1σ uncertainty on surface gravity (log g)." },
      { name: "logg_err2", label: "Gravity Error (-)", unit: "-σ", tooltip: "Lower 1σ uncertainty on surface gravity. Typically negative." },
      { name: "feh_err1", label: "Metallicity Error (+)", unit: "+σ", tooltip: "Upper 1σ uncertainty on [Fe/H] metallicity." },
      { name: "feh_err2", label: "Metallicity Error (-)", unit: "-σ", tooltip: "Lower 1σ uncertainty on [Fe/H] metallicity. Typically negative." },
      { name: "mass_err1", label: "Mass Error (+)", unit: "+σ M☉", tooltip: "Upper 1σ uncertainty on stellar mass." },
      { name: "mass_err2", label: "Mass Error (-)", unit: "-σ M☉", tooltip: "Lower 1σ uncertainty on stellar mass. Typically negative." },
      { name: "radius_err1", label: "Radius Error (+)", unit: "+σ R☉", tooltip: "Upper 1σ uncertainty on stellar radius." },
      { name: "radius_err2", label: "Radius Error (-)", unit: "-σ R☉", tooltip: "Lower 1σ uncertainty on stellar radius. Typically negative." },
    ],
  },
];

function FeatureInput({ name, label, unit, tooltip, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const tipRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        tipRef.current && !tipRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className={`fi-root ${error ? "fi-root--error" : ""}`}>
      <div className="fi-label-row">
        <label className="fi-label" htmlFor={name} title={label}>
          {label}
        </label>
        <div className="fi-meta">
          {unit && <span className="fi-unit">{unit}</span>}
          {tooltip && (
            <div className="fi-tip-anchor">
              <button
                ref={btnRef}
                type="button"
                className={`fi-tip-btn ${open ? "fi-tip-btn--active" : ""}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-label={`Info about ${label}`}
                title={`Info about ${label}`}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.25" />
                  <path d="M6 5.5v3M6 3.5v.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
              {open && (
                <div ref={tipRef} className="fi-tooltip" role="tooltip">
                  <div className="fi-tooltip-arrow" />
                  {tooltip}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <input
        id={name}
        className="fi-input"
        type="number"
        step="any"
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder="—"
      />
    </div>
  );
}

function FormGroup({ group, values, onChange, errors }) {
  const [isOpen, setIsOpen] = useState(group.defaultOpen);

  return (
    <section className="sf-group">
      <div className="sf-group-head" onClick={() => setIsOpen((prev) => !prev)}>
        <span className="sf-group-tag">{group.tag}</span>
        <div className="sf-group-meta">
          <h2 className="sf-group-title">{group.label}</h2>
          <p className="sf-group-desc">{group.description}</p>
        </div>
        <span className={`sf-group-chevron ${isOpen ? "sf-group-chevron--open" : ""}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div className="sf-fields">
          {group.features.map((f) => (
            <FeatureInput
              key={f.name}
              name={f.name}
              label={f.label}
              unit={f.unit}
              tooltip={f.tooltip}
              value={values[f.name]}
              onChange={onChange}
              error={errors[f.name]}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function PredictionForm({
  values,
  setValues,
  errors = {},
  setErrors,
  onSubmit,
  onReset,
  loading = false,
  apiError = null,
}) {
  const handleChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors && errors[key] && setErrors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form className="sf-form" onSubmit={handleSubmit} noValidate>
      {FEATURE_GROUPS.map((group) => (
        <FormGroup
          key={group.id}
          group={group}
          values={values}
          onChange={handleChange}
          errors={errors}
        />
      ))}

      {/* General validation error */}
      {errors.general && (
        <div className="sf-alert">
          <span className="sf-alert-icon">⚠</span>
          <span>{errors.general}</span>
        </div>
      )}

      {/* API connection error */}
      {apiError && (
        <div className="sf-alert">
          <span className="sf-alert-icon">⚠</span>
          <span>{apiError}</span>
        </div>
      )}

      <footer className="sf-footer">
        {onReset && (
          <button
            type="button"
            className="sf-btn-ghost"
            onClick={onReset}
            disabled={loading}
          >
            Clear all
          </button>
        )}
        <button
          type="submit"
          className="sf-btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="sf-spinner" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Run Classifier</span>
          )}
        </button>
      </footer>
    </form>
  );
}