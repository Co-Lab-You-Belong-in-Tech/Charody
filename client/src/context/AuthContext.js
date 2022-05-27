import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getUser } from '../services/users';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getUser();
      if(res?.id) {
        setUser(res);
      }
      setLoading(false);
    };
    getCurrentUser();
  }, []);

  const updateUserPreference = () => {
    setUser((prevState) => {
      return {
        ...prevState,
      };
    });
  };

  const value = useMemo(
    () => ({ user, setUser, updateUserPreference }),
    [user],
  );
  if (loading) {
    // This component will lose its state on page refreshes and manually entered URLs.
    // Adding this wait allows the user to be fetched before rendering any child
    // PrivateRoutes, which prevents logged in users from being erroneously redirected.
    return (
      <div className="authcontextloading">
        <h2>Loading...</h2>
      </div>
    );
  } else {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Auth context was undefined, make sure it was called from a child component of AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
