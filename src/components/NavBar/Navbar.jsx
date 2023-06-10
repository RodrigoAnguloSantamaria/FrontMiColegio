import {Link} from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
        <nav>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
                <li><Link to="/alumnos">ALUMNOS</Link></li>

            </ul>
        </nav>
    )
}

export default Navbar
