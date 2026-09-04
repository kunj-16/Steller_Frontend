import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

const REFERENCE_RADIUS = 2.26; // Dataset average in R⊕

export function ProbabilityBarChart({ probability = 0, habitabilityClass = "False Positive" }) {
  const isConfirmed = habitabilityClass === "Confirmed";
  const pct = Math.round((probability || 0) * 100);

  const data = [
    { name: "Confirmed", value: pct, fill: isConfirmed ? "var(--color-confirmed)" : "#3a3632" },
    { name: "False Positive", value: 100 - pct, fill: !isConfirmed ? "var(--color-false)" : "#3a3632" },
  ];

  return (
    <div className="chart-box">
      <h4 className="chart-box-title">Habitability Probability Distribution</h4>
      <ResponsiveContainer width="100%" height={190}>
        <BarChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 25 }}>
          <defs>
            <linearGradient id="confirmedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ecb8d" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="falseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e06b4a" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#991b1b" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="neutralGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a443e" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#262320" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 132, 74, 0.1)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "rgba(240, 236, 228, 0.65)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={{ stroke: "rgba(212, 132, 74, 0.2)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(240, 236, 228, 0.5)", fontSize: 10, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
            contentStyle={{
              background: "rgba(24, 21, 18, 0.95)",
              border: "1px solid rgba(212, 132, 74, 0.35)",
              borderRadius: "8px",
              color: "#f0ece4",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            }}
            formatter={(val) => [`${val}%`, "Probability"]}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            <Cell fill={isConfirmed ? "url(#confirmedGrad)" : "url(#neutralGrad)"} />
            <Cell fill={!isConfirmed ? "url(#falseGrad)" : "url(#neutralGrad)"} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ComparisonChart({ predictedRadius = 0 }) {
  const safeRadius = typeof predictedRadius === "number" ? predictedRadius : parseFloat(predictedRadius) || 0;
  const data = [
    { name: "Prediction", value: parseFloat(safeRadius.toFixed(3)) },
    { name: "Dataset Avg", value: REFERENCE_RADIUS },
  ];

  return (
    <div className="chart-box">
      <h4 className="chart-box-title">Planetary Radius Benchmark</h4>
      <ResponsiveContainer width="100%" height={190}>
        <BarChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 25 }}>
          <defs>
            <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4844a" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#8c471c" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="refGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5c08a" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#b4743c" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 132, 74, 0.1)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "rgba(240, 236, 228, 0.65)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={{ stroke: "rgba(212, 132, 74, 0.2)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(240, 236, 228, 0.5)", fontSize: 10, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}R⊕`}
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
            contentStyle={{
              background: "rgba(24, 21, 18, 0.95)",
              border: "1px solid rgba(212, 132, 74, 0.35)",
              borderRadius: "8px",
              color: "#f0ece4",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            }}
            formatter={(val) => [`${val} R⊕`, "Radius"]}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            <Cell fill="url(#predGrad)" />
            <Cell fill="url(#refGrad)" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConfidenceRing({ probability = 0, habitabilityClass = "False Positive" }) {
  const isConfirmed = habitabilityClass === "Confirmed";
  const pct = Math.round((probability || 0) * 100);
  const color = isConfirmed ? "var(--color-confirmed)" : "var(--color-false)";

  const confidenceLevel =
    pct >= 80 ? "Very High" : pct >= 60 ? "High" : pct >= 40 ? "Moderate" : "Low";

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="chart-box">
      <h4 className="chart-box-title">Signal Confidence Gauge</h4>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem 0" }}>
        <div style={{ position: "relative", width: "130px", height: "130px" }}>
          <svg style={{ width: "100%", height: "100%" }} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(212, 132, 74, 0.12)"
              strokeWidth="7"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={color}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50px 50px",
                transition: "stroke-dashoffset 1.2s ease-out",
              }}
            />
            <text
              x="50"
              y="48"
              textAnchor="middle"
              style={{
                fontSize: "20px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fill: "#f0ece4",
              }}
            >
              {pct}%
            </text>
            <text
              x="50"
              y="63"
              textAnchor="middle"
              style={{
                fontSize: "7.5px",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fill: "rgba(240, 236, 228, 0.5)",
              }}
            >
              {confidenceLevel}
            </text>
          </svg>
        </div>

        <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--text-primary)" }}>
            {isConfirmed ? "Strong Planetary Transit Signal" : "Probable Stellar Noise / False Alarm"}
          </p>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            Derived from orbital period & light curve SNR
          </span>
        </div>
      </div>
    </div>
  );
}