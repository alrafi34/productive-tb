import { toolConfig as wordCounterConfig } from "@/tools/word-counter/config";
import { toolConfig as sentenceCaseConfig } from "@/tools/sentence-case-converter/config";
import { toolConfig as paragraphFormatterConfig } from "@/tools/paragraph-formatter/config";
import { toolConfig as keywordDensityConfig } from "@/tools/keyword-density-checker/config";
import { toolConfig as textReverserConfig } from "@/tools/text-reverser/config";
import { toolConfig as wordFrequencyConfig } from "@/tools/word-frequency-counter/config";
import { toolConfig as imageCompressorConfig } from "@/tools/image-compressor/config";
import { toolConfig as imageResizerConfig } from "@/tools/image-resizer/config";
import { toolConfig as loremIpsumConfig } from "@/tools/lorem-ipsum-generator/config";
import { toolConfig as markdownPreviewerConfig } from "@/tools/markdown-previewer/config";
import { toolConfig as textToClipboardConfig } from "@/tools/text-to-clipboard/config";
import { removeDuplicateLinesConfig } from "@/tools/remove-duplicate-lines/config";
import { findAndReplaceConfig } from "@/tools/find-and-replace/config";
import { textDiffCheckerConfig } from "@/tools/text-diff-checker/config";
import { bionicReadingConverterConfig } from "@/tools/bionic-reading-converter/config";
import { whitespaceRemoverConfig } from "@/tools/whitespace-remover/config";
import { tableToMarkdownConfig } from "@/tools/table-to-markdown/config";
import { anagramFinderConfig } from "@/tools/anagram-finder/config";
import { palindromeCheckerConfig } from "@/tools/palindrome-checker/config";
import { textToSlugConverterConfig } from "@/tools/text-to-slug-converter/config";
import { randomNamePickerConfig } from "@/tools/random-name-picker/config";
import { zalgoTextGeneratorConfig } from "@/tools/zalgo-text-generator/config";
import { natoPhoneticConverterConfig } from "@/tools/nato-phonetic-converter/config";
import { leetspeakConverterConfig } from "@/tools/leetspeak-converter/config";
import { toolConfig as upsideDownTextGeneratorConfig } from "@/tools/upside-down-text-generator/config";
import { toolConfig as listPrefixSuffixConfig } from "@/tools/list-prefix-suffix/config";
import { toolConfig as morseCodeTranslatorConfig } from "@/tools/morse-code-translator/config";
import { toolConfig as base64ImageEncoderConfig } from "@/tools/base64-image-encoder/config";
import { toolConfig as faviconGeneratorConfig } from "@/tools/favicon-generator/config";
import { toolConfig as imageToGrayscaleConfig } from "@/tools/image-to-grayscale/config";
import { toolConfig as exifRemoverConfig } from "@/tools/exif-remover/config";
import { toolConfig as ditheringFilterConfig } from "@/tools/dithering-filter/config";
import { toolConfig as duotoneFilterConfig } from "@/tools/duotone-filter/config";
import { toolConfig as hexToRgbConverterConfig } from "@/tools/hex-to-rgb-converter/config";
import { toolConfig as colorPaletteGeneratorConfig } from "@/tools/color-palette-generator/config";
import { toolConfig as cssGradientGeneratorConfig } from "@/tools/css-gradient-generator/config";
import { toolConfig as cssBoxShadowGeneratorConfig } from "@/tools/css-box-shadow-generator/config";
import { toolConfig as colorFormatConverterConfig } from "@/tools/color-format-converter/config";
import { toolConfig as cssGlassmorphismGeneratorConfig } from "@/tools/css-glassmorphism-generator/config";
import { toolConfig as svgPathVisualizerConfig } from "@/tools/svg-path-visualizer/config";
import { toolConfig as contrastCheckerConfig } from "@/tools/contrast-checker/config";
import { toolConfig as neumorphismGeneratorConfig } from "@/tools/neumorphism-generator/config";
import { hslColorSliderConfig } from "@/tools/hsl-color-slider/config";
import { cssFilterTesterConfig } from "@/tools/css-filter-tester/config";
import { cssAnimationPreviewerConfig } from "@/tools/css-animation-previewer/config";
import { gradientTextGeneratorConfig } from "@/tools/gradient-text-generator/config";
import { colorPaletteContrastGridConfig } from "@/tools/color-palette-contrast-grid/config";
import { colorBlindnessSimulatorConfig } from "@/tools/color-blindness-simulator/config";
import { randomHexColorGeneratorConfig } from "@/tools/random-hex-color-generator/config";
import { cssMeshGradientGeneratorConfig } from "@/tools/css-mesh-gradient-generator/config";
import { cssCursorStylePreviewerConfig } from "@/tools/css-cursor-style-previewer/config";
import { cssClampGeneratorConfig } from "@/tools/css-clamp-generator/config";
import { hexToRgbaConverterConfig } from "@/tools/hex-to-rgba-converter/config";
import { passwordGeneratorConfig } from "@/tools/password-generator/config";
import { wifiPasswordGeneratorConfig } from "@/tools/wifi-password-generator/config";
import { textEncryptDecryptConfig } from "@/tools/text-encrypt-decrypt/config";
import { usernameGeneratorConfig } from "@/tools/username-generator/config";
import { hashGeneratorConfig } from "@/tools/hash-generator/config";
import { passwordStrengthMeterConfig } from "@/tools/password-strength-meter/config";
import { aspectRatioCalculatorConfig } from "@/tools/aspect-ratio-calculator/config";
import { goldenRatioCalculatorConfig } from "@/tools/golden-ratio-calculator/config";
import { cssBlobGeneratorConfig } from "@/tools/css-blob-generator/config";
import { colorPaletteExtractorConfig } from "@/tools/color-palette-extractor/config";
import { customScrollbarStylerConfig } from "@/tools/custom-scrollbar-styler/config";
import { cssKeyframeAnimatorConfig } from "@/tools/css-keyframe-animator/config";
import { toolConfig as patternNoiseGeneratorConfig } from "@/tools/pattern-noise-generator/config";
import { toolConfig as glassmorphismLayerTesterConfig } from "@/tools/glassmorphism-layer-tester/config";
import { toolConfig as ipAddressMaskerConfig } from "@/tools/ip-address-masker/config";
import { toolConfig as checksumCalculatorConfig } from "@/tools/checksum-calculator/config";
import { toolConfig as discountCalculatorConfig } from "@/tools/discount-calculator/config";
import { toolConfig as percentageCalculatorConfig } from "@/tools/percentage-calculator/config";
import { toolConfig as ageCalculatorConfig } from "@/tools/age-calculator/config";
import { toolConfig as bmiCalculatorConfig } from "@/tools/bmi-calculator/config";
import { toolConfig as unixTimestampConverterConfig } from "@/tools/timestamp-unix-converter/config";
import { toolConfig as loanEmiCalculatorConfig } from "@/tools/loan-emi-calculator/config";
import { toolConfig as randomNumberGeneratorConfig } from "@/tools/random-number-generator/config";
import { toolConfig as currencyFormatPreviewerConfig } from "@/tools/currency-format-previewer/config";
import { toolConfig as timerStopwatchConfig } from "@/tools/timer-stopwatch/config";
import { toolConfig as percentageIncreaseDecreaseConfig } from "@/tools/percentage-increase-decrease-calculator/config";
import { toolConfig as jsonValidatorConfig } from "@/tools/json-validator/config";
import { base64EncoderDecoderConfig } from "@/tools/base64-encoder-decoder/config";
import { regexTesterConfig } from "@/tools/regex-tester/config";
import { matrixCalculatorConfig } from "@/tools/matrix-calculator/config";
import { toolConfig as xmlToJsonConfig } from "@/tools/xml-to-json/config";
import { toolConfig as jsonToCsvConfig } from "@/tools/json-to-csv/config";
import { toolConfig as flowchartLogicMapperConfig } from "@/tools/flowchart-logic-mapper/config";
import { toolConfig as vennDiagramMakerConfig } from "@/tools/venn-diagram-maker/config";
import { toolConfig as heatmapGridConfig } from "@/tools/heatmap-grid/config";
import { toolConfig as wordCloudGeneratorConfig } from "@/tools/word-cloud-generator/config";
import { toolConfig as mindMapBuilderConfig } from "@/tools/mind-map-builder/config";
import { toolConfig as barGraphGeneratorConfig } from "@/tools/bar-graph-generator/config";
import { toolConfig as pomodoroTimerConfig } from "@/tools/pomodoro-timer/config";
import { toolConfig as urlEncoderDecoderConfig } from "@/tools/url-encoder-decoder/config";
import { toolConfig as pieChartMakerConfig } from "@/tools/pie-chart-maker/config";
import { toolConfig as sqlFormatterConfig } from "@/tools/sql-formatter/config";
import { toolConfig as jwtDebuggerConfig } from "@/tools/jwt-debugger/config";
import { binaryHexDecimalConverterConfig } from "@/tools/binary-hex-decimal-converter/config";
import { toolConfig as fuelCostCalculatorConfig } from "@/tools/fuel-cost-calculator/config";
import { toolConfig as unitRatioCalculatorConfig } from "@/tools/unit-ratio-calculator/config";
import { toolConfig as dateDifferenceCalculatorConfig } from "@/tools/date-difference-calculator/config";
import { toolConfig as timeDurationCalculatorConfig } from "@/tools/time-duration-calculator/config";
import { toolConfig as temperatureConversionScientificConfig } from "@/tools/temperature-conversion-scientific/config";
import { toolConfig as ohmsLawCalculatorConfig } from "@/tools/ohms-law-calculator/config";
import { toolConfig as cmToMeterConverterConfig } from "@/tools/centimeter-to-meter-converter/config";
import { toolConfig as squareMeterToSquareFootConverterConfig } from "@/tools/square-meter-to-square-foot-converter/config";
import { toolConfig as meterToKmConverterConfig } from "@/tools/meter-to-km-converter/config";
import { toolConfig as inchToCmConverterConfig } from "@/tools/inch-to-cm-converter/config";
import { averageCalculatorConfig } from "@/tools/average-calculator/config";
import { scientificCalculatorConfig } from "@/tools/scientific-calculator/config";
import { fractionCalculatorConfig } from "@/tools/fraction-calculator/config";
import { toolConfig as exponentCalculatorConfig } from "@/tools/exponent-calculator/config";
import { toolConfig as squareRootCalculatorConfig } from "@/tools/square-root-calculator/config";
import { toolConfig as simpleInterestCalculatorConfig } from "@/tools/simple-interest-calculator/config";
import { toolConfig as compoundInterestCalculatorConfig } from "@/tools/compound-interest-calculator/config";
import { toolConfig as investmentReturnCalculatorConfig } from "@/tools/investment-return-calculator/config";
import { toolConfig as gstVatCalculatorConfig } from "@/tools/gst-vat-calculator/config";
import { toolConfig as salaryCalculatorConfig } from "@/tools/salary-calculator/config";
import { toolConfig as bmrCalculatorConfig } from "@/tools/bmr-calculator/config";
import { qrCodeGeneratorConfig } from "@/tools/qr-code-generator/config";
import { toolConfig as jsonFormatterConfig } from "@/tools/json-formatter/config";
import { toolConfig as readingTimeCalculatorConfig } from "@/tools/reading-time-calculator/config";
import { toolConfig as habitTrackerConfig } from "@/tools/habit-tracker/config";
import { htmlEntityEncoderConfig } from "@/tools/html-entity-encoder/config";
import { toolConfig as cssTriangleGeneratorConfig } from "@/tools/css-triangle-generator/config";
import { toolConfig as placeholderImageGeneratorConfig } from "@/tools/placeholder-image-generator/config";
import { toolConfig as cronExpressionGeneratorConfig } from "@/tools/cron-expression-generator/config";
import { toolConfig as fontPairerConfig } from "@/tools/font-pairer/config";
import { toolConfig as screenResolutionCheckerConfig } from "@/tools/screen-resolution-checker/config";
import { toolConfig as httpStatusCodeLookupConfig } from "@/tools/http-status-code-lookup/config";
import { toolConfig as svgPatternGeneratorConfig } from "@/tools/svg-pattern-generator/config";
import { config as asciiArtGeneratorConfig } from "@/tools/ascii-art-generator/config";
import { toolConfig as voiceToTextNotepadConfig } from "@/tools/voice-to-text-notepad/config";
import { base32EncoderConfig } from "@/tools/base32-encoder/config";
import { toolConfig as pixelArtGridConfig } from "@/tools/pixel-art-grid/config";
import { toolConfig as csvToJsonConverterConfig } from "@/tools/csv-to-json-converter/config";
import { toolConfig as workingDaysCalculatorConfig } from "@/tools/working-days-calculator/config";
import { toolConfig as timelineCreatorConfig } from "@/tools/timeline-creator/config";
import { toolConfig as yamlToJsonConverterConfig } from "@/tools/yaml-to-json-converter/config";
import { toolConfig as audioVisualizerConfig } from "@/tools/audio-visualizer/config";
import { randomIDGeneratorConfig } from "@/tools/random-id-generator/config";
import { toolConfig as cssButtonGeneratorConfig } from "@/tools/css-button-generator/config";
import { toolConfig as diceRollerConfig } from "@/tools/dice-roller/config";
import { floorAreaCalculatorConfig } from "@/tools/floor-area-calculator/config";
import { plotAreaCalculatorConfig } from "@/tools/plot-area-calculator/config";
import { roomAreaCalculatorConfig } from "@/tools/room-area-calculator/config";
import { roomVolumeCalculatorConfig } from "@/tools/room-volume-calculator/config";
import { wallAreaCalculatorConfig } from "@/tools/wall-area-calculator/config";
import { paintRequiredCalculatorConfig } from "@/tools/paint-required-calculator/config";
import { tileQuantityCalculatorConfig } from "@/tools/tile-quantity-calculator/config";
import { brickCalculatorConfig } from "@/tools/brick-calculator/config";
import { cementCalculatorConfig } from "@/tools/cement-calculator/config";
import { sandCalculatorConfig } from "@/tools/sand-calculator/config";
import { concreteMixRatioCalculatorConfig } from "@/tools/concrete-mix-ratio-calculator/config";
import { concreteVolumeCalculatorConfig } from "@/tools/concrete-volume-calculator/config";
import { slabConcreteCalculatorConfig } from "@/tools/slab-concrete-calculator/config";
import { foundationDepthCalculatorConfig } from "@/tools/foundation-depth-calculator/config";
import { rebarWeightCalculatorConfig } from "@/tools/rebar-weight-calculator/config";
import { rebarSpacingCalculatorConfig } from "@/tools/rebar-spacing-calculator/config";
import { steelQuantityCalculatorConfig } from "@/tools/steel-quantity-calculator/config";
import { beamLoadCalculatorConfig } from "@/tools/beam-load-calculator/config";
import { columnLoadCalculatorConfig } from "@/tools/column-load-calculator/config";
import { slabLoadCalculatorConfig } from "@/tools/slab-load-calculator/config";
import { footingSizeCalculatorConfig } from "@/tools/footing-size-calculator/config";
import { structuralLoadCalculatorConfig } from "@/tools/structural-load-calculator/config";
import { liveLoadCalculatorConfig } from "@/tools/live-load-calculator/config";
import { roofAreaCalculatorConfig } from "@/tools/roof-area-calculator/config";
import { roofPitchCalculatorConfig } from "@/tools/roof-pitch-calculator/config";
import { rafterLengthCalculatorConfig } from "@/tools/rafter-length-calculator/config";
import { staircaseCalculatorConfig } from "@/tools/staircase-calculator/config";
import { stepRiseRunCalculatorConfig } from "@/tools/step-rise-run-calculator/config";
import { windowAreaCalculatorConfig } from "@/tools/window-area-calculator/config";
import { doorAreaCalculatorConfig } from "@/tools/door-area-calculator/config";
import { ventilationCalculatorConfig } from "@/tools/ventilation-calculator/config";
import { airChangeRateCalculatorConfig } from "@/tools/air-change-rate-calculator/config";
import { lightingLoadCalculatorConfig } from "@/tools/lighting-load-calculator/config";
import { electricalLoadCalculatorBuildingConfig } from "@/tools/electrical-load-calculator-building/config";
import { hvacLoadCalculatorConfig } from "@/tools/hvac-load-calculator/config";
import { coolingLoadCalculatorArchitectureConfig } from "@/tools/cooling-load-calculator-architecture/config";
import { heatLossCalculatorBuildingConfig } from "@/tools/heat-loss-calculator-building/config";
import { insulationThicknessCalculatorConfig } from "@/tools/insulation-thickness-calculator/config";
import { acousticSoundproofingCalculatorConfig } from "@/tools/acoustic-soundproofing-calculator/config";
import { roomAcousticsCalculatorConfig } from "@/tools/room-acoustics-calculator/config";
import { escalationCostCalculatorConfig } from "@/tools/escalation-cost-calculator/config";
import { constructionCostEstimatorConfig } from "@/tools/construction-cost-estimator/config";
import { materialCostCalculatorConfig } from "@/tools/material-cost-calculator/config";
import { laborCostCalculatorConfig } from "@/tools/labor-cost-calculator/config";
import { projectTimelineCalculatorConfig } from "@/tools/project-timeline-calculator/config";
import { workforceRequirementCalculatorConfig } from "@/tools/workforce-requirement-calculator/config";
import { excavationVolumeCalculatorConfig } from "@/tools/excavation-volume-calculator/config";
import { soilBearingCapacityCalculatorConfig } from "@/tools/soil-bearing-capacity-calculator/config";
import { soilCompactionCalculatorConfig } from "@/tools/soil-compaction-calculator/config";
import { retainingWallCalculatorConfig } from "@/tools/retaining-wall-calculator/config";
import { slopeStabilityCalculatorConfig } from "@/tools/slope-stability-calculator/config";
import { drainageFlowCalculatorConfig } from "@/tools/drainage-flow-calculator/config";
import { rainwaterHarvestingCalculatorConfig } from "@/tools/rainwater-harvesting-calculator/config";
import { septicTankSizeCalculatorConfig } from "@/tools/septic-tank-size-calculator/config";
import { waterTankCapacityCalculatorConfig } from "@/tools/water-tank-capacity-calculator/config";
import { plumbingPipeSizeCalculatorConfig } from "@/tools/plumbing-pipe-size-calculator/config";
import { waterFlowRateCalculatorConfig } from "@/tools/water-flow-rate-calculator/config";
import { fireSafetyLoadCalculatorConfig } from "@/tools/fire-safety-load-calculator/config";
import { emergencyExitWidthCalculatorConfig } from "@/tools/emergency-exit-width-calculator/config";
import { parkingSpaceCalculatorConfig } from "@/tools/parking-space-calculator/config";
import { buildingHeightCalculatorConfig } from "@/tools/building-height-calculator/config";
import { sunlightExposureCalculatorConfig } from "@/tools/sunlight-exposure-calculator/config";
import { shadowLengthCalculatorConfig } from "@/tools/shadow-length-calculator/config";
import { facadeAreaCalculatorConfig } from "@/tools/facade-area-calculator/config";
import { claddingMaterialCalculatorConfig } from "@/tools/cladding-material-calculator/config";
import { glassPanelSizeCalculatorConfig } from "@/tools/glass-panel-size-calculator/config";
import { curtainWallCalculatorConfig } from "@/tools/curtain-wall-calculator/config";
import { elevationDesignCalculatorConfig } from "@/tools/elevation-design-calculator/config";
import { volumeCalculatorArchitectureConfig } from "@/tools/3d-volume-calculator-architecture/config";
import { floorFinishCalculatorConfig } from "@/tools/floor-finish-calculator/config";
import { skirtingMaterialCalculatorConfig } from "@/tools/skirting-material-calculator/config";
import { interiorSpaceOptimizationCalculatorConfig } from "@/tools/interior-space-optimization-calculator/config";

export const TOOLS_REGISTRY = {
  'word-counter': wordCounterConfig,
  'sentence-case-converter': sentenceCaseConfig,
  'paragraph-formatter': paragraphFormatterConfig,
  'keyword-density-checker': keywordDensityConfig,
  'text-reverser': textReverserConfig,
  'word-frequency-counter': wordFrequencyConfig,
  'image-compressor': imageCompressorConfig,
  'image-resizer': imageResizerConfig,
  'lorem-ipsum-generator': loremIpsumConfig,
  'markdown-previewer': markdownPreviewerConfig,
  'text-to-clipboard': textToClipboardConfig,
  'remove-duplicate-lines': removeDuplicateLinesConfig,
  'find-and-replace': findAndReplaceConfig,
  'text-diff-checker': textDiffCheckerConfig,
  'bionic-reading-converter': bionicReadingConverterConfig,
  'whitespace-remover': whitespaceRemoverConfig,
  'table-to-markdown': tableToMarkdownConfig,
  'anagram-finder': anagramFinderConfig,
  'palindrome-checker': palindromeCheckerConfig,
  'text-to-slug-converter': textToSlugConverterConfig,
  'random-name-picker': randomNamePickerConfig,
  'zalgo-text-generator': zalgoTextGeneratorConfig,
  'nato-phonetic-converter': natoPhoneticConverterConfig,
  'leetspeak-converter': leetspeakConverterConfig,
  'upside-down-text-generator': upsideDownTextGeneratorConfig,
  'list-prefix-suffix': listPrefixSuffixConfig,
  'morse-code-translator': morseCodeTranslatorConfig,
  'base64-image-encoder': base64ImageEncoderConfig,
  'favicon-generator': faviconGeneratorConfig,
  'image-to-grayscale': imageToGrayscaleConfig,
  'exif-remover': exifRemoverConfig,
  'dithering-filter': ditheringFilterConfig,
  'duotone-filter': duotoneFilterConfig,
  'hex-to-rgb-converter': hexToRgbConverterConfig,
  'color-palette-generator': colorPaletteGeneratorConfig,
  'css-gradient-generator': cssGradientGeneratorConfig,
  'css-box-shadow-generator': cssBoxShadowGeneratorConfig,
  'color-format-converter': colorFormatConverterConfig,
  'css-glassmorphism-generator': cssGlassmorphismGeneratorConfig,
  'svg-path-visualizer': svgPathVisualizerConfig,
  'contrast-checker': contrastCheckerConfig,
  'fuel-cost-calculator': fuelCostCalculatorConfig,
  'neumorphism-generator': neumorphismGeneratorConfig,
  'hsl-color-slider': hslColorSliderConfig,
  'css-filter-tester': cssFilterTesterConfig,
  'css-animation-previewer': cssAnimationPreviewerConfig,
  'gradient-text-generator': gradientTextGeneratorConfig,
  'color-palette-contrast-grid': colorPaletteContrastGridConfig,
  'color-blindness-simulator': colorBlindnessSimulatorConfig,
  'random-hex-color-generator': randomHexColorGeneratorConfig,
  'css-mesh-gradient-generator': cssMeshGradientGeneratorConfig,
  'css-cursor-style-previewer': cssCursorStylePreviewerConfig,
  'css-clamp-generator': cssClampGeneratorConfig,
  'hex-to-rgba-converter': hexToRgbaConverterConfig,
  'password-generator': passwordGeneratorConfig,
  'wifi-password-generator': wifiPasswordGeneratorConfig,
  'text-encrypt-decrypt': textEncryptDecryptConfig,
  'username-generator': usernameGeneratorConfig,
  'hash-generator': hashGeneratorConfig,
  'password-strength-meter': passwordStrengthMeterConfig,
  'aspect-ratio-calculator': aspectRatioCalculatorConfig,
  'golden-ratio-calculator': goldenRatioCalculatorConfig,
  'css-border-radius-blob': cssBlobGeneratorConfig,
  'color-palette-extractor': colorPaletteExtractorConfig,
  'custom-scrollbar-styler': customScrollbarStylerConfig,
  'css-keyframe-animator': cssKeyframeAnimatorConfig,
  'pattern-noise-generator': patternNoiseGeneratorConfig,
  'glassmorphism-layer-tester': glassmorphismLayerTesterConfig,
  'ip-address-masker': ipAddressMaskerConfig,
  'checksum-calculator': checksumCalculatorConfig,
  'discount-calculator': discountCalculatorConfig,
  'percentage-calculator': percentageCalculatorConfig,
  'age-calculator': ageCalculatorConfig,
  'bmi-calculator': bmiCalculatorConfig,
  'timestamp-unix-converter': unixTimestampConverterConfig,
  'loan-emi-calculator': loanEmiCalculatorConfig,
  'random-number-generator': randomNumberGeneratorConfig,
  'currency-format-previewer': currencyFormatPreviewerConfig,
  'timer-stopwatch': timerStopwatchConfig,
  'percentage-increase-decrease': percentageIncreaseDecreaseConfig,
  'json-validator': jsonValidatorConfig,
  'base64-encoder-decoder': base64EncoderDecoderConfig,
  'regex-tester': regexTesterConfig,
  'matrix-calculator': matrixCalculatorConfig,
  'xml-to-json': xmlToJsonConfig,
  'json-to-csv': jsonToCsvConfig,
  'flowchart-logic-mapper': flowchartLogicMapperConfig,
  'venn-diagram-maker': vennDiagramMakerConfig,
  'heatmap-grid': heatmapGridConfig,
  'word-cloud-generator': wordCloudGeneratorConfig,
  'mind-map-builder': mindMapBuilderConfig,
  'bar-graph-generator': barGraphGeneratorConfig,
  'pomodoro-timer': pomodoroTimerConfig,
  'url-encoder-decoder': urlEncoderDecoderConfig,
  'pie-chart-maker': pieChartMakerConfig,
  'sql-formatter': sqlFormatterConfig,
  'jwt-debugger': jwtDebuggerConfig,
  'binary-hex-decimal-converter': binaryHexDecimalConverterConfig,
  'unit-ratio-calculator': unitRatioCalculatorConfig,
  'date-difference-calculator': dateDifferenceCalculatorConfig,
  'time-duration-calculator': timeDurationCalculatorConfig,
  'temperature-conversion-scientific': temperatureConversionScientificConfig,
  'ohms-law-calculator': ohmsLawCalculatorConfig,
  'centimeter-to-meter-converter': cmToMeterConverterConfig,
  'square-meter-to-square-foot-converter': squareMeterToSquareFootConverterConfig,
  'meter-to-km-converter': meterToKmConverterConfig,
  'inch-to-cm-converter': inchToCmConverterConfig,
  'average-calculator': averageCalculatorConfig,
  'scientific-calculator': scientificCalculatorConfig,
  'fraction-calculator': fractionCalculatorConfig,
  'exponent-calculator': exponentCalculatorConfig,
  'square-root-calculator': squareRootCalculatorConfig,
  'simple-interest-calculator': simpleInterestCalculatorConfig,
  'compound-interest-calculator': compoundInterestCalculatorConfig,
  'investment-return-calculator': investmentReturnCalculatorConfig,
  'gst-vat-calculator': gstVatCalculatorConfig,
  'salary-calculator': salaryCalculatorConfig,
  'bmr-calculator': bmrCalculatorConfig,
  'qr-code-generator': qrCodeGeneratorConfig,
  'json-formatter': jsonFormatterConfig,
  'reading-time-calculator': readingTimeCalculatorConfig,
  'habit-tracker': habitTrackerConfig,
  'html-entity-encoder': htmlEntityEncoderConfig,
  'css-triangle-generator': cssTriangleGeneratorConfig,
  'placeholder-image-generator': placeholderImageGeneratorConfig,
  'cron-expression-generator': cronExpressionGeneratorConfig,
  'font-pairer': fontPairerConfig,
  'screen-resolution-checker': screenResolutionCheckerConfig,
  'http-status-code-lookup': httpStatusCodeLookupConfig,
  'svg-pattern-generator': svgPatternGeneratorConfig,
  'ascii-art-generator': asciiArtGeneratorConfig,
  'voice-to-text-notepad': voiceToTextNotepadConfig,
  'base32-encoder': base32EncoderConfig,
  'pixel-art-grid': pixelArtGridConfig,
  'csv-to-json-converter': csvToJsonConverterConfig,
  'working-days-calculator': workingDaysCalculatorConfig,
  'timeline-creator': timelineCreatorConfig,
  'yaml-to-json-converter': yamlToJsonConverterConfig,
  'audio-visualizer': audioVisualizerConfig,
  'random-id-generator': randomIDGeneratorConfig,
  'css-button-generator': cssButtonGeneratorConfig,
  'dice-roller': diceRollerConfig,
  'floor-area-calculator': floorAreaCalculatorConfig,
  'plot-area-calculator': plotAreaCalculatorConfig,
  'room-area-calculator': roomAreaCalculatorConfig,
  'room-volume-calculator': roomVolumeCalculatorConfig,
  'wall-area-calculator': wallAreaCalculatorConfig,
  'paint-required-calculator': paintRequiredCalculatorConfig,
  'tile-quantity-calculator': tileQuantityCalculatorConfig,
  'brick-calculator': brickCalculatorConfig,
  'cement-calculator': cementCalculatorConfig,
  'sand-calculator': sandCalculatorConfig,
  'concrete-mix-ratio-calculator': concreteMixRatioCalculatorConfig,
  'concrete-volume-calculator': concreteVolumeCalculatorConfig,
  'slab-concrete-calculator': slabConcreteCalculatorConfig,
  'foundation-depth-calculator': foundationDepthCalculatorConfig,
  'rebar-weight-calculator': rebarWeightCalculatorConfig,
  'rebar-spacing-calculator': rebarSpacingCalculatorConfig,
  'steel-quantity-calculator': steelQuantityCalculatorConfig,
  'beam-load-calculator': beamLoadCalculatorConfig,
  'column-load-calculator': columnLoadCalculatorConfig,
  'slab-load-calculator': slabLoadCalculatorConfig,
  'footing-size-calculator': footingSizeCalculatorConfig,
  'structural-load-calculator': structuralLoadCalculatorConfig,
  'live-load-calculator': liveLoadCalculatorConfig,
  'roof-area-calculator': roofAreaCalculatorConfig,
  'roof-pitch-calculator': roofPitchCalculatorConfig,
  'rafter-length-calculator': rafterLengthCalculatorConfig,
  'staircase-calculator': staircaseCalculatorConfig,
  'step-rise-run-calculator': stepRiseRunCalculatorConfig,
  'window-area-calculator': windowAreaCalculatorConfig,
  'door-area-calculator': doorAreaCalculatorConfig,
  'ventilation-calculator': ventilationCalculatorConfig,
  'air-change-rate-calculator': airChangeRateCalculatorConfig,
  'lighting-load-calculator': lightingLoadCalculatorConfig,
  'electrical-load-calculator-building': electricalLoadCalculatorBuildingConfig,
  'hvac-load-calculator': hvacLoadCalculatorConfig,
  'cooling-load-calculator-architecture': coolingLoadCalculatorArchitectureConfig,
  'heat-loss-calculator-building': heatLossCalculatorBuildingConfig,
  'insulation-thickness-calculator': insulationThicknessCalculatorConfig,
  'acoustic-soundproofing-calculator': acousticSoundproofingCalculatorConfig,
  'room-acoustics-calculator': roomAcousticsCalculatorConfig,
  'escalation-cost-calculator': escalationCostCalculatorConfig,
  'construction-cost-estimator': constructionCostEstimatorConfig,
  'material-cost-calculator': materialCostCalculatorConfig,
  'labor-cost-calculator': laborCostCalculatorConfig,
  'project-timeline-calculator': projectTimelineCalculatorConfig,
  'workforce-requirement-calculator': workforceRequirementCalculatorConfig,
  'excavation-volume-calculator': excavationVolumeCalculatorConfig,
  'soil-bearing-capacity-calculator': soilBearingCapacityCalculatorConfig,
  'soil-compaction-calculator': soilCompactionCalculatorConfig,
  'retaining-wall-calculator': retainingWallCalculatorConfig,
  'slope-stability-calculator': slopeStabilityCalculatorConfig,
  'drainage-flow-calculator': drainageFlowCalculatorConfig,
  'rainwater-harvesting-calculator': rainwaterHarvestingCalculatorConfig,
  'septic-tank-size-calculator': septicTankSizeCalculatorConfig,
  'water-tank-capacity-calculator': waterTankCapacityCalculatorConfig,
  'plumbing-pipe-size-calculator': plumbingPipeSizeCalculatorConfig,
  'water-flow-rate-calculator': waterFlowRateCalculatorConfig,
  'fire-safety-load-calculator': fireSafetyLoadCalculatorConfig,
  'emergency-exit-width-calculator': emergencyExitWidthCalculatorConfig,
  'parking-space-calculator': parkingSpaceCalculatorConfig,
  'building-height-calculator': buildingHeightCalculatorConfig,
  'sunlight-exposure-calculator': sunlightExposureCalculatorConfig,
  'shadow-length-calculator': shadowLengthCalculatorConfig,
  'facade-area-calculator': facadeAreaCalculatorConfig,
  'cladding-material-calculator': claddingMaterialCalculatorConfig,
  'glass-panel-size-calculator': glassPanelSizeCalculatorConfig,
  'curtain-wall-calculator': curtainWallCalculatorConfig,
  'elevation-design-calculator': elevationDesignCalculatorConfig,
  '3d-volume-calculator-architecture': volumeCalculatorArchitectureConfig,
  'floor-finish-calculator': floorFinishCalculatorConfig,
  'skirting-material-calculator': skirtingMaterialCalculatorConfig,
  'interior-space-optimization-calculator': interiorSpaceOptimizationCalculatorConfig,
};






export function getToolBySlug(slug: string) {
  return TOOLS_REGISTRY[slug as keyof typeof TOOLS_REGISTRY];
}

export function getAllTools() {
  return Object.values(TOOLS_REGISTRY);
}
