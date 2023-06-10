import { useParams } from "react-router-dom"
import data from "../../data/product.json"
const Detail = () => {
  const {id} = useParams()
  
  const findProduct = data.items.find((product)=>{
    return product.id === id;
  })

  console.log(findProduct)
  return (
    <div>
      <h1>Detalle del producto</h1>
      <img src={findProduct.imageUrl} alt=""/>
      <h3>{findProduct.name}</h3>
      <h3>Precio: {findProduct.price}</h3>
      <p>{findProduct.description}</p>
      <ul>
          {findProduct.sizes.map((size)=><li>{size}</li>)}
      </ul>
    </div>
  )
}

export default Detail
