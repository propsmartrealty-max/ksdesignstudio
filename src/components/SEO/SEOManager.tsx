import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SEO_PAGE_METADATA } from '../../registry/seo_registry';

const SEOManager: React.FC = () => {
  const location = useLocation();
  const { location: locParam, id: blogId, cityName } = useParams();

  useEffect(() => {
    let title = 'KS Design Studio | Top Interior Designers in Pune';
    let description = 'Pune\'s premier interior architects specializing in premium residential and commercial spaces. High-fidelity modular and turnkey solutions.';

    // 1. Check static metadata
    if (SEO_PAGE_METADATA[location.pathname]) {
      title = SEO_PAGE_METADATA[location.pathname].title;
      description = SEO_PAGE_METADATA[location.pathname].description;
    }

    // 2. Handle Location Pages
    if (location.pathname.includes('/interiors-in/') || location.pathname.includes('/luxury-design/') || location.pathname.includes('/cities/')) {
      const place = (locParam || cityName || 'Pune').replace(/-/g, ' ');
      const formattedPlace = place.charAt(0).toUpperCase() + place.slice(1);
      title = `Best Interior Designers in ${formattedPlace} | KS Design Studio Pune`;
      description = `Seeking top interior designers in ${formattedPlace}? KS Design Studio offers premium residential and commercial interior solutions for homes and offices in ${formattedPlace}, Pune.`;
    }

    // 3. Handle Blog Pages
    if (location.pathname.includes('/knowledge/')) {
      const topic = (blogId || 'Interior Insights').replace(/-/g, ' ');
      const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
      title = `${formattedTopic} | Design Insights | KS Design Studio`;
      description = `Explore architectural insights on ${formattedTopic}. Professional design intelligence curated by your top interior firm in Pune.`;
    }

    // Update document head
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = `https://ksdesignstudio.in${location.pathname === '/' ? '' : '#' + location.pathname}`;
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonical);
    }

  }, [location, locParam, blogId, cityName]);

  return null; // This component doesn't render anything
};

export default SEOManager;
