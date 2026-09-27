import { siteConfig } from "@/config/site";

export const logicGateCalculatorConfig = {
  name: "Logic Gate Calculator",
  description: "Evaluate digital logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) with instant results, interactive truth tables, and real-time output visualization.",
  icon: "⚡",
  category: "electrical",
  slug: "logic-gate-calculator",
  seo: {
    title: "Logic Gate Calculator – AND, OR, XOR Truth Tables",
    description: "Evaluate AND, OR, NOT, NAND, NOR, XOR and XNOR gates from your inputs and see the full truth table, with an explanation of each result.",
    keywords: [
      "logic gate calculator",
      "digital logic calculator",
      "AND gate calculator",
      "OR gate calculator",
      "XOR gate calculator",
      "NAND gate calculator",
      "NOR gate calculator",
      "XNOR gate calculator",
      "NOT gate calculator",
      "truth table generator",
      "boolean logic calculator",
      "digital electronics calculator",
      "logic circuit simulator",
      "binary logic calculator",
      "gate logic evaluator"
    ],
    og: {
      title: "Logic Gate Calculator – AND, OR, XOR Truth Tables",
      description: "Evaluate AND, OR, NOT, NAND, NOR, XOR and XNOR gates from your inputs and see the full truth table, with an explanation of each result.",
      url: `${siteConfig.url}/tools/electrical/logic-gate-calculator`
    },
    howToSteps: [
      { name: "Choose the gate", text: "Select AND, OR, NOT, NAND, NOR, XOR or XNOR." },
      { name: "Set the inputs", text: "Toggle each input between 0 and 1. AND, OR, NAND and NOR accept more than two inputs; NOT takes one." },
      { name: "Read the output", text: "See the output and a one-line explanation of why." },
      { name: "Check the truth table", text: "Review every input combination and its output, and export the table as CSV or text." },
    ],
    faq: [
      { q: "What is the difference between AND and NAND?", a: "AND outputs 1 only when all inputs are 1. NAND is its inverse: it outputs 0 only when all inputs are 1, and 1 otherwise." },
      { q: "What is an XOR gate used for?", a: "XOR outputs 1 when its two inputs differ. It gives the sum bit in a half adder, checks parity, compares bits and flips a bit when XORed with 1." },
      { q: "Why are NAND and NOR universal gates?", a: "Any other gate can be built from NAND gates alone, or from NOR gates alone. For example, a NAND with its inputs tied together is a NOT gate." },
      { q: "How do I read a truth table?", a: "Each row is one combination of inputs and the output it produces. n inputs give 2ⁿ rows: 4 for two inputs, 8 for three." },
      { q: "What voltages represent 0 and 1?", a: "It depends on the logic family. 5 V TTL reads below 0.8 V as 0 and above 2 V as 1. 3.3 V CMOS reads below about 0.8 V as 0 and above about 2 V as 1. Use a level shifter between families." },
    ],
  }
};
