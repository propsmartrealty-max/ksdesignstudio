import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PROJECTS, SERVICES } from '../../constants';

const Schema: React.FC = () => {
  const location = useLocation();
  const { location: locParam } = useParams();

  const isLocationPage = location.pathname.includes('/interiors-in/') || location.pathname.includes('/luxury-design/');

  const ldJson: any = {
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
    }
  };

  if (isLocationPage && locParam) {
    const place = locParam.replace(/-/g, ' ');
    ldJson["@type"] = "LocalBusiness";
    ldJson["name"] = `KS Design Studio | Interior Designers in ${place}`;
    ldJson["description"] = `Expert residential and commercial interior designers serving ${place}, Pune. Professional architectural workflows and modular solutions.`;
  }

  // Base Schema Additions
  ldJson["areaServed"] = ["Pune", "Mumbai", "Baner", "Wakad", "Hinjewadi", "Koregaon Park", "Kothrud", "Aundh"];
  ldJson["hasOfferCatalog"] = {
    "@type": "OfferCatalog",
    "name": "Interior Design Services",
    "itemListElement": SERVICES.map((service) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.title
      }
    }))
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(ldJson)}
    </script>
  );
};

export default Schema;
