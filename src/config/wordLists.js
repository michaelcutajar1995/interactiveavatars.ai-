import { useState, useEffect } from 'react';

export const words = [
  { text: 'Lincoln', emoji: '🎩' },
  { text: 'virtual real-estate agent', emoji: '🏠' },
  { text: 'virtual waiter', emoji: '🍽' },
  { text: 'virtual tour guide', emoji: '🎫' }
];

export const ideas = [
  { text: 'school', emoji: '🎓' },
  { text: 'restaurant', emoji: '🍴' },
  { text: 'museum', emoji: '🏛️' },
  { text: 'property', emoji: '🏠' },
  { text: 'hotel', emoji: '🏨' },
  { text: 'retail store', emoji: '🏪' },
  { text: 'art gallery', emoji: '🎨' },
  { text: 'tourist attraction', emoji: '🗺️' },
  { text: 'fitness center', emoji: '💪' },
  { text: 'coffee shop', emoji: '☕' },
  { text: 'theater', emoji: '🎭' },
  { text: 'winery', emoji: '🍷' }
];

export const userNames = [
  "Emma", "James", "Sofia", "Liam", "Ava",
  "Noah", "Isabella", "Lucas", "Mia", "Oliver"
];

export const useNotifications = (initialNames) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentIdea, setCurrentIdea] = useState(0);
  const [notification, setNotification] = useState(null);
  const [availableNames, setAvailableNames] = useState([...initialNames]);
  const [showAppButton, setShowAppButton] = useState(false);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);

    const ideaInterval = setInterval(() => {
      setCurrentIdea((prev) => (prev + 1) % ideas.length);
    }, 4000);

    const getRandomName = () => {
      if (availableNames.length === 0) {
        setAvailableNames([...initialNames]);
        return initialNames[Math.floor(Math.random() * initialNames.length)];
      }
      
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      const selectedName = availableNames[randomIndex];
      setAvailableNames(prev => prev.filter((_, index) => index !== randomIndex));
      return selectedName;
    };

    const showNotification = () => {
      const randomName = getRandomName();
      setNotification(randomName);
      setTimeout(() => setNotification(null), 5000);
    };

    const initialDelay = 120000;
    const firstTimer = setTimeout(showNotification, initialDelay);

    const intervalTimer = setInterval(() => {
      showNotification();
    }, 180000);

    if (window.innerWidth <= 768) {
      const showButton = () => {
        setShowAppButton(true);
        setTimeout(() => setShowAppButton(false), 5000);
      };

      const buttonInterval = setInterval(showButton, 30000);
      return () => clearInterval(buttonInterval);
    }

    return () => {
      clearInterval(wordInterval);
      clearInterval(ideaInterval);
      clearTimeout(firstTimer);
      clearInterval(intervalTimer);
    };
  }, [availableNames, initialNames]);

  return {
    currentWord,
    currentIdea,
    notification,
    showAppButton
  };
}; 