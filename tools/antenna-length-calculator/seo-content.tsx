import ToolFaq from "@/components/ToolFaq";
import { antennaLengthCalculatorConfig } from "./config";

export default function AntennaLengthCalculatorSEO() {
  const { howToSteps, faq } = antennaLengthCalculatorConfig.seo;
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Antenna Length Calculator
        </h2>
        <p className="mb-4">
          The Antenna Length Calculator is a comprehensive RF engineering tool for calculating optimal antenna dimensions based on operating frequency. It helps engineers, students, and radio enthusiasts design antennas for wireless communication, IoT devices, and RF applications.
        </p>
        <p>
          This calculator uses fundamental physics formulas to convert frequency into wavelength and antenna length, supporting various antenna types including quarter-wave, half-wave, dipole, and monopole configurations.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Support for Hz, kHz, MHz, GHz frequency units</li>
          <li>Multiple antenna types: Quarter-wave, Half-wave, Full-wave, Dipole, Monopole</li>
          <li>Velocity factor adjustment for different mediums</li>
          <li>Output in meters, centimeters, millimeters, inches, feet</li>
          <li>Real-time calculation with debounced input handling</li>
          <li>Common frequency presets (WiFi, IoT, GPS, Bluetooth)</li>
          <li>Step-by-step calculation breakdown</li>
          <li>Calculation history that persists between visits</li>
          <li>Export results to text file</li>
          <li>Copy results to clipboard</li>
          <li>Responsive design for all devices</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Calculation Formulas
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Wavelength Calculation</h3>
            <p className="font-mono text-sm mb-2">λ = (c × VF) / f</p>
            <p className="text-sm text-gray-600">
              Where c = 299,792,458 m/s (speed of light), VF = velocity factor, f = frequency in Hz
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Quarter-Wave Antenna</h3>
            <p className="font-mono text-sm mb-2">Length = λ / 4</p>
            <p className="text-sm text-gray-600">
              Most common for monopole antennas with ground plane
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Half-Wave Antenna</h3>
            <p className="font-mono text-sm mb-2">Length = λ / 2</p>
            <p className="text-sm text-gray-600">
              Standard for dipole antennas, most efficient radiation pattern
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Full-Wave Antenna</h3>
            <p className="font-mono text-sm mb-2">Length = λ</p>
            <p className="text-sm text-gray-600">
              Used for specific applications requiring full wavelength
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">IoT Device Design</h3>
            <p className="text-sm text-blue-800">
              Calculate antenna lengths for 433 MHz, 868 MHz, and 915 MHz ISM bands used in IoT applications.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">WiFi Antenna Design</h3>
            <p className="text-sm text-green-800">
              Design antennas for 2.4 GHz and 5 GHz WiFi bands for routers and access points.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Amateur Radio</h3>
            <p className="text-sm text-purple-800">
              Calculate dipole and monopole antenna lengths for various ham radio bands.
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">RF Prototyping</h3>
            <p className="text-sm text-orange-800">
              Quick antenna dimension calculations for RF circuit prototyping and testing.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: WiFi 2.4 GHz Quarter-Wave</h3>
            <p className="text-sm mb-2">
              <strong>Input:</strong> Frequency = 2.4 GHz, Type = Quarter Wave
            </p>
            <p className="text-sm mb-2">
              <strong>Output:</strong> Antenna Length = 3.12 cm (31.2 mm)
            </p>
            <p className="text-sm text-gray-600">
              Perfect for compact WiFi antenna design on PCBs.
            </p>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: 433 MHz IoT Monopole</h3>
            <p className="text-sm mb-2">
              <strong>Input:</strong> Frequency = 433 MHz, Type = Quarter Wave
            </p>
            <p className="text-sm mb-2">
              <strong>Output:</strong> Antenna Length = 17.3 cm
            </p>
            <p className="text-sm text-gray-600">
              Common for remote controls and IoT sensors.
            </p>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: FM Radio Dipole</h3>
            <p className="text-sm mb-2">
              <strong>Input:</strong> Frequency = 100 MHz, Type = Half Wave
            </p>
            <p className="text-sm mb-2">
              <strong>Output:</strong> Antenna Length = 1.50 meters
            </p>
            <p className="text-sm text-gray-600">
              Standard dipole antenna for FM broadcast reception.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Antenna Types
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Quarter-Wave (λ/4) Monopole</h3>
            <p className="text-sm text-gray-600 mb-2">
              A quarter-wave monopole antenna is one-quarter of the wavelength long and requires a ground plane to function properly. It's commonly used in mobile devices, vehicles, and base stations due to its compact size and omnidirectional radiation pattern.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Half-Wave (λ/2) Dipole</h3>
            <p className="text-sm text-gray-600 mb-2">
              A half-wave dipole is the most common antenna type, consisting of two quarter-wave elements. It provides excellent efficiency and a balanced radiation pattern. No ground plane is required, making it ideal for many applications.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Full-Wave (λ) Antenna</h3>
            <p className="text-sm text-gray-600 mb-2">
              Full-wave antennas are one complete wavelength long and offer specific radiation patterns useful for certain applications. They're less common but valuable for specialized RF designs.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Velocity Factor Explained
        </h2>
        <p className="mb-4">
          The velocity factor (VF) represents how fast electromagnetic waves travel through a medium compared to the speed of light in vacuum. Different materials affect wave propagation:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Air/Vacuum:</strong> VF = 1.0 (100% of light speed)</li>
          <li><strong>Polyethylene:</strong> VF = 0.66 (common in coaxial cables)</li>
          <li><strong>Foam Dielectric:</strong> VF = 0.80-0.85</li>
          <li><strong>Teflon:</strong> VF = 0.70</li>
          <li><strong>PCB FR-4:</strong> VF = 0.50-0.60</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          For most free-space antenna calculations, use VF = 1.0. Adjust for antennas on PCBs or in cables.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Using the Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Use appropriate frequency units to avoid input errors</li>
          <li>Select the correct antenna type for your application</li>
          <li>Adjust velocity factor when designing PCB antennas</li>
          <li>Save frequently used calculations to history</li>
          <li>Export results for documentation and manufacturing</li>
          <li>Use presets as starting points for common frequencies</li>
          <li>Remember that practical antennas may need slight tuning</li>
          <li>Consider impedance matching in your final design</li>
        </ul>
      </section>

      <ToolFaq items={faq} />

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Concepts
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li><strong>Impedance Matching:</strong> Antennas typically have 50Ω or 75Ω impedance</li>
          <li><strong>SWR (Standing Wave Ratio):</strong> Measure of antenna efficiency</li>
          <li><strong>Radiation Pattern:</strong> Directional characteristics of antenna</li>
          <li><strong>Gain:</strong> Antenna's ability to focus energy in specific directions</li>
          <li><strong>Bandwidth:</strong> Range of frequencies the antenna can effectively operate</li>
        </ul>
      </section>
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>How to Use the Antenna Length Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
