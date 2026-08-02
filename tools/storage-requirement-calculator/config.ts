import { siteConfig } from "@/config/site";

export const storageRequirementCalculatorConfig = {
  slug: "storage-requirement-calculator",
  name: "Storage Requirement Calculator",
  description: "Estimate storage needs for files, backups, CCTV recording, databases, and cloud storage. Get automatic unit conversion, compression and RAID modeling, backup planning, cost estimation, and disk recommendations. Free browser-based tool.",
  category: "data-analytics",
  icon: "💾",
  free: true,
  relatedTools: [
    "data-transfer-cost-calculator",
    "cloud-cost-calculator",
    "download-time-calculator",
    "session-duration-calculator",
    "page-speed-score-calculator",
    "click-heatmap-density-calculator",
  ],
  seo: {
    title: "Storage Requirement Calculator — Free Disk Space, Backup & Cloud Storage Tool | Productive Toolbox",
    description: "Calculate storage requirements for files, backups, databases, cloud storage, CCTV, websites, media libraries, and servers. Estimate disk space, storage growth, costs, and recommended drive sizes instantly using our free online Storage Requirement Calculator.",
    keywords: [
      "storage requirement calculator",
      "storage calculator",
      "disk space calculator",
      "hard drive calculator",
      "ssd calculator",
      "cloud storage calculator",
      "backup storage calculator",
      "file storage calculator",
      "server storage calculator",
      "database storage calculator",
      "cctv storage calculator",
      "nas storage calculator",
      "storage planning tool",
      "disk capacity calculator",
      "online storage calculator",
      "raid storage calculator",
      "video storage calculator",
      "storage growth calculator",
      "backup retention calculator",
      "free storage calculator",
    ],
    openGraph: {
      title: "Storage Requirement Calculator — Free Disk Space, Backup & Cloud Storage Tool",
      description: "Estimate storage needs for files, backups, CCTV recording, databases, and cloud storage with automatic unit conversion, RAID modeling, cost estimation, and disk recommendations. Free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/storage-requirement-calculator`,
    },
    og: {
      title: "Storage Requirement Calculator — Free Disk Space, Backup & Cloud Storage Tool",
      description: "Estimate storage needs for files, backups, CCTV recording, databases, and cloud storage with automatic unit conversion, RAID modeling, cost estimation, and disk recommendations. Free and browser-based.",
      url: `${siteConfig.url}/tools/data-analytics/storage-requirement-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Calculation Mode",
        text: "Select File Storage, Backup Storage, or Video / CCTV Storage depending on what you're planning capacity for.",
      },
      {
        name: "Enter Your Storage Details",
        text: "Type your file size and count, daily backup size and retention, or video bitrate and recording schedule.",
      },
      {
        name: "Adjust Growth, Compression, and Redundancy",
        text: "Set annual growth, compression ratio, backup copies, RAID redundancy, and a safety margin to model real-world overhead.",
      },
      {
        name: "Review the Live Results",
        text: "See the final required storage, a breakdown donut chart, a 5-year growth forecast, and step-by-step calculation math update instantly.",
      },
      {
        name: "Get Recommendations and Export",
        text: "Check the recommended disk size and cloud plan, then copy, print, or export the report as CSV or JSON.",
      },
    ],
    faq: [
      {
        q: "What is a Storage Requirement Calculator?",
        a: "A Storage Requirement Calculator is a free browser-based tool that estimates how much digital storage you need for files, backups, CCTV recordings, databases, websites, or cloud storage, accounting for compression, backup copies, RAID redundancy, growth, and a safety margin.",
      },
      {
        q: "How is total file storage calculated?",
        a: "Total Storage = Average File Size × Number of Files. From there, the calculator applies growth projection, compression, backup copies, RAID overhead, and a safety margin in sequence to arrive at the final required storage.",
      },
      {
        q: "How does the calculator handle unit conversion?",
        a: "All storage units use the binary standard: 1024 Bytes = 1 KB, 1024 KB = 1 MB, 1024 MB = 1 GB, and 1024 GB = 1 TB. Results are automatically formatted in the most readable unit, from Bytes up to Exabytes.",
      },
      {
        q: "How is CCTV storage calculated?",
        a: "CCTV storage uses Required Storage = (Bitrate in Mbps ÷ 8) × Seconds per Day × Recording Days × Number of Cameras, then applies your safety margin. For example, an 8 Mbps camera recording 24 hours a day for 30 days requires roughly 2.4 TB per camera.",
      },
      {
        q: "What do the RAID redundancy options mean?",
        a: "RAID 1 and RAID 10 mirror data, roughly doubling required capacity. RAID 5 adds a single parity drive (about 33% overhead on a typical 4-drive array), and RAID 6 adds dual parity (about 50% overhead). These are typical estimates — actual overhead depends on your specific array size.",
      },
      {
        q: "What is a safety margin and why does it matter?",
        a: "A safety margin adds a buffer percentage on top of your calculated storage need to account for unexpected growth, temporary files, and operating system overhead — most IT professionals recommend at least a 15-20% margin when purchasing storage hardware.",
      },
      {
        q: "How does the tool recommend a disk size?",
        a: "The calculator compares your final required storage against common capacity tiers and thresholds — recommending an External HDD above 1 TB, a NAS above 4 TB, and Enterprise Storage above 20 TB, matching typical infrastructure planning guidance.",
      },
      {
        q: "How is estimated cost calculated?",
        a: "Estimated Cost = Final Required Storage (in GB) × Your Entered Cost per GB. This gives a rough monthly or one-time cost estimate depending on how you're pricing your storage (cloud plan, drive purchase, etc.).",
      },
      {
        q: "Can I use this for cloud storage planning?",
        a: "Yes. Select File Storage or Backup Storage mode depending on your data pattern, enter your expected cost per GB from your cloud provider's pricing page, and the calculator will suggest an appropriate cloud storage plan tier.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your storage figures are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
