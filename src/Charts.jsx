import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

const REFERENCE_RADIUS = 2.26;

export function ProbabilityBarChart({ probability, habitabilityClass }) {
  const isConfirmed = habitabilityClass === "Confirmed";
  const pct = Math.round(probability * 100);

  const data = [
    { name: "Confirmed", value: pct, fill: isConfirmed ? "#06d6ff" : "#4f46e5" },
    { name: "False Positive", value: 100 - pct, fill: !isConfirmed ? "#ef4444" : "#4f46e5" },
  ];

  return (
    <div style={styles.chartCard}>
      <h4 style={styles.chartTitle}>Habitability Distribution</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06d6ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#06d6ff" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="rgba(99, 102, 241, 0.1)" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: "#a5b4fc", fontSize: 11 }} 
            axisLine={false} 
            tickLine={false} 
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fill: "#a5b4fc", fontSize: 11 }} 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "8px",
              color: "#e0e7ff",
            }}
            formatter={(val) => [`${val}%`, "Probability"]}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ComparisonChart({ predictedRadius }) {
  const data = [
    { name: "Your Prediction", value: parseFloat(predictedRadius.toFixed(3)) },
    { name: "Dataset Average", value: REFERENCE_RADIUS },
  ];

  return (
    <div style={styles.chartCard}>
      <h4 style={styles.chartTitle}>Planetary Radius Comparison</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
          <defs>
            <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06d6ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#06d6ff" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="gradient4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="rgba(99, 102, 241, 0.1)" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: "#a5b4fc", fontSize: 11 }} 
            axisLine={false} 
            tickLine={false}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fill: "#a5b4fc", fontSize: 11 }} 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(v) => `${v}R⊕`}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "8px",
              color: "#e0e7ff",
            }}
            formatter={(val) => [`${val} R⊕`, "Radius"]}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            <Cell fill="url(#gradient3)" />
            <Cell fill="url(#gradient4)" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConfidenceRing({ probability, habitabilityClass }) {
  const isConfirmed = habitabilityClass === "Confirmed";
  const pct = Math.round(probability * 100);
  const color = isConfirmed ? "#06d6ff" : "#ef4444";

  const confidenceLevel =
    pct >= 80 ? "Very High" : pct >= 60 ? "High" : pct >= 40 ? "Moderate" : "Low";

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div style={styles.chartCard}>
      <h4 style={styles.chartTitle}>Confidence Meter</h4>
      
      <div style={styles.ringContainer}>
        <svg style={styles.ringSvg} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50px 50px",
              transition: "stroke-dashoffset 1.5s ease-out",
            }}
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dy="0.3em"
            style={{
              fontSize: "24px",
              fontWeight: 700,
              fill: color,
            }}
          >
            {pct}%
          </text>
        </svg>
      </div>

      <div style={styles.ringInfo}>
        <p style={styles.confidenceLabel}>{confidenceLevel} Confidence</p>
        <p style={styles.confidenceDesc}>
          {isConfirmed ? "Likely Confirmed Exoplanet" : "Possible False Positive"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  chartCard: {
    padding: "1.5rem",
    background: "rgba(99, 102, 241, 0.05)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    borderRadius: "12px",
    marginBottom: "1rem",
    transition: "all 0.3s ease",
  },

  chartTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#c7d2fe",
    margin: "0 0 1rem 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  ringContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },

  ringSvg: {
    width: "150px",
    height: "150px",
  },

  ringInfo: {
    textAlign: "center",
  },

  confidenceLabel: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#c7d2fe",
    margin: "0 0 0.25rem 0",
  },

  confidenceDesc: {
    fontSize: "0.8rem",
    color: "#a5b4fc",
    margin: 0,
  },
};