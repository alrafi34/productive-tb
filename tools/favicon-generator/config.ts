export const toolConfig = {
  id: "favicon-generator",
  slug: "favicon-generator",
  name: "Favicon Generator",
  description: "Generate favicons in multiple sizes (16×16, 32×32, 48×48) from any image. Supports custom sizes, background colors, and instant preview.",
  category: "image",
  icon: "⭐",
  keywords: ["favicon generator", "favicon creator", "icon generator", "website icon", "favicon maker", "ico generator", "favicon resize"],
  seo: {
    faq: [
      { q: "What sizes should I generate for my favicon?", a: "At minimum, generate 16×16 and 32×32 for browser tabs and bookmarks. For comprehensive coverage, also include 48×48, 64×64, and 128×128. If you're building a PWA or want mobile support, add 192×192 and 512×512. Our tool makes it easy to generate all sizes at once." },
      { q: "Should I use a transparent or colored background?", a: "It depends on your design. Transparent backgrounds work well for simple logos and adapt to different browser themes. Colored backgrounds can provide better contrast and ensure your icon is always visible. Test both options to see what works best for your brand." },
      { q: "What's the difference between PNG and ICO formats?", a: "PNG is a modern, widely-supported format that's easier to work with and provides better quality. ICO is the traditional favicon format that can contain multiple sizes in one file. Modern browsers support PNG favicons, so PNG is generally recommended unless you need to support very old browsers." },
      { q: "How do I add the generated favicons to my website?", a: "Upload the generated PNG files to your website's root directory or an /images folder. Then copy the HTML code snippet provided by the tool and paste it into the <head> section of your HTML. The browser will automatically select the appropriate size for each context." },
    ],
    title: "Favicon Generator – Create 16×16, 32×32 and ICO Icons",
    description: "Turn any image into favicons in 16×16, 32×32 and custom sizes, as PNG or ICO, with a background color and live preview. Runs in your browser.",
    keywords: "favicon generator, favicon creator, icon generator, website favicon, favicon maker, ico generator, favicon resize, create favicon",
    openGraph: {
      title: "Free Favicon Generator – Create Website Icons Instantly",
      description: "Generate favicons in multiple sizes from any image. Supports custom backgrounds, padding, and instant preview. No upload required.",
    },
  },
};
