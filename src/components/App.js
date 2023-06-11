
import { Routes, Route } from 'react-router-dom';
import '../styles/App.css';
import Navbar from './NavBar/Navbar';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import NotFound from "./NotFound"
import Detail from './Detail/Detail';
import NavAlumnos from './NavAlumnos/NavAlumnos'
import ListAlumnos from './Alumnos/ListAlumnos';
import AddAlumno from './Alumnos/AddAlumno';


function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path="/" element={ <Home />  }/>
        <Route path="/contact" element={ <Contact /> }/>
        <Route path="/product/:id" element={<Detail/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/alumnos/" element={<NavAlumnos/>}/>
        <Route path="/alumnos/list" element={<ListAlumnos/>}/>
        <Route path="/alumnos/add" element={<AddAlumno/>}/>
      </Routes>
    </div>
  );
}

export default App;
