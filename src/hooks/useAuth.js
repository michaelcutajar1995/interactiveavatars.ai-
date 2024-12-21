import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // You can add more authentication logic here later
  // For now, we'll just provide a basic user object
  useEffect(() => {
    // Check if there's a user email in localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUser({ email: userEmail });
    }
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 