import { siteConfig } from "@/config/site";

export const pwmDutyCycleCalculatorConfig = {
  name: "PWM Duty Cycle Calculator",
  description: "Calculate PWM duty cycle, frequency, period, ON/OFF time instantly. Essential for motor control, LED dimming, Arduino projects, and signal processing applications.",
  icon: "⚡",
  category: "electrical",
  slug: "pwm-duty-cycle-calculator",
  seo: {
    title: "PWM Duty Cycle Calculator – Frequency & ON Time",
    description: "Calculate PWM duty cycle, frequency, period and ON/OFF time in µs, ms or s, with the Arduino analogWrite value for LED dimming and motor control.",
    keywords: [
      "PWM calculator",
      "duty cycle calculator",
      "PWM frequency calculator",
      "PWM period calculator",
      "pulse width modulation calculator",
      "Arduino PWM calculator",
      "motor control PWM",
      "LED dimming calculator",
      "PWM signal calculator",
      "ON OFF time calculator",
      "PWM duty cycle formula",
      "electronics calculator",
      "embedded systems PWM",
      "microcontroller PWM",
      "PWM generator calculator"
    ],
    og: {
      title: "PWM Duty Cycle Calculator – Frequency & ON Time",
      description: "Calculate PWM duty cycle, frequency, period and ON/OFF time in µs, ms or s, with the Arduino analogWrite value for LED dimming and motor control.",
      url: `${siteConfig.url}/tools/electrical/pwm-duty-cycle-calculator`
    },
    howToSteps: [
      { name: "Choose the mode", text: "Select calculate duty cycle, calculate ON/OFF time, or calculate frequency and period." },
      { name: "Choose the time unit", text: "Select microseconds, milliseconds or seconds." },
      { name: "Enter what you know", text: "Type the ON and OFF times, or the duty cycle with the frequency or period." },
      { name: "Read the results", text: "See the duty cycle, frequency, period, ON and OFF times, or pick a preset." },
    ],
    faq: [
      { q: "How is duty cycle calculated?", a: "Duty cycle = ON time ÷ period × 100, where period = ON + OFF time and frequency = 1 ÷ period. 0.5 ms on and 1.5 ms off is a 2 ms period, 500 Hz and 25% duty." },
      { q: "How do I set a duty cycle on an Arduino?", a: "analogWrite(pin, value) takes 0–255, so value = duty ÷ 100 × 255: 25% is 64 and 50% is 128. On an Uno the PWM frequency is about 490 Hz on most pins and 980 Hz on pins 5 and 6." },
      { q: "What frequency should I use for LED dimming?", a: "At least a few hundred hertz to avoid visible flicker; 1 kHz or more also avoids banding on cameras." },
      { q: "What frequency should I use for motors?", a: "Many DC motor drivers use 20–25 kHz, above hearing, to avoid whine; lower frequencies work but may hum." },
      { q: "What is the average voltage?", a: "For a resistive load, the average is the supply voltage × duty cycle: 12 V at 25% averages 3 V." },
    ],
  }
};
