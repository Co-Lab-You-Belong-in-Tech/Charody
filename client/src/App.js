import { HashRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import Home from './components/HomePage/home'
import AboutUs from './components/AboutUs/aboutUs'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <Route path='/AboutUs' component={AboutUs}/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
