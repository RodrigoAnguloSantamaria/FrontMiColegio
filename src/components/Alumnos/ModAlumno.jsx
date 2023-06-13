import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { API } from "../../services/api"
import axios from "axios";

const ModAlumno = (cursosprop) => {
    
    const {id} = useParams();
   console.log(cursosprop)
    // const [dataAlumno,setDataAlumno]=useState({});
    //const [cursos,setCursos]=useState(cursosprop);
    const [formState, setFormState] = useState({});
    const [asignaturas,setAsignaturas]=useState([]);
    const [profesores,setProfesores]=useState([]);
// controlar el estado de los checkbox
const handleCheck =(event)=>{
        
    const {name, value, checked } = event.target
    
    if (checked){
    let newArray = [...formState[name]].includes(value)
    if (newArray === false){
        setFormState({...formState,
            [name]: [...formState[name], value]
            })
        }
    }
    else{
        let newArray = [...formState[name]].filter(id => id !== value)
        console.log(newArray)
        console.log(`new array : ${newArray} y valor a quitar: ${value}`)
        setFormState({...formState,
            [name]: newArray
            })

    }

}
// conttolar el estado de los inputs
const handleInput =(event)=>{
    const {name, value} = event.target


    setFormState({...formState, [name]:value})

}
const handleInputImg = (ev) => {
    const value = ev.target.files[0];
    const {name} = ev.target;
    
    setFormState({...formState, [name]: value})
     
}

    // controlar el estado del select
    const handleSelect =(event)=>{
        
        const {name, value} = event.target
    
        setFormState({...formState, [name]:value})

    }

// llamada a api para obtener cursos
// useEffect(()=>{
//     API.get("/cursos")
//     .then((res)=>{
       
//         setCursos(res.data)
        
//     })

     
// },[])

// llamada a api para obtener asignaturas
useEffect(()=>{
    API.get("/asignaturas")
    .then((res)=>{
        setAsignaturas(res.data)
        
    })
},[])
// llamada a api para obtener profesores
useEffect(()=>{
    API.get("/profesores")
    .then((res)=>{
        setProfesores(res.data)
        
    })
},[])
    useEffect(()=>{
        API.get(`/alumnos/${id}`)
         .then((res)=>{
            setFormState(res.data)
            
        })
      },[id])

     
/// comprueba si el objeto formState tiene keys y asi espero a que se cargue para poder seguir con la logica
// sino ponemos esto cuando va a la siguiente funcion formstate esta vacio y en el primer if da error por undefined
if ((Object.keys(formState).length === 0)) {
    return <div>Loading...</div>;
    
  }

  

 
 // mapeo la respuesta de la api para cargar el nodo select con los cursos
console.log(formState.curso)
 const cursomap = ()=> { return  cursosprop.cursosprop.map((cur,i)=>{
    if(formState.curso.length === 0){
        return (
        
            <option key={i} value={cur._id}>{cur.nombre}</option>
        )
    }
    else if (cur.nombre === formState.curso[0].nombre){
        return(
        <option selected key={i} value={cur._id}> {cur.nombre}</option>
        )
    }
   
})
 }


// mapeo la respuesta de la api para cargar lso checkboxs con las asignaturas
const asignatura = asignaturas.map((asig,i)=>{
      let asigExists=false;
        for (const iterator of formState.asignaturas) {
            
            if (iterator._id === asig._id){
                asigExists=true;
            }
        }
        // controlamos si la asignatura que se esta mapeando esta en el array de asignaturas de nuestro alumno a modificar
        // si está renderizamos el checkbox con defaultCheckedvalue
        if (asigExists === true){
            return (
                <span key={i} className='c-alumnos__span'> 
                {/* <input type="checkbox" name="asignaturas" value={asig._id} onChange={handleCheck}/> */}
                <input type="checkbox" name="asignaturas" value={asig._id} defaultChecked  onChange={handleCheck}/>
                {asig.nombre}
                </span>
                )
        }  
        else{
            return (
                <span key={i} className='c-alumnos__span'> 
                {/* <input type="checkbox" name="asignaturas" value={asig._id} onChange={handleCheck}/> */}
                <input type="checkbox" name="asignaturas" value={asig._id}  onChange={handleCheck}/>
                {asig.nombre}
                </span>
                )
        }

     })
        
      // mapeo la respuesta de la api para cargar lso checkboxs con las profesores
      const profesor = profesores.map((profe,i)=>{

       let profExists=false;
        for (const iterator of formState.profesores) {
            
            if (iterator._id === profe._id){
                profExists=true;
            }
        }
        // controlamos si el profesor que se esta mapeando esta en el array de profesores de nuestro alumno a modificar
        // si está renderizamos el checkbox con defaultCheckedvalue
        if (profExists === true){
            return (
                <span key={i} className='c-alumnos__span'> 
                <input type="checkbox" name="profesores" value={profe._id}  defaultChecked  onChange={handleCheck} />
                {profe.nombre}
                </span>
                )
        }  
        else{
            return (
                <span key={i} className='c-alumnos__span'> 
                <input type="checkbox" name="profesores" value={profe._id}  onChange={handleCheck}/>
                {profe.nombre}
                </span>
                    
                )
        }
        
})
const handleClick=  ()=>{
    let newAlumno = new FormData();
            newAlumno.append("nombre", formState.nombre);
            newAlumno.append("apellidos",formState.apellidos);
            newAlumno.append("edad",formState.edad);
           
            newAlumno.append("curso",formState.curso);
            newAlumno.append("profesores",formState.profesores);
            newAlumno.append("asignaturas",formState.asignaturas);
            newAlumno.append("correo",formState.correo);
            newAlumno.append("telefono",formState.telefono);
           
            newAlumno.append("foto", formState.foto);






    axios.put(`http://localhost:5800/alumnos/${id}`,newAlumno)
    .then((response) => {
      //setResponse(response.data)
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
 });
}   

  

  return (
     <form className='c-alumnos__form' onSubmit={(event)=>event.preventDefault}>
   
      <label htmlFor="name"> Nombre:<input id="name" name="nombre" type="text" placeholder={formState.nombre}  onChange={handleInput}/> </label>
      <label htmlFor="apellidos"> Apellidos:<input id="apellidos" name="apellidos" type="text"  placeholder={formState.apellidos} onChange={handleInput}/></label>
      <label htmlFor="edad"> Edad:<input id="apellidos" name="edad" type="number" placeholder={formState.edad} onChange={handleInput}/></label>
      <label htmlFor="telefono"> Telefono:<input id="telefono" name="telefono" type="text"  placeholder={formState.telefono} onChange={handleInput}/> </label>
      <label htmlFor="correo"> Email:<input id="correo" name="correo" type="text"  placeholder={formState.correo} onChange={handleInput}/> </label>
      Curso: <select className='c-alumnos__select' name="curso"  onChange={handleSelect}>{ cursomap()}</select>
       <h4>Asignaturas:</h4>
      <label htmlFor='asignaturas' className='c-alumnos__asignaturas'>{asignatura}</label>
      <h4>Profesores:</h4>
      <label htmlFor='profesores' className='c-alumnos__asignaturas'>{profesor}</label>
      <label htmlFor='foto'>Foto:<input type="file" name="foto"  onChange={handleInputImg}/></label> 
       <input type="submit" value="Enviar" onClick={handleClick}/>
    
      <input type="button" value="Resetear" />
    </form>
  )
}

export default ModAlumno
