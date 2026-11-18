import { useId } from "react";



interface Props {
  searchTerm:string;
  onSearch:(product:string) => void;
}



function ProductSearch({searchTerm , onSearch}:Props) {

  const id = useId();
  // console.log(onSearch); 함수가 전달 함수를 실행 시키기 위해 함수 사용..??
  const handleSearch_ = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    // 검색창에서 변경된 입력값을 가져온다.
    const value = e.target.value;
    // console.log(value); 벨루 확인..
    
    
    onSearch(value)
  }
  


  return (
    <div className="ProductSearch">
      <label htmlFor={id}>상품 검색</label>
      <input
        id={id}
        type="search"
        placeholder="상품 이름 입력"
        defaultValue = {searchTerm}
        onChange={handleSearch_}
      />
    </div>
  )
}
export default ProductSearch