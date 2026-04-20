import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

/**
 * KS Design Studio - Google Indexing API Bridge
 * This script automates the submission of new routes to Google Search Console.
 * Required: service-account.json in the same directory.
 */

async function initiateIndexing() {
  const KEY_FILE = path.join(process.cwd(), 'service-account.json');
  
  if (!fs.existsSync(KEY_FILE)) {
    console.error('CRITICAL: service-account.json not found. Skipping Google Indexing submission.');
    console.log('Setup Guide:');
    console.log('1. Go to Google Cloud Console.');
    console.log('2. Enable Indexing API.');
    console.log('3. Create Service Account & Download JSON Key.');
    console.log('4. Place it as "service-account.json" in this directory.');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing('v3');
  const authClient = await auth.getClient();
  google.options({ auth: authClient });
  const locations = [
    ...[
      "Baner", "Balewadi", "Aundh", "Wakad", "Hinjewadi", "Pashan", "Bavdhan", "Kothrud", "Warje", "Sus",
      "Mahalunge", "Pirangut", "Mulshi", "Balewadi High Street", "Punawale", "Mamurdi", "Kivale", "Tathawade", "Ravet",
      "Bhukum", "Bhugaon", "Lifeline", "Chandni Chowk", "Ghunje", "Somatne",
      "Shivajinagar", "Deccan", "Model Colony", "Prabhat Road", "Erandwane", "Karve Nagar", "F.C. Road", "J.M. Road",
      "Sadashiv Peth", "Narayan Peth", "Shaniwar Peth", "Kasba Peth", "Swargate", "Mukund Nagar", "Gultekdi",
      "Kharadi", "Viman Nagar", "Wagholi", "Magarpatta", "Hadapsar", "Mundhwa", "Keshav Nagar", "Kalyani Nagar",
      "Koregaon Park", "Sopan Baug", "Amanora", "Fursungi", "Loni Kalbhor", "Uruli Kanchan", "Manjari", "Tukaram Nagar",
      "Kondhwa", "NIBM Road", "Undri", "Pisoli", "Bibwewadi", "Sahakar Nagar", "Dhankawadi", "Katraj", "Ambegaon",
      "Satara Road", "Market Yard", "Lulla Nagar", "Wanowrie", "Salunke Vihar",
      "Pimpri", "Chinchwad", "Akurdi", "Nigdi", "Ravet", "Moshi", "Bhosari", "Chakan", "Alandi", "Dighi", "Charholi",
      "Talawade", "Sangvi", "Dapodi", "Khadki", "Vishrantwadi"
    ].map(l => l.toLowerCase().replace(/\s+/g, '-'))
  ];

  const projectSlugs = [
    "lodha-belmondo", "kasturi-balmoral", "kalpataru-jade", "godrej-24", "vtp-earth",
    "shapoorji-sensorium", "megapolis", "kundan-spaces", "kolte-patil-life-republic",
    "kumar-megapolis", "anp-landmarks", "kohinoor-sapphire", "kekarav-bungalows"
  ];

  const blogSlugs = [
    "pune-luxury-hub", "mumbai-minimalism", "wakad-design-evolution", "bandra-bohemian",
    "ravet-punawale-trends", "pune-interior-cost-guide-2026", "material-intelligence-guide", "small-home-interior-pune"
  ];

  const BASE_URL = 'https://ksdesignstudio.in';

  const urlsToIndex = [
    `${BASE_URL}/`,
    `${BASE_URL}/#/portfolio`,
    `${BASE_URL}/#/laboratory`,
    `${BASE_URL}/#/knowledge`,
    `${BASE_URL}/#/contact`,
    ...locations.map(loc => `${BASE_URL}/#/interiors-in/${loc}`),
    ...locations.map(loc => `${BASE_URL}/#/luxury-design/${loc}`),
    ...projectSlugs.map(slug => `${BASE_URL}/#/interiors-at/${slug}`),
    ...blogSlugs.map(slug => `${BASE_URL}/#/knowledge/${slug}`)
  ];

  console.log(`Initiating Google Indexing for ${urlsToIndex.length} high-fidelity routes...`);

  for (const url of urlsToIndex) {
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`Successfully indexed: ${url} [Status: ${res.status}]`);
    } catch (err) {
      console.error(`Failed to index: ${url}`, err.message);
    }
  }
}

initiateIndexing();
