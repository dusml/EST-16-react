
interface Props {
  totalProductCount:number;
  filteredProductsCount:number
}

function ProductCount({totalProductCount,filteredProductsCount}:Props) {
  return (
    <p className="ProductCount">
      전체 <b>{totalProductCount}</b>개 중 <b>{filteredProductsCount}</b>개 표시
    </p>
  )
}
export default ProductCount