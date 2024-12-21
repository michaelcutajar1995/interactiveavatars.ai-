import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // You can add authentication logic here
  // For now, let's just simulate a user
  useEffect(() => {
    // Simulating a user
    setUser({
      email: 'test@example.com',
      // Add other user properties as needed
    });
    setLoading(false);
  }, []);

  const value = {
    user,
    setUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 