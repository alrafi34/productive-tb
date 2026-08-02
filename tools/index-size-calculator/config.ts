import { siteConfig } from "@/config/site";

export const indexSizeCalculatorConfig = {
  slug: "index-size-calculator",
  name: "Index Size Calculator",
  description: "Estimate database index storage size for PostgreSQL, MySQL, SQL Server, Oracle, MariaDB, and SQLite. Compare index types, fill factor, and compression before deployment.",
  category: "data-analytics",
  icon: "💾",
  free: true,
  relatedTools: [
    "storage-requirement-calculator",
    "hadoop-storage-calculator",
    "data-partition-calculator",
    "cache-efficiency-calculator",
    "data-compression-ratio-calculator",
    "cluster-utilization-calculator",
  ],
  seo: {
    title: "Free Index Size Calculator – Estimate Database Index Storage Online",
    description: "Estimate database index size instantly for PostgreSQL, MySQL, SQL Server, Oracle, MariaDB, and SQLite. Calculate storage requirements, compare indexing strategies, and optimize database performance with this free online Index Size Calculator.",
    keywords: [
      "index size calculator",
      "database index calculator",
      "postgres index size",
      "mysql index size",
      "sql server index size",
      "estimate database storage",
      "database storage calculator",
      "btree index calculator",
      "database optimization tool",
      "free DBA calculator",
    ],
    openGraph: {
      title: "Free Index Size Calculator",
      description: "Instantly estimate database index storage size across PostgreSQL, MySQL, SQL Server, Oracle, MariaDB, and SQLite using this fast, browser-based calculator.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/index-size-calculator`,
    },
    og: {
      title: "Free Index Size Calculator",
      description: "Instantly estimate database index storage size across PostgreSQL, MySQL, SQL Server, Oracle, MariaDB, and SQLite using this fast, browser-based calculator.",
      url: `${siteConfig.url}/tools/data-analytics/index-size-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Database Engine",
        text: "Select PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, SQLite, or Custom.",
      },
      {
        name: "Choose an Index Type",
        text: "Select B-Tree, Hash, Composite, GIN, BRIN, or another type.",
      },
      {
        name: "Enter Rows & Column Sizes",
        text: "Type your row count, indexed column size, and primary key size in bytes.",
      },
      {
        name: "Adjust Fill Factor & Overhead",
        text: "Use the sliders to model page density and additional engine overhead.",
      },
      {
        name: "Set Page Size & Compression",
        text: "Choose your database's page size and an optional compression level.",
      },
      {
        name: "Read the Live Result",
        text: "Estimated index size, storage breakdown, and page count update instantly as you type.",
      },
      {
        name: "Export or Share",
        text: "Copy the report, download a CSV or JSON file, print it, or copy a shareable URL.",
      },
    ],
    faq: [
      {
        q: "What is an index size calculator?",
        a: "An index size calculator is a free browser-based tool that estimates the approximate storage size of a database index before you create it, based on row count, column sizes, index type, and database engine.",
      },
      {
        q: "How is index size calculated?",
        a: "Entry Size = Column Size + Primary Key Size + Pointer + Metadata, then Raw Index Size = Entry Size × Number of Rows. A PostgreSQL B-Tree index on 5 million rows with a 16-byte column and 8-byte primary key produces a raw index size of about 191 MB.",
      },
      {
        q: "Is this an exact measurement of my database's index size?",
        a: "No — this is an estimation tool, not a database profiler. Actual index size depends on your specific database engine version, page alignment, and configuration.",
      },
      {
        q: "Why is a BRIN index so much smaller than a B-Tree index?",
        a: "BRIN stores summary information per block range rather than an entry for every row, making it dramatically more compact for naturally-ordered data like timestamps.",
      },
      {
        q: "What does fill factor do to index size?",
        a: "A lower fill factor leaves more free space on each page for future updates, which increases the effective storage footprint.",
      },
      {
        q: "What's the difference between compression and fill factor?",
        a: "Compression reduces the actual bytes stored. Fill factor controls how densely those bytes are packed onto disk pages — they affect size in opposite directions.",
      },
      {
        q: "How does the Composite Index option work?",
        a: "When you select Composite, you can specify additional columns beyond the primary indexed column, each estimated using the same indexed column size and added to the per-row entry size.",
      },
      {
        q: "Is my schema information private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. No table names, column names, or schema details are ever transmitted to any server.",
      },
    ],
  },
};
