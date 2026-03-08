// Quick test file for sentence-case-converter logic
// Run with: node --loader ts-node/esm tools/sentence-case-converter/test.ts

import { toUpperCase, toLowerCase, toTitleCase, toSentenceCase } from './logic';

const testText = "hello world. this is a TEST. how are YOU?";

console.log("=== Sentence Case Converter Tests ===\n");

console.log("Original:");
console.log(testText);
console.log();

console.log("UPPERCASE:");
console.log(toUpperCase(testText));
console.log("Expected: HELLO WORLD. THIS IS A TEST. HOW ARE YOU?");
console.log();

console.log("lowercase:");
console.log(toLowerCase(testText));
console.log("Expected: hello world. this is a test. how are you?");
console.log();

console.log("Title Case:");
console.log(toTitleCase(testText));
console.log("Expected: Hello World. This Is A Test. How Are You?");
console.log();

console.log("Sentence case:");
console.log(toSentenceCase(testText));
console.log("Expected: Hello world. This is a test. How are you?");
console.log();

// Edge cases
console.log("=== Edge Cases ===\n");

console.log("Empty string:");
console.log(`"${toSentenceCase("")}"`);
console.log();

console.log("Single word:");
console.log(toTitleCase("hello"));
console.log();

console.log("Multiple sentences:");
console.log(toSentenceCase("first sentence. second sentence! third sentence? fourth sentence."));
console.log();

console.log("All caps to sentence case:");
console.log(toSentenceCase("THIS IS ALL CAPS. ANOTHER SENTENCE HERE."));
console.log();

console.log("✅ All tests completed!");
