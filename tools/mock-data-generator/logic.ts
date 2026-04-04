// Data arrays for generation
const firstNames = [
  "John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava", "Alexander", "Isabella",
  "Benjamin", "Mia", "Lucas", "Charlotte", "Henry", "Amelia", "Sebastian", "Harper", "Jackson", "Evelyn",
  "David", "Abigail", "Matthew", "Emily", "Samuel", "Elizabeth", "Joseph", "Sofia", "Daniel", "Avery",
  "Christopher", "Ella", "Anthony", "Madison", "Mark", "Scarlett", "Andrew", "Victoria", "Joshua", "Aria",
  "Ryan", "Grace", "Noah", "Chloe", "Ethan", "Camila", "Nathan", "Penelope", "Caleb", "Riley"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
];

const domains = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com", "test.com", "mail.com",
  "email.com", "inbox.com", "webmail.com", "company.com", "business.org", "demo.net"
];

const streetNames = [
  "Main St", "Oak Ave", "Park Rd", "Elm St", "Washington Ave", "Maple Dr", "Cedar Ln", "Pine St",
  "First Ave", "Second St", "Third Ave", "Market St", "Church St", "Spring St", "Mill Rd",
  "Hill St", "Lake Dr", "River Rd", "Forest Ave", "Sunset Blvd", "Broadway", "Lincoln Ave"
];

const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego",
  "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco",
  "Indianapolis", "Seattle", "Denver", "Washington", "Boston", "Nashville", "Baltimore", "Louisville",
  "Portland", "Oklahoma City", "Milwaukee", "Las Vegas", "Albuquerque", "Tucson", "Fresno", "Sacramento"
];

const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain",
  "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Switzerland", "Austria", "Belgium"
];

const companies = [
  "TechCorp", "DataSoft", "CloudWorks", "InnovateLab", "DigitalFlow", "NextGen Solutions", "SmartSystems",
  "FutureTech", "CodeCraft", "WebWorks", "AppForge", "DevStudio", "TechHub", "ByteWorks", "PixelPerfect",
  "LogicLabs", "CyberCore", "NetSphere", "InfoTech", "SystemsPlus", "TechVision", "DataDrive"
];

const jobTitles = [
  "Software Engineer", "Product Manager", "Data Analyst", "UX Designer", "Marketing Manager",
  "Sales Representative", "Project Manager", "Business Analyst", "DevOps Engineer", "QA Tester",
  "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "UI Designer"
];

// Utility functions
export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDate(startYear: number = 1990, endYear: number = 2024): string {
  const year = randomNumber(startYear, endYear);
  const month = randomNumber(1, 12);
  const day = randomNumber(1, 28);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

// Data generation functions
export function generateName(): string {
  return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
}

export function generateFirstName(): string {
  return randomItem(firstNames);
}

export function generateLastName(): string {
  return randomItem(lastNames);
}

export function generateEmail(name?: string): string {
  if (name) {
    const cleanName = name.toLowerCase().replace(/\s+/g, '.');
    return `${cleanName}@${randomItem(domains)}`;
  }
  const firstName = randomItem(firstNames).toLowerCase();
  const lastName = randomItem(lastNames).toLowerCase();
  const separator = Math.random() > 0.5 ? '.' : '';
  const number = Math.random() > 0.7 ? randomNumber(1, 999) : '';
  return `${firstName}${separator}${lastName}${number}@${randomItem(domains)}`;
}

export function generateUsername(): string {
  const firstName = randomItem(firstNames).toLowerCase();
  const lastName = randomItem(lastNames).toLowerCase();
  const number = randomNumber(1, 999);
  const separators = ['_', '.', ''];
  const separator = randomItem(separators);
  
  const patterns = [
    `${firstName}${separator}${lastName}`,
    `${firstName}${separator}${lastName}${number}`,
    `${firstName}${number}`,
    `${lastName}${number}`
  ];
  
  return randomItem(patterns);
}

export function generatePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const length = randomNumber(8, 16);
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export function generatePhone(): string {
  const areaCode = randomNumber(200, 999);
  const exchange = randomNumber(200, 999);
  const number = randomNumber(1000, 9999);
  return `+1-${areaCode}-${exchange}-${number}`;
}

export function generateAddress(): string {
  const number = randomNumber(1, 9999);
  const street = randomItem(streetNames);
  return `${number} ${street}`;
}

export function generateCity(): string {
  return randomItem(cities);
}

export function generateCountry(): string {
  return randomItem(countries);
}

export function generateCompany(): string {
  return randomItem(companies);
}

export function generateJobTitle(): string {
  return randomItem(jobTitles);
}

export function generateDate(): string {
  return randomDate();
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function generateID(): string {
  return randomNumber(100000, 999999).toString();
}

// Field types and their generators
export const fieldTypes = {
  'name': { label: 'Full Name', generator: generateName, icon: '👤' },
  'firstName': { label: 'First Name', generator: generateFirstName, icon: '👤' },
  'lastName': { label: 'Last Name', generator: generateLastName, icon: '👤' },
  'email': { label: 'Email', generator: generateEmail, icon: '📧' },
  'username': { label: 'Username', generator: generateUsername, icon: '🔤' },
  'password': { label: 'Password', generator: generatePassword, icon: '🔒' },
  'phone': { label: 'Phone Number', generator: generatePhone, icon: '📞' },
  'address': { label: 'Address', generator: generateAddress, icon: '🏠' },
  'city': { label: 'City', generator: generateCity, icon: '🏙️' },
  'country': { label: 'Country', generator: generateCountry, icon: '🌍' },
  'company': { label: 'Company', generator: generateCompany, icon: '🏢' },
  'jobTitle': { label: 'Job Title', generator: generateJobTitle, icon: '💼' },
  'date': { label: 'Date', generator: generateDate, icon: '📅' },
  'uuid': { label: 'UUID', generator: generateUUID, icon: '🔑' },
  'id': { label: 'ID Number', generator: generateID, icon: '🆔' }
};

export type FieldType = keyof typeof fieldTypes;

export interface MockDataRecord {
  [key: string]: string;
}

// Generate multiple records
export function generateMockData(fields: FieldType[], count: number): MockDataRecord[] {
  const records: MockDataRecord[] = [];
  
  for (let i = 0; i < count; i++) {
    const record: MockDataRecord = {};
    
    fields.forEach(field => {
      const fieldConfig = fieldTypes[field];
      if (fieldConfig) {
        record[field] = fieldConfig.generator();
      }
    });
    
    records.push(record);
  }
  
  return records;
}

// Export functions
export function exportAsJSON(data: MockDataRecord[]): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mock-data-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportAsCSV(data: MockDataRecord[]): void {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        // Escape quotes and wrap in quotes if contains comma or quote
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mock-data-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportAsTSV(data: MockDataRecord[]): void {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const tsvContent = [
    headers.join('\t'),
    ...data.map(row => 
      headers.map(header => row[header] || '').join('\t')
    )
  ].join('\n');
  
  const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mock-data-${Date.now()}.tsv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
}

export function formatAsTable(data: MockDataRecord[]): string {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header] || ''));
  
  // Calculate column widths
  const colWidths = headers.map((header, i) => 
    Math.max(header.length, ...rows.map(row => row[i].length))
  );
  
  // Create table
  const headerRow = headers.map((header, i) => header.padEnd(colWidths[i])).join(' | ');
  const separator = colWidths.map(width => '-'.repeat(width)).join('-|-');
  const dataRows = rows.map(row => 
    row.map((cell, i) => cell.padEnd(colWidths[i])).join(' | ')
  );
  
  return [headerRow, separator, ...dataRows].join('\n');
}

export function formatAsJSON(data: MockDataRecord[]): string {
  return JSON.stringify(data, null, 2);
}

export function formatAsCSV(data: MockDataRecord[]): string {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  return [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
}