import { useCallback } from 'react';
import { logEvent } from '../utils/analytics';

export const useAnalytics = () => {
  const trackButtonClick = useCallback((buttonName) => {
    logEvent('Button', 'Click', buttonName);
  }, []);

  const trackVideoInteraction = useCallback((action) => {
    logEvent('Video', action, 'Demo Video');
  }, []);

  return {
    trackButtonClick,
    trackVideoInteraction
  };
}; 