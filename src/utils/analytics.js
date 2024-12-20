import ReactGA from 'react-ga4';

// Initialize GA4 with your NEW Measurement ID
export const initGA = () => {
  ReactGA.initialize('G-8QQPK0QGR8');
}

// Track page views
export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
}

// Track events
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
}

// Track button clicks
export const logButtonClick = (buttonName, pageLocation) => {
  logEvent('Button Click', buttonName, pageLocation);
}

// Add these new tracking functions
export const logSocialClick = (network) => {
  logEvent('Social', 'Click', network);
}

export const logDownload = () => {
  logEvent('App', 'Download', 'App Store');
}

export const logEmailClick = () => {
  logEvent('Contact', 'Email Click', 'michael@glimpse.wiki');
}

// Optional: Add video interaction tracking
export const logVideoInteraction = (action) => {
  logEvent('Video', action, 'Demo Video');
} 