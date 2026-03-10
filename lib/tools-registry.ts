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
  'neumorphism-generator': neumorphismGeneratorConfig,
  'hsl-color-slider': hslColorSliderConfig,
  'css-filter-tester': cssFilterTesterConfig,
  'css-animation-previewer': cssAnimationPreviewerConfig,
  'gradient-text-generator': gradientTextGeneratorConfig,
  'color-palette-contrast-grid': colorPaletteContrastGridConfig,
  'color-blindness-simulator': colorBlindnessSimulatorConfig,
  'random-hex-color-generator': randomHexColorGeneratorConfig,
  'css-mesh-gradient-generator': cssMeshGradientGeneratorConfig,
};

export function getToolBySlug(slug: string) {
  return TOOLS_REGISTRY[slug as keyof typeof TOOLS_REGISTRY];
}
