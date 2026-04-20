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
  }
];
