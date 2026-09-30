export const toolConfig = {
  slug: "steganography-tool",
  name: "Steganography Tool",
  description: "Hide secret messages inside images using LSB steganography in your browser",
  category: "security",
  icon: "🖼️",
  free: true,
  backend: false,
  seo: {
    title: "Image Steganography Tool – Hide Messages in Images",
    description: "Hide secret text inside an image and decode hidden messages, directly in your browser. Files are processed on your device and never uploaded.",
    keywords: [
      "steganography tool",
      "hide message in image",
      "image steganography",
      "lsb steganography",
      "secret message encoder",
      "hide text in picture",
      "steganography online",
      "image encoder decoder",
      "hidden message tool",
      "steganography free",
      "encode decode image",
      "secret image message",
      "steganography browser",
      "image cryptography",
      "hide data in image"
    ],
    openGraph: {
      title: "Image Steganography Tool – Hide Messages in Images",
      description: "Hide secret text inside an image and decode hidden messages, directly in your browser. Files are processed on your device and never uploaded.",
      type: "website",
      url: "/steganography-tool"
    },
    faq: [
      { q: "Are my images uploaded to a server?", a: "No. All image processing happens locally in your browser using the Canvas API. Your images and messages never leave your device." },
      { q: "Can the hidden message be detected?", a: "LSB steganography is visually undetectable. However, specialized steganalysis tools can detect the presence of hidden data through statistical analysis." },
      { q: "What image format should I use?", a: "PNG is strongly recommended as it's lossless. JPEG uses lossy compression which may corrupt the hidden message." },
      { q: "How much text can I hide?", a: "It depends on the image size: the tool stores one bit in each red, green and blue value, so a 1920 × 1080 image holds about 777,000 bytes, roughly 777,000 characters of plain English text. The tool shows the capacity of each image you load." },
      { q: "What if I forget the password?", a: "The message cannot be recovered without the correct password. Make sure to remember or securely store your password." },
      { q: "Can I hide files instead of text?", a: "This tool is designed for text messages only. For file hiding, you would need specialized steganography software." },
      { q: "Is this secure for sensitive data?", a: "While LSB steganography hides data well, it's not cryptographically secure. For highly sensitive data, combine with strong encryption." },
    ],
  },
  features: [
    "LSB steganography encoding/decoding",
    "Optional AES password protection",
    "Message capacity calculator",
    "Visual difference detector",
    "Binary visualization panel",
    "Multiple encoding strength levels",
    "100% client-side processing"
  ]
};
