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
};






export function getToolBySlug(slug: string) {
  return TOOLS_REGISTRY[slug as keyof typeof TOOLS_REGISTRY];
}

export function getAllTools() {
  return Object.values(TOOLS_REGISTRY);
}
