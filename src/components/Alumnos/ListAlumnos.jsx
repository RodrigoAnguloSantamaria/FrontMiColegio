
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API } from "../../services/api"
import "./alumnos.css"

const ListAlumnos = () => {

const [dataAlumnos,setDataAlumnos]=useState([]);

useEffect(()=>{
  API.get("/alumnos")
  .then((res)=>{
      setDataAlumnos(res.data)
      
  })
},[])

//console.log(dataAlumnos)

const item = dataAlumnos.map((alumn,i)=>{
  console.log(alumn.curso[0])
  
    return (
      <li key={i} className="c-alumnos__li">
        <h3>{alumn.nombre} {alumn.apellidos}</h3>
        <p>{alumn.edad}</p>
        {/* <p>Curso: {alumn.curso[0].nombre}</p> */}
      </li>
    )
})






  return (
  
    // <p>aqui el listado de alumnos</p>
    <ul className="c-alumnos__ul">
       {item}
    </ul>
     
  )
}

export default ListAlumnos