import "./Home.css"
import data from "../../data/product.json"
import { Link } from "react-router-dom"

const Home = () => {

    const productLi = data.items.map((product)=>{
        return <li key={product.id}>
            <Link to={`/product/${product.id}`}>
                <img src={product.imageUrl} alt={product.description}/>
                <h3>{product.name}</h3>
            </Link>
        </li>
    })
  return (
    <>
    <img src="https://i.blogs.es/c68014/casa-3d/840_560.jpeg"
     alt="casa"/>
     <ul>
        {productLi}
     </ul>
    </>
  )
}

export default Home
