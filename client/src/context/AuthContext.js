import { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { getUser, logIn, logOut, signUp as postSignUp } from '../services/users.js'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getUser();
      if(res?._id) {
        setUser(res);
        if(!res.isOfficial && !res.hasListing) {
          history.push('/profileCreation/info')
        }
      }
      setLoading(false);
    };
    getCurrentUser();
  }, []);

  const signUp = useCallback(async (email, password, isOfficial) => {
    const res = await postSignUp(email, password, isOfficial)
    console.log('submitted')
    if (res?.email === email) { // TODO: Make the success response better
        await logIn(email, password);
        const loggedInUser = await getUser();
        setUser(loggedInUser);
        if(isOfficial) {
            history.push('/search')
        } else {
            history.push('/profileCreation/info')
        }
    }
  }, [history])

  const signOut = useCallback(async () => {
    await logOut();
    setUser({})
    history.push('/')
  }, [history])

  const value = useMemo(
    () => ({ user, setUser, signUp, signOut }),
    [user, setUser, signUp, signOut],
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
