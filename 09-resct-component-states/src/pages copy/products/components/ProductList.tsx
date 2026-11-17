import ProductItem from "./ProductItem"
import type { ProductType } from '../types/data'

interface Prop {
  productData: ProductType[];
}

function ProductList({productData}:Prop) {
  return (
    <ul className="ProductList">
      {
        productData.map((product)=>(
          <ProductItem
            key={product.id}
            product = {product}
            />
        ))
      }
    </ul>
  )
}
export default ProductList