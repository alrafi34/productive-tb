import { siteConfig } from "@/config/site";

export const cloudCostCalculatorConfig = {
  slug: "cloud-cost-calculator",
  name: "Cloud Cost Calculator",
  description: "Estimate cloud infrastructure costs instantly across AWS, Google Cloud, Azure, DigitalOcean, Vercel, Railway, Fly.io, and more. Real-time pricing breakdowns with provider comparisons.",
  category: "computer-science",
  icon: "☁️",
  color: "#058554",
  featured: true,
  relatedTools: [
    "ai-token-cost-calculator",
    "bandwidth-calculator",
    "download-time-calculator",
    "latency-calculator",
    "data-transfer-calculator",
  ],
  seo: {
    title: "Cloud Cost Calculator — Free AWS, GCP & Azure Pricing Estimator | Productive Toolbox",
    description: "Estimate cloud infrastructure costs across AWS, GCP, Azure, DigitalOcean, and more. Compare providers, model compute, storage, and egress. Free, browser-based.",
    keywords: [
      "cloud cost calculator",
      "cloud pricing calculator",
      "aws pricing calculator",
      "gcp cost calculator",
      "azure pricing calculator",
      "cloud computing cost",
      "cloud migration cost calculator",
      "cloud cost estimator",
      "aws cloud pricing",
      "cloud services pricing",
      "cloud infrastructure cost",
      "server cost calculator",
      "hosting cost estimator",
      "cloud cost comparison",
      "digitalocean pricing calculator",
      "vercel cost calculator",
      "cloud egress cost calculator",
      "serverless cost calculator",
      "cloud budget calculator",
      "aws vs gcp cost comparison",
      "cloud cost optimization",
      "monthly cloud spend estimator",
      "cloud provider comparison tool",
    ],
    og: {
      title: "Cloud Cost Calculator — Free AWS, GCP & Azure Pricing Estimator",
      description: "Estimate cloud infrastructure costs across AWS, GCP, Azure, DigitalOcean, and more. Compare providers with real-time pricing breakdowns.",
      url: `${siteConfig.url}/tools/computer-science/cloud-cost-calculator`,
    },
    openGraph: {
      title: "Cloud Cost Calculator — Free AWS, GCP & Azure Pricing Estimator",
      description: "Estimate cloud infrastructure costs across AWS, GCP, Azure, DigitalOcean, and more. Compare providers with real-time pricing breakdowns.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/cloud-cost-calculator`,
    },
    howToSteps: [
      {
        name: "Select a Provider",
        text: "Choose your target cloud provider from the dropdown — AWS, Google Cloud, Azure, DigitalOcean, Vercel, Railway, Fly.io, Render, or Cloudflare. Pricing rates update automatically to that provider's public list prices. Switch providers at any time to compare without re-entering your configuration.",
      },
      {
        name: "Configure Compute",
        text: "Enter your server count, vCPU count, RAM in GB, and expected monthly runtime hours. Use 730 hours for always-on servers. For scheduled or dev workloads, enter actual expected runtime to avoid overestimating.",
      },
      {
        name: "Add Storage, Database, and Bandwidth",
        text: "Enter block storage GB attached to servers, object storage GB for files and backups, managed database tier if applicable, and expected monthly egress GB. Egress is outbound data — the volume your users download from your servers each month.",
      },
      {
        name: "Add Serverless and CDN (if applicable)",
        text: "If your architecture uses serverless functions, enter expected monthly invocations. For CDN, enter expected monthly request volume. Both are billed separately from compute and can be significant at scale.",
      },
      {
        name: "Read the Breakdown and Compare Providers",
        text: "The cost breakdown shows each line item separately. Switch providers to compare the same configuration — the breakdown updates instantly so you can identify which provider is cheapest for your specific workload mix.",
      },
    ],
    faq: [
      {
        q: "What is a cloud cost calculator?",
        a: "A cloud cost calculator is a free online tool that estimates monthly infrastructure spending across cloud providers based on your configuration including server count, CPU, RAM, storage, database, bandwidth, serverless invocations, and CDN requests. It lets you model costs before provisioning resources, compare providers side by side, and validate infrastructure budgets.",
      },
      {
        q: "How accurate are the estimates?",
        a: "Estimates use representative on-demand list prices and are accurate to within 20 to 30 percent for most standard configurations. Actual invoices vary based on reserved pricing, free-tier allowances, intra-region transfer costs, support plans, and negotiated enterprise discount agreements. Add a 20 to 30 percent buffer for planning purposes.",
      },
      {
        q: "What is data egress and why does it cost so much?",
        a: "Egress is data leaving the cloud provider's network to the internet or to another provider. Major providers charge $0.085 to $0.09 per GB for internet egress. For a video platform serving 50,000 users each downloading 400 MB per month, egress alone is 20 TB times $0.085, which equals $1,700 per month. Egress is the most commonly underestimated line item in cloud budgets.",
      },
      {
        q: "What is the difference between block storage and object storage?",
        a: "Block storage attaches directly to a server like an SSD and is used for operating systems and databases at $0.08 to $0.12 per GB per month. Object storage is accessed over HTTP, much cheaper at $0.02 to $0.023 per GB per month, and used for files, backups, media assets, and static content.",
      },
      {
        q: "Why is AWS often more expensive than DigitalOcean or Render?",
        a: "AWS on-demand rates are among the highest because you pay for global availability zones, compliance certifications, the breadth of services, and mature tooling. DigitalOcean and Render offer flat pricing that is 40 to 60 percent cheaper for equivalent compute at small to medium scale. At large scale with AWS reserved pricing the gap narrows significantly.",
      },
      {
        q: "What is a GCP cost calculator and how is it different from an AWS pricing calculator?",
        a: "A GCP cost calculator estimates Google Cloud Platform costs using GCP-specific rates for Compute Engine, Cloud Storage, BigQuery, and Cloud Functions. An AWS pricing calculator uses Amazon's rates for EC2, S3, RDS, and Lambda. The cost categories are similar but per-unit prices differ. This tool covers both providers in a single interface so you can switch and compare instantly.",
      },
      {
        q: "What is a cloud migration cost calculator?",
        a: "A cloud migration cost calculator estimates what your current infrastructure would cost if moved to a different cloud provider. You configure your existing setup and compare the monthly cost across providers to identify potential savings and justify or reject migration projects based on hard dollar figures.",
      },
      {
        q: "Does the calculator include free tier allowances?",
        a: "No. Free tier credits and allowances are excluded to give a realistic baseline for ongoing costs. AWS offers 750 hours per month of t2.micro for 12 months and GCP gives $300 in credits for 90 days. Subtract those from the estimate manually when planning first-year costs.",
      },
      {
        q: "How do reserved instances and committed-use discounts affect the estimate?",
        a: "Reserved instances and committed-use discounts reduce compute costs by 30 to 40 percent for 1-year commitments and up to 60 percent for 3-year commitments. This calculator uses on-demand rates. For always-on workloads running 12 or more months, apply a 30 to 40 percent reduction to the compute line item to model reserved pricing.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your configuration values including server counts, storage sizes, and any other inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};

export const toolConfig = cloudCostCalculatorConfig;
