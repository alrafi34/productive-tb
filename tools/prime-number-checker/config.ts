export const toolConfig = {
  slug: "prime-number-checker",
  name: "Prime Number Checker",
  description: "Check if any number is prime and find all prime numbers up to N using the Sieve of Eratosthenes.",
  category: "math",
  icon: "🔢",
  free: true,
  backend: false,
  seo: {
    title: "Prime Number Checker – Check Prime Numbers Instantly",
    description: "Check whether a number is prime and list all primes up to N with the Sieve of Eratosthenes, with an interactive visualization.",
    keywords: [
      "prime number checker",
      "is this number prime",
      "prime numbers generator",
      "sieve of eratosthenes tool",
      "find primes up to n",
      "prime number calculator",
      "math tool",
      "number theory"
    ],
    openGraph: {
      title: "Prime Number Checker – Check Prime Numbers Instantly",
      description: "Check whether a number is prime and list all primes up to N with the Sieve of Eratosthenes, with an interactive visualization.",
      type: "website",
      url: "/tools/prime-number-checker"
    },
    faq: [
      { q: "What is a prime number?", a: "A whole number greater than 1 whose only divisors are 1 and itself: 2, 3, 5, 7, 11, 13 and so on. 1 is not prime, and 2 is the only even prime." },
      { q: "How do you check if a number is prime?", a: "Try dividing it by every whole number from 2 up to its square root. If none divides evenly, it is prime. For 97, √97 ≈ 9.8, and none of 2, 3, 5 or 7 divides it, so 97 is prime." },
      { q: "What is the Sieve of Eratosthenes?", a: "A method for listing every prime up to N: write out 2 to N, then repeatedly take the next unmarked number and cross out all its multiples. The numbers left unmarked are the primes. The tool animates this for small limits." },
      { q: "How many primes are there below 100?", a: "25: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89 and 97. There are 168 primes below 1,000." },
      { q: "What if the number is not prime?", a: "The checker lists the numbers it is divisible by besides 1 and itself, for example 91 is divisible by 7 and 13. Any even number above 2 is divisible by 2." },
    ],
  },
  features: [
    "Instant prime number checking for any number",
    "Generate all prime numbers up to N using Sieve of Eratosthenes",
    "Interactive visualization of the sieve algorithm",
    "Educational explanations for composite numbers",
    "Copy results and export prime lists",
    "Optimized for performance up to large numbers"
  ]
};