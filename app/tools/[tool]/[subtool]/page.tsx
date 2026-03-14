import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import { siteConfig } from "@/config/site";
import { tools, categories } from "@/config/tools";

/* Tool UIs use browser APIs (localStorage, document) — render on demand, not at build time */
export const dynamic = "force-dynamic";

import { toolConfig as wordCounterConfig } from "@/tools/word-counter/config";
import WordCounterUI from "@/tools/word-counter/ui";
import { toolConfig as sentenceCaseConfig } from "@/tools/sentence-case-converter/config";
import SentenceCaseConverterUI from "@/tools/sentence-case-converter/ui";
import { toolConfig as paragraphFormatterConfig } from "@/tools/paragraph-formatter/config";
import ParagraphFormatterUI from "@/tools/paragraph-formatter/ui";
import { toolConfig as keywordDensityConfig } from "@/tools/keyword-density-checker/config";
import KeywordDensityCheckerUI from "@/tools/keyword-density-checker/ui";
import { toolConfig as textReverserConfig } from "@/tools/text-reverser/config";
import TextReverserUI from "@/tools/text-reverser/ui";
import { toolConfig as wordFrequencyConfig } from "@/tools/word-frequency-counter/config";
import WordFrequencyCounterUI from "@/tools/word-frequency-counter/ui";
import { toolConfig as imageCompressorConfig } from "@/tools/image-compressor/config";
import ImageCompressorUI from "@/tools/image-compressor/ui";
import { toolConfig as imageResizerConfig } from "@/tools/image-resizer/config";
import ImageResizerUI from "@/tools/image-resizer/ui";
import { toolConfig as loremIpsumConfig } from "@/tools/lorem-ipsum-generator/config";
import LoremIpsumGeneratorUI from "@/tools/lorem-ipsum-generator/ui";
import { toolConfig as markdownPreviewerConfig } from "@/tools/markdown-previewer/config";
import MarkdownPreviewerUI from "@/tools/markdown-previewer/ui";
import { toolConfig as textToClipboardConfig } from "@/tools/text-to-clipboard/config";
import TextToClipboardUI from "@/tools/text-to-clipboard/ui";
import { removeDuplicateLinesConfig } from "@/tools/remove-duplicate-lines/config";
import RemoveDuplicateLinesUI from "@/tools/remove-duplicate-lines/ui";
import { findAndReplaceConfig } from "@/tools/find-and-replace/config";
import FindAndReplaceUI from "@/tools/find-and-replace/ui";
import { textDiffCheckerConfig } from "@/tools/text-diff-checker/config";
import TextDiffCheckerUI from "@/tools/text-diff-checker/ui";
import { bionicReadingConverterConfig } from "@/tools/bionic-reading-converter/config";
import BionicReadingConverterUI from "@/tools/bionic-reading-converter/ui";
import { whitespaceRemoverConfig } from "@/tools/whitespace-remover/config";
import WhitespaceRemoverUI from "@/tools/whitespace-remover/ui";
import { tableToMarkdownConfig } from "@/tools/table-to-markdown/config";
import TableToMarkdownUI from "@/tools/table-to-markdown/ui";
import { anagramFinderConfig } from "@/tools/anagram-finder/config";
import AnagramFinderUI from "@/tools/anagram-finder/ui";
import { palindromeCheckerConfig } from "@/tools/palindrome-checker/config";
import PalindromeCheckerUI from "@/tools/palindrome-checker/ui";
import { textToSlugConverterConfig } from "@/tools/text-to-slug-converter/config";
import TextToSlugConverterUI from "@/tools/text-to-slug-converter/ui";
import { randomNamePickerConfig } from "@/tools/random-name-picker/config";
import RandomNamePickerUI from "@/tools/random-name-picker/ui";
import { zalgoTextGeneratorConfig } from "@/tools/zalgo-text-generator/config";
import ZalgoTextGeneratorUI from "@/tools/zalgo-text-generator/ui";
import { natoPhoneticConverterConfig } from "@/tools/nato-phonetic-converter/config";
import NATOPhoneticConverterUI from "@/tools/nato-phonetic-converter/ui";
import { leetspeakConverterConfig } from "@/tools/leetspeak-converter/config";
import LeetspeakConverterUI from "@/tools/leetspeak-converter/ui";
import { toolConfig as upsideDownTextGeneratorConfig } from "@/tools/upside-down-text-generator/config";
import UpsideDownTextGeneratorUI from "@/tools/upside-down-text-generator/ui";
import { toolConfig as listPrefixSuffixConfig } from "@/tools/list-prefix-suffix/config";
import ListPrefixSuffixUI from "@/tools/list-prefix-suffix/ui";
import { toolConfig as morseCodeTranslatorConfig } from "@/tools/morse-code-translator/config";
import MorseCodeTranslatorUI from "@/tools/morse-code-translator/ui";
import { toolConfig as base64ImageEncoderConfig } from "@/tools/base64-image-encoder/config";
import Base64ImageEncoderUI from "@/tools/base64-image-encoder/ui";
import { toolConfig as faviconGeneratorConfig } from "@/tools/favicon-generator/config";
import FaviconGeneratorUI from "@/tools/favicon-generator/ui";
import { toolConfig as imageToGrayscaleConfig } from "@/tools/image-to-grayscale/config";
import ImageToGrayscaleUI from "@/tools/image-to-grayscale/ui";
import { toolConfig as exifRemoverConfig } from "@/tools/exif-remover/config";
import ExifRemoverUI from "@/tools/exif-remover/ui";
import { toolConfig as ditheringFilterConfig } from "@/tools/dithering-filter/config";
import DitheringFilterUI from "@/tools/dithering-filter/ui";
import { toolConfig as duotoneFilterConfig } from "@/tools/duotone-filter/config";
import DuotoneFilterUI from "@/tools/duotone-filter/ui";
import { toolConfig as hexToRgbConverterConfig } from "@/tools/hex-to-rgb-converter/config";
import HexToRgbConverterUI from "@/tools/hex-to-rgb-converter/ui";
import { toolConfig as colorPaletteGeneratorConfig } from "@/tools/color-palette-generator/config";
import ColorPaletteGeneratorUI from "@/tools/color-palette-generator/ui";
import { toolConfig as cssGradientGeneratorConfig } from "@/tools/css-gradient-generator/config";
import CSSGradientGeneratorUI from "@/tools/css-gradient-generator/ui";
import { toolConfig as cssBoxShadowGeneratorConfig } from "@/tools/css-box-shadow-generator/config";
import CSSBoxShadowGeneratorUI from "@/tools/css-box-shadow-generator/ui";
import { toolConfig as colorFormatConverterConfig } from "@/tools/color-format-converter/config";
import ColorFormatConverterUI from "@/tools/color-format-converter/ui";
import { toolConfig as cssGlassmorphismGeneratorConfig } from "@/tools/css-glassmorphism-generator/config";
import GlassmorphismGeneratorUI from "@/tools/css-glassmorphism-generator/ui";
import { toolConfig as svgPathVisualizerConfig } from "@/tools/svg-path-visualizer/config";
import SVGPathVisualizerUI from "@/tools/svg-path-visualizer/ui";
import { toolConfig as contrastCheckerConfig } from "@/tools/contrast-checker/config";
import ContrastCheckerUI from "@/tools/contrast-checker/ui";
import { toolConfig as neumorphismGeneratorConfig } from "@/tools/neumorphism-generator/config";
import NeumorphismGeneratorUI from "@/tools/neumorphism-generator/ui";
import { hslColorSliderConfig } from "@/tools/hsl-color-slider/config";
import HSLColorSliderUI from "@/tools/hsl-color-slider/ui";
import { cssFilterTesterConfig } from "@/tools/css-filter-tester/config";
import CSSFilterTesterUI from "@/tools/css-filter-tester/ui";
import { cssAnimationPreviewerConfig } from "@/tools/css-animation-previewer/config";
import CSSAnimationPreviewerUI from "@/tools/css-animation-previewer/ui";
import { gradientTextGeneratorConfig } from "@/tools/gradient-text-generator/config";
import GradientTextGeneratorUI from "@/tools/gradient-text-generator/ui";
import { colorPaletteContrastGridConfig } from "@/tools/color-palette-contrast-grid/config";
import ColorPaletteContrastGridUI from "@/tools/color-palette-contrast-grid/ui";
import { colorBlindnessSimulatorConfig } from "@/tools/color-blindness-simulator/config";
import ColorBlindnessSimulatorUI from "@/tools/color-blindness-simulator/ui";
import { randomHexColorGeneratorConfig } from "@/tools/random-hex-color-generator/config";
import RandomHexColorGeneratorUI from "@/tools/random-hex-color-generator/ui";
import { cssMeshGradientGeneratorConfig } from "@/tools/css-mesh-gradient-generator/config";
import CSSMeshGradientGeneratorUI from "@/tools/css-mesh-gradient-generator/ui";
import { cssCursorStylePreviewerConfig } from "@/tools/css-cursor-style-previewer/config";
import CSSCursorStylePreviewerUI from "@/tools/css-cursor-style-previewer/ui";
import { cssClampGeneratorConfig } from "@/tools/css-clamp-generator/config";
import CSSClampGeneratorUI from "@/tools/css-clamp-generator/ui";
import { hexToRgbaConverterConfig } from "@/tools/hex-to-rgba-converter/config";
import HexToRgbaConverterUI from "@/tools/hex-to-rgba-converter/ui";
import { passwordGeneratorConfig } from "@/tools/password-generator/config";
import PasswordGeneratorUI from "@/tools/password-generator/ui";
import { wifiPasswordGeneratorConfig } from "@/tools/wifi-password-generator/config";
import WiFiPasswordGeneratorUI from "@/tools/wifi-password-generator/ui";
import { textEncryptDecryptConfig } from "@/tools/text-encrypt-decrypt/config";
import TextEncryptDecryptUI from "@/tools/text-encrypt-decrypt/ui";
import { usernameGeneratorConfig } from "@/tools/username-generator/config";
import UsernameGeneratorUI from "@/tools/username-generator/ui";
import { hashGeneratorConfig } from "@/tools/hash-generator/config";
import HashGeneratorUI from "@/tools/hash-generator/ui";
import { passwordStrengthMeterConfig } from "@/tools/password-strength-meter/config";
import PasswordStrengthMeterUI from "@/tools/password-strength-meter/ui";
import { aspectRatioCalculatorConfig } from "@/tools/aspect-ratio-calculator/config";
import AspectRatioCalculatorUI from "@/tools/aspect-ratio-calculator/ui";
import { goldenRatioCalculatorConfig } from "@/tools/golden-ratio-calculator/config";
import GoldenRatioCalculatorUI from "@/tools/golden-ratio-calculator/ui";
import { cssBlobGeneratorConfig } from "@/tools/css-blob-generator/config";
import CSSBlobGeneratorUI from "@/tools/css-blob-generator/ui";
import { colorPaletteExtractorConfig } from "@/tools/color-palette-extractor/config";
import ColorPaletteExtractorUI from "@/tools/color-palette-extractor/ui";
import { customScrollbarStylerConfig } from "@/tools/custom-scrollbar-styler/config";
import CustomScrollbarStylerUI from "@/tools/custom-scrollbar-styler/ui";
import { cssKeyframeAnimatorConfig } from "@/tools/css-keyframe-animator/config";
import CSSKeyframeAnimatorUI from "@/tools/css-keyframe-animator/ui";
import { toolConfig as patternNoiseGeneratorConfig } from "@/tools/pattern-noise-generator/config";
import PatternNoiseGeneratorUI from "@/tools/pattern-noise-generator/ui";
import { toolConfig as glassmorphismLayerTesterConfig } from "@/tools/glassmorphism-layer-tester/config";
import GlassmorphismLayerTesterUI from "@/tools/glassmorphism-layer-tester/ui";
import { toolConfig as aesEncryptorConfig } from "@/tools/aes-encryptor/config";
import AESEncryptorUI from "@/tools/aes-encryptor/ui";
import { toolConfig as emailObfuscatorConfig } from "@/tools/email-obfuscator/config";
import EmailObfuscatorUI from "@/tools/email-obfuscator/ui";
import { toolConfig as fileHashGeneratorConfig } from "@/tools/file-hash-generator/config";
import FileHashGeneratorUI from "@/tools/file-hash-generator/ui";
import { toolConfig as bcryptHashVerifierConfig } from "@/tools/bcrypt-hash-verifier/config";
import BcryptHashVerifierUI from "@/tools/bcrypt-hash-verifier/ui";
import { toolConfig as steganographyToolConfig } from "@/tools/steganography-tool/config";
import SteganographyToolUI from "@/tools/steganography-tool/ui";
import { sriGeneratorConfig } from "@/tools/sri-generator/config";
import SRIGeneratorUI from "@/tools/sri-generator/ui";
import { toolConfig as ipAddressMaskerConfig } from "@/tools/ip-address-masker/config";
import IPAddressMaskerUI from "@/tools/ip-address-masker/ui";
import { toolConfig as checksumCalculatorConfig } from "@/tools/checksum-calculator/config";
import ChecksumCalculatorUI from "@/tools/checksum-calculator/ui";
import { toolConfig as discountCalculatorConfig } from "@/tools/discount-calculator/config";
import DiscountCalculatorUI from "@/tools/discount-calculator/ui";
import { toolConfig as percentageCalculatorConfig } from "@/tools/percentage-calculator/config";
import PercentageCalculatorUI from "@/tools/percentage-calculator/ui";
import { toolConfig as ageCalculatorConfig } from "@/tools/age-calculator/config";
import AgeCalculatorUI from "@/tools/age-calculator/ui";
import { toolConfig as bmiCalculatorConfig } from "@/tools/bmi-calculator/config";
import BmiCalculatorUI from "@/tools/bmi-calculator/ui";
import { toolConfig as unixTimestampConverterConfig } from "@/tools/timestamp-unix-converter/config";
import UnixTimestampConverterUI from "@/tools/timestamp-unix-converter/ui";
import { toolConfig as loanEmiCalculatorConfig } from "@/tools/loan-emi-calculator/config";
import LoanEmiCalculatorUI from "@/tools/loan-emi-calculator/ui";
import { toolConfig as randomNumberGeneratorConfig } from "@/tools/random-number-generator/config";
import RandomNumberGeneratorUI from "@/tools/random-number-generator/ui";
import { toolConfig as currencyFormatPreviewerConfig } from "@/tools/currency-format-previewer/config";
import CurrencyFormatPreviewerUI from "@/tools/currency-format-previewer/ui";
import { toolConfig as timerStopwatchConfig } from "@/tools/timer-stopwatch/config";
import TimerStopwatchUI from "@/tools/timer-stopwatch/ui";
import { toolConfig as percentageIncreaseDecreaseConfig } from "@/tools/percentage-increase-decrease-calculator/config";
import PercentageIncreaseDecreaseUI from "@/tools/percentage-increase-decrease-calculator/ui";
import { toolConfig as jsonValidatorConfig } from "@/tools/json-validator/config";
import JSONValidatorUI from "@/tools/json-validator/ui";
import { base64EncoderDecoderConfig } from "@/tools/base64-encoder-decoder/config";
import Base64EncoderDecoderUI from "@/tools/base64-encoder-decoder/ui";
import { regexTesterConfig } from "@/tools/regex-tester/config";
import RegexTesterUI from "@/tools/regex-tester/ui";
import { matrixCalculatorConfig } from "@/tools/matrix-calculator/config";
import MatrixCalculatorUI from "@/tools/matrix-calculator/ui";
import { toolConfig as xmlToJsonConfig } from "@/tools/xml-to-json/config";
import XMLToJsonUI from "@/tools/xml-to-json/ui";
import { toolConfig as jsonToCsvConfig } from "@/tools/json-to-csv/config";
import JSONToCsvUI from "@/tools/json-to-csv/ui";
import { toolConfig as flowchartLogicMapperConfig } from "@/tools/flowchart-logic-mapper/config";
import FlowchartLogicMapperUI from "@/tools/flowchart-logic-mapper/ui";
import { toolConfig as vennDiagramMakerConfig } from "@/tools/venn-diagram-maker/config";
import VennDiagramMakerUI from "@/tools/venn-diagram-maker/ui";
import { toolConfig as heatmapGridConfig } from "@/tools/heatmap-grid/config";
import HeatmapGridUI from "@/tools/heatmap-grid/ui";
import { toolConfig as wordCloudGeneratorConfig } from "@/tools/word-cloud-generator/config";
import WordCloudGeneratorUI from "@/tools/word-cloud-generator/ui";
import { toolConfig as mindMapBuilderConfig } from "@/tools/mind-map-builder/config";
import MindMapBuilderUI from "@/tools/mind-map-builder/ui";
import { toolConfig as barGraphGeneratorConfig } from "@/tools/bar-graph-generator/config";
import BarGraphGeneratorUI from "@/tools/bar-graph-generator/ui";
import { toolConfig as pomodoroTimerConfig } from "@/tools/pomodoro-timer/config";
import PomodoroTimerUI from "@/tools/pomodoro-timer/ui";
import { toolConfig as urlEncoderDecoderConfig } from "@/tools/url-encoder-decoder/config";
import URLEncoderDecoderUI from "@/tools/url-encoder-decoder/ui";
import { toolConfig as pieChartMakerConfig } from "@/tools/pie-chart-maker/config";
import PieChartMakerUI from "@/tools/pie-chart-maker/ui";
import { toolConfig as sqlFormatterConfig } from "@/tools/sql-formatter/config";
import SQLFormatterUI from "@/tools/sql-formatter/ui";
import { toolConfig as jwtDebuggerConfig } from "@/tools/jwt-debugger/config";
import JWTDebuggerUI from "@/tools/jwt-debugger/ui";
import { binaryHexDecimalConverterConfig } from "@/tools/binary-hex-decimal-converter/config";
import BinaryHexDecimalConverterUI from "@/tools/binary-hex-decimal-converter/ui";
import { tipCalculatorConfig } from "@/tools/tip-calculator/config";
import TipCalculatorUI from "@/tools/tip-calculator/ui";
import { standardDeviationCalculatorConfig } from "@/tools/standard-deviation-calculator/config";
import StandardDeviationCalculatorUI from "@/tools/standard-deviation-calculator/ui";
import { toolConfig as romanNumeralConverterConfig } from "@/tools/roman-numeral-converter/config";
import RomanNumeralConverterUI from "@/tools/roman-numeral-converter/ui";
import { toolConfig as fuelCostCalculatorConfig } from "@/tools/fuel-cost-calculator/config";
import FuelCostCalculatorUI from "@/tools/fuel-cost-calculator/ui";
import { toolConfig as unitRatioCalculatorConfig } from "@/tools/unit-ratio-calculator/config";
import UnitRatioCalculatorUI from "@/tools/unit-ratio-calculator/ui";
import { toolConfig as dateDifferenceCalculatorConfig } from "@/tools/date-difference-calculator/config";
import DateDifferenceCalculatorUI from "@/tools/date-difference-calculator/ui";
import { toolConfig as timeDurationCalculatorConfig } from "@/tools/time-duration-calculator/config";
import TimeDurationCalculatorUI from "@/tools/time-duration-calculator/ui";
import { toolConfig as temperatureConversionScientificConfig } from "@/tools/temperature-conversion-scientific/config";
import TemperatureConversionUI from "@/tools/temperature-conversion-scientific/ui";
import { toolConfig as ohmsLawCalculatorConfig } from "@/tools/ohms-law-calculator/config";
import OhmsLawCalculatorUI from "@/tools/ohms-law-calculator/ui";
import { toolConfig as cmToMeterConverterConfig } from "@/tools/centimeter-to-meter-converter/config";
import CmToMeterUI from "@/tools/centimeter-to-meter-converter/ui";
import { toolConfig as squareMeterToSquareFootConverterConfig } from "@/tools/square-meter-to-square-foot-converter/config";
import AreaConverterUI from "@/tools/square-meter-to-square-foot-converter/ui";
import { toolConfig as meterToKmConverterConfig } from "@/tools/meter-to-km-converter/config";
import MeterToKmUI from "@/tools/meter-to-km-converter/ui";
import { toolConfig as inchToCmConverterConfig } from "@/tools/inch-to-cm-converter/config";
import InchToCmConverterUI from "@/tools/inch-to-cm-converter/ui";
import { averageCalculatorConfig } from "@/tools/average-calculator/config";
import AverageCalculatorUI from "@/tools/average-calculator/ui";
import { scientificCalculatorConfig } from "@/tools/scientific-calculator/config";
import ScientificCalculatorUI from "@/tools/scientific-calculator/ui";
import { toolConfig as squareRootCalculatorConfig } from "@/tools/square-root-calculator/config";
import SquareRootCalculatorUI from "@/tools/square-root-calculator/ui";
import { fractionCalculatorConfig } from "@/tools/fraction-calculator/config";
import FractionCalculatorUI from "@/tools/fraction-calculator/ui";
import { toolConfig as exponentCalculatorConfig } from "@/tools/exponent-calculator/config";
import ExponentCalculatorUI from "@/tools/exponent-calculator/ui";
import { toolConfig as simpleInterestCalculatorConfig } from "@/tools/simple-interest-calculator/config";
import SimpleInterestCalculatorUI from "@/tools/simple-interest-calculator/ui";
import { toolConfig as compoundInterestCalculatorConfig } from "@/tools/compound-interest-calculator/config";
import CompoundInterestCalculatorUI from "@/tools/compound-interest-calculator/ui";
import { mortgageCalculatorConfig } from "@/tools/mortgage-calculator/config";
import MortgageCalculatorUI from "@/tools/mortgage-calculator/ui";
import { toolConfig as investmentReturnCalculatorConfig } from "@/tools/investment-return-calculator/config";
import InvestmentReturnCalculatorUI from "@/tools/investment-return-calculator/ui";
import { toolConfig as profitMarginCalculatorConfig } from "@/tools/profit-margin-calculator/config";
import ProfitMarginCalculatorUI from "@/tools/profit-margin-calculator/ui";
import { toolConfig as gstVatCalculatorConfig } from "@/tools/gst-vat-calculator/config";
import GSTVATCalculatorUI from "@/tools/gst-vat-calculator/ui";
import { toolConfig as salaryCalculatorConfig } from "@/tools/salary-calculator/config";
import SalaryCalculatorUI from "@/tools/salary-calculator/ui";
import { toolConfig as bmrCalculatorConfig } from "@/tools/bmr-calculator/config";
import BMRCalculatorUI from "@/tools/bmr-calculator/ui";
import { toolConfig as idealWeightCalculatorConfig } from "@/tools/ideal-weight-calculator/config";
import IdealWeightCalculatorUI from "@/tools/ideal-weight-calculator/ui";
import { toolConfig as bodyFatCalculatorConfig } from "@/tools/body-fat-calculator/config";
import BodyFatCalculatorUI from "@/tools/body-fat-calculator/ui";
import { toolConfig as dailyCalorieCalculatorConfig } from "@/tools/daily-calorie-calculator/config";
import DailyCalorieCalculatorUI from "@/tools/daily-calorie-calculator/ui";
import { powerConsumptionCalculatorConfig } from "@/tools/power-consumption-calculator/config";
import PowerConsumptionCalculatorUI from "@/tools/power-consumption-calculator/ui";

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
];

/* generateStaticParams intentionally removed — see dynamic export above */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string; subtool: string }>;
}): Promise<Metadata> {
  const { tool: category, subtool: slug } = await params;
  const entry = TOOLS.find(t => t.config.slug === slug);
  if (!entry) return {};

  const seo = entry.config.seo as any;
  const canonicalUrl = `${siteConfig.url}/tools/${category}/${slug}`;
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
  if (!entry) notFound();
  const { config, Component } = entry;

  const canonicalUrl = `${siteConfig.url}/tools/${category}/${slug}`;
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

  const catObj = categories.find(c => c.slug === category);

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
