import React from 'react';
import ToolFaq from "@/components/ToolFaq";
import { colorBlindnessSimulatorConfig } from "./config";

export default function ColorBlindnessSimulatorSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = colorBlindnessSimulatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Color Vision Deficiency
        </h2>
        <p className="text-gray-700 mb-4">
          Color blindness, more accurately called color vision deficiency (CVD), affects about 8% of men and 0.5% of women of Northern European descent, and somewhat fewer in most other populations. It's not actually "blindness" but rather a reduced ability to distinguish between certain colors. Understanding these differences is crucial for creating inclusive designs that work for everyone.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Red-Green Color Blindness</h3>
            <p className="text-red-700 text-sm">
              The most common type, affecting about 8% of men of Northern European descent. Includes Protanopia, Protanomaly, Deuteranopia, and Deuteranomaly.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Blue-Yellow Color Blindness</h3>
            <p className="text-blue-700 text-sm">
              Less common, affecting both males and females equally. Includes Tritanopia and Tritanomaly.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Types of Color Vision Deficiency
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Protanopia (Red-Blind)</h3>
            <p className="text-gray-700 text-sm mb-2">
              Missing or non-functioning L-cones (long wavelength). Red appears very dark or black, and red-green discrimination is impossible.
            </p>
            <div className="text-xs text-gray-600">
              <strong>Prevalence:</strong> ~1% of males | <strong>Inheritance:</strong> X-linked recessive
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Deuteranopia (Green-Blind)</h3>
            <p className="text-gray-700 text-sm mb-2">
              Missing or non-functioning M-cones (medium wavelength). Most common severe form of color blindness.
            </p>
            <div className="text-xs text-gray-600">
              <strong>Prevalence:</strong> ~1% of males | <strong>Inheritance:</strong> X-linked recessive
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Tritanopia (Blue-Blind)</h3>
            <p className="text-gray-700 text-sm mb-2">
              Missing or non-functioning S-cones (short wavelength). Blue appears green, and yellow appears pink or red.
            </p>
            <div className="text-xs text-gray-600">
              <strong>Prevalence:</strong> ~0.003% of population | <strong>Inheritance:</strong> Autosomal dominant
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Anomalous Trichromacy</h3>
            <p className="text-gray-700 text-sm mb-2">
              Altered spectral sensitivity of cone cells. Protanomaly, Deuteranomaly, and Tritanomaly are milder forms where color discrimination is reduced but not absent.
            </p>
            <div className="text-xs text-gray-600">
              <strong>Prevalence:</strong> ~5% of males (Deuteranomaly most common)
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Monochromacy</h3>
            <p className="text-gray-700 text-sm mb-2">
              Complete absence of color vision. Achromatopsia (rod monochromacy) sees only in grayscale, while blue cone monochromacy retains some blue perception.
            </p>
            <div className="text-xs text-gray-600">
              <strong>Prevalence:</strong> ~0.003% of population | <strong>Inheritance:</strong> Autosomal recessive
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Color Blindness Simulator
        </h2>
        <div className="space-y-4">
          {howToSteps.map(({ name, text }, i) => (
            <div key={name} className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{i + 1}. {name}</h3>
              <p className="text-gray-700 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Design Guidelines for Color Accessibility
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Do's</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>✓ Use high contrast between text and background</li>
              <li>✓ Add patterns, textures, or shapes to distinguish elements</li>
              <li>✓ Include text labels for color-coded information</li>
              <li>✓ Test with multiple types of color blindness</li>
              <li>✓ Use colorblind-friendly palettes</li>
              <li>✓ Provide alternative ways to convey information</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Don'ts</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>✗ Rely solely on color to convey important information</li>
              <li>✗ Use red and green as the only differentiators</li>
              <li>✗ Assume everyone sees colors the same way</li>
              <li>✗ Use low contrast color combinations</li>
              <li>✗ Ignore accessibility guidelines</li>
              <li>✗ Use color alone for interactive states</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Technical Implementation of Color Simulation
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">SVG Color Matrix Filters</h3>
          <p className="text-purple-700 mb-4">
            Our simulator uses SVG feColorMatrix filters to accurately simulate different types of color vision deficiency. These filters apply mathematical transformations to RGB values based on research into how different cone cells respond to light.
          </p>
          
          <div className="bg-purple-100 p-4 rounded">
            <h4 className="font-medium mb-2">How It Works:</h4>
            <ol className="text-sm space-y-1">
              <li>1. <strong>Matrix Transformation:</strong> Each pixel's RGB values are multiplied by a transformation matrix</li>
              <li>2. <strong>Cone Response Simulation:</strong> Matrices are based on spectral sensitivity of L, M, and S cone cells</li>
              <li>3. <strong>Real-time Processing:</strong> SVG filters provide hardware-accelerated, real-time simulation</li>
              <li>4. <strong>Intensity Control:</strong> Linear interpolation between normal and simulated vision</li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Design Mistakes and Solutions
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-red-800 mb-1">Problem: Red/Green Status Indicators</h3>
            <p className="text-gray-700 text-sm mb-2">Using only red and green to show error/success states.</p>
            <p className="text-green-700 text-sm"><strong>Solution:</strong> Add icons, text labels, or use different shapes alongside colors.</p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-red-800 mb-1">Problem: Color-Only Data Visualization</h3>
            <p className="text-gray-700 text-sm mb-2">Charts and graphs that rely solely on color to distinguish data series.</p>
            <p className="text-green-700 text-sm"><strong>Solution:</strong> Use patterns, different line styles, or direct labeling.</p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-red-800 mb-1">Problem: Low Contrast Color Combinations</h3>
            <p className="text-gray-700 text-sm mb-2">Using colors that appear similar to colorblind users.</p>
            <p className="text-green-700 text-sm"><strong>Solution:</strong> Test contrast ratios and use high-contrast combinations.</p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-red-800 mb-1">Problem: Invisible Links or Buttons</h3>
            <p className="text-gray-700 text-sm mb-2">Interactive elements that blend into the background for colorblind users.</p>
            <p className="text-green-700 text-sm"><strong>Solution:</strong> Use underlines, borders, or sufficient contrast ratios.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Colorblind-Friendly Color Palettes
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Safe Color Combinations</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Blue and Orange</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-600 rounded"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Purple and Yellow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-black rounded"></div>
                <div className="w-4 h-4 bg-white border rounded"></div>
                <span>Black and White</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-800 rounded"></div>
                <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                <span>Dark Blue and Light Yellow</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Problematic Combinations</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Red and Green</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Blue and Purple</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                <span>Green and Brown</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                <span>Similar Gray Shades</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Testing and Validation
        </h2>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Comprehensive Testing Approach</h3>
          <p className="text-green-700 mb-4">
            Don't rely on simulation alone. Combine multiple testing methods for the most accurate results:
          </p>
          
          <ul className="space-y-2 text-sm text-green-700">
            <li>• <strong>Automated Tools:</strong> Use color blindness simulators and contrast checkers</li>
            <li>• <strong>User Testing:</strong> Get feedback from users with actual color vision deficiency</li>
            <li>• <strong>Multiple Simulations:</strong> Test with different types and severities of color blindness</li>
            <li>• <strong>Real Devices:</strong> Test on actual devices with different screen settings</li>
            <li>• <strong>Accessibility Audits:</strong> Include color vision testing in regular accessibility reviews</li>
          </ul>
        </div>
      </section>

      <ToolFaq items={faq} />

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Legal and Compliance Considerations
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Accessibility Standards</h3>
          <p className="text-yellow-700 mb-4">
            While there are no specific legal requirements for color blindness accommodation, general accessibility laws often apply:
          </p>
          
          <div className="space-y-2 text-sm text-yellow-700">
            <div><strong>WCAG Guidelines:</strong> Success Criterion 1.4.1 requires that color is not the only means of conveying information</div>
            <div><strong>Section 508:</strong> US federal agencies must ensure accessible technology</div>
            <div><strong>ADA Compliance:</strong> Public accommodations should be accessible to people with disabilities</div>
            <div><strong>EN 301 549:</strong> European accessibility standard for ICT products and services</div>
          </div>
        </div>
      </section>
    </div>
  );
}