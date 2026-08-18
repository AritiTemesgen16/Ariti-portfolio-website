import React, { useEffect } from 'react';
import { SEOMetadata } from '../../types';

interface SEOHeadProps extends Partial<SEOMetadata> {
  type?: 'website' | 'article' | 'profile';
  jsonLd?: Record<string, unknown>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Ariti Temesgen Wayu | Software Developer & Full-Stack Engineer Ethiopia",
  description = "Official portfolio of Ariti Temesgen Wayu, Software Developer based in Ethiopia. Specializing in full-stack React, Node.js, PostgreSQL, MongoDB applications, case studies & custom business systems.",
  canonical = "https://arititemesgen.dev",
  keywords = [
    "Ariti Temesgen Wayu",
    "Software Developer Ethiopia",
    "Full Stack Developer Ethiopia",
    "React Developer Ethiopia",
    "Node.js Developer Ethiopia",
    "Freelance Web Developer Ethiopia",
    "Ethiopia Software Engineer",
    "SmartSpend",
    "AgriConnect Ethiopia",
    "PharmaCore Ethiopia"
  ],
  ogImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  jsonLd
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrValue] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attrName, attrValue.replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Update meta tags
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('meta[name="keywords"]', 'content', keywords.join(', '));
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:url"]', 'content', canonical);
    updateMetaTag('meta[property="og:image"]', 'content', ogImage);
    updateMetaTag('meta[name="twitter:title"]', 'content', title);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', ogImage);

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Multi-schema JSON-LD structured data graph
    const schemaGraph = jsonLd ? [jsonLd] : [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://arititemesgen.dev/#person",
        "name": "Ariti Temesgen Wayu",
        "jobTitle": "Full-Stack Software Developer",
        "url": canonical,
        "email": "mailto:arititemesgen16@gmail.com",
        "telephone": "+251916007076",
        "sameAs": [
          "https://github.com/Arititemesgen16",
          "https://linkedin.com/in/Arititemesgen",
          "https://t.me/arititemesgen"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Addis Ababa",
          "addressCountry": "Ethiopia"
        },
        "knowsAbout": [
          "Software Engineering",
          "JavaScript",
          "TypeScript",
          "React 18",
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "MongoDB",
          "Database Architecture",
          "Business Management Systems",
          "Full-stack Web Applications"
        ],
        "knowsLanguage": ["English", "Amharic", "Afaan Oromo"],
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Computer Science Degree Program"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Management Degree Program"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://arititemesgen.dev/#website",
        "url": "https://arititemesgen.dev",
        "name": "Ariti Temesgen Wayu - Software Developer Portfolio",
        "description": "Official portfolio and software engineering showcase of Ariti Temesgen Wayu based in Ethiopia.",
        "publisher": {
          "@id": "https://arititemesgen.dev/#person"
        },
        "inLanguage": "en-US"
      }
    ];

    // Script tag for JSON-LD
    let scriptTag = document.querySelector('#json-ld-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph
    });
  }, [title, description, canonical, keywords, ogImage, jsonLd]);


  return null;
};
