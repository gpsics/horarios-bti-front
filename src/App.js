import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/login/Login';
import Pilot from './Components/pilot/Pilot';
import Home from './Components/home/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Pilot/>} />
        <Route path='Login' element={<Login/>}/>
        <Route path='*' element={<Pilot/>} />
        <Route path='/Home' element={<Home/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
