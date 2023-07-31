import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/login/Login';
import Pilot from './Components/pilot/Pilot';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Pilot/>} />
        <Route path='Login' element={<Login/>}/>
        <Route path='*' element={<Pilot/>} />
      </Routes>
    </Router>
  );
}

export default App;
