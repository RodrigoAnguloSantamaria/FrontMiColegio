import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API } from "../../services/api"
import "./alumnos.css"

const Alumno =  () => {

  const {id} = useParams()
  
 const [dataAlumno,setDataAlumno]=useState({});

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
    console.log(id)
    API.delete(`/alumnos/${id}`)
     .then((res)=>{
      return (
      <div><p>Alumno ${dataAlumno.nombre} ${dataAlumno.apellidos} borrado</p>
      </div>
      )
      
  })

}
const handlemodify =()=>{
    console.log(id)
}
 

  console.log(dataAlumno)
return (
    <div className="c-alumnos__div">
      <h3>Nombre: {dataAlumno.nombre} {dataAlumno.apellidos}</h3>
        <p>Edad: {dataAlumno.edad}</p>
        <p>Curso: {dataAlumno.curso[0] ? dataAlumno.curso[0].nombre : ""}</p>
        <p>Contacto: {dataAlumno.telefono} - {dataAlumno.correo}</p>
        <input type="button" value="modificar" onClick={handlemodify}/>
        <input type="button" value="borrar" onClick={handleDelete}/>
    </div>
  )
}

export default Alumno
