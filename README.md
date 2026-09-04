# 🌌 Stellar Analytics

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3.7.0-22b5bf?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modular-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**An interactive, research-grade web dashboard for Kepler Object of Interest (KOI) candidate classification, planetary radius estimation, and photometric transit analysis.**

[View Live Dashboard](https://steller-frontend.vercel.app) · [Report Bug](https://github.com/kunj-16/Steller_Frontend/issues) · [Request Feature](https://github.com/kunj-16/Steller_Frontend/issues)

</div>

---

## 📖 Overview

**Stellar Analytics** is a modern React/Vite web application providing an intuitive, interactive interface for evaluating exoplanet candidates. Built for astronomers, data scientists, and space enthusiasts, the dashboard enables users to input photometric measurements from Kepler light curves and physical host star parameters to determine whether an observed transit signal corresponds to a **Confirmed Exoplanet** or a **False Positive**.

The frontend manages parameter validation, asynchronous API communication with an external machine-learning backend, and provides multifaceted visual feedback—including model confidence gauges, planet radius classifications, SHAP feature attribution bars, atmospheric planet reconstructions, and analytical distribution charts.

> [!NOTE]
> **This is a frontend-only repository.** Machine learning model inference, classification algorithms, regression modeling, and SHAP explanations are handled by a dedicated backend service.

---

## ✨ Features

### 🔭 Scientific Parameter Input
- **23 Specialized Astronomical Parameters**: Captures the complete feature set utilized by the Kepler Objects of Interest (KOI) pipeline.
- **Categorized Input Groups**:
  - **`01` Transit Parameters**: Orbital Period ($d$), Transit Duration ($hrs$), Transit Depth ($ppm$), Impact Parameter ($b$), Transit Signal-to-Noise Ratio ($SNR$), Number of Transits ($N$), and Planet/Star Radius Ratio ($R_p/R_s$).
  - **`02` Stellar Properties**: Effective Temperature ($K$), Surface Gravity ($\log g$), Metallicity ($[\text{Fe/H}]$), Stellar Mass ($M_\odot$), Stellar Radius ($R_\odot$), and Stellar Density ($g/\text{cm}^3$).
  - **`03` Measurement Uncertainties**: $1\sigma$ upper and lower error bounds for Temperature, Surface Gravity, Metallicity, Mass, and Radius.
- **Interactive Tooltips**: Built-in scientific explanations and contextual documentation for every parameter explaining its astronomical significance and expected units.
- **Form Controls**: Instant **Clear all** reset functionality and responsive **Run Classifier** execution.

### 🧠 Classification & Analysis Visualization
- **Verdict Classification**: Distinct status badge designating candidates as **Confirmed Exoplanet** or **False Positive Object**, complemented by an animated pulsing status indicator.
- **Predicted Planetary Radius**: Precision radius estimation formatted in Earth radii ($R_\oplus$) paired with automated planetary classification:
  - *Rocky / Earth-like* ($< 1.25\,R_\oplus$)
  - *Super-Earth* ($1.25 - 2.0\,R_\oplus$)
  - *Sub-Neptune* ($2.0 - 4.0\,R_\oplus$)
  - *Gas Giant* ($4.0 - 10.0\,R_\oplus$)
  - *Hot Jupiter* ($\ge 10.0\,R_\oplus$)
- **Model Confidence & Arc Meter**: Real-time confidence percentage rendered on an animated SVG radial arc gauge.
- **SHAP Feature Importance**: Ranked attribution bars highlighting top driving features with positive ($+$) and negative ($-$) marginal contributions toward the classification verdict.

### 📊 Multifaceted Analysis Views
- **Report & Features Tab**: Core scientific verdict summary, hero metric cards, and SHAP impact bars.
- **Planetary Sphere Tab**: Interactive SVG transit reconstruction featuring procedural atmospheric scattering layers, surface shading, orbit traces, and status tags.
- **Analytical Charts Tab**:
  - *Habitability Probability Distribution* (Recharts bar chart comparing classification probabilities)
  - *Planetary Radius Benchmark* (Recharts comparison of predicted radius against the dataset baseline of $2.26\,R_\oplus$)
  - *Signal Confidence Gauge* (Circular SVG gauge categorizing detection confidence from Low to Very High)

### 🎨 User Experience & Polish
- **Graceful State Handling**:
  - *Awaiting Parameters (Idle)*: Animated celestial SVG with orbiting planetary bodies and step-by-step guidance.
  - *Processing (Loading)*: Concentric triple-ring amber spinner indicating active model inference.
  - *Error Handling*: Contextual alerts for empty submissions and API connection timeouts.
- **Responsive Architecture**: Fluid 2-column desktop layout that collapses into an accessible single-column stack on tablets and mobile devices.

---

## 🖥️ User Interface

The interface is modeled after modern astrophysical observatory tools, featuring:

- **Deep Space Palette**: Full-page dark canvas (`#0d0d0f`) accented with warm copper/amber glows (`#d4844a`, `#e8945a`), emerald confirmation markers (`#4ecb8d`), and subtle fractal noise texturing.
- **Glassmorphic Panels**: Translucent panels (`rgba(255, 255, 255, 0.04)`) with $14\text{px}$ backdrop blur, hairline copper borders, and smooth elevation on hover.
- **Scientific Typography**:
  - **DM Sans**: Clean, high-legibility UI body and descriptions.
  - **Space Mono**: Monospaced technical labels, units, and report identifiers.
  - **Playfair Display**: Prominent numeric displays and hero statistic figures.
- **Focused Two-Column Layout**: Left panel dedicated to input parameter configuration; right panel dedicated to dynamic prediction output and visualization.

### Application Workflow

```text
┌─────────────────────────────────────────────────────────┐
│              01 Input Parameters (Form)                 │
│  Transit Parameters · Stellar Properties · Uncertainties│
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
                    [ Run Classifier ]
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               02 Analysis Result (Output)               │
├────────────────────────────┬────────────────────────────┤
│     Report & Features      │   Planetary Reconstruction │
│  • Verdict & Pulsing Dot   │   • Glowing Planet SVG     │
│  • Radius & Planet Type    │   • Atmospheric Rings      │
│  • Confidence Arc Meter    │   • Orbit Trace            │
│  • SHAP Attribution Bars   │                            │
├────────────────────────────┴────────────────────────────┤
│                   Analytical Charts                     │
│  • Probability Distribution Bar Chart                   │
│  • Radius Benchmark Comparison                          │
│  • Signal Confidence Gauge                              │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Frontend Architecture

The codebase follows a modular React component architecture with clean separation of layout, form controls, visualizers, and scoped stylesheets:

```
src/
├── App.jsx                  # Root container importing modular styles and dashboard
├── ExoplanetDashboard.jsx   # Core state manager, header, 2-column grid, and view router
├── PredictionForm.jsx       # 23-parameter form with scientific tooltips & validation
├── PredictionResult.jsx     # Verdict card with status badge, hero stats & SHAP bars
├── DataVisualization.jsx   # SVG planetary reconstruction with atmospheric glow
├── Charts.jsx               # Recharts distribution, radius comparison, and gauge
├── main.jsx                 # Application entry point mounting React 19 root
└── styles/
    ├── global.css           # Resets, typography imports, starfield background & scrollbars
    ├── dashboard.css        # Page container, centered header, 2-column grid & glass panels
    ├── prediction.css       # Form groups, input cards, focus glow, tooltips & buttons
    └── results.css          # Idle animation, loading rings, verdict cards & chart boxes
```

### Component Responsibilities

| Component | Responsibility |
| :--- | :--- |
| **`App.jsx`** | Imports global CSS stylesheets and mounts the top-level dashboard. |
| **`ExoplanetDashboard.jsx`** | Orchestrates application state (`formValues`, `errors`, `result`, `loading`, `apiError`), executes asynchronous API dispatch, and manages right-panel view tabs. |
| **`PredictionForm.jsx`** | Renders 23 astronomical fields grouped into collapsible sections, handles value updates, renders technical tooltips, and provides clear/submit controls. |
| **`PredictionResult.jsx`** | Formats prediction results into a research report card, classifies planet types, draws the radial confidence arc, and renders SHAP attribution bars. |
| **`DataVisualization.jsx`** | Generates an SVG planetary body with dynamic radial gradients, atmospheric glow filters, orbital traces, and confirmation tags. |
| **`Charts.jsx`** | Houses Recharts components (`ProbabilityBarChart`, `ComparisonChart`) and the circular SVG `ConfidenceRing`. |

---

## 🔄 Application Flow

1. **User Input**: The user populates Kepler transit measurements and stellar parameters across 3 categorized form groups.
2. **Client Validation**: When the user clicks **Run Classifier**, the frontend verifies that at least one parameter is populated. If all fields are blank, an inline alert guides the user.
3. **Data Sanitization**: The frontend constructs a JSON payload, parsing populated numeric inputs as floats and converting blank inputs to `null` to facilitate backend imputation.
4. **API Request**: An asynchronous HTTP `POST` request is dispatched via the browser Fetch API to the backend prediction service.
5. **State Transition**: The UI activates a loading state featuring concentric spinning amber rings.
6. **Inference (Backend)**: The backend machine learning pipeline executes classification, radius regression, and SHAP explainer trees.
7. **Result Presentation**: Upon receiving the response, React updates the application state, dismisses the loading state, and renders the verdict card, planetary reconstruction, and analytical charts.

---

## 🔌 Backend API

This frontend interfaces with an external machine learning service deployed on Render:

- **Production Endpoint**: `https://steller-backend.onrender.com/predict`
- **HTTP Method**: `POST`
- **Request Headers**: `Content-Type: application/json`

### Example Request Body

```json
{
  "koi_period": 9.488,
  "koi_duration": 2.95,
  "koi_depth": 615.8,
  "koi_impact": 0.146,
  "koi_model_snr": 35.8,
  "koi_num_transits": 142,
  "koi_ror": 0.0223,
  "st_teff": 5700,
  "st_logg": 4.45,
  "st_met": 0.1,
  "st_mass": 1.0,
  "st_radius": 1.0,
  "st_dens": 1.4,
  "teff_err1": 50,
  "teff_err2": -50,
  "logg_err1": 0.1,
  "logg_err2": -0.1,
  "feh_err1": 0.05,
  "feh_err2": -0.05,
  "mass_err1": 0.05,
  "mass_err2": -0.05,
  "radius_err1": 0.05,
  "radius_err2": -0.05
}
```

### Example Response Body

```json
{
  "predicted_planet_radius": 2.3451,
  "habitability_class": "Confirmed",
  "habitability_probability": 0.9124,
  "top_features": [
    {
      "feature": "koi_ror",
      "impact": 0.0842,
      "impact_type": "positive"
    },
    {
      "feature": "koi_depth",
      "impact": 0.0512,
      "impact_type": "positive"
    },
    {
      "feature": "koi_model_snr",
      "impact": 0.0381,
      "impact_type": "positive"
    }
  ]
}
```

> [!TIP]
> Free-tier instances on Render may spin down after periods of inactivity. Initial requests may experience a brief cold-start delay while the backend container initializes.

---

## 🛠️ Technology Stack

| Technology | Role |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI library for declarative component architecture and state hooks |
| **[Vite 8](https://vitejs.dev/)** | High-performance build tool and local development server with Fast Refresh |
| **[Recharts 3](https://recharts.org/)** | Composable SVG charting library for probability and radius comparisons |
| **[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)** | Native browser interface for asynchronous HTTP requests |
| **Modular CSS3** | Custom properties, glassmorphism (`backdrop-filter`), CSS Grid, and keyframe animations |
| **[ESLint 9](https://eslint.org/)** | Code quality, React Hooks validation, and lint enforcement |
| **Google Fonts** | Typography imports for `DM Sans`, `Space Mono`, and `Playfair Display` |

---

## 🚀 Local Development

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (comes with Node.js)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kunj-16/Steller_Frontend.git
   cd Steller_Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Generates optimized static assets in the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

6. **Run linter:**
   ```bash
   npm run lint
   ```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🔭 Acknowledgments

- **NASA Exoplanet Science Institute & Kepler Mission** for cataloging the Kepler Objects of Interest (KOI).
- **Vite & React Teams** for modern web development tooling.
- **Recharts** for accessible React data visualization primitives.

<div align="center">

**Built for exoplanet discovery and research visualization**

</div>
