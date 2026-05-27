import { useState } from "react";

const FIELD_META = {
  koi_period: { label: "Period", unit: "d", group: "orbital" },
  koi_duration: { label: "Duration", unit: "h", group: "orbital" },
  koi_depth: { label: "Depth", unit: "ppm", group: "orbital" },
  koi_impact: { label: "Impact", unit: "", group: "orbital" },
  koi_model_snr: { label: "SNR", unit: "", group: "orbital" },
  koi_num_transits: { label: "Transits", unit: "", group: "orbital" },
  koi_ror: { label: "Ratio", unit: "Rp/Rs", group: "orbital" },
  st_teff: { label: "Temp", unit: "K", group: "stellar" },
  st_logg: { label: "log(g)", unit: "", group: "stellar" },
  st_met: { label: "[Fe/H]", unit: "dex", group: "stellar" },
  st_mass: { label: "Mass", unit: "M☉", group: "stellar" },
  st_radius: { label: "Radius", unit: "R☉", group: "stellar" },
  st_dens: { label: "Density", unit: "g/cm³", group: "stellar" },
  teff_err1: { label: "T_err+", unit: "K", group: "errors" },
  teff_err2: { label: "T_err-", unit: "K", group: "errors" },
  logg_err1: { label: "log(g)+", unit: "", group: "errors" },
  logg_err2: { label: "log(g)-", unit: "", group: "errors" },
  feh_err1: { label: "[Fe/H]+", unit: "dex", group: "errors" },
  feh_err2: { label: "[Fe/H]-", unit: "dex", group: "errors" },
  mass_err1: { label: "M_err+", unit: "M☉", group: "errors" },
  mass_err2: { label: "M_err-", unit: "M☉", group: "errors" },
  radius_err1: { label: "R_err+", unit: "R☉", group: "errors" },
  radius_err2: { label: "R_err-", unit: "R☉", group: "errors" },
};

const GROUPS = [
  { key: "orbital", title: "Orbital", fields: ["koi_period", "koi_duration", "koi_depth", "koi_impact", "koi_model_snr", "koi_num_transits", "koi_ror"] },
  { key: "stellar", title: "Stellar", fields: ["st_teff", "st_logg", "st_met", "st_mass", "st_radius", "st_dens"] },
  { key: "errors", title: "Errors", fields: ["teff_err1", "teff_err2", "logg_err1", "logg_err2", "feh_err1", "feh_err2", "mass_err1", "mass_err2", "radius_err1", "radius_err2"] },
];

function FieldInput({ fieldKey, value, onChange, error }) {
  const meta = FIELD_META[fieldKey];

  return (
    <div style={styles.inputGroup}>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        style={{...styles.input, ...(error ? styles.inputError : {})}}
        placeholder={meta.label}
        title={meta.label}
      />
      {meta.unit && <span style={styles.unit}>{meta.unit}</span>}
    </div>
  );
}

function FormSection({ group, fields, values, onChange, errors }) {
  const [isOpen, setIsOpen] = useState(group.key === "orbital");

  return (
    <div style={styles.section}>
      <button style={styles.sectionHeader} onClick={() => setIsOpen(!isOpen)}>
        <span>{group.title}</span>
        <span style={{...styles.chevron, ...(isOpen && styles.chevronOpen)}}>▼</span>
      </button>
      
      {isOpen && (
        <div style={styles.sectionContent}>
          <div style={styles.grid}>
            {fields.map((fk) => (
              <FieldInput key={fk} fieldKey={fk} value={values[fk]} onChange={onChange} error={errors[fk]} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PredictionForm({ values, setValues, errors, setErrors }) {
  const handleChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <div style={styles.container}>
      {GROUPS.map((group) => (
        <FormSection
          key={group.key}
          group={group}
          fields={group.fields}
          values={values}
          onChange={handleChange}
          errors={errors}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },

  section: {
    border: "1px solid rgba(99, 102, 241, 0.15)",
    borderRadius: "8px",
    overflow: "hidden",
    background: "rgba(99, 102, 241, 0.05)",
  },

  sectionHeader: {
    width: "100%",
    padding: "0.75rem",
    background: "transparent",
    border: "none",
    color: "#8b949e",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.85rem",
    fontWeight: 600,
    transition: "all 0.2s",
  },

  chevron: {
    transition: "transform 0.2s",
    fontSize: "0.7rem",
  },

  chevronOpen: {
    transform: "rotate(180deg)",
  },

  sectionContent: {
    padding: "0.75rem",
    borderTop: "1px solid rgba(99, 102, 241, 0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.5rem",
  },

  inputGroup: {
    position: "relative",
  },

  input: {
    width: "100%",
    padding: "0.5rem 0.6rem",
    background: "rgba(22, 27, 50, 0.6)",
    border: "1px solid rgba(99, 102, 241, 0.15)",
    borderRadius: "6px",
    fontSize: "0.75rem",
    color: "#c9d1d9",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },

  inputError: {
    borderColor: "#f85149",
  },

  unit: {
    position: "absolute",
    right: "0.4rem",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "0.65rem",
    color: "#8b949e",
    pointerEvents: "none",
  },
};