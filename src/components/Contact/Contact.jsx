import { useState } from "react"
import { API } from "../../services/api"

const initial_state={
    name:"",
    email:"",
    mascota:""
}
const Contact = () => {
    const [formState, setFormState] = useState(initial_state);
    const handleInput =(event)=>{
        const {name, value} = event.target
        setFormState({...formState, [name]:value})

    }
const handleCancel = ()=>{
    setFormState(initial_state)
}

const handleClick=()=>{
    API.post("/personas", formState)
    .then((res)=>{
        console.log(res.data)
    })
}



  return (
   <div>
    <form onSubmit={(event)=>event.preventDefault}>
        <label htmlFor="name">Nombre  </label>
        <input type="text" id="name" name="name" onChange={handleInput} value={formState.name}/>

        <label htmlFor="email">Email  </label>
        <input type="text" id="email" name="email" onChange={handleInput} value={formState.email}/>

        <br/>
        <label htmlFor="">Tiene mascota</label>
        <input type="radio" name="mascota" id="" value="si"  onChange={handleInput} checked={formState.mascota === "si"}/>Si
        <input type="radio" name="mascota" id="" value="no" onChange={handleInput} checked={formState.mascota === "no"}/>No
        <br/>

        <input type="submit" value="contacta" onClick={handleClick}/>
        <input type="button" value="cancelar" onClick={handleCancel}/>
    </form>
   </div>
  )
}

export default Contact
