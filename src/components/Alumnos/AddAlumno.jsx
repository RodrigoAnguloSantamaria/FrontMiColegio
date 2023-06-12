import React, { useState, useEffect } from 'react'
import axios from "axios";
import { API } from "../../services/api"
import { useForm, useFormState } from "react-hook-form";
import "./alumnos.css"




// objeto inicial para controlar estado del formulario 
const initial_state={
    nombre:"",
    apellidos:"",
    edad:0,
    curso:[],
    profesores:[],
    asignaturas:[],
    correo:"",
    telefono:"",
    foto:""

}



const AddAlumno = () => {

            // variables de estado y sus seteadores
        const [cursos,setCursos]=useState([]);
        const [asignaturas,setAsignaturas]=useState([]);
        const [profesores,setProfesores]=useState([]);
        const [formState, setFormState] = useState(initial_state);
        const { register, handleSubmit, getValues } = useForm();

            // conttolar el estado de los inputs
        const handleInput =(event)=>{
            const {name, value} = event.target
        
        
            setFormState({...formState, [name]:value})

        }

            // controlar el estado del select
        const handleSelect =(event)=>{
        
            const {name, value} = event.target
        
            setFormState({...formState, [name]:value})

        }

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

        // llamada a api para obtener cursos
        useEffect(()=>{
            API.get("/cursos")
            .then((res)=>{
                setCursos(res.data)
                
            })
        },[])
        
        // mapeo la respuesta de la api para cargar el nodo select con los cursos
        const curso = cursos.map((cur,i)=>{
                return (
                    <option key={i} value={cur._id}>{cur.nombre}</option>
                )
        })


        // llamada a api para obtener asignaturas
        useEffect(()=>{
            API.get("/asignaturas")
            .then((res)=>{
                setAsignaturas(res.data)
                
            })
        },[])
        
        // mapeo la respuesta de la api para cargar lso checkboxs con las asignaturas
        const asignatura = asignaturas.map((asig,i)=>{
                return (
                    
                <span key={i} className='c-alumnos__span'> 
                <input type="checkbox" name="asignaturas" value={asig._id} onChange={handleCheck}/>
                {asig.nombre}
                </span>
                    
                )
        })

        // llamada a api para obtener profesores
        useEffect(()=>{
            API.get("/profesores")
            .then((res)=>{
                setProfesores(res.data)
                
            })
        },[])
        // mapeo la respuesta de la api para cargar lso checkboxs con las profesores
        const profesor = profesores.map((profe,i)=>{
                return (
                    
                <span key={i} className='c-alumnos__span'> 
                <input type="checkbox" name="profesores" value={profe._id}  onChange={handleCheck}/>
                {profe.nombre}
                </span>
                    
                )
        })

        const handleCancel = ()=>{
            setFormState(initial_state)
        }

        const handleClick=  ()=>{
           // event.preventDefault();
           // console.log(data) // este log da el file del input type=file del formulario
            // let newContacto=[];
            // newContacto.push(formState.contacto1,formState.contacto2)
          
            // let newAlumno = new FormData();
            // newAlumno.append("nombre", formState.nombre);
            // newAlumno.append("apellidos",formState.apellidos);
            // newAlumno.append("edad",formState.edad);
           
            // newAlumno.append("curso",formState.curso);
            // newAlumno.append("profesores",formState.profesores);
            // newAlumno.append("asignaturas",formState.asignaturas);
            // newAlumno.append("contacto",newContacto);
           
            // newAlumno.append("foto", getValues("file")[0]);
            // for (var key of newAlumno.entries()) {
            //     console.log(key[0] + ', ' + key[1]);
            // }
           


        //    console.log(newAlumno)
        //     console.log(formState)
        //     API.post("/alumnos", newAlumno,{
               
        //     })
        //     .then((res)=>{
        //         console.log(res.data)
        //     })
        //   .catch(function (error) {
        //         console.log(error);
        //    });
        
            axios.post("http://localhost:5800/alumnos",formState)
              .then((response) => {
                //setResponse(response.data)
                console.log(response.data)
              })
              .catch(function (error) {
                console.log(error);
           });
        }
  
  return (
    //<form className='c-alumnos__form' onSubmit={(event)=>event.preventDefault}>
    <form className='c-alumnos__form' onSubmit={(event)=>event.preventDefault}>
   
      <label htmlFor="name"> Nombre:<input id="name" name="nombre" type="text" onChange={handleInput}/> </label>
      <label htmlFor="apellidos"> Apellidos:<input id="apellidos" name="apellidos" type="text" onChange={handleInput}/></label>
      <label htmlFor="edad"> Edad:<input id="apellidos" name="edad" type="number" onChange={handleInput}/></label>
      <label htmlFor="telefono"> Telefono:<input id="telefono" name="telefono" type="text" onChange={handleInput}/> </label>
      <label htmlFor="correo"> Email:<input id="correo" name="correo" type="text" onChange={handleInput}/> </label>
      <select className='c-alumnos__select' name="curso" onChange={handleSelect}><option>Curso:</option>{curso}</select>
      <h4>Asignaturas:</h4>
      <label htmlFor='asignaturas' className='c-alumnos__asignaturas'>{asignatura}</label>
      <h4>Profesores:</h4>
      <label htmlFor='profesores' className='c-alumnos__asignaturas'>{profesor}</label>
      <label htmlFor='foto'>Foto:<input type="file" name="foto" {...register("file")}/></label>
      {/* <input type="submit" value="Enviar" onClick={handleClick}/> */}
      <input type="submit" value="Enviar" onClick={handleClick}/>
      <input type="button" value="Resetear" onClick={handleCancel}/>
    </form>
  )
}

export default AddAlumno
