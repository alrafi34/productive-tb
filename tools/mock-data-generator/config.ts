export const toolConfig = {
  slug: "mock-data-generator",
  name: "Mock Data Generator",
  description: "Generate fake names, emails, phone numbers, addresses, and dates for testing and prototyping.",
  category: "developer",
  icon: "🎭",
  free: true,
  backend: false,
  seo: {
    title: "Mock Data Generator – Fake Names, Emails & Test Data",
    description: "Generate fake test data for development: names, emails, phone numbers and addresses, as JSON or CSV datasets, directly in your browser.",
    keywords: [
      "mock data generator",
      "fake data generator", 
      "test data generator",
      "generate fake names and emails",
      "developer mock dataset tool",
      "fake user data",
      "dummy data generator",
      "sample data creator",
      "test data creation",
      "mock api data",
      "fake json data",
      "csv test data",
      "prototype data generator",
      "development test data"
    ],
    openGraph: {
      title: "Mock Data Generator – Fake Names, Emails & Test Data",
      description: "Generate fake test data for development: names, emails, phone numbers and addresses, as JSON or CSV datasets, directly in your browser.",
      type: "website",
      url: "/tools/developer/mock-data-generator"
    },
    faq: [
      { q: "What is mock data used for?", a: "Filling databases, forms and user interfaces with realistic-looking records while you build and test software, so you do not have to use real customer data." },
      { q: "Which fields can I generate?", a: "Full, first and last names, email, username, password, phone number, address, city, country, company, job title, date, UUID and ID number. Pick any combination of fields." },
      { q: "How many records can I create?", a: "Between 1 and 10,000 at a time. View them as a table or export them as JSON or CSV." },
      { q: "Is the generated data real?", a: "No. Names, emails and addresses are assembled from random parts and do not belong to real people, although by chance a value can match a real one. Do not use the generated passwords for real accounts." },
      { q: "Can I import the CSV into a spreadsheet or database?", a: "Yes. The CSV has one header row with the field names, so it opens directly in Excel or Google Sheets and can be loaded into most databases with their CSV import." },
    ],
  },
  features: [
    "Generate up to 10,000 records instantly",
    "Multiple data types: names, emails, phones, addresses, dates",
    "Export as JSON, CSV, or TSV formats",
    "Real-time data generation",
    "Copy to clipboard functionality",
    "Customizable field selection",
    "Locale-specific data generation",
    "Batch generation with preview",
    "Mobile responsive interface",
    "Private generation"
  ]
};