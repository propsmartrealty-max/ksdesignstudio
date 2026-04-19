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
    "baner", "balewadi", "aundh", "wakad", "hinjewadi", "pashan", "bavdhan", "kothrud", "warje", "sus",
    "shivajinagar", "deccan", "model-colony", "sadashiv-peth", "erandwane",
    "kharadi", "viman-nagar", "wagholi", "magarpatta", "hadapsar", "mundhwa", "keshav-nagar",
    "kondhwa", "nibm-road", "undri", "pisoli", "bibwewadi",
    "pimpri", "chinchwad", "akurdi", "nigdi", "ravet", "tathawade",
    "bandra-west", "juhu", "powai", "worli", "lower-parel", "khar-west", "andheri-west", "goregaon", "malad-west", "borivali-west",
    "vijay-nagar", "palasia", "panjim", "assagao"
  ];

  const projectSlugs = [
    "lodha-belmondo", "kasturi-balmoral", "kalpataru-jade", "godrej-24", "vtp-earth",
    "shapoorji-sensorium", "megapolis", "kundan-spaces", "kolte-patil-life-republic",
    "kumar-megapolis", "anp-landmarks", "kohinoor-sapphire", "kekarav-bungalows"
  ];

  const urlsToIndex = [
    'https://ksdesignstudio.in/',
    'https://ksdesignstudio.in/#/portfolio',
    'https://ksdesignstudio.in/#/laboratory',
    'https://ksdesignstudio.in/#/knowledge',
    'https://ksdesignstudio.in/#/contact',
    ...locations.map(loc => `https://ksdesignstudio.in/#/interiors-in/${loc}`),
    ...locations.map(loc => `https://ksdesignstudio.in/#/luxury-design/${loc}`),
    ...projectSlugs.map(slug => `https://ksdesignstudio.in/#/interiors-at/${slug}`)
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
