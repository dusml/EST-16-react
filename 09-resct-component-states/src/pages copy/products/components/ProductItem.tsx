import type { ProductType } from '../types/data'


interface Props {
  product : ProductType
}



function ProductItem({product}:Props) {
  const { name, price, inStock} = product
  // console.log(product);
  const style = `product ${inStock ? '' : 'sold-out'}`;
  
  return (
    <li className={style}>
      <strong>{name}</strong>
      <span className="price">{price}원</span>
      <span className="badge">{product.inStock ? '재고 있음' : '재고 없음'}</span>
    </li>
  )
}
export default ProductItem