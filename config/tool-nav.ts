/* Tool families — small groups of tools a visitor moves between directly
   (EMI ↔ mortgage ↔ home-loan EMI, mean ↔ median ↔ mode…). They drive the
   chip strip above each tool and are the first pick for related tools.

   A tool belongs to at most one family; `scripts/check-tools.mjs` enforces
   that and that every slug exists. Order within a family is the order the
   chips appear in. */
export const TOOL_FAMILIES: readonly (readonly string[])[] = [
  /* ── Writing ── */
  ["word-counter", "word-frequency-counter", "keyword-density-checker", "reading-time-calculator"],
  ["sentence-case-converter", "upside-down-text-generator", "zalgo-text-generator", "leetspeak-converter", "bionic-reading-converter"],
  ["paragraph-formatter", "whitespace-remover", "remove-duplicate-lines", "find-and-replace", "list-prefix-suffix", "text-diff-checker"],
  ["text-reverser", "anagram-finder", "palindrome-checker"],
  ["morse-code-translator", "nato-phonetic-converter", "html-entity-encoder", "text-to-slug-converter"],
  ["markdown-previewer", "table-to-markdown", "lorem-ipsum-generator", "text-to-clipboard"],

  /* ── Image ── */
  ["image-compressor", "image-resizer", "exif-remover", "favicon-generator", "base64-image-encoder", "aspect-ratio-calculator"],
  ["image-to-grayscale", "dithering-filter", "duotone-filter", "color-blindness-simulator"],

  /* ── Design ── */
  ["hex-to-rgb-converter", "hex-to-rgba-converter", "color-format-converter", "hsl-color-slider", "random-hex-color-generator"],
  ["color-palette-generator", "color-palette-extractor", "color-palette-contrast-grid", "contrast-checker", "font-pairer"],
  ["css-gradient-generator", "css-mesh-gradient-generator", "gradient-text-generator", "css-box-shadow-generator", "neumorphism-generator", "css-glassmorphism-generator", "glassmorphism-layer-tester"],
  ["css-border-radius-blob", "css-triangle-generator", "css-button-generator", "custom-scrollbar-styler", "css-cursor-style-previewer"],
  ["css-animation-previewer", "css-keyframe-animator", "css-filter-tester"],
  ["css-flexbox-playground", "css-clamp-generator", "px-to-rem-converter", "golden-ratio-calculator"],
  ["svg-path-visualizer", "svg-pattern-generator", "pattern-noise-generator", "placeholder-image-generator"],

  /* ── Security ── */
  ["password-generator", "password-strength-meter", "wifi-password-generator", "username-generator"],
  ["hash-generator", "file-hash-generator", "bcrypt-hash-verifier", "sri-generator", "checksum-calculator"],
  ["text-encrypt-decrypt", "text-encryptor-aes", "steganography-tool", "email-obfuscator", "ip-address-masker", "url-sanitizer"],

  /* ── Developer ── */
  ["json-formatter", "json-validator", "json-to-csv", "csv-to-json-converter", "xml-to-json", "yaml-to-json-converter"],
  ["base64-encoder-decoder", "base32-encoder", "url-encoder-decoder", "jwt-debugger"],
  ["regex-tester", "sql-formatter", "cron-expression-generator", "mock-data-generator", "random-id-generator"],
  ["user-agent-parser", "screen-resolution-checker", "http-status-code-lookup"],

  /* ── Everyday calculators ── */
  ["percentage-calculator", "percentage-increase-decrease", "discount-calculator", "gst-vat-calculator"],
  ["loan-calculator", "mortgage-calculator", "loan-interest-calculator-property", "down-payment-calculator"],
  ["simple-interest-calculator", "compound-interest-calculator", "investment-return-calculator", "salary-calculator"],
  ["bmi-calculator", "bmr-calculator", "body-fat-calculator", "ideal-weight-calculator", "daily-calorie-calculator"],
  ["age-calculator", "date-difference-calculator", "time-duration-calculator", "working-days-calculator", "timestamp-unix-converter", "time-zone-converter"],
  ["centimeter-to-meter-converter", "meter-to-km-converter", "inch-to-cm-converter", "feet-to-meter-converter"],
  ["celsius-to-fahrenheit-converter", "temperature-conversion-scientific", "kg-to-pound-converter", "gram-to-ounce-converter", "liter-to-ml-converter"],
  ["square-meter-to-square-foot-converter", "acre-to-hectare-converter", "hectare-to-acre-converter", "acre-to-square-feet-converter", "square-feet-to-acre-converter"],
  ["scientific-calculator", "fraction-calculator", "exponent-calculator", "square-root-calculator", "prime-number-checker", "matrix-calculator", "binary-hex-decimal-converter"],
  ["random-number-generator", "random-name-picker", "decision-wheel", "dice-roller"],
  ["fuel-cost-calculator", "unit-ratio-calculator", "currency-format-previewer"],

  /* ── Productivity, visualization, creator, media ── */
  ["pomodoro-timer", "timer-stopwatch", "habit-tracker"],
  ["pie-chart-maker", "bar-graph-generator", "heatmap-grid", "word-cloud-generator"],
  ["mind-map-builder", "venn-diagram-maker", "flowchart-logic-mapper", "timeline-creator"],
  ["qr-code-generator", "emoji-search-copy", "ascii-art-generator", "social-media-post-preview", "pixel-art-grid"],
  ["text-to-speech-preview", "voice-to-text-notepad", "audio-visualizer", "video-frame-extractor"],

  /* ── Architecture ── */
  ["floor-area-calculator", "plot-area-calculator", "room-area-calculator", "room-volume-calculator", "wall-area-calculator", "facade-area-calculator", "3d-volume-calculator-architecture"],
  ["paint-required-calculator", "tile-quantity-calculator", "floor-finish-calculator", "skirting-material-calculator", "cladding-material-calculator"],
  ["brick-calculator", "cement-calculator", "sand-calculator", "concrete-mix-ratio-calculator", "concrete-volume-calculator", "slab-concrete-calculator"],
  ["rebar-weight-calculator", "rebar-spacing-calculator", "steel-quantity-calculator"],
  ["foundation-depth-calculator", "footing-size-calculator", "soil-bearing-capacity-calculator", "soil-compaction-calculator", "excavation-volume-calculator", "retaining-wall-calculator", "slope-stability-calculator"],
  ["beam-load-calculator", "column-load-calculator", "slab-load-calculator", "structural-load-calculator", "live-load-calculator", "fire-safety-load-calculator"],
  ["roof-area-calculator", "roof-pitch-calculator", "rafter-length-calculator", "staircase-calculator", "step-rise-run-calculator", "building-height-calculator"],
  ["window-area-calculator", "door-area-calculator", "glass-panel-size-calculator", "curtain-wall-calculator", "elevation-design-calculator"],
  ["ventilation-calculator", "air-change-rate-calculator", "hvac-load-calculator", "cooling-load-calculator-architecture", "heat-loss-calculator-building", "insulation-thickness-calculator"],
  ["lighting-load-calculator", "electrical-load-calculator-building", "sunlight-exposure-calculator", "shadow-length-calculator", "acoustic-soundproofing-calculator", "room-acoustics-calculator"],
  ["construction-cost-estimator", "material-cost-calculator", "labor-cost-calculator", "escalation-cost-calculator", "project-timeline-calculator", "workforce-requirement-calculator"],
  ["drainage-flow-calculator", "rainwater-harvesting-calculator", "septic-tank-size-calculator", "water-tank-capacity-calculator", "plumbing-pipe-size-calculator", "water-flow-rate-calculator"],
  ["green-building-score-calculator", "energy-efficiency-calculator-building", "carbon-footprint-calculator-construction", "sustainability-index-calculator"],
  ["interior-space-optimization-calculator", "furniture-layout-calculator", "parking-space-calculator", "emergency-exit-width-calculator"],

  /* ── Land ── */
  ["land-area-calculator-square-feet", "land-area-calculator-square-meter", "katha-land-calculator", "bigha-land-calculator", "decimal-land-calculator"],
  ["survey-area-calculator", "polygon-area-calculator", "triangle-land-area-calculator", "trapezoid-land-calculator", "boundary-length-calculator", "plot-division-calculator", "map-scale-calculator"],
  ["land-price-calculator", "price-per-square-feet-calculator", "land-valuation-calculator", "property-appreciation-calculator", "rental-yield-calculator", "roi-real-estate-calculator"],
  ["soil-volume-calculator", "earth-filling-calculator", "land-leveling-calculator", "soil-compaction-ratio-calculator", "excavation-cost-calculator"],
  ["subdivision-cost-calculator", "land-development-cost-calculator", "fence-material-calculator", "wall-boundary-cost-calculator"],
  ["fertilizer-requirement-calculator", "irrigation-water-calculator", "drainage-system-calculator", "rainwater-runoff-calculator"],

  /* ── Mechanical ── */
  ["velocity-calculator", "acceleration-calculator", "projectile-motion-calculator", "momentum-calculator", "kinetic-energy-calculator", "centripetal-force-calculator", "angular-velocity-calculator"],
  ["force-calculator", "friction-force-calculator", "drag-force-calculator", "spring-force-calculator", "torque-calculator", "gear-ratio-calculator"],
  ["stress-calculator", "beam-deflection-calculator", "bending-moment-calculator", "moment-of-inertia-calculator", "column-buckling-calculator", "fatigue-life-calculator", "bolt-load-calculator", "natural-frequency-calculator"],
  ["flow-rate-calculator", "pressure-drop-calculator", "bernoulli-equation-calculator", "reynolds-number-calculator", "hydraulic-pressure-calculator", "pump-efficiency-calculator", "mach-number-calculator"],
  ["heat-transfer-calculator", "thermal-expansion-calculator", "specific-heat-calculator", "ideal-gas-law-calculator", "thermal-efficiency-calculator", "refrigeration-cop-calculator"],
  ["cutting-speed-calculator", "lathe-speed-calculator", "feed-rate-calculator", "thread-pitch-calculator", "bearing-life-calculator"],

  /* ── Electrical ── */
  ["ohms-law-calculator", "voltage-divider-calculator", "current-divider-calculator", "series-resistor-calculator", "parallel-resistor-calculator", "resistor-color-code-calculator", "led-resistor-calculator"],
  ["power-calculator-electrical", "real-power-calculator", "reactive-power-calculator", "apparent-power-calculator", "power-factor-calculator", "three-phase-power-calculator", "phase-angle-calculator"],
  ["energy-consumption-calculator", "electric-bill-calculator", "power-consumption-calculator", "fan-power-consumption-calculator", "air-conditioner-power-calculator", "room-lighting-calculator"],
  ["capacitor-calculator", "capacitor-charge-time-calculator", "inductor-calculator", "inductive-reactance-calculator", "capacitive-reactance-calculator", "impedance-calculator", "rc-time-constant-calculator", "rl-time-constant-calculator", "rlc-resonance-calculator"],
  ["transformer-turns-ratio-calculator", "transformer-efficiency-calculator", "transformer-current-calculator", "electric-motor-power-calculator", "motor-efficiency-calculator", "motor-speed-calculator", "slip-calculator"],
  ["battery-capacity-calculator", "battery-backup-time-calculator", "battery-charging-time-calculator", "ups-load-calculator", "ups-backup-calculator", "generator-size-calculator"],
  ["solar-panel-calculator", "solar-battery-calculator", "solar-inverter-calculator"],
  ["wire-size-calculator", "voltage-drop-calculator", "cable-length-calculator", "fuse-rating-calculator", "circuit-breaker-calculator", "house-wiring-load-calculator", "earthing-resistance-calculator"],
  ["short-circuit-current-calculator", "ground-fault-current-calculator", "arc-flash-calculator", "lightning-protection-calculator"],
  ["diode-calculator", "zener-diode-calculator", "transistor-bias-calculator", "amplifier-gain-calculator", "op-amp-calculator", "relay-calculator"],
  ["frequency-calculator", "wavelength-calculator", "signal-attenuation-calculator", "decibel-db-calculator", "antenna-length-calculator", "rf-power-calculator", "frequency-response-calculator"],
  ["pwm-duty-cycle-calculator", "adc-resolution-calculator", "dac-output-calculator", "logic-gate-calculator", "clock-frequency-calculator", "data-rate-calculator"],
  ["power-supply-calculator", "smps-calculator", "voltage-regulation-calculator", "power-loss-calculator", "electrical-efficiency-calculator", "power-density-calculator", "heat-dissipation-calculator", "heatsink-calculator"],

  /* ── Computer science ── */
  ["subnet-calculator", "ip-range-calculator", "cidr-calculator", "bandwidth-calculator", "latency-calculator", "download-time-calculator", "data-transfer-calculator", "file-size-converter"],
  ["model-accuracy-calculator", "precision-recall-calculator", "confusion-matrix-calculator", "f1-score-calculator", "roc-auc-calculator", "dataset-split-calculator"],
  ["ai-token-cost-calculator", "ai-prompt-length-calculator", "cloud-cost-calculator", "data-transfer-cost-calculator"],
  ["time-complexity-calculator", "combinatorics-calculator"],

  /* ── Marketing ── */
  ["ctr-calculator", "cpm-calculator", "cost-per-click-cpc-calculator", "cost-per-acquisition-cpa-calculator", "ad-spend-calculator", "ad-frequency-calculator", "impressions-calculator", "serp-ctr-estimator"],
  ["conversion-rate-calculator", "lead-conversion-funnel-calculator", "bounce-rate-calculator", "marketing-roi-calculator", "break-even-calculator", "profit-margin-calculator-marketing"],
  ["customer-lifetime-value-calculator", "churn-rate-calculator", "retention-rate-calculator", "revenue-growth-calculator", "viral-coefficient-calculator", "traffic-growth-calculator"],
  ["seo-score-calculator", "keyword-density-calculator-seo", "keyword-difficulty-estimator", "backlink-ratio-calculator", "domain-authority-estimator", "page-rank-estimator", "organic-vs-paid-ratio-calculator"],
  ["engagement-rate-calculator", "social-media-reach-calculator", "email-open-rate-calculator", "email-click-rate-calculator"],

  /* ── Data analytics ── */
  ["mean-calculator", "median-calculator", "mode-calculator", "average-calculator", "standard-deviation-calculator", "variance-calculator", "percentile-calculator", "histogram-bin-calculator"],
  ["z-score-calculator", "p-value-calculator", "chi-square-calculator", "confidence-interval-calculator", "sample-size-calculator", "a-b-test-calculator", "correlation-coefficient-calculator", "regression-calculator"],
  ["moving-average-calculator", "exponential-smoothing-calculator", "time-series-forecast-calculator", "seasonality-index-calculator", "data-growth-calculator", "user-growth-rate-calculator"],
  ["data-normalization-calculator", "min-max-scaling-calculator", "log-transformation-calculator", "outlier-detection-calculator", "data-sampling-calculator", "clustering-distance-calculator"],
  ["page-speed-score-calculator", "session-duration-calculator", "click-heatmap-density-calculator", "scroll-depth-calculator"],
  ["big-data-throughput-calculator", "cluster-utilization-calculator", "hadoop-storage-calculator", "spark-job-time-calculator", "data-partition-calculator", "etl-throughput-calculator", "data-pipeline-latency-calculator"],
  ["storage-requirement-calculator", "query-optimization-calculator", "index-size-calculator", "cache-efficiency-calculator", "data-compression-ratio-calculator", "encoding-efficiency-calculator"],
];

/* "What people check next" — shown right under the tool, where the result
   is. Only for tools where the next step is obvious; everything else falls
   back to the related-tools chips. */
export const NEXT_STEPS: Readonly<Record<string, readonly string[]>> = {
  "loan-calculator": ["mortgage-calculator", "compound-interest-calculator", "salary-calculator"],
  "mortgage-calculator": ["down-payment-calculator", "loan-calculator", "loan-interest-calculator-property"],
  "percentage-calculator": ["percentage-increase-decrease", "discount-calculator", "gst-vat-calculator"],
  "bmi-calculator": ["bmr-calculator", "body-fat-calculator", "ideal-weight-calculator"],
  "age-calculator": ["date-difference-calculator", "working-days-calculator", "time-duration-calculator"],
  "word-counter": ["reading-time-calculator", "keyword-density-checker", "sentence-case-converter"],
  "image-compressor": ["image-resizer", "exif-remover", "base64-image-encoder"],
  "image-resizer": ["image-compressor", "aspect-ratio-calculator", "favicon-generator"],
  "password-generator": ["password-strength-meter", "hash-generator", "username-generator"],
  "json-validator": ["json-formatter", "json-to-csv", "yaml-to-json-converter"],
  "base64-encoder-decoder": ["url-encoder-decoder", "jwt-debugger", "base32-encoder"],
  "color-palette-generator": ["contrast-checker", "color-format-converter", "css-gradient-generator"],
  "voltage-drop-calculator": ["wire-size-calculator", "cable-length-calculator", "circuit-breaker-calculator"],
  "wire-size-calculator": ["voltage-drop-calculator", "circuit-breaker-calculator", "fuse-rating-calculator"],
  "arc-flash-calculator": ["short-circuit-current-calculator", "ground-fault-current-calculator", "circuit-breaker-calculator"],
  "beam-load-calculator": ["column-load-calculator", "slab-load-calculator", "footing-size-calculator"],
  "torque-calculator": ["gear-ratio-calculator", "electric-motor-power-calculator", "bolt-load-calculator"],
};

/* Shown under "Popular tools" in the side rail. */
export const POPULAR_TOOLS: readonly string[] = [
  "word-counter",
  "image-compressor",
  "password-generator",
  "percentage-calculator",
  "qr-code-generator",
  "json-validator",
  "age-calculator",
  "voltage-drop-calculator",
];

/* Tools whose workspace needs the full page width (canvases, editors,
   side-by-side panes). They get no side rail; the related-tools chips under
   the tool show at every width instead. */
export const WIDE_TOOLS: ReadonlySet<string> = new Set<string>([]);
