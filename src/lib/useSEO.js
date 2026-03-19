import { useEffect } from 'react';

/**
 * Custom hook for dynamic SEO meta tags per page
 * Optimized for local SEO in Águilas, Murcia, Spain
 */
export function useSEO({ title, description, canonical, ogImage }) {
  useEffect(() => {
    // Title
    document.title = title;

    // Update or create meta tags
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [key, val] = attr.split('=');
        el.setAttribute(key, val.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('meta[name="description"]', 'name=description', description);

    // Open Graph
    setMeta('meta[property="og:title"]', 'property=og:title', title);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    if (ogImage) setMeta('meta[property="og:image"]', 'property=og:image', ogImage);
    setMeta('meta[property="og:url"]', 'property=og:url', canonical || window.location.href);

    // Twitter
    setMeta('meta[property="twitter:title"]', 'property=twitter:title', title);
    setMeta('meta[property="twitter:description"]', 'property=twitter:description', description);

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical || window.location.href);
  }, [title, description, canonical, ogImage]);
}