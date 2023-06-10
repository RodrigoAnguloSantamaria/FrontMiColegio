import {Link, Route,Routes} from "react-router-dom"
import ListAlumnos from "../Alumnos/ListAlumnos"

const NavAlumnos = () => {
  return (
    <>
        <nav>
            <ul>
                <li><Link to="/alumnos/add">Añadir alumno</Link></li>
                <li><Link to="/alumnos/list">Listar alumnos</Link></li>
                <li><Link to="/alumnos/modify">Modificar alumno</Link></li>
                <li><Link to="/alumnos/delete">Borrar alumno</Link></li>

            </ul>
        </nav>
        <Routes>
             <Route path="/alumnos/list" element={<ListAlumnos/>}/>
        </Routes>
    </>
    )
}

export default NavAlumnos
