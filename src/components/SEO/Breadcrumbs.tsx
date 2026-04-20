import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  // Generate Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ksdesignstudiopune.vercel.app/"
      },
      ...pathnames.map((value, index) => {
        const url = `https://ksdesignstudiopune.vercel.app/${pathnames.slice(0, index + 1).join('/')}`;
        const name = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": url
        };
      })
    ]
  };

  return (
    <nav className="py-8 bg-white border-b border-slate-50 relative z-20">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <div className="max-w-7xl mx-auto px-6 flex items-center space-x-3 text-[9px] uppercase font-black tracking-widest text-zinc-400">
        <Link to="/" className="hover:text-brass transition-colors flex items-center">
          <Home size={12} className="mr-2" />
          Home
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const formattedValue = value.replace(/-/g, ' ');

          return (
            <React.Fragment key={to}>
              <ChevronRight size={10} className="text-zinc-300" />
              {last ? (
                <span className="text-brass italic font-medium">{formattedValue}</span>
              ) : (
                <Link to={to} className="hover:text-brass transition-colors">
                  {formattedValue}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
