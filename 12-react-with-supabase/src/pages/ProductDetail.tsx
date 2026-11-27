import { useParams, useRouter } from "@/router/RouterProvider"
import type { Tables } from "@/supabase/database.types";
import supabase from "@/supabase/supabase";
import { useEffect, useState } from "react";
import S from './ProductDetail.module.css'



type Product = Tables<'products'>
// 타입을 가져온다 추가 설명이 필요한 부분

function ProductDetail() {

  const {id} = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');

  const {setHistoryRoute} = useRouter();

  useEffect(() => {
    if (!product) return;
    setName(product.name)
  }, [product]);

  // supabase의 메서드를 사용해 id에 맞는 item을 조회하세요.
  // .eq, .single
  // .eq     = 해당 속성이 일치하는 항목만 조회
  // .single = 조회 대상을 객체로 반환 받음.

  // useEffect를 사용함
  // supabase 통신
  // 비동기 함수
  // useEffect안에서 비동기 함수를 만들어서 실행
  // supabase.from(테이블 이름).select(항목).eq('A',A).single()

  useEffect(() => {

    // 안전 장치
    if (!id) return;
    let ignore = false;

    

    const fetchProduct = async () => {
      setLoading(true);

      const {data, error} = await supabase //결과갑으로 보내야 한다 그래서 await사용 유스 이펙트는 건들면 안되기 때문에 밖에 함수를 만들어 거기에 어씽크 대입 그리고 모르겠으면 일단 받아와라.. 로고로  클라이언드는 규버베이스 파일에거 만들었고, 그걸 계속 사용한다. ..SDK라고 한다. 티트..?? 순대국,.> ㅋㅋㅋㅋ 어디 조회?? 또 확인 셀럭터로 확인 모든 항목은 *로 선언 라고 계행이 된다. 이 데이터들 중에서 내가 원하는 아이디만 가져오고 싶다. 이큐를 사용해서ㅗ아이디만 조회하겠다 근데 그 아이다가 내 이디가 내가 원하는 아이디 가 많다면 그 아이디를 떨구 주세요.. 계소기 확이 하기 힘드니 구조분해 할당으로 해서 하면 된다ㅗ. 그래서 아이디가 떨어지게 된다. 이큐는 특정 대상만 일치하는 대상만 조회를 해준다. 받으면 배열로 떨어지는데 이 대이터를 쓸때 깐다음 사용해야 한다. 그래서 이때 사용하는게 싱글이다. 그려면 배열이 까진 상태로 받을 수 있다. 내가 쉽게 받고 싶으면 싱글을 사용을 한다. 에로도 필요 함으로 에러도 꺼내 놓기 
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      // console.log(data, error);

      if(ignore) return;

      if(error){
        console.error('상품 조회 실패 : ',error);
        setError('상품을 불러올 수 없습니다.');
      }else{
        setProduct(data);
      }
      setLoading(false);
    }


    fetchProduct();

    return () => {
      ignore = true;
    }
  },[id])

  const handleUpdate = async () => {
    // console.log('업데이트!!');
    const {data, error: updateError} = await supabase
    .from('products')
    .update({name})
    .eq('id', id) // 이걸 안넣으면 모든 행을 다 바꿈
    .select()

    if(updateError || !data || data.length === 0){
      alert('상품 수정 실패 :' + (updateError?.message ?? '수정 권한이 없거나 상품이 없습니다.'));
      return false;

    }else{
      alert('상품 수정 완료!');
      return true;
    }
  }

  if(loading) return <p className={S.loading}>상품 정보 불러오는 중.....</p>
  if(error || !product) return <p className={S.error}>{error ?? '해당 상품이 존재하지 않습니다.'}</p>

  return (
    // <div>ProductDetail: {id}</div>
      <div className={S.container}>
      <img src={product.image_url} alt={product.name} className={S.image} />
      {/* <h2 className={S.name}>{product.name}</h2> */}
      <div>
        <input
          className={S.nameInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <p className={S.description}>{product.description}</p>
      <div className={S.priceBox}>
        <span className={S.price}>{product.price.toLocaleString()}원</span>
        {product.sale ? (
          <>
            <span className={S.sale}>할인율: {product.sale}%</span>
            <span className={S.finalPrice}>
              {(product.price - product.price * product.sale * 0.01).toLocaleString()}원
            </span>
          </>
        ) : (
          <span className={S.finalPrice}>{product.price.toLocaleString()}원</span>
        )}
      </div>
      <div className={S.buttonGroup}>
        <button
        type="button"
        onClick={() => {
          handleUpdate()
            .then((ok) => {
              if(!ok) return;
              history.pushState(null, '', '/Product')
              setHistoryRoute('/Product')
            })
        }}
        >EDIT</button>
        <button type="button" onClick={()=>{
        history.pushState(null,'','/Product')
        setHistoryRoute('/Product')
      }}>BACK</button>
      </div>
    </div>
    
  )
}

export default ProductDetail

