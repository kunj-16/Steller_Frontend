export default function PredictionResult({ result, loading }) {
  if (loading) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Analyzing...</div>;
  }

  if (!result) {
    return <div style={{ textAlign: "center", padding: "2rem", color: "#8b7ca4" }}>Ready for analysis</div>;
  }

  return null; // Results are shown in the center visualization
}