
import { Routes, Route } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { API } from "../services/api"
import '../styles/App.css';
import Navbar from './NavBar/Navbar';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import NotFound from "./NotFound"
import Detail from './Detail/Detail';
import NavAlumnos from './NavAlumnos/NavAlumnos'
import AddAlumno from "./Alumnos/AddAlumno"
import ListAlumnos from "./Alumnos/ListAlumnos"
import Alumno from './Alumnos/Alumno';
import ModAlumno from './Alumnos/ModAlumno';


function App() {
  const [cursos,setCursos]=useState([]);
  useEffect(()=>{
    API.get("/cursos")
    .then((res)=>{
       
        setCursos(res.data)
        
    })
  
     
  },[])
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path="/" element={ <Home />  }/>
        <Route path="/contact" element={ <Contact /> }/>
        <Route path="/product/:id" element={<Detail/>}/>
        <Route path="*" element={<NotFound/>}/>



        <Route path="/alumnos/" element={<NavAlumnos/>}/>
        {/* <Route path="/profesores/" element={<NavProfesores/>}/> */}

        <Route path="/alumnos/list" element={<><NavAlumnos/><ListAlumnos/></>}/>
        <Route path="/alumnos/add" element={<><NavAlumnos/><AddAlumno/></>}/>
        <Route path="/alumnos/:id" element={<><NavAlumnos/><Alumno/></>}/>
        <Route path="/alumnos/modify/:id" element={<><NavAlumnos/><ModAlumno cursosprop={cursos}/></>}/>
        
      </Routes>
    </div>
  );
}

export default App;
