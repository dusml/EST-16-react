


import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ProductStockFiler from "./components/ProductStockFiler";
import "./ProductPage.css";
import { productData } from "./data";
import ProductCount from "./components/ProductCount";

// console.log(productData);


/*
  [실습] 아래 마크업을 컴포넌트로 분리하고, 상태를 연결해 보세요.
  - 상품 데이터: ./data.ts 의 productData
  - 검색어로 상품 이름 필터링
  - "재고 있는 상품만 보기" 체크 시 재고 있는 상품만 표시
  - 표시 개수 / 전체 개수 출력
*/


function ProductPage() {

  ;
  //상태선언
  // 사용자가 입력한 상품 검색어를 관리한다.
  const [searchTerm, setSearchTerm] = useState('')

  // 재고 있는 상품만 볼지 관리한다.
  const [stockOnly, setStockOnly] = useState(false);

  //상태 업데이트
  const handleSearch = (product:string) => setSearchTerm(product);

  // 상품 이름에 검색어가 포함된 상품만 남긴다.
  /* const filteredProducts = productData.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())); */
  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
    && (!stockOnly || product.inStock)
  );
  //리스트도 바뀌여야 한다. 그해서..

  // 체크박스 이벤트
  const handleToggleProductStockFiler = () => setStockOnly(!stockOnly)

  return (
    <div className="ProductPage">
      <h1>상품 목록</h1>

      <ProductSearch searchTerm={searchTerm} onSearch={handleSearch}/>

      <ProductStockFiler onToggle= {handleToggleProductStockFiler} stockOnly={stockOnly}/>

      {/* <ProductList productData={productData}/> */}
      <ProductList productData={filteredProducts}/>

      <ProductCount 
        totalProductCount={productData.length}
        filteredProductsCount = {filteredProducts.length}
      />
    
      
    </div>
  );
}
export default ProductPage;