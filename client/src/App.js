import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

// components
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
// pages
import Home from './components/HomePage/home'
import AboutUs from './components/AboutUs/aboutUs'
import SignUp from './components/SignUp/signUp'
import Login from './components/Login/login'
import ProfileCreation from './components/ProfileCreation/ProfileCreation';
import EditProfile from './components/EditProfile/editProfile';
import Search from './components/Search/search';
import ForgotPassword from './components/ForgotPassword/forgotPassword';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Home}/>
          <Route path='/aboutUs' component={AboutUs}/>
          <Route path='/signUp/:type' component={SignUp}/>
          <Route path='/login' component={Login}/>
          <PrivateRoute path='/profileCreation'><ProfileCreation/> </PrivateRoute>
          <PrivateRoute path='/editProfile'> <EditProfile/> </PrivateRoute>
          <PrivateRoute path='/search'> <Search/> </PrivateRoute>
          <Route path='/forgotPassword' component={ForgotPassword}/>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
