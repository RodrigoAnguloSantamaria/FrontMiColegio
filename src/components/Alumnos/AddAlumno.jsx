import React, { useState, useEffect } from 'react'
import { API } from "../../services/api"
import "./alumnos.css"

const initial_state={
    nombre:"",
    apellidos:"",
    edad:0,
    curso:[],
    profesores:[],
    asignaturas:[],
    contacto1:"",
    contacto2:"",
    foto:""

}



const AddAlumno = () => {
// crear logica para acargar el select de curso
const [cursos,setCursos]=useState([]);
const [asignaturas,setAsignaturas]=useState([]);
const [profesores,setProfesores]=useState([]);
const [formState, setFormState] = useState(initial_state);

const handleInput =(event)=>{
    const {name, value} = event.target
   
    setFormState({...formState, [name]:value})

}

const handleSelect =(event)=>{
   // console.log(event.target)
    const {name, value} = event.target
   
    setFormState({...formState, [name]:value})

}

useEffect(()=>{
    API.get("/cursos")
    .then((res)=>{
        setCursos(res.data)
        
    })
  },[])
  
  const curso = cursos.map((cur,i)=>{
        return (
            <option key={i} value={cur._id}>{cur.nombre}</option>
        )
  })

  useEffect(()=>{
    API.get("/asignaturas")
    .then((res)=>{
        setAsignaturas(res.data)
        
    })
  },[])
 
  const asignatura = asignaturas.map((asig,i)=>{
        return (
            
           <span key={i} className='c-alumnos__span'> 
           <input type="checkbox" id="asignaturas" value={asig._id} />
           {asig.nombre}
           </span>
            
        )
  })

  useEffect(()=>{
    API.get("/profesores")
    .then((res)=>{
        setProfesores(res.data)
        
    })
  },[])
  
  const profesor = profesores.map((profe,i)=>{
        return (
            
           <span key={i} className='c-alumnos__span'> 
           <input type="checkbox" id="profesores" value={profe._id} />
           {profe.nombre}
           </span>
            
        )
  })

  
  return (
    <form className='c-alumnos__form'>
      <label htmlFor="name"> Nombre:<input id="name" name="nombre" type="text" onChange={handleInput}/> </label>
      <label htmlFor="apellidos"> Apellidos:<input id="apellidos" name="apellidos" type="text" onChange={handleInput}/></label>
      <label htmlFor="edad"> Edad:<input id="apellidos" name="edad" type="number" onChange={handleInput}/></label>
      <label htmlFor="phone"> Telefono:<input id="phone" name="contacto1" type="text" onChange={handleInput}/> </label>
      <label htmlFor="email"> Email:<input id="email" name="contacto2" type="text" onChange={handleInput}/> </label>
      <select className='c-alumnos__select' name="curso" onChange={handleSelect}><option>Curso:</option>{curso}</select>
      <h4>Asignaturas:</h4>
      <label htmlFor='asignaturas' className='c-alumnos__asignaturas'>{asignatura}</label>
      <h4>Profesores:</h4>
      <label htmlFor='profesores' className='c-alumnos__asignaturas'>{profesor}</label>
      {/* <input type="submit" value="Enviar" onClick={handleClick}/>
      <input type="button" value="Resetear" onClick={handleCancel}/> */}
    </form>
  )
}

export default AddAlumno
