import fs from 'fs';
import path from 'path';

// This script generates a sitemap.xml for the project
// It includes static routes and dynamic SEO routes from the registry

const BASE_URL = 'https://ksdesignstudio.in';

const SEO_LOCATIONS = {
  west: [
    "Baner", "Balewadi", "Aundh", "Wakad", "Hinjewadi", "Pashan", "Bavdhan", "Kothrud", "Warje", "Sus",
    "Mahalunge", "Pirangut", "Mulshi", "Balewadi High Street", "Punawale", "Mamurdi", "Kivale", "Tathawade", "Ravet",
    "Bhukum", "Bhugaon", "Lifeline", "Chandni Chowk", "Ghunje", "Somatne"
  ],
  central: [
    "Shivajinagar", "Deccan", "Model Colony", "Prabhat Road", "Erandwane", "Karve Nagar", "F.C. Road", "J.M. Road",
    "Sadashiv Peth", "Narayan Peth", "Shaniwar Peth", "Kasba Peth", "Swargate", "Mukund Nagar", "Gultekdi"
  ],
  east: [
    "Kharadi", "Viman Nagar", "Wagholi", "Magarpatta", "Hadapsar", "Mundhwa", "Keshav Nagar", "Kalyani Nagar",
    "Koregaon Park", "Sopan Baug", "Amanora", "Fursungi", "Loni Kalbhor", "Uruli Kanchan", "Manjari", "Tukaram Nagar"
  ],
  south: [
    "Kondhwa", "NIBM Road", "Undri", "Pisoli", "Bibwewadi", "Sahakar Nagar", "Dhankawadi", "Katraj", "Ambegaon",
    "Satara Road", "Market Yard", "Lulla Nagar", "Wanowrie", "Salunke Vihar"
  ],
  north: [
    "Pimpri", "Chinchwad", "Akurdi", "Nigdi", "Ravet", "Moshi", "Bhosari", "Chakan", "Alandi", "Dighi", "Charholi",
    "Talawade", "Sangvi", "Dapodi", "Khadki", "Vishrantwadi"
  ],
  mumbai: ["Bandra West", "Juhu", "Powai", "Worli", "Lower Parel", "Khar West", "Andheri West", "Goregaon", "Malad West", "Borivali West", "Byculla", "Colaba", "Marine Drive", "Wadala", "Chembur"],
  goa: ["Panjim", "Assagao", "Baga", "Calangute", "Candolim", "Anjuna", "Porvorim", "Bambolim", "Dona Paula", "Vagator"],
  indore: ["Vijay Nagar", "Palasia", "Mahalaxmi Nagar", "Bicholi Mardana", "Rajendra Nagar", "Rau", "Kanadia Road", "Saket", "Annapurna"]
};

const staticRoutes = [
  '',
  '/about',
  '/services',
  '/portfolio',
  '/process',
  '/contact',
  '/knowledge',
  '/laboratory',
  '/vault',
  '/pricing',
  '/design-ideas',
  '/tectonic-series'
];

const BLOGS = [
  { id: 'pune-luxury-hub' },
  { id: 'mumbai-minimalism' },
  { id: 'wakad-design-evolution' },
  { id: 'bandra-bohemian' },
  { id: 'ravet-punawale-trends' },
  { id: 'pune-interior-cost-guide-2026' },
  { id: 'material-intelligence-guide' },
  { id: 'small-home-interior-pune' }
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static routes
  staticRoutes.forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}/#${route}</loc>\n    <priority>1.0</priority>\n  </url>\n`;
  });

  // Add location routes
  Object.values(SEO_LOCATIONS).flat().forEach(loc => {
    const slug = loc.toLowerCase().replace(/\s+/g, '-');
    xml += `  <url>\n    <loc>${BASE_URL}/#/interiors-in/${slug}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${BASE_URL}/#/luxury-design/${slug}</loc>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Add blog routes
  BLOGS.forEach(blog => {
    xml += `  <url>\n    <loc>${BASE_URL}/#/knowledge/${blog.id}</loc>\n    <priority>0.6</priority>\n  </url>\n`;
  });

  xml += '</urlset>';

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`Sitemap generated successfully at ${outputPath}`);
}

generateSitemap();
