import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/login/Login';
import Pilot from './Components/pilot/Pilot';
import Home from './Components/home/Home';
import CadastrarProfessor from './Components/professores/cadastrar/CadastrarProfessor';
import ListarProfessores from './Components/professores/listar/ListarProfessores';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Pilot/>} />
        <Route path='Login' element={<Login/>}/>
        <Route path='*' element={<Pilot/>} />
        <Route path='/Home' element={<Home/>}/>
        <Route path='/professores/cadastrarProfessor' element={<CadastrarProfessor/>}/>
        <Route path='/professores/listarProfessores' element={<ListarProfessores/>}/>
      </Routes>
    </Router>
  );
}

export default App;
