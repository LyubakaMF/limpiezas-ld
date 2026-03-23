// Cookie consent utility - stores user preferences in localStorage

const COOKIE_CONSENT_KEY = 'lld_cookie_consent';
const COOKIE_CONSENT_VERSION = '1';

export const CookieCategories = {
  NECESSARY: 'necessary',       // Always on
  ANALYTICS: 'analytics',       // Google Analytics
  MARKETING: 'marketing',       // Google Ads remarketing
};

export function getCookieConsent() {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    // If version changed, reset
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setCookieConsent(preferences) {
  const consent = {
    version: COOKIE_CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    necessary: true, // always true
    analytics: preferences.analytics || false,
    marketing: preferences.marketing || false,
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  return consent;
}

export function hasConsented() {
  return getCookieConsent() !== null;
}

export function isAnalyticsAllowed() {
  const consent = getCookieConsent();
  return consent?.analytics === true;
}

export function isMarketingAllowed() {
  const consent = getCookieConsent();
  return consent?.marketing === true;
}

// Load Google Analytics dynamically only if user consented
export function loadGoogleAnalytics() {
  if (!isAnalyticsAllowed()) return;
  if (window._gaLoaded) return;
  window._gaLoaded = true;

  const GA_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID if you have one
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}

// Update Google Ads consent state
export function updateGoogleAdsConsent(analytics, marketing) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied',
    });
  }
}

// Track a conversion event (call this on booking form submit)
export function trackBookingConversion() {
  if (!isMarketingAllowed()) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-18035775016',
    });
  }
}

// Track page view
export function trackPageView(pagePath) {
  if (!isAnalyticsAllowed()) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', { page_path: pagePath });
  }
}