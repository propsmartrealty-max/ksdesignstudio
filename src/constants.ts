import { Project, Service, Testimonial, Blog, Guideline, SignatureModule } from './types';
import ksTectonicKitchen from './assets/images/ks_tectonic_kitchen.png';
import ksMonographBedroom from './assets/images/ks_monograph_bedroom.png';
import ksCorporateOffice from './assets/images/ks_corporate_office.png';
import materialTexture from './assets/images/material_texture.png';
import portfolioKitchen from './assets/images/portfolio_kitchen.png';

// Newly Generated High-Fidelity Assets
import ksBalmoralBalcony from './assets/images/ks_balmoral_balcony.png';
import ksJadeLiving from './assets/images/ks_jade_living.png';
import ksSensoriumTech from './assets/images/ks_sensorium_tech.png';
import ksKekaravBungalow from './assets/images/ks_kekarav_bungalow.png';
import blogPuneLuxury from './assets/images/blog_pune_luxury.png';
import blogMumbaiMinimalism from './assets/images/blog_mumbai_minimalism.png';
import blogWakadTech from './assets/images/blog_wakad_tech.png';
import blogBandraBohemian from './assets/images/blog_bandra_bohemian.png';
import blogRavetTrends from './assets/images/blog_ravet_trends.png';
import japandiTheme from './assets/images/japandi_theme.png';
import industrialTheme from './assets/images/industrial_theme.png';

export const PROJECTS: Project[] = [
  {
    id: 'lodha-3bhk',
    title: 'Lodha Belmondo 3BHK Premium',
    category: 'Residential',
    location: 'Gahunje, Pune',
    imageUrl: ksTectonicKitchen,
    alt: 'KS Design Studio Pune | Ultra-Luxury 3BHK Kitchen Design with Shaker Cabinetry & Brass Accents',
    description: 'Ultra-luxury 3BHK design focusing on bespoke shaker joinery and Italian minimalism.',
    area: '2,200 sq.ft.',
    year: '2023',
    duration: '8 Months',
    fullDescription: 'At Lodha Belmondo, we crafted a space that bridges the gap between the lush golf course outdoors and a sophisticated interior sanctuary. Using champagne gold accents and bespoke marble joinery.',
    materials: [
      { name: 'Statuario Marble', description: 'Italian origin, high-vein density for monolithic surfaces.' },
      { name: 'Smoked Oak', description: 'Deep-textured timber for thermal comfort and visual depth.' },
      { name: 'Satin Brass', description: 'Custom joinery details for a touch of quiet luxury.' }
    ]
  },
  {
    id: 'lodha-4bhk',
    title: 'Lodha Belmondo 4BHK Bungalow',
    category: 'Bungalow',
    location: 'Gahunje, Pune',
    imageUrl: ksMonographBedroom,
    alt: 'KS Design Studio Pune | Moody Master Bedroom Symphony with Arched Windows & Fluted Velvets',
    description: 'A grand 4BHK bungalow narrative with atmospheric master suites and resort-style living.',
    area: '4,500 sq.ft.',
    year: '2024',
    duration: '12 Months',
    fullDescription: 'This signature bungalow project redefined vertical luxury. We integrated a private elevator, a terrace garden, and a home automation system that learns the occupant\'s rhythms.'
  },
  {
    id: 'kasturi-balmoral',
    title: 'Kasturi The Balmoral Riverside',
    category: 'Residential',
    location: 'Balewadi, Pune',
    imageUrl: ksBalmoralBalcony,
    alt: 'KS Design Studio Pune | High-Fidelity Contemporary Interiors for The Balmoral Riverside - Luxury Balcony Inquiry',
    description: 'High-fidelity contemporary interiors for the elite Kasturi ecosystem.',
    area: '3,100 sq.ft.',
    year: '2023',
    duration: '7 Months',
    fullDescription: 'Aligning with Kasturi\'s architectural excellence, we implemented a "Quiet Luxury" palette with hidden lighting and seamless transitions.'
  },
  {
    id: 'kalpataru-jade',
    title: 'Kalpataru Jade Residences',
    category: 'Residential',
    location: 'Baner, Pune',
    imageUrl: ksJadeLiving,
    alt: 'KS Design Studio Pune | Nature-Integrated 3BHK Living Room at Kalpataru Jade Residences',
    description: 'Bespoke 3BHK design integrating nature-inspired textures and modern ergonomics.',
    area: '1,850 sq.ft.',
    year: '2024',
    duration: '6 Months',
    fullDescription: 'A high-fidelity transformation of a 3BHK at Joyville Sensorium. This project prioritizes biophilic flow and smart home integration without compromising on the artisanal textures of heritage stone.',
    materials: [
      { name: 'Black Basalt', description: 'Locally sourced volcanic stone for grounding floor surfaces.' },
      { name: 'Neural Fabric', description: 'High-performance acoustic textiles for the media lounge.' },
      { name: 'Fluted Glass', description: 'Architectural dividers that prune light while maintaining privacy.' }
    ]
  },
  {
    id: 'shapoorji-sensorium',
    title: 'Shapoorji Sensorium',
    category: 'Residential',
    location: 'Hinjewadi, Pune',
    imageUrl: ksSensoriumTech,
    alt: 'KS Design Studio Pune | Smart Luxury Interior Scapes at Shapoorji Sensorium Hinjewadi',
    description: 'Tech-enabled contemporary living for the modern professional.',
    area: '1,250 sq.ft.',
    year: '2023',
    duration: '5 Months',
    fullDescription: 'Focusing on "Smart Luxury," we integrated IoT features with a warm, inviting material palette of light oak and charcoal.'
  },
  {
    id: 'kekarav-signature',
    title: 'Kekarav Bungalows',
    category: 'Bungalow',
    location: 'Bavdhan, Pune',
    imageUrl: ksKekaravBungalow,
    alt: 'KS Design Studio Pune | Biophilic Bungalow Architecture & Premium Interiors in Bavdhan',
    description: 'Organic luxury meets architectural rigor in a forest-facing site.',
    area: '5,200 sq.ft.',
    year: '2024',
    duration: '14 Months',
    fullDescription: 'A masterclass in biophilic design, these bungalows feature expansive glass walls and native stone textures.'
  },
  {
    id: 'anp-landmarks',
    title: 'ANP Landmarks',
    category: 'Commercial',
    location: 'Baner, Pune',
    imageUrl: ksCorporateOffice,
    alt: 'KS Design Studio Pune | Minimalist Luxury Corporate Office Sanctuary with Glass Architecture',
    description: 'A high-performance luxury corporate office with design excellence.',
    area: '8,500 sq.ft.',
    year: '2023',
    duration: '9 Months',
    fullDescription: 'Designing a workspace that reflects the prestige of the ANP group with design excellence and ergonomic brilliance.'
  }
];

export const ELITE_CUSTOMERS = [
  'Lodha Belmondo', 'Kasturi Housing', 'Kalpataru Exquisite', 'Godrej 24', 'VTP Earth', 
  'Shapoorji Sensorium', 'Megapolis', 'Kundan Spaces Baner', 'Kalpataru Jade Residences', 
  'Kolte Patil Life Republic', 'Godrej Woodsville', 'Kumar Megapolis', 'ANP Landmarks', 
  'ANP Memento', 'Kohinoor Sapphire', 'Kekarav Bungalows', 'Majestique Landmarks', 
  'Kunal Canary', 'Mantra Balewadi', 'Majestique Signature Tower',
  'Piramal Aranya Byculla', 'Lodha Park Worli', 'Godrej Origins Vikhroli', 'Kanakia Zen World',
  'Oberoi Realty Goregaon', 'Rustomjee Elements Juhu'
];

export const MICRO_MARKETS = [
  // Pune & PCMC
  'Baner', 'Balewadi', 'Wakad', 'Hinjewadi', 'Tathawade', 'Aundh', 'Shivajinagar', 'Bavdhan', 'Mahalunge', 'Pimpri Chinchwad',
  'Ravet', 'Punawale', 'Kiwaile', 'Moshi', 'Bhosari', 'Nigdi', 'Akurdi', 'Kalyani Nagar', 'Koregaon Park', 'Magarpatta',
  'Pimple Saudagar', 'Kharadi', 'Sinhgad Road', 'Katraj', 'Kothrud', 'Camp',
  // Mumbai
  'Bandra West', 'Juhu', 'Powai', 'Worli', 'Lower Parel', 'Khar West', 'Andheri West', 'Goregaon', 'Malad West', 'Borivali West',
  // Indore
  'Vijay Nagar', 'AB Road', 'Bicholi Mardana', 'Saket', 'Palasia',
  // Goa
  'Panjim', 'Bambolim', 'Assagao', 'Anjuna', 'Dona Paula'
];

export const SERVICES: Service[] = [
  {
    id: 'svc-modular',
    title: '2BHK & 3BHK Modular Interiors',
    description: 'Precision-engineered cabinetry and smart modular systems tailored for premium residential kitchens and wardrobes.',
    icon: 'Hammer',
    imageUrl: ksTectonicKitchen,
    alt: 'KS Design Studio Pune | 2BHK & 3BHK Modular Kitchen & Joinery Mastery',
    details: ['Premium Storage Systems', 'Smart Hardware Integration', 'Automated Solutions'],
    path: '/modular'
  },
  {
    id: 'svc-monograph',
    title: 'Full Home Residential Designs',
    description: 'A comprehensive start-to-finish interior design journey for luxury residential flats and apartments.',
    icon: 'Home',
    imageUrl: ksJadeLiving,
    alt: 'KS Design Studio Pune | Full Home Residential Designs & Interiors',
    details: ['Complete Makeovers', 'Curated Art & Lighting', 'Professional Execution'],
    path: '/turnkey'
  },
  {
    id: 'svc-estates',
    title: 'Premium Bungalow Interiors',
    description: 'Bespoke end-to-end interior planning for grand bungalows, villas, and independent properties.',
    icon: 'Palace',
    imageUrl: ksKekaravBungalow,
    alt: 'KS Design Studio Pune | Premium Bungalow & Villa Interior Design',
    details: ['Nature Integration', 'Double-Height Living Rooms', 'Private Amenity Layouts'],
    path: '/ateliers'
  },
  {
    id: 'svc-refine',
    title: 'Home Renovations & Upgrades',
    description: 'Strategic reconstruction and visual upgrade of existing spaces, focusing on modern aesthetics and better flow.',
    icon: 'Construction',
    imageUrl: ksBalmoralBalcony,
    alt: 'KS Design Studio Pune | Home Renovations & Upgrades',
    details: ['Facade Upgrades', 'Interior Restyling', 'Material Quality Checks'],
    path: '/renovations'
  }
];

export const GUIDELINES: Guideline[] = [
  {
    id: 'g-1',
    title: 'The Design Palette',
    description: 'Dos and Don\'ts of choosing a premium color scheme.',
    dos: ['Use neutral base with jewel tone accents', 'Prioritize natural light reflection', 'Layer textures over patterns'],
    donts: ['Avoid harsh primary colors', 'Don\'t mix more than three wood finishes', 'Avoid cluttering focused sightlines']
  },
  {
    id: 'g-2',
    title: 'Lighting Architecture',
    description: 'Essential guidelines for layered lighting.',
    dos: ['Install dimmable task lighting', 'Use warm white (2700K) for living areas', 'Highlight architectural features'],
    donts: ['Avoid single-point ceiling lights', 'Don\'t overlook floor-level path lighting', 'Avoid stark clinical blue lights']
  }
];

export const BLOGS: Blog[] = [
  {
    id: 'pune-luxury-hub',
    title: 'Pune: The New Centre for Premium Interiors',
    excerpt: 'Analyzing why micro-markets like Baner and Wakad are attracting elite residential design investments.',
    date: 'April 15, 2024',
    category: 'Market Trends',
    author: 'KS Design Studio',
    imageUrl: blogPuneLuxury,
    alt: 'KS Design Studio Pune | Premium Interior Design Market Trends in Baner & Balewadi'
  },
  {
    id: 'mumbai-minimalism',
    title: 'Contemporary Minimalism in South Mumbai High-Rises',
    excerpt: 'How we adapt "Quiet Luxury" for the vertical silhouettes of Worli and Lower Parel.',
    date: 'April 12, 2024',
    category: 'Regional Design',
    author: 'KS Design Studio',
    imageUrl: blogMumbaiMinimalism,
    alt: 'KS Design Studio Pune | Contemporary Minimalism in Mumbai High-Rises'
  },
  {
    id: 'wakad-design-evolution',
    title: 'The Design Evolution of Wakad: From IT Hub to Tech-Luxe',
    excerpt: 'A deep-dive into the unique spatial requirements of Hinjewadi-based patrons.',
    date: 'April 10, 2024',
    category: 'Market Intelligence',
    author: 'KS Design Studio',
    imageUrl: blogWakadTech,
    alt: 'KS Design Studio Pune | Tech-Luxe Design Evolution in Wakad IT Hub'
  },
  {
    id: 'bandra-bohemian',
    title: 'Bandra Bohemian: Fusing Heritage with Modern Interior Design',
    excerpt: 'Exploring our latest interior commissions in Mumbai’s cultural heart.',
    date: 'April 08, 2024',
    category: 'Regional Design',
    author: 'KS Design Studio',
    imageUrl: blogBandraBohemian,
    alt: 'KS Design Studio Pune | Bandra Bohemian Interior Mastery'
  },
  {
    id: 'ravet-punawale-trends',
    title: 'Ravet & Punawale: The New Frontier of Design',
    excerpt: 'How PCMC’s growth hubs are redefining residential interior expectations.',
    date: 'April 05, 2024',
    category: 'Market Trends',
    author: 'KS Design Studio',
    imageUrl: blogRavetTrends,
    alt: 'KS Design Studio Pune | Interior Design Trends in Ravet & Punawale'
  },
  // Algorithmic Virtual Blogs (pSEO Cluster)
  {
    id: 'pune-interior-cost-guide-2026',
    title: 'Pune Interior Cost Guide 2026: Sq Ft Analysis',
    excerpt: 'A comprehensive breakdown of design and execution costs for Pune homeowners.',
    date: 'April 18, 2024',
    category: 'Pricing Guide',
    author: 'KS Design Studio AI',
    imageUrl: blogPuneLuxury, // Reuse or generic luxury
    isVirtual: true,
    alt: 'KS Design Studio Pune | Interior Design Cost per sq ft Pune 2026'
  },
  {
    id: 'material-intelligence-guide',
    title: 'Material Intelligence: Selecting the Best Stones & Timbers',
    excerpt: 'Detailed comparison of Statuario, Basalt, and American Walnut for your home.',
    date: 'April 19, 2024',
    category: 'Material Library',
    author: 'KS Design Studio AI',
    imageUrl: blogWakadTech,
    isVirtual: true,
    alt: 'KS Design Studio Pune | Best Interior Materials Guide Pune'
  },
  {
    id: 'small-home-interior-pune',
    title: 'Space-Saving Masterclass: Small Home Solutions in Pune',
    excerpt: 'Maximizing the spatial flow of 2BHK apartments in high-density hubs.',
    date: 'April 20, 2024',
    category: 'Design Tips',
    author: 'KS Design Studio AI',
    imageUrl: blogMumbaiMinimalism,
    isVirtual: true,
    alt: 'KS Design Studio Pune | Small Flat Interior Ideas Pune'
  },
  {
    id: 'luxury-bungalow-transformation-pune',
    title: 'Massive Bungalow Transformations: A Legacy Restoration Guide',
    excerpt: 'Revitalizing grand estates in Koregaon Park and Prabhat Road with modern architectural vigor.',
    date: 'April 21, 2024',
    category: 'Bungalow Design',
    author: 'KS Design Studio AI',
    imageUrl: blogPuneLuxury,
    isVirtual: true,
    alt: 'KS Design Studio Pune | Luxury Bungalow Interior Design Pune'
  },
  {
    id: 'smart-kitchen-technology-2026',
    title: 'Smart Kitchen Tech 2026: The Intersection of Gastronomy & Automation',
    excerpt: 'A deep-dive into the specialized modular systems and IoT integration for the modern Pune kitchen.',
    date: 'April 22, 2024',
    category: 'Modular Tech',
    author: 'KS Design Studio AI',
    imageUrl: blogWakadTech,
    isVirtual: true,
    alt: 'KS Design Studio Pune | Smart Modular Kitchen Pune 2026'
  },
  {
    id: 'vastu-modern-interior-flow',
    title: 'Vastu & Modern Flow: Synchronizing Energetic Logic with Space',
    excerpt: 'How we implement traditional Vastu principles without compromising on minimalist architectural aesthetics.',
    date: 'April 23, 2024',
    category: 'Process',
    author: 'KS Design Studio AI',
    imageUrl: blogBandraBohemian,
    isVirtual: true,
    alt: 'KS Design Studio Pune | Vastu Compliant Interior Design'
  },
  {
    id: 'lighting-architecture-2024',
    title: 'Lighting Architecture: The Silent Sculptor of Volume',
    excerpt: 'A technical guide to lux levels and color temperatures for premium residences.',
    date: 'April 02, 2024',
    category: 'Technical Guide',
    author: 'KS Design Studio',
    imageUrl: portfolioKitchen,
    alt: 'KS Design Studio Pune | Professional Lighting Design & LUX Control'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Vikram Mehta',
    role: 'Patron, Lodha Belmondo',
    quote: 'KS Design Studio translated our vision into a beautiful home interior with stunning finishes.',
    project: 'Lodha Belmondo 3BHK'
  }
];

export const STYLE_MONOLOGUES = [
  {
    id: 'japandi-vibe',
    title: 'Japandi: The Soul of Silence',
    imageUrl: japandiTheme,
    description: 'A harmonious fusion of Japanese Wabi-Sabi and Scandinavian Hygge. Focusing on natural materials, low-profile furniture, and meaningful emptiness.',
    principles: ['Meaningful Emptiness', 'Raw Wood Textures', 'Handcrafted Clay Accents'],
    dos: ['Use warm neutrals (beige, soft gray)', 'Invest in one high-quality low-profile sofa', 'Layer textures like linen and wool'],
    donts: ['Avoid loud colors or glossy synthetics', 'Don’t over-clutter surfaces', 'Avoid single-point clinical lighting']
  },
  {
    id: 'maratha-modern',
    title: 'Modern Maratha: The New Heritage',
    imageUrl: ksKekaravBungalow,
    description: 'Reinterpreting the Wada architecture for contemporary high-rise silhouettes. Blending basalt floors with rhythmic wooden arches.',
    principles: ['Rhythmic Arched Geometry', 'Basalt & Teak Symphony', 'Traditional Brass Accents'],
    dos: ['Use Warli art as subtle focal points', 'Incorporate traditional brass lamps', 'Mix heritage motifs with clean-lined furniture'],
    donts: ['Avoid museum-like antique overload', 'Don’t ignore modern spatial functionality', 'Don’t use generic multi-color patterns']
  },
  {
    id: 'industrial-luxe',
    title: 'Industrial Luxe: Raw & Refined',
    imageUrl: industrialTheme,
    description: 'The evolution of industrial design that softens raw, gritty warehouse aesthetics with high-end, premium finishes like velvet and marble.',
    principles: ['Gritty Surfaces vs Premium Finishes', 'Exposed Structural Logic', 'Atmospheric Light Sculpting'],
    dos: ['Pair raw concrete with polished marble', 'Softens hard edges with velvet pillows', 'Use focused ambient lighting (2700K)'],
    donts: ['Don’t leave the space feeling echoey', 'Don’t use cheap imitation brick-wallpaper', 'Avoid cold, blue-spectrum lighting']
  }
];

export const DESIGN_CODE = {
  dos: [
    { title: 'Layered Lighting', detail: 'Use ambient, task, and accent lighting at different heights for depth.', icon: 'Zap' },
    { title: 'Material Honesty', detail: 'Prioritize raw, authentic materials like stone, timber, and metal.', icon: 'Tree' },
    { title: 'Spatial Flow', detail: 'Leave corridors of movement that respect the natural walk-paths.', icon: 'Move' }
  ],
  donts: [
    { title: 'Generic Kits', detail: 'Avoid matching furniture sets; curate unique pieces over time.', icon: 'Package' },
    { title: 'Wall-Hugging', detail: 'Dont push all furniture against the walls; create islands of intimacy.', icon: 'Layout' },
    { title: 'Scale Ignorance', detail: 'Avoid oversized rugs or undersized art; proportions are absolute.', icon: 'Minimize' }
  ]
};

export const MATERIAL_TAXONOMY = [
  {
    category: 'Sourced Stones',
    materials: [
      { 
        name: 'Statuario Marble', 
        origin: 'Carrara, Italy', 
        description: 'The pinnacle of luxury surfaces. Pure white background with deep grey veins.', 
        property: 'High-Density / Non-Porous',
        partners: ['Classic Marble Company (Mumbai)', 'RK Marble (Pune)']
      },
      { 
        name: 'Black Basalt', 
        origin: 'Deccan Traps, India', 
        description: 'Locally sourced volcanic stone. Matte black with high thermal mass.', 
        property: 'Acoustic / Grounding',
        partners: ['Deccan Stone Crafts (Pune)', 'Stone Source (Mumbai)']
      },
      { 
        name: 'Rose Quartzite', 
        origin: 'Brazil', 
        description: 'Translucent stone that interacts with backlight for atmospheric glow.', 
        property: 'Luminescent / Rare',
        partners: ['Sovereign Stone (Goa)', 'The Quarry (Mumbai)']
      }
    ]
  },
  {
    category: 'Timber Hub',
    materials: [
      { 
        name: 'Burma Teak', 
        origin: 'Myanmar', 
        description: 'Golden brown timber with natural oils for lasting durability.', 
        property: 'Water-Resistant / Heritage',
        partners: ['Pune Timber Mart', 'Bandra Woodworks (Mumbai)']
      },
      { 
        name: 'Smoked Oak', 
        description: 'Ammonia-treated oak for a deep, charred aesthetic and visual depth.', 
        property: 'Hardwood / Textural',
        partners: ['Aluplex (Indore)', 'Design Tree (Pune)']
      },
      { 
        name: 'Walnut Burl', 
        description: 'Sourced for its unique cosmic grain patterns and warm hues.', 
        property: 'Grain-Intense / Ornate',
        partners: ['Heritage Timber (Pune)']
      }
    ]
  },
  {
    category: 'Neural Fabrics',
    materials: [
      { 
        name: 'Belgian Linen', 
        description: 'Raw, heavy-duty linen with a natural drape and breathability.', 
        property: 'Hypoallergenic / Matte',
        partners: ['Atmosphere (Mumbai)', 'Fabric Studio (Pune)']
      },
      { 
        name: 'Mohair Velvet', 
        description: 'Durable, high-sheen velvet that prunes light and adds depth.', 
        property: 'Luxe / Sound-Absorbant',
        partners: ['D\'Decor (Mumbai)', 'Pune Decor']
      },
      { 
        name: 'Wild Silk', 
        description: 'Hand-woven raw silk for a shimmering, tactile wall-covering.', 
        property: 'Reflective / High-Fidelity',
        partners: ['Silk Route (Goa)', 'Heritage Weaves (Mumbai)']
      }
    ]
  }
];

export const SIGNATURE_MODULES: SignatureModule[] = [
  {
    id: 'sig-tectonic-kitchen',
    title: 'The Tectonic Kitchen',
    description: 'A monolithic culinary sanctuary focusing on raw basalt surfaces and integrated smart joinery.',
    investment: '₹12L - ₹18L',
    materials: ['Statuary Marble', 'Black Basalt', 'Smoked Oak'],
    features: ['Ghost-Grip Handleless Cabinets', 'Integrated Atmospheric Lighting', 'Hidden Pantry Ecosystem'],
    imageUrl: ksTectonicKitchen
  },
  {
    id: 'sig-monograph-suite',
    title: 'The Monograph Master Suite',
    description: 'An atmospheric master sanctuary designed for atmospheric light play and thermal luxury.',
    investment: '₹8L - ₹12L',
    materials: ['American Walnut', 'Mohair Velvet', 'Rose Quartzite'],
    features: ['Floating Bed Platform', 'Cinematic Walk-in Wardrobe', 'Acoustic Slat Paneling'],
    imageUrl: ksMonographBedroom
  },
  {
    id: 'sig-basalt-lounge',
    title: 'The Basalt Social Lounge',
    description: 'A high-contrast living volume designed for elite social scenarios and biophilic flow.',
    investment: '₹15L - ₹22L',
    materials: ['Black Basalt', 'Wild Silk', 'Burma Teak'],
    features: ['Monolithic Library Wall', 'Arched Threshold Architecture', 'Double-Height Lighting Array'],
    imageUrl: ksJadeLiving
  }
];