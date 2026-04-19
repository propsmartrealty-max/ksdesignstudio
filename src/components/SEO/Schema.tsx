import React from 'react';
import { PROJECTS, SERVICES } from '../../constants';

const Schema: React.FC = () => {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "InteriorDesign",
    "name": "KS Design Studio",
    "description": "Pune's premier interior architects specializing in premium residential and commercial spaces.",
    "url": "https://ksdesignstudio.in",
    "logo": "https://ksdesignstudio.in/logo.png",
    "telephone": "+91 70203 77693",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "623, Vision One Mall, Bhumkar Chowk",
      "addressLocality": "Wakad, Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "City", "name": "Pune" },
      { "@type": "City", "name": "Mumbai" },
      { "@type": "City", "name": "Pimpri-Chinchwad" },
      // Micro-locations - West
      "Baner", "Balewadi", "Aundh", "Wakad", "Hinjewadi", "Pashan", "Bavdhan", "Kothrud", "Warje", "Sus",
      // Central
      "Shivajinagar", "Deccan", "Model Colony", "Sadashiv Peth", "Erandwane",
      // East
      "Kharadi", "Viman Nagar", "Wagholi", "Magarpatta", "Hadapsar", "Mundhwa", "Keshav Nagar",
      // South
      "Kondhwa", "NIBM Road", "Undri", "Pisoli", "Bibwewadi",
      // North
      "Pimpri", "Chinchwad", "Akurdi", "Nigdi", "Ravet", "Tathawade"
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.598,
      "longitude": 73.763
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/ksdesignstudiopune/",
      "https://www.facebook.com/ksdesignstudiopune/"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Design Services",
      "itemListElement": SERVICES.map((service, index) => ({
        "@type": "OfferCatalog",
        "name": service.title,
        "itemListElement": service.details.map(detail => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": detail
          }
        }))
      }))
    },
    "hasPart": PROJECTS.map(project => ({
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "image": project.imageUrl,
      "locationCreated": project.location
    }))
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(ldJson)}
    </script>
  );
};

export default Schema;
