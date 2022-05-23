import { HashRouter as Router, Route } from 'react-router-dom'

// components
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
// pages
import Home from './components/HomePage/home'
import AboutUs from './components/AboutUs/aboutUs'
import SignUp from './components/SignUp/signUp'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <Route path='/aboutUs' component={AboutUs}/>
        <Route path='/signUp' component={SignUp}/>
        {/* <Route path='/' component={}/> */}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
