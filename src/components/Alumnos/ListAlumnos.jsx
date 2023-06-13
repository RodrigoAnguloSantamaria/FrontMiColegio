
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API } from "../../services/api"
import "./alumnos.css"
import NavAlumnos from "../NavAlumnos/NavAlumnos"

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
 //console.log(alumn)
    return (
      <>
      
      <li key={i} className="c-alumnos__li">
        <Link to={`/alumnos/${alumn._id}`}>
        <img src={alumn.foto} alt={alumn.nombre} className="c-alumnos__img"/>
        <h3>Nombre: {alumn.nombre} {alumn.apellidos}</h3>
        <p>Edad: {alumn.edad}</p>
        <p>Curso: {alumn.curso[0] ? alumn.curso[0].nombre : ""}</p>
        <p>Contacto: {alumn.telefono} - {alumn.correo}</p>
        </Link>
      </li>
      </>
    )
})






  return (
    <>   

    
    <ul className="c-alumnos__ul">
       {item}
    </ul>
    </>

  )
}

export default ListAlumnos