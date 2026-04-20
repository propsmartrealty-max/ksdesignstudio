/**
 * KS Design Studio - Pune Interior Design FAQ Registry
 * Targeted for Google Search rich snippets (FAQPage Schema).
 */

export interface FAQ {
  question: string;
  answer: string;
  category: 'pricing' | 'process' | 'local' | 'trends';
}

export const PUNE_INTERIOR_FAQS: FAQ[] = [
  {
    question: "What is the average cost of interior design for a 2BHK in Pune?",
    answer: "For a standard 2BHK in Pune (800-1000 sq ft), basic interior packages typically range from ₹8L to ₹12L. Premium finishes with customized woodwork and branded hardware usually range between ₹12L and ₹18L, depending on the material taxonomy.",
    category: 'pricing'
  },
  {
    question: "How long does a full home interior project take in Pune?",
    answer: "A standard apartment project (2BHK or 3BHK) in Pune typically takes 45 to 90 days from the design sign-off to turnkey delivery. Complex villa projects or standalone bungalows may extend to 120+ days depending on structural requirements.",
    category: 'process'
  },
  {
    question: "Do you provide interior design services in Baner and Wakad?",
    answer: "Yes, KS Design Studio has a strong presence in West Pune, including Baner, Wakad, Hinjewadi, and Balewadi. We specialize in high-fidelity designs for elite projects like Kasturi Balmoral, Godrej 24, and ANP Landmarks.",
    category: 'local'
  },
  {
    question: "What are the latest interior design trends in Pune for 2026?",
    answer: "Current trends in Pune emphasize 'Warm Minimalism' and 'Deccan Tectonics'—integrating biophilic elements (indoor gardens), textured stone finishes (Basalt/Marble), and multi-functional IT sanctuaries for WFH professionals.",
    category: 'trends'
  },
  {
    question: "Is Vastu Shastra considered in your design process?",
    answer: "Absolutely. Our 'Sovereign Protocol' includes a Vastu compliance check during the spatial audit phase, ensuring the flow of energy aligns with architectural logic, particularly for properties in Magarpatta and Kothrud.",
    category: 'process'
  },
  {
    question: "What is your per square foot cost for interior design in Pune?",
    answer: "Our design-only fees range from ₹150 to ₹350 per sq. ft. For turnkey execution (materials + labor), costs typically start from ₹1,400/sq. ft. for basic and go up to ₹3,500+/sq. ft. for high-end luxury silhouettes.",
    category: 'pricing'
  },
  {
    question: "Which are the best areas in Pune for luxury home interiors?",
    answer: "Koregaon Park, Prabhat Road, Sopan Baug, and Baner-Balewadi High Street remain the primary hubs for luxury heritage and high-rise interiors in Pune. We also see emerging luxury in Kharadi and NIBM Road.",
    category: 'local'
  },
  {
    question: "Do you handle civil work like tile changes or wall demolitions?",
    answer: "Yes, as a turnkey firm, we manage the entire spectrum including civil work, structural changes, electrical rewiring, and false ceilings, ensuring a single-point responsibility for the homeowner.",
    category: 'process'
  },
  {
    question: "What is the cost of a modular kitchen in Pune?",
    answer: "A modular kitchen in Pune typically ranges from ₹2.5L for a basic L-shaped layout to ₹8L+ for a premium U-shaped kitchen with branded hardware (Hettich/Hafele), quartz countertops, and integrated appliances.",
    category: 'pricing'
  },
  {
    question: "How do I choose the best interior designer in Pune?",
    answer: "Look for designers who provide a detailed BOQ (Bill of Quantities), offer transparent pricing, show you live ongoing sites (not just portfolios), and specialize in your property type. KS Design Studio provides all of these with a 10-year warranty on workmanship.",
    category: 'process'
  },
  {
    question: "Do you offer office interior design services in Hinjewadi?",
    answer: "Yes, we specialize in productivity-focused workspace design for IT companies and startups in Hinjewadi, Kharadi, and Baner. Our commercial projects focus on ergonomic layouts, acoustic sculpting, and brand-aligned aesthetics.",
    category: 'local'
  },
  {
    question: "What interior design styles are popular in Pune homes?",
    answer: "Pune's design DNA leans towards Warm Minimalism, Japandi-Deccan Fusion, and Contemporary Luxury. IT professionals in Hinjewadi/Wakad prefer sleek modern aesthetics, while established families in Koregaon Park and Kothrud often favor heritage-contemporary blends.",
    category: 'trends'
  },
  {
    question: "Can you design a 3BHK flat interior within ₹15 lakhs in Pune?",
    answer: "Yes, a well-designed 3BHK interior is achievable within ₹15L using smart material choices. We offer curated 'Essential' packages that prioritize high-impact areas (kitchen, living room, master bedroom) while using cost-effective alternatives for secondary spaces.",
    category: 'pricing'
  },
  {
    question: "Do you provide sustainable or eco-friendly interior design?",
    answer: "Absolutely. Our 'Green Monograph' protocol uses FSC-certified timber, low-VOC paints, recycled stone composites, and energy-efficient lighting systems. We source locally from Pune artisans to minimize the carbon footprint of material logistics.",
    category: 'trends'
  },
  {
    question: "What warranty do you provide on interior work?",
    answer: "KS Design Studio provides a comprehensive 10-year warranty on modular structures and joinery, a 5-year warranty on hardware and fittings, and a 1-year warranty on painting and civil finishes. All warranty claims are handled within 48 hours.",
    category: 'process'
  },
  {
    question: "Do you serve areas like Hadapsar, NIBM, and Undri in Pune?",
    answer: "Yes, we actively serve all major micro-markets in South and East Pune including Hadapsar, NIBM Road, Undri, Kondhwa, Magarpatta, and Wanowrie. Our teams have completed 50+ residential projects in these rapidly growing corridors.",
    category: 'local'
  },
  {
    question: "What is the difference between turnkey and modular interior services?",
    answer: "Modular services focus on factory-made, precision-fitted furniture (kitchens, wardrobes, TV units). Turnkey covers the entire home—from civil work and electrical to furniture, painting, and final styling. We offer both as standalone services.",
    category: 'process'
  },
  {
    question: "How much does a luxury bungalow interior cost in Pune?",
    answer: "Luxury bungalow interiors in Pune (3000-10000 sq ft) typically range from ₹35L to ₹1.5 Cr+, depending on the scope. This includes custom millwork, imported stones, designer lighting, landscape integration, and smart home automation.",
    category: 'pricing'
  },
  {
    question: "Can you redesign my existing home without full renovation?",
    answer: "Yes, our 'Structural Refinement' service focuses on strategic visual upgrades—repainting, re-cladding walls, replacing hardware, upgrading lighting, and adding statement furniture—without major civil disruptions. Ideal for homes under 5 years old.",
    category: 'process'
  }
];
