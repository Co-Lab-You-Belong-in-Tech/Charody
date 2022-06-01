import { HashRouter as Router, Route } from 'react-router-dom'
import './App.css';
import { Helmet } from 'react-helmet'

// components
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
// pages
import Home from './components/HomePage/home'
import AboutUs from './components/AboutUs/aboutUs'
import SignUp from './components/SignUp/signUp'
import SignUpConfirmation from './components/SignUpConfirmation/SignUpConfirmation';
import Login from './components/Login/login'
import ProfileCreation from './components/ProfileCreation/ProfileCreation';
import EditProfile from './components/EditProfile/editProfile';
import Search from './components/Search/search';
import ForgotPassword from './components/ForgotPassword/forgotPassword';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';
import OfficialRoute from './components/PrivateRoute/OfficialRoute.js';
import { AuthProvider } from './context/AuthContext.js';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Helmet>
            <title>Charody</title>
          </Helmet>
          <Navbar/>
          <Route exact path="/" component={Home}/>
          <Route path='/aboutUs' component={AboutUs}/>
          <Route path='/signUp/:type' component={SignUp}/>
          <Route path='/signupConfirmation' component={SignUpConfirmation}/>
          <Route path='/login' component={Login}/>
          <PrivateRoute path='/profileCreation'><ProfileCreation/> </PrivateRoute>
          <PrivateRoute path='/editProfile'> <EditProfile/> </PrivateRoute>
          <OfficialRoute path='/search'> <Search/> </OfficialRoute>
          <Route path='/forgotPassword' component={ForgotPassword}/>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
