import { useParams,Navigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { API } from "../../services/api"
import Resultado from "./Resultado"
import "./alumnos.css"

const Alumno =  () => {

  const {id} = useParams()
  
 const [dataAlumno,setDataAlumno]=useState({});
 const [mensaje, setMensaje]=useState("");


    useEffect(()=>{
        API.get(`/alumnos/${id}`)
         .then((res)=>{
            setDataAlumno(res.data)
            
        })
      },[id])


      if (Object.keys(dataAlumno).length === 0) {
        return <div>Loading...</div>;
      }

const handleDelete =()=>{
    
    API.delete(`/alumnos/${id}`)
     .then((res)=>{
      setMensaje(`aAllmno elimindao ${dataAlumno.nombre}`)
     
  })
  

}
const handleModify = () =>{
  <Navigate to={`/alumnos/modify/${dataAlumno._id}`} />
}

 

  console.log(dataAlumno)
return (
  
    <div className="c-alumnos__div">
      <h3>Nombre: {dataAlumno.nombre} {dataAlumno.apellidos}</h3>
        <p>Edad: {dataAlumno.edad}</p>
        <p>Curso: {dataAlumno.curso[0] ? dataAlumno.curso[0].nombre : ""}</p>
        <p>Contacto: {dataAlumno.telefono} - {dataAlumno.correo}</p>
        <Link to={`/alumnos/modify/${dataAlumno._id}`}><input type="button" value="modificar"/> </Link>
        <input type="button" value="borrar" onClick={handleDelete}/>
      {mensaje}
    </div>
    
  )
}

export default Alumno
