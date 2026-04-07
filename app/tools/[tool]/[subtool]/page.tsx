import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { tools, categories } from "@/config/tools";

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
import { toolConfig as aesEncryptorConfig } from "@/tools/aes-encryptor/config";
import { toolConfig as emailObfuscatorConfig } from "@/tools/email-obfuscator/config";
import { toolConfig as fileHashGeneratorConfig } from "@/tools/file-hash-generator/config";
import { toolConfig as bcryptHashVerifierConfig } from "@/tools/bcrypt-hash-verifier/config";
import { toolConfig as steganographyToolConfig } from "@/tools/steganography-tool/config";
import { sriGeneratorConfig } from "@/tools/sri-generator/config";
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
import { tipCalculatorConfig } from "@/tools/tip-calculator/config";
import { standardDeviationCalculatorConfig } from "@/tools/standard-deviation-calculator/config";
import { toolConfig as romanNumeralConverterConfig } from "@/tools/roman-numeral-converter/config";
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
import { toolConfig as squareRootCalculatorConfig } from "@/tools/square-root-calculator/config";
import { fractionCalculatorConfig } from "@/tools/fraction-calculator/config";
import { toolConfig as exponentCalculatorConfig } from "@/tools/exponent-calculator/config";
import { toolConfig as simpleInterestCalculatorConfig } from "@/tools/simple-interest-calculator/config";
import { toolConfig as compoundInterestCalculatorConfig } from "@/tools/compound-interest-calculator/config";
import { mortgageCalculatorConfig } from "@/tools/mortgage-calculator/config";
import { toolConfig as investmentReturnCalculatorConfig } from "@/tools/investment-return-calculator/config";
import { toolConfig as profitMarginCalculatorConfig } from "@/tools/profit-margin-calculator/config";
import { toolConfig as gstVatCalculatorConfig } from "@/tools/gst-vat-calculator/config";
import { toolConfig as salaryCalculatorConfig } from "@/tools/salary-calculator/config";
import { toolConfig as bmrCalculatorConfig } from "@/tools/bmr-calculator/config";
import { toolConfig as idealWeightCalculatorConfig } from "@/tools/ideal-weight-calculator/config";
import { toolConfig as bodyFatCalculatorConfig } from "@/tools/body-fat-calculator/config";
import { toolConfig as dailyCalorieCalculatorConfig } from "@/tools/daily-calorie-calculator/config";
import { powerConsumptionCalculatorConfig } from "@/tools/power-consumption-calculator/config";
import { toolConfig as cssFlexboxPlaygroundConfig } from "@/tools/css-flexbox-playground/config";
import { qrCodeGeneratorConfig } from "@/tools/qr-code-generator/config";
import { toolConfig as jsonFormatterConfig } from "@/tools/json-formatter/config";
import { toolConfig as readingTimeCalculatorConfig } from "@/tools/reading-time-calculator/config";
import { toolConfig as pxToRemConverterConfig } from "@/tools/px-to-rem-converter/config";
import { toolConfig as habitTrackerConfig } from "@/tools/habit-tracker/config";
import { toolConfig as decisionWheelConfig } from "@/tools/decision-wheel/config";
import { toolConfig as timeZoneConverterConfig } from "@/tools/time-zone-converter/config";
import { htmlEntityEncoderConfig } from "@/tools/html-entity-encoder/config";
import { toolConfig as mockDataGeneratorConfig } from "@/tools/mock-data-generator/config";
import { toolConfig as cssTriangleGeneratorConfig } from "@/tools/css-triangle-generator/config";
import { toolConfig as placeholderImageGeneratorConfig } from "@/tools/placeholder-image-generator/config";
import { toolConfig as cronExpressionGeneratorConfig } from "@/tools/cron-expression-generator/config";
import { toolConfig as fontPairerConfig } from "@/tools/font-pairer/config";
import { toolConfig as userAgentParserConfig } from "@/tools/user-agent-parser/config";
import { toolConfig as screenResolutionCheckerConfig } from "@/tools/screen-resolution-checker/config";
import { toolConfig as httpStatusCodeLookupConfig } from "@/tools/http-status-code-lookup/config";
import { toolConfig as svgPatternGeneratorConfig } from "@/tools/svg-pattern-generator/config";
import { asciiArtGeneratorConfig } from "@/tools/ascii-art-generator/config";
import { toolConfig as voiceToTextNotepadConfig } from "@/tools/voice-to-text-notepad/config";
import { toolConfig as textToSpeechPreviewConfig } from "@/tools/text-to-speech-preview/config";
import { toolConfig as urlSanitizerConfig } from "@/tools/url-sanitizer/config";
import { base32EncoderConfig } from "@/tools/base32-encoder/config";
import { toolConfig as socialMediaPostPreviewConfig } from "@/tools/social-media-post-preview/config";
import { toolConfig as pixelArtGridConfig } from "@/tools/pixel-art-grid/config";
import { toolConfig as csvToJsonConverterConfig } from "@/tools/csv-to-json-converter/config";
import { toolConfig as workingDaysCalculatorConfig } from "@/tools/working-days-calculator/config";
import { toolConfig as timelineCreatorConfig } from "@/tools/timeline-creator/config";
import { toolConfig as primeNumberCheckerConfig } from "@/tools/prime-number-checker/config";
import { toolConfig as yamlToJsonConverterConfig } from "@/tools/yaml-to-json-converter/config";
import { toolConfig as audioVisualizerConfig } from "@/tools/audio-visualizer/config";
import { toolConfig as videoFrameExtractorConfig } from "@/tools/video-frame-extractor/config";
import { randomIDGeneratorConfig } from "@/tools/random-id-generator/config";
import { toolConfig as cssButtonGeneratorConfig } from "@/tools/css-button-generator/config";
import { toolConfig as diceRollerConfig } from "@/tools/dice-roller/config";

const WordCounterUI = dynamic(() => import("@/tools/word-counter/ui"));
const SentenceCaseConverterUI = dynamic(() => import("@/tools/sentence-case-converter/ui"));
const ParagraphFormatterUI = dynamic(() => import("@/tools/paragraph-formatter/ui"));
const KeywordDensityCheckerUI = dynamic(() => import("@/tools/keyword-density-checker/ui"));
const TextReverserUI = dynamic(() => import("@/tools/text-reverser/ui"));
const WordFrequencyCounterUI = dynamic(() => import("@/tools/word-frequency-counter/ui"));
const ImageCompressorUI = dynamic(() => import("@/tools/image-compressor/ui"));
const ImageResizerUI = dynamic(() => import("@/tools/image-resizer/ui"));
const LoremIpsumGeneratorUI = dynamic(() => import("@/tools/lorem-ipsum-generator/ui"));
const MarkdownPreviewerUI = dynamic(() => import("@/tools/markdown-previewer/ui"));
const TextToClipboardUI = dynamic(() => import("@/tools/text-to-clipboard/ui"));
const RemoveDuplicateLinesUI = dynamic(() => import("@/tools/remove-duplicate-lines/ui"));
const FindAndReplaceUI = dynamic(() => import("@/tools/find-and-replace/ui"));
const TextDiffCheckerUI = dynamic(() => import("@/tools/text-diff-checker/ui"));
const BionicReadingConverterUI = dynamic(() => import("@/tools/bionic-reading-converter/ui"));
const WhitespaceRemoverUI = dynamic(() => import("@/tools/whitespace-remover/ui"));
const TableToMarkdownUI = dynamic(() => import("@/tools/table-to-markdown/ui"));
const AnagramFinderUI = dynamic(() => import("@/tools/anagram-finder/ui"));
const PalindromeCheckerUI = dynamic(() => import("@/tools/palindrome-checker/ui"));
const TextToSlugConverterUI = dynamic(() => import("@/tools/text-to-slug-converter/ui"));
const RandomNamePickerUI = dynamic(() => import("@/tools/random-name-picker/ui"));
const ZalgoTextGeneratorUI = dynamic(() => import("@/tools/zalgo-text-generator/ui"));
const NATOPhoneticConverterUI = dynamic(() => import("@/tools/nato-phonetic-converter/ui"));
const LeetspeakConverterUI = dynamic(() => import("@/tools/leetspeak-converter/ui"));
const UpsideDownTextGeneratorUI = dynamic(() => import("@/tools/upside-down-text-generator/ui"));
const ListPrefixSuffixUI = dynamic(() => import("@/tools/list-prefix-suffix/ui"));
const MorseCodeTranslatorUI = dynamic(() => import("@/tools/morse-code-translator/ui"));
const Base64ImageEncoderUI = dynamic(() => import("@/tools/base64-image-encoder/ui"));
const FaviconGeneratorUI = dynamic(() => import("@/tools/favicon-generator/ui"));
const ImageToGrayscaleUI = dynamic(() => import("@/tools/image-to-grayscale/ui"));
const ExifRemoverUI = dynamic(() => import("@/tools/exif-remover/ui"));
const DitheringFilterUI = dynamic(() => import("@/tools/dithering-filter/ui"));
const DuotoneFilterUI = dynamic(() => import("@/tools/duotone-filter/ui"));
const HexToRgbConverterUI = dynamic(() => import("@/tools/hex-to-rgb-converter/ui"));
const ColorPaletteGeneratorUI = dynamic(() => import("@/tools/color-palette-generator/ui"));
const CSSGradientGeneratorUI = dynamic(() => import("@/tools/css-gradient-generator/ui"));
const CSSBoxShadowGeneratorUI = dynamic(() => import("@/tools/css-box-shadow-generator/ui"));
const ColorFormatConverterUI = dynamic(() => import("@/tools/color-format-converter/ui"));
const GlassmorphismGeneratorUI = dynamic(() => import("@/tools/css-glassmorphism-generator/ui"));
const SVGPathVisualizerUI = dynamic(() => import("@/tools/svg-path-visualizer/ui"));
const ContrastCheckerUI = dynamic(() => import("@/tools/contrast-checker/ui"));
const NeumorphismGeneratorUI = dynamic(() => import("@/tools/neumorphism-generator/ui"));
const HSLColorSliderUI = dynamic(() => import("@/tools/hsl-color-slider/ui"));
const CSSFilterTesterUI = dynamic(() => import("@/tools/css-filter-tester/ui"));
const CSSAnimationPreviewerUI = dynamic(() => import("@/tools/css-animation-previewer/ui"));
const GradientTextGeneratorUI = dynamic(() => import("@/tools/gradient-text-generator/ui"));
const ColorPaletteContrastGridUI = dynamic(() => import("@/tools/color-palette-contrast-grid/ui"));
const ColorBlindnessSimulatorUI = dynamic(() => import("@/tools/color-blindness-simulator/ui"));
const RandomHexColorGeneratorUI = dynamic(() => import("@/tools/random-hex-color-generator/ui"));
const CSSMeshGradientGeneratorUI = dynamic(() => import("@/tools/css-mesh-gradient-generator/ui"));
const CSSCursorStylePreviewerUI = dynamic(() => import("@/tools/css-cursor-style-previewer/ui"));
const CSSClampGeneratorUI = dynamic(() => import("@/tools/css-clamp-generator/ui"));
const HexToRgbaConverterUI = dynamic(() => import("@/tools/hex-to-rgba-converter/ui"));
const PasswordGeneratorUI = dynamic(() => import("@/tools/password-generator/ui"));
const WiFiPasswordGeneratorUI = dynamic(() => import("@/tools/wifi-password-generator/ui"));
const TextEncryptDecryptUI = dynamic(() => import("@/tools/text-encrypt-decrypt/ui"));
const UsernameGeneratorUI = dynamic(() => import("@/tools/username-generator/ui"));
const HashGeneratorUI = dynamic(() => import("@/tools/hash-generator/ui"));
const PasswordStrengthMeterUI = dynamic(() => import("@/tools/password-strength-meter/ui"));
const AspectRatioCalculatorUI = dynamic(() => import("@/tools/aspect-ratio-calculator/ui"));
const GoldenRatioCalculatorUI = dynamic(() => import("@/tools/golden-ratio-calculator/ui"));
const CSSBlobGeneratorUI = dynamic(() => import("@/tools/css-blob-generator/ui"));
const ColorPaletteExtractorUI = dynamic(() => import("@/tools/color-palette-extractor/ui"));
const CustomScrollbarStylerUI = dynamic(() => import("@/tools/custom-scrollbar-styler/ui"));
const CSSKeyframeAnimatorUI = dynamic(() => import("@/tools/css-keyframe-animator/ui"));
const PatternNoiseGeneratorUI = dynamic(() => import("@/tools/pattern-noise-generator/ui"));
const GlassmorphismLayerTesterUI = dynamic(() => import("@/tools/glassmorphism-layer-tester/ui"));
const AESEncryptorUI = dynamic(() => import("@/tools/aes-encryptor/ui"));
const EmailObfuscatorUI = dynamic(() => import("@/tools/email-obfuscator/ui"));
const FileHashGeneratorUI = dynamic(() => import("@/tools/file-hash-generator/ui"));
const BcryptHashVerifierUI = dynamic(() => import("@/tools/bcrypt-hash-verifier/ui"));
const SteganographyToolUI = dynamic(() => import("@/tools/steganography-tool/ui"));
const SRIGeneratorUI = dynamic(() => import("@/tools/sri-generator/ui"));
const IPAddressMaskerUI = dynamic(() => import("@/tools/ip-address-masker/ui"));
const ChecksumCalculatorUI = dynamic(() => import("@/tools/checksum-calculator/ui"));
const DiscountCalculatorUI = dynamic(() => import("@/tools/discount-calculator/ui"));
const PercentageCalculatorUI = dynamic(() => import("@/tools/percentage-calculator/ui"));
const AgeCalculatorUI = dynamic(() => import("@/tools/age-calculator/ui"));
const BmiCalculatorUI = dynamic(() => import("@/tools/bmi-calculator/ui"));
const UnixTimestampConverterUI = dynamic(() => import("@/tools/timestamp-unix-converter/ui"));
const LoanEmiCalculatorUI = dynamic(() => import("@/tools/loan-emi-calculator/ui"));
const RandomNumberGeneratorUI = dynamic(() => import("@/tools/random-number-generator/ui"));
const CurrencyFormatPreviewerUI = dynamic(() => import("@/tools/currency-format-previewer/ui"));
const TimerStopwatchUI = dynamic(() => import("@/tools/timer-stopwatch/ui"));
const PercentageIncreaseDecreaseUI = dynamic(() => import("@/tools/percentage-increase-decrease-calculator/ui"));
const JSONValidatorUI = dynamic(() => import("@/tools/json-validator/ui"));
const Base64EncoderDecoderUI = dynamic(() => import("@/tools/base64-encoder-decoder/ui"));
const RegexTesterUI = dynamic(() => import("@/tools/regex-tester/ui"));
const MatrixCalculatorUI = dynamic(() => import("@/tools/matrix-calculator/ui"));
const XMLToJsonUI = dynamic(() => import("@/tools/xml-to-json/ui"));
const JSONToCsvUI = dynamic(() => import("@/tools/json-to-csv/ui"));
const FlowchartLogicMapperUI = dynamic(() => import("@/tools/flowchart-logic-mapper/ui"));
const VennDiagramMakerUI = dynamic(() => import("@/tools/venn-diagram-maker/ui"));
const HeatmapGridUI = dynamic(() => import("@/tools/heatmap-grid/ui"));
const WordCloudGeneratorUI = dynamic(() => import("@/tools/word-cloud-generator/ui"));
const MindMapBuilderUI = dynamic(() => import("@/tools/mind-map-builder/ui"));
const BarGraphGeneratorUI = dynamic(() => import("@/tools/bar-graph-generator/ui"));
const PomodoroTimerUI = dynamic(() => import("@/tools/pomodoro-timer/ui"));
const URLEncoderDecoderUI = dynamic(() => import("@/tools/url-encoder-decoder/ui"));
const PieChartMakerUI = dynamic(() => import("@/tools/pie-chart-maker/ui"));
const SQLFormatterUI = dynamic(() => import("@/tools/sql-formatter/ui"));
const JWTDebuggerUI = dynamic(() => import("@/tools/jwt-debugger/ui"));
const BinaryHexDecimalConverterUI = dynamic(() => import("@/tools/binary-hex-decimal-converter/ui"));
const TipCalculatorUI = dynamic(() => import("@/tools/tip-calculator/ui"));
const StandardDeviationCalculatorUI = dynamic(() => import("@/tools/standard-deviation-calculator/ui"));
const RomanNumeralConverterUI = dynamic(() => import("@/tools/roman-numeral-converter/ui"));
const FuelCostCalculatorUI = dynamic(() => import("@/tools/fuel-cost-calculator/ui"));
const UnitRatioCalculatorUI = dynamic(() => import("@/tools/unit-ratio-calculator/ui"));
const DateDifferenceCalculatorUI = dynamic(() => import("@/tools/date-difference-calculator/ui"));
const TimeDurationCalculatorUI = dynamic(() => import("@/tools/time-duration-calculator/ui"));
const TemperatureConversionUI = dynamic(() => import("@/tools/temperature-conversion-scientific/ui"));
const OhmsLawCalculatorUI = dynamic(() => import("@/tools/ohms-law-calculator/ui"));
const CmToMeterUI = dynamic(() => import("@/tools/centimeter-to-meter-converter/ui"));
const AreaConverterUI = dynamic(() => import("@/tools/square-meter-to-square-foot-converter/ui"));
const MeterToKmUI = dynamic(() => import("@/tools/meter-to-km-converter/ui"));
const InchToCmConverterUI = dynamic(() => import("@/tools/inch-to-cm-converter/ui"));
const AverageCalculatorUI = dynamic(() => import("@/tools/average-calculator/ui"));
const ScientificCalculatorUI = dynamic(() => import("@/tools/scientific-calculator/ui"));
const SquareRootCalculatorUI = dynamic(() => import("@/tools/square-root-calculator/ui"));
const FractionCalculatorUI = dynamic(() => import("@/tools/fraction-calculator/ui"));
const ExponentCalculatorUI = dynamic(() => import("@/tools/exponent-calculator/ui"));
const SimpleInterestCalculatorUI = dynamic(() => import("@/tools/simple-interest-calculator/ui"));
const CompoundInterestCalculatorUI = dynamic(() => import("@/tools/compound-interest-calculator/ui"));
const MortgageCalculatorUI = dynamic(() => import("@/tools/mortgage-calculator/ui"));
const InvestmentReturnCalculatorUI = dynamic(() => import("@/tools/investment-return-calculator/ui"));
const ProfitMarginCalculatorUI = dynamic(() => import("@/tools/profit-margin-calculator/ui"));
const GSTVATCalculatorUI = dynamic(() => import("@/tools/gst-vat-calculator/ui"));
const SalaryCalculatorUI = dynamic(() => import("@/tools/salary-calculator/ui"));
const BMRCalculatorUI = dynamic(() => import("@/tools/bmr-calculator/ui"));
const IdealWeightCalculatorUI = dynamic(() => import("@/tools/ideal-weight-calculator/ui"));
const BodyFatCalculatorUI = dynamic(() => import("@/tools/body-fat-calculator/ui"));
const DailyCalorieCalculatorUI = dynamic(() => import("@/tools/daily-calorie-calculator/ui"));
const PowerConsumptionCalculatorUI = dynamic(() => import("@/tools/power-consumption-calculator/ui"));
const CSSFlexboxPlaygroundUI = dynamic(() => import("@/tools/css-flexbox-playground/ui"));
const QRCodeGeneratorUI = dynamic(() => import("@/tools/qr-code-generator/ui"));
const JSONFormatterUI = dynamic(() => import("@/tools/json-formatter/ui"));
const ReadingTimeCalculatorUI = dynamic(() => import("@/tools/reading-time-calculator/ui"));
const PxToRemConverterUI = dynamic(() => import("@/tools/px-to-rem-converter/ui"));
const HabitTrackerUI = dynamic(() => import("@/tools/habit-tracker/ui"));
const DecisionWheelUI = dynamic(() => import("@/tools/decision-wheel/ui"));
const TimeZoneConverterUI = dynamic(() => import("@/tools/time-zone-converter/ui"));
const HTMLEntityEncoderUI = dynamic(() => import("@/tools/html-entity-encoder/ui"));
const MockDataGeneratorUI = dynamic(() => import("@/tools/mock-data-generator/ui"));
const CSSTriangleGeneratorUI = dynamic(() => import("@/tools/css-triangle-generator/ui"));
const PlaceholderImageGeneratorUI = dynamic(() => import("@/tools/placeholder-image-generator/ui"));
const CronExpressionGeneratorUI = dynamic(() => import("@/tools/cron-expression-generator/ui"));
const FontPairerUI = dynamic(() => import("@/tools/font-pairer/ui"));
const UserAgentParserUI = dynamic(() => import("@/tools/user-agent-parser/ui"));
const ScreenResolutionCheckerUI = dynamic(() => import("@/tools/screen-resolution-checker/ui"));
const HttpStatusCodeLookupUI = dynamic(() => import("@/tools/http-status-code-lookup/ui"));
const SVGPatternGeneratorUI = dynamic(() => import("@/tools/svg-pattern-generator/ui"));
const AsciiArtGeneratorUI = dynamic(() => import("@/tools/ascii-art-generator/ui"));
const VoiceToTextNotepadUI = dynamic(() => import("@/tools/voice-to-text-notepad/ui"));
const TextToSpeechPreviewUI = dynamic(() => import("@/tools/text-to-speech-preview/ui"));
const URLSanitizerUI = dynamic(() => import("@/tools/url-sanitizer/ui"));
const Base32EncoderUI = dynamic(() => import("@/tools/base32-encoder/ui"));
const SocialMediaPostPreviewUI = dynamic(() => import("@/tools/social-media-post-preview/ui"));
const PixelArtGridUI = dynamic(() => import("@/tools/pixel-art-grid/ui"));
const CSVToJsonConverterUI = dynamic(() => import("@/tools/csv-to-json-converter/ui"));
const WorkingDaysCalculatorUI = dynamic(() => import("@/tools/working-days-calculator/ui"));
const TimelineCreatorUI = dynamic(() => import("@/tools/timeline-creator/ui"));
const PrimeNumberCheckerUI = dynamic(() => import("@/tools/prime-number-checker/ui"));
const YAMLToJSONConverterUI = dynamic(() => import("@/tools/yaml-to-json-converter/ui"));
const AudioVisualizerUI = dynamic(() => import("@/tools/audio-visualizer/ui"));
const VideoFrameExtractorUI = dynamic(() => import("@/tools/video-frame-extractor/ui"));
const RandomIDGeneratorUI = dynamic(() => import("@/tools/random-id-generator/ui"));
const CSSButtonGeneratorUI = dynamic(() => import("@/tools/css-button-generator/ui"));
const DiceRollerUI = dynamic(() => import("@/tools/dice-roller/ui"));

const TOOLS = [
  { config: wordCounterConfig, Component: WordCounterUI },
  { config: sentenceCaseConfig, Component: SentenceCaseConverterUI },
  { config: paragraphFormatterConfig, Component: ParagraphFormatterUI },
  { config: keywordDensityConfig, Component: KeywordDensityCheckerUI },
  { config: textReverserConfig, Component: TextReverserUI },
  { config: wordFrequencyConfig, Component: WordFrequencyCounterUI },
  { config: imageCompressorConfig, Component: ImageCompressorUI },
  { config: imageResizerConfig, Component: ImageResizerUI },
  { config: loremIpsumConfig, Component: LoremIpsumGeneratorUI },
  { config: markdownPreviewerConfig, Component: MarkdownPreviewerUI },
  { config: textToClipboardConfig, Component: TextToClipboardUI },
  { config: removeDuplicateLinesConfig, Component: RemoveDuplicateLinesUI },
  { config: findAndReplaceConfig, Component: FindAndReplaceUI },
  { config: textDiffCheckerConfig, Component: TextDiffCheckerUI },
  { config: bionicReadingConverterConfig, Component: BionicReadingConverterUI },
  { config: whitespaceRemoverConfig, Component: WhitespaceRemoverUI },
  { config: tableToMarkdownConfig, Component: TableToMarkdownUI },
  { config: anagramFinderConfig, Component: AnagramFinderUI },
  { config: palindromeCheckerConfig, Component: PalindromeCheckerUI },
  { config: textToSlugConverterConfig, Component: TextToSlugConverterUI },
  { config: randomNamePickerConfig, Component: RandomNamePickerUI },
  { config: zalgoTextGeneratorConfig, Component: ZalgoTextGeneratorUI },
  { config: natoPhoneticConverterConfig, Component: NATOPhoneticConverterUI },
  { config: leetspeakConverterConfig, Component: LeetspeakConverterUI },
  { config: upsideDownTextGeneratorConfig, Component: UpsideDownTextGeneratorUI },
  { config: listPrefixSuffixConfig, Component: ListPrefixSuffixUI },
  { config: morseCodeTranslatorConfig, Component: MorseCodeTranslatorUI },
  { config: base64ImageEncoderConfig, Component: Base64ImageEncoderUI },
  { config: faviconGeneratorConfig, Component: FaviconGeneratorUI },
  { config: imageToGrayscaleConfig, Component: ImageToGrayscaleUI },
  { config: exifRemoverConfig, Component: ExifRemoverUI },
  { config: ditheringFilterConfig, Component: DitheringFilterUI },
  { config: duotoneFilterConfig, Component: DuotoneFilterUI },
  { config: hexToRgbConverterConfig, Component: HexToRgbConverterUI },
  { config: colorPaletteGeneratorConfig, Component: ColorPaletteGeneratorUI },
  { config: cssGradientGeneratorConfig, Component: CSSGradientGeneratorUI },
  { config: cssBoxShadowGeneratorConfig, Component: CSSBoxShadowGeneratorUI },
  { config: colorFormatConverterConfig, Component: ColorFormatConverterUI },
  { config: cssGlassmorphismGeneratorConfig, Component: GlassmorphismGeneratorUI },
  { config: svgPathVisualizerConfig, Component: SVGPathVisualizerUI },
  { config: contrastCheckerConfig, Component: ContrastCheckerUI },
  { config: neumorphismGeneratorConfig, Component: NeumorphismGeneratorUI },
  { config: hslColorSliderConfig, Component: HSLColorSliderUI },
  { config: cssFilterTesterConfig, Component: CSSFilterTesterUI },
  { config: cssAnimationPreviewerConfig, Component: CSSAnimationPreviewerUI },
  { config: gradientTextGeneratorConfig, Component: GradientTextGeneratorUI },
  { config: colorPaletteContrastGridConfig, Component: ColorPaletteContrastGridUI },
  { config: colorBlindnessSimulatorConfig, Component: ColorBlindnessSimulatorUI },
  { config: randomHexColorGeneratorConfig, Component: RandomHexColorGeneratorUI },
  { config: cssMeshGradientGeneratorConfig, Component: CSSMeshGradientGeneratorUI },
  { config: cssCursorStylePreviewerConfig, Component: CSSCursorStylePreviewerUI },
  { config: cssClampGeneratorConfig, Component: CSSClampGeneratorUI },
  { config: hexToRgbaConverterConfig, Component: HexToRgbaConverterUI },
  { config: passwordGeneratorConfig, Component: PasswordGeneratorUI },
  { config: wifiPasswordGeneratorConfig, Component: WiFiPasswordGeneratorUI },
  { config: textEncryptDecryptConfig, Component: TextEncryptDecryptUI },
  { config: usernameGeneratorConfig, Component: UsernameGeneratorUI },
  { config: hashGeneratorConfig, Component: HashGeneratorUI },
  { config: passwordStrengthMeterConfig, Component: PasswordStrengthMeterUI },
  { config: aspectRatioCalculatorConfig, Component: AspectRatioCalculatorUI },
  { config: goldenRatioCalculatorConfig, Component: GoldenRatioCalculatorUI },
  { config: cssBlobGeneratorConfig, Component: CSSBlobGeneratorUI },
  { config: colorPaletteExtractorConfig, Component: ColorPaletteExtractorUI },
  { config: customScrollbarStylerConfig, Component: CustomScrollbarStylerUI },
  { config: cssKeyframeAnimatorConfig, Component: CSSKeyframeAnimatorUI },
  { config: patternNoiseGeneratorConfig, Component: PatternNoiseGeneratorUI },
  { config: glassmorphismLayerTesterConfig, Component: GlassmorphismLayerTesterUI },
  { config: aesEncryptorConfig, Component: AESEncryptorUI },
  { config: emailObfuscatorConfig, Component: EmailObfuscatorUI },
  { config: fileHashGeneratorConfig, Component: FileHashGeneratorUI },
  { config: bcryptHashVerifierConfig, Component: BcryptHashVerifierUI },
  { config: steganographyToolConfig, Component: SteganographyToolUI },
  { config: sriGeneratorConfig, Component: SRIGeneratorUI },
  { config: ipAddressMaskerConfig, Component: IPAddressMaskerUI },
  { config: checksumCalculatorConfig, Component: ChecksumCalculatorUI },
  { config: discountCalculatorConfig, Component: DiscountCalculatorUI },
  { config: percentageCalculatorConfig, Component: PercentageCalculatorUI },
  { config: ageCalculatorConfig, Component: AgeCalculatorUI },
  { config: bmiCalculatorConfig, Component: BmiCalculatorUI },
  { config: unixTimestampConverterConfig, Component: UnixTimestampConverterUI },
  { config: loanEmiCalculatorConfig, Component: LoanEmiCalculatorUI },
  { config: randomNumberGeneratorConfig, Component: RandomNumberGeneratorUI },
  { config: currencyFormatPreviewerConfig, Component: CurrencyFormatPreviewerUI },
  { config: timerStopwatchConfig, Component: TimerStopwatchUI },
  { config: percentageIncreaseDecreaseConfig, Component: PercentageIncreaseDecreaseUI },
  { config: jsonValidatorConfig, Component: JSONValidatorUI },
  { config: base64EncoderDecoderConfig, Component: Base64EncoderDecoderUI },
  { config: regexTesterConfig, Component: RegexTesterUI },
  { config: matrixCalculatorConfig, Component: MatrixCalculatorUI },
  { config: xmlToJsonConfig, Component: XMLToJsonUI },
  { config: jsonToCsvConfig, Component: JSONToCsvUI },
  { config: flowchartLogicMapperConfig, Component: FlowchartLogicMapperUI },
  { config: vennDiagramMakerConfig, Component: VennDiagramMakerUI },
  { config: heatmapGridConfig, Component: HeatmapGridUI },
  { config: wordCloudGeneratorConfig, Component: WordCloudGeneratorUI },
  { config: mindMapBuilderConfig, Component: MindMapBuilderUI },
  { config: barGraphGeneratorConfig, Component: BarGraphGeneratorUI },
  { config: pomodoroTimerConfig, Component: PomodoroTimerUI },
  { config: urlEncoderDecoderConfig, Component: URLEncoderDecoderUI },
  { config: pieChartMakerConfig, Component: PieChartMakerUI },
  { config: sqlFormatterConfig, Component: SQLFormatterUI },
  { config: jwtDebuggerConfig, Component: JWTDebuggerUI },
  { config: binaryHexDecimalConverterConfig, Component: BinaryHexDecimalConverterUI },
  { config: tipCalculatorConfig, Component: TipCalculatorUI },
  { config: standardDeviationCalculatorConfig, Component: StandardDeviationCalculatorUI },
  { config: romanNumeralConverterConfig, Component: RomanNumeralConverterUI },
  { config: fuelCostCalculatorConfig, Component: FuelCostCalculatorUI },
  { config: unitRatioCalculatorConfig, Component: UnitRatioCalculatorUI },
  { config: dateDifferenceCalculatorConfig, Component: DateDifferenceCalculatorUI },
  { config: timeDurationCalculatorConfig, Component: TimeDurationCalculatorUI },
  { config: temperatureConversionScientificConfig, Component: TemperatureConversionUI },
  { config: ohmsLawCalculatorConfig, Component: OhmsLawCalculatorUI },
  { config: cmToMeterConverterConfig, Component: CmToMeterUI },
  { config: squareMeterToSquareFootConverterConfig, Component: AreaConverterUI },
  { config: meterToKmConverterConfig, Component: MeterToKmUI },
  { config: inchToCmConverterConfig, Component: InchToCmConverterUI },
  { config: averageCalculatorConfig, Component: AverageCalculatorUI },
  { config: scientificCalculatorConfig, Component: ScientificCalculatorUI },
  { config: fractionCalculatorConfig, Component: FractionCalculatorUI },
  { config: exponentCalculatorConfig, Component: ExponentCalculatorUI },
  { config: squareRootCalculatorConfig, Component: SquareRootCalculatorUI },
  { config: simpleInterestCalculatorConfig, Component: SimpleInterestCalculatorUI },
  { config: compoundInterestCalculatorConfig, Component: CompoundInterestCalculatorUI },
  { config: mortgageCalculatorConfig, Component: MortgageCalculatorUI },
  { config: investmentReturnCalculatorConfig, Component: InvestmentReturnCalculatorUI },
  { config: profitMarginCalculatorConfig, Component: ProfitMarginCalculatorUI },
  { config: gstVatCalculatorConfig, Component: GSTVATCalculatorUI },
  { config: salaryCalculatorConfig, Component: SalaryCalculatorUI },
  { config: bmrCalculatorConfig, Component: BMRCalculatorUI },
  { config: idealWeightCalculatorConfig, Component: IdealWeightCalculatorUI },
  { config: bodyFatCalculatorConfig, Component: BodyFatCalculatorUI },
  { config: dailyCalorieCalculatorConfig, Component: DailyCalorieCalculatorUI },
  { config: powerConsumptionCalculatorConfig, Component: PowerConsumptionCalculatorUI },
  { config: cssFlexboxPlaygroundConfig, Component: CSSFlexboxPlaygroundUI },
  { config: qrCodeGeneratorConfig, Component: QRCodeGeneratorUI },
  { config: jsonFormatterConfig, Component: JSONFormatterUI },
  { config: readingTimeCalculatorConfig, Component: ReadingTimeCalculatorUI },
  { config: pxToRemConverterConfig, Component: PxToRemConverterUI },
  { config: habitTrackerConfig, Component: HabitTrackerUI },
  { config: decisionWheelConfig, Component: DecisionWheelUI },
  { config: timeZoneConverterConfig, Component: TimeZoneConverterUI },
  { config: htmlEntityEncoderConfig, Component: HTMLEntityEncoderUI },
  { config: mockDataGeneratorConfig, Component: MockDataGeneratorUI },
  { config: cssTriangleGeneratorConfig, Component: CSSTriangleGeneratorUI },
  { config: placeholderImageGeneratorConfig, Component: PlaceholderImageGeneratorUI },
  { config: cronExpressionGeneratorConfig, Component: CronExpressionGeneratorUI },
  { config: fontPairerConfig, Component: FontPairerUI },
  { config: userAgentParserConfig, Component: UserAgentParserUI },
  { config: screenResolutionCheckerConfig, Component: ScreenResolutionCheckerUI },
  { config: httpStatusCodeLookupConfig, Component: HttpStatusCodeLookupUI },
  { config: svgPatternGeneratorConfig, Component: SVGPatternGeneratorUI },
  { config: asciiArtGeneratorConfig, Component: AsciiArtGeneratorUI },
  { config: voiceToTextNotepadConfig, Component: VoiceToTextNotepadUI },
  { config: textToSpeechPreviewConfig, Component: TextToSpeechPreviewUI },
  { config: urlSanitizerConfig, Component: URLSanitizerUI },
  { config: base32EncoderConfig, Component: Base32EncoderUI },
  { config: socialMediaPostPreviewConfig, Component: SocialMediaPostPreviewUI },
  { config: pixelArtGridConfig, Component: PixelArtGridUI },
  { config: csvToJsonConverterConfig, Component: CSVToJsonConverterUI },
  { config: workingDaysCalculatorConfig, Component: WorkingDaysCalculatorUI },
  { config: timelineCreatorConfig, Component: TimelineCreatorUI },
  { config: primeNumberCheckerConfig, Component: PrimeNumberCheckerUI },
  { config: yamlToJsonConverterConfig, Component: YAMLToJSONConverterUI },
  { config: audioVisualizerConfig, Component: AudioVisualizerUI },
  { config: videoFrameExtractorConfig, Component: VideoFrameExtractorUI },
  { config: randomIDGeneratorConfig, Component: RandomIDGeneratorUI },
  { config: cssButtonGeneratorConfig, Component: CSSButtonGeneratorUI },
  { config: diceRollerConfig, Component: DiceRollerUI },
];


export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const popularTools = [
    "word-counter", "image-compressor", "password-generator", "bmi-calculator",
    "json-validator", "css-gradient-generator", "base64-encoder-decoder",
    "markdown-previewer", "color-palette-generator", "hex-to-rgb-converter",
    "percentage-calculator", "age-calculator", "lorem-ipsum-generator",
    "text-reverser", "image-resizer", "url-encoder-decoder",
    "timestamp-unix-converter", "random-number-generator", "discount-calculator",
    "html-entity-encoder", "mock-data-generator", "font-pairer", "screen-resolution-checker",
    "csv-to-json-converter", "timeline-creator", "audio-visualizer", "video-frame-extractor"
  ];
  
  return popularTools.flatMap((slug) => {
    const tool = tools.find((t) => t.slug === slug);
    return tool ? [{ tool: tool.category, subtool: slug }] : [];
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string; subtool: string }>;
}): Promise<Metadata> {
  const { tool: category, subtool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  const mappedCategory = tools.find((t) => t.slug === slug)?.category;
  if (!entry) {
    return {};
  }

  const seo = entry.config.seo as any;
  const canonicalCategory = mappedCategory || category;
  const canonicalUrl = `${siteConfig.url}/tools/${canonicalCategory}/${slug}`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      type: "website",
      url: canonicalUrl,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
    },
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string; subtool: string }>;
}) {
  const { tool: category, subtool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  const mappedCategory = tools.find((t) => t.slug === slug)?.category;
  if (!entry) {
    notFound();
  }
  const { config, Component } = entry;
  const canonicalCategory = mappedCategory || category;
  const canonicalUrl = `${siteConfig.url}/tools/${canonicalCategory}/${slug}`;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${config.name} Tool`,
    description: config.description,
    url: canonicalUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  const catObj = categories.find(c => c.slug === canonicalCategory);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout title={config.name} description={config.description} icon={config.icon} category={catObj}>
        <Component />
      </ToolLayout>
    </>
  );
}
