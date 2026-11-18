import { useId } from "react";

interface Props {
  onToggle: ()=> void;
  stockOnly:boolean;
}


function ProductStockFiler({onToggle, stockOnly}:Props) {

  const id = useId();
  //아이디 지정


  return (
    <div className="StockFilter">
      <input type="checkbox" id={id} onChange={onToggle} checked={stockOnly}/>
      <label htmlFor={id}>재고 있는 상품만 보기</label>
    </div>
  )
}
export default ProductStockFiler