# 🌌 Stellar Analytics

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3.7.0-22b5bf?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modular-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, research-grade React web dashboard for Kepler Object of Interest (KOI) candidate classification, planetary radius estimation, and photometric transit analysis.**

[🌐 Explore Live Application](https://steller-frontend.vercel.app/) · [Report Bug](https://github.com/kunj-16/Steller_Frontend/issues) · [Request Feature](https://github.com/kunj-16/Steller_Frontend/issues)

</div>

---

## 🌐 Live Demo

The production frontend is actively deployed on **Vercel**:

👉 **[https://steller-frontend.vercel.app/](https://steller-frontend.vercel.app/)**

> [!NOTE]
> This is a **frontend-only repository**. Machine learning model inference, classification algorithms, regression models, and SHAP explainability trees are computed by a dedicated backend service hosted on Render.

---

## 📖 Overview

**Stellar Analytics** is a specialized astrophysical dashboard designed to analyze transit observations from NASA's Kepler Space Telescope. The web application allows researchers, students, and astronomy enthusiasts to evaluate photometric light-curve signals and host star parameters to determine whether a transit candidate is a **Confirmed Exoplanet** or a **False Positive Object**.

From the frontend perspective, the user provides astrophysical measurements through an intuitive, categorized input panel. The application validates and sanitizes input data, dispatches asynchronous prediction queries to the backend prediction service, and dynamically renders the classification verdict, model confidence score, predicted planetary radius with automated taxonomic typing, SHAP-derived feature attributions, interactive planetary SVG reconstructions, and comparative analytical charts.

---

## ✨ Key Features

- **23 Specialized Input Parameters**: Captures the full spectrum of Kepler Objects of Interest (KOI) parameters, including transit geometry, signal strength, and stellar host metrics.
- **Categorized Parameter Grouping**: Organized into 3 logical panels:
  - `01` **Transit Parameters**: Orbital period, duration, transit depth, impact parameter, SNR, transit count, and radius ratio.
  - `02` **Stellar Properties**: Effective temperature, surface gravity, metallicity, stellar mass, radius, and density.
  - `03` **Measurement Uncertainties**: $1\sigma$ upper and lower observational error bounds.
- **Contextual Scientific Tooltips**: Built-in information buttons on every parameter explaining astronomical definitions, physical relationships, and expected measurement units.
- **Client-Side Input Validation**: Validates user inputs before dispatch, verifying that at least one measurement is supplied and alerting the user of empty form submissions.
- **Clear & Reset Controls**: Dedicated "Clear all" control that instantaneously resets all 23 form inputs, validation notices, and active prediction states.
- **Prediction Verdict Report**: Prominent status badge designating the candidate as a **Confirmed Exoplanet** or **False Positive Object**, complemented by a real-time pulsing status indicator.
- **Planetary Radius Estimation & Taxonomy**: Formats predicted planetary radius in Earth radii ($R_\oplus$) and automatically classifies the candidate into planetary archetypes:
  - *Rocky / Earth-like* ($< 1.25\,R_\oplus$)
  - *Super-Earth* ($1.25 - 2.0\,R_\oplus$)
  - *Sub-Neptune* ($2.0 - 4.0\,R_\oplus$)
  - *Gas Giant* ($4.0 - 10.0\,R_\oplus$)
  - *Hot Jupiter* ($\ge 10.0\,R_\oplus$)
- **Model Confidence Gauge**: Displays confidence percentages accompanied by an animated SVG radial arc meter.
- **SHAP Feature Attribution**: Renders ranked marginal feature contributions, illustrating positive ($+$) and negative ($-$) parameter drivers with proportional impact bars.
- **Multi-View Analysis Navigation**: Tabbed navigation within the analysis panel enables seamless exploration between:
  1. **Report & Features**: Verdict badge, hero metrics, and SHAP impact bars.
  2. **Planetary Sphere**: SVG planet reconstruction featuring glowing atmospheric scattering, surface shading, and Kepler orbit traces.
  3. **Analytical Charts**: Recharts-based *Habitability Probability Distribution*, *Planetary Radius Benchmark* against dataset averages ($2.26\,R_\oplus$), and an SVG *Signal Confidence Gauge*.
- **Graceful States & Error Handling**:
  - *Awaiting Parameters (Idle)*: Animated celestial SVG with orbiting planets and step-by-step guidance.
  - *Evaluating (Loading)*: Concentric triple-ring amber spinner indicating active model processing.
  - *Error Alerts*: Contextual notices for network timeouts and empty input submissions.
- **Responsive Design**: Two-column layout optimized for wide desktop screens that collapses into a single-column layout on tablets and mobile viewports.

---

## 🖥️ UI / Design

The user interface follows a dark, research-grade astronomy aesthetic inspired by modern observatory interfaces:

- **Deep Space Palette**: Themed around `#0d0d0f` with warm copper/amber glows (`#d4844a`, `#e8945a`), emerald confirmation accents (`#4ecb8d`), crimson false-positive markers (`#e06b4a`), and subtle fractal noise background texturing.
- **Glassmorphic Cards**: Semitransparent panels (`rgba(255, 255, 255, 0.04)`) with $14\text{px}$ backdrop blur, copper borders, and smooth elevation on hover.
- **Typography Hierarchy**:
  - **DM Sans**: Clean, high-legibility UI body and explanatory text.
  - **Space Mono**: Monospaced typography for technical labels, measurements, units, and report tags.
  - **Playfair Display**: High-impact numeric typography for hero statistics.
- **Focused Two-Column Architecture**:
  - **Left Panel (`01 Input Parameters`)**: Houses parameter entry, tooltips, validation alerts, and form actions.
  - **Right Panel (`02 Analysis Result`)**: Houses state transitions (idle, loading, error) and multifaceted visualization tabs.

---

## 🔄 Application Flow

```text
User enters astronomical parameters
               │
               ▼
Frontend validates & sanitizes inputs (empty strings → null)
               │
               ▼
Frontend sends asynchronous POST request via Fetch API
               │
               ▼
Backend API receives payload & executes ML models (on Render)
               │
               ▼
Frontend receives prediction, probability, radius & SHAP data
               │
               ▼
React updates application state and renders Report & Visualizations
```

1. **Parameter Entry**: The user fills in known photometric and stellar measurements across three collapsible form groups.
2. **Input Validation & Sanitization**: The frontend checks that at least one value is present. Numbers are parsed as floating-point values and empty inputs are serialized as `null` to permit backend missing-value imputation.
3. **Asynchronous Request**: An HTTP `POST` request is dispatched via the browser Fetch API to the backend endpoint.
4. **Backend Processing**: The backend model evaluates the inputs and computes classification probabilities, radius regression, and SHAP attribution values.
5. **State & View Transition**: React stores the returned payload in component state, dismisses the loading spinner, and displays the analysis view.
6. **Multi-View Rendering**: Visualizers (`PredictionResult`, `DataVisualization`, `Charts`) render interactive representations of the results.

---

## 🔌 Backend Integration

The frontend interfaces with an independent machine-learning backend deployed on **Render**:

- **Production Endpoint**: `https://steller-backend.onrender.com/predict`
- **HTTP Method**: `POST`
- **Request Headers**: `Content-Type: application/json`

### Request Payload Structure

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

### Response Payload Structure

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
> Free-tier instances on Render may spin down during periods of inactivity. Initial requests may experience a short cold-start latency while the container boots up.

---

## 🪐 Input Parameters

The frontend supports **23 astronomical parameters** organized into 3 sections:

### 1. Transit Parameters (`01`)
| Parameter Key | Field Label | Unit | Description |
| :--- | :--- | :--- | :--- |
| `koi_period` | Orbital Period | `days` | Time required for one complete orbit around the host star. |
| `koi_duration` | Transit Duration | `hrs` | Total duration of the planetary transit across the stellar disk. |
| `koi_depth` | Transit Depth | `ppm` | Fractional decrease in stellar flux during transit (parts per million). |
| `koi_impact` | Impact Parameter | `b` | Sky-plane distance between planet center and stellar center at mid-transit. |
| `koi_model_snr` | Signal-to-Noise Ratio | `SNR` | Ratio of transit signal strength to photometric background noise. |
| `koi_num_transits` | Number of Transits | `N` | Count of transit events observed in the light curve. |
| `koi_ror` | Planet/Star Radius Ratio | `Rp/Rs` | Ratio of the planet radius to the stellar radius. |

### 2. Stellar Properties (`02`)
| Parameter Key | Field Label | Unit | Description |
| :--- | :--- | :--- | :--- |
| `st_teff` | Effective Temperature | `K` | Blackbody temperature of the stellar photosphere. |
| `st_logg` | Surface Gravity | `log g` | Base-10 logarithm of gravitational acceleration at the stellar surface. |
| `st_met` | Metallicity | `[Fe/H]` | Iron abundance relative to the Sun on a logarithmic scale. |
| `st_mass` | Stellar Mass | `M☉` | Mass of the host star measured in solar masses. |
| `st_radius` | Stellar Radius | `R☉` | Radius of the host star measured in solar radii. |
| `st_dens` | Stellar Density | `g/cm³` | Mean physical density of the host star. |

### 3. Measurement Uncertainties (`03`)
| Parameter Key | Field Label | Unit | Description |
| :--- | :--- | :--- | :--- |
| `teff_err1` | Temp Error (+) | `+σ K` | Upper $1\sigma$ uncertainty on effective temperature. |
| `teff_err2` | Temp Error (-) | `-σ K` | Lower $1\sigma$ uncertainty on effective temperature. |
| `logg_err1` | Gravity Error (+) | `+σ` | Upper $1\sigma$ uncertainty on surface gravity. |
| `logg_err2` | Gravity Error (-) | `-σ` | Lower $1\sigma$ uncertainty on surface gravity. |
| `feh_err1` | Metallicity Error (+) | `+σ` | Upper $1\sigma$ uncertainty on metallicity. |
| `feh_err2` | Metallicity Error (-) | `-σ` | Lower $1\sigma$ uncertainty on metallicity. |
| `mass_err1` | Mass Error (+) | `+σ M☉` | Upper $1\sigma$ uncertainty on stellar mass. |
| `mass_err2` | Mass Error (-) | `-σ M☉` | Lower $1\sigma$ uncertainty on stellar mass. |
| `radius_err1` | Radius Error (+) | `+σ R☉` | Upper $1\sigma$ uncertainty on stellar radius. |
| `radius_err2` | Radius Error (-) | `-σ R☉` | Lower $1\sigma$ uncertainty on stellar radius. |

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **[React](https://react.dev/)** | `^19.2.0` | Declarative component architecture and state hooks (`useState`, `useRef`, `useEffect`) |
| **[Vite](https://vitejs.dev/)** | `^8.0.0` | Development server with Fast Refresh and optimized Rollup production bundler |
| **[Recharts](https://recharts.org/)** | `^3.7.0` | Composable SVG data visualization for probability distribution and radius benchmarks |
| **[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)** | *Native* | Standard browser HTTP client for dispatching asynchronous JSON prediction requests |
| **Modular CSS3** | *Native* | Custom properties, CSS Grid, Flexbox, glassmorphism (`backdrop-filter`), and keyframes |
| **[ESLint](https://eslint.org/)** | `^9.39.1` | Static analysis for code quality and React Hooks validation rules |
| **Google Fonts** | *CDN* | Typography suite: `DM Sans` (UI body), `Space Mono` (technical), `Playfair Display` (display) |

---

## 📁 Project Structure

```
Steller_Frontend/
├── public/
│   ├── favicon.ico             # Multi-resolution binary icon (16x16, 32x32, 48x48)
│   ├── favicon.svg             # Scalable copper-orange astronomical vector icon
│   └── vite.svg                # Vite template asset
├── src/
│   ├── styles/
│   │   ├── dashboard.css       # Page container, centered header, 2-column grid & panels
│   │   ├── global.css          # Resets, typography, starfield background & custom scrollbars
│   │   ├── prediction.css      # Form groups, input cards, focus glow, tooltips & buttons
│   │   └── results.css         # Idle animation, loading rings, verdict cards & chart boxes
│   ├── App.jsx                 # Top-level wrapper importing modular stylesheets
│   ├── Charts.jsx              # Recharts bar charts, radius comparison, and confidence ring
│   ├── DataVisualization.jsx  # SVG planetary reconstruction with atmospheric glow filters
│   ├── ExoplanetDashboard.jsx  # Main state coordinator, header, two-column layout & tabs
│   ├── main.jsx                # Application root mounting React 19 StrictMode
│   ├── PredictionForm.jsx      # 23-parameter input form with collapsible groups & validation
│   └── PredictionResult.jsx    # Research verdict card with hero stats & SHAP impact bars
├── eslint.config.js            # ESLint 9 configuration with React Hooks plugins
├── index.html                  # HTML entry point with font preconnects & favicon links
├── package.json                # Project dependencies, build scripts, and overrides
├── README.md                   # Project documentation
└── vite.config.js              # Vite bundler configuration
```

---

## 🚀 Local Development

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kunj-16/Steller_Frontend.git
   cd Steller_Frontend
   ```

2. **Install project dependencies:**
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
   Compiles optimized production assets into the `dist/` directory.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

6. **Run linter:**
   ```bash
   npm run lint
   ```

---

## 🚢 Deployment

- **Frontend Hosting**: Deployed on **[Vercel](https://vercel.com/)** with continuous deployment linked to the `master` branch.
  - **Live URL**: [https://steller-frontend.vercel.app/](https://steller-frontend.vercel.app/)
- **Backend Service**: Deployed separately as a Python/FastAPI service on **[Render](https://render.com/)**.
  - **API Endpoint**: `https://steller-backend.onrender.com/predict`
- **Client-Server Architecture**: The static frontend bundle is served via Vercel's global CDN, dispatching direct client-side Fetch requests to the Render backend service.

---

## ⚙️ Environment Variables

The frontend communicates directly with the production backend API endpoint (`https://steller-backend.onrender.com/predict`), which is configured in `src/ExoplanetDashboard.jsx`. 

**No `.env` configuration file is required** for standard local development or deployment. The application runs immediately after running `npm install`.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🔭 Acknowledgments

- **NASA Exoplanet Archive & Kepler Mission** for cataloging the Kepler Objects of Interest (KOI).
- **Vite & React Teams** for modern web development tooling.
- **Recharts Community** for accessible, composable charting primitives.

<div align="center">

**Stellar Analytics · Advancing Exoplanet Exploration & Data Visualization**

</div>
