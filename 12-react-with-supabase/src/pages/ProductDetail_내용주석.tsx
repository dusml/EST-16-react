import { useParams } from "@/router/RouterProvider"
import type { Tables } from "@/supabase/database.types";
import supabase from "@/supabase/supabase";
import { useEffect, useState } from "react";


type Product = Tables<'products'>

/*
  [추가 정리 - Supabase 타입 가져오기]

  Tables는 Supabase의 데이터베이스 구조를 기반으로
  생성된 타입을 가져오기 위한 타입 도우미이다.

  Tables<'products'>를 사용하면 products 테이블의
  한 행에 해당하는 데이터 구조를 타입으로 가져올 수 있다.

  상품 데이터의 타입을 직접 하나씩 작성하지 않고
  기존에 생성된 데이터베이스 타입을 재사용하는 것이다.

  import type은 실제 실행에 필요한 값이 아니라
  TypeScript의 타입만 가져오는 문법이다.
*/


function ProductDetail() {

  const {id} = useParams();

  /*
    [추가 정리 - 동적 라우팅]

    useParams()는 URL의 동적 경로 매개변수를
    가져오기 위해 만든 커스텀 훅이다.

    /Product/13으로 접근했다면
    구조분해 할당을 통해 id 값인 '13'을 꺼낸다.

    해당 id를 이용하여 상품 상세 정보를 조회한다.
  */


  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
    [추가 정리 - 상품 상세 데이터 상태 관리]

    product : 조회한 상품 정보를 저장한다.
    loading : 데이터를 불러오는 중인지 확인한다.
    error : 데이터 요청 중 발생한 오류 메시지를 저장한다.

    product는 상품 객체 또는 null을 저장한다.
    loading은 boolean 값을 저장한다.
    error는 문자열 또는 null을 저장한다.

    상태가 변경되면 React가 리렌더링하여
    변경된 정보를 화면에 반영한다.
  */


  // supabase의 메서드를 사용해 id에 맞는 item을 조회하세요.
  // .eq, .single
  // .eq     = 해당 속성이 일치하는 항목만 조회
  // .single = 조회 대상을 객체로 반환 받음.

  // useEffect를 사용함
  // supabase 통신
  // 비동기 함수
  // useEffect안에서 비동기 함수를 만들어서 실행
  // supabase.from(테이블 이름).select(항목).eq('A', A).single()


  useEffect(() => {

    // 안전 장치
    if (!id) return;
    let ignore = false;

    /*
      [추가 정리 - 안전 장치]

      id가 없다면 조회할 상품을 알 수 없으므로
      return을 사용하여 함수 실행을 종료한다.

      이러한 방식을 Early Return이라고 한다.

      ignore는 이전 비동기 요청의 결과를
      무시할지 판단하기 위한 변수이다.

      false : 요청 결과를 반영한다.
      true : 요청 결과를 무시한다.
    */


    const fetchProduct = async () => {
      setLoading(true);

      /*
        [추가 정리 - 비동기 함수 및 로딩 시작]

        Supabase와 통신하는 작업은 비동기 작업이다.

        useEffect의 콜백 함수 자체를 async로 선언하지 않고,
        내부에 별도의 비동기 함수를 만들어 실행한다.

        요청을 시작하기 전에 setLoading(true)를 실행하여
        데이터를 불러오는 중이라는 상태를 저장한다.
      */


      const {data, error} = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      /*
        [추가 정리 - Supabase 상품 상세 데이터 조회]

        supabase는 별도의 파일에서 생성한
        Supabase 클라이언트 객체이다.

        Supabase에서 제공하는 SDK를 사용하여
        데이터베이스에 접근하고 데이터를 조회한다.

        await
        비동기 요청의 응답이 올 때까지 기다린다.

        .from('products')
        데이터를 조회할 products 테이블을 선택한다.

        .select('*')
        해당 테이블의 모든 컬럼을 조회한다.

        .eq('id', id)
        id 컬럼의 값이 현재 id 변수의 값과
        일치하는 상품만 조회한다.

        첫 번째 'id'는 데이터베이스의 컬럼 이름이고,
        두 번째 id는 URL에서 가져온 상품 ID 변수이다.

        .single()
        정확히 한 행을 조회하여 배열이 아닌
        하나의 객체 형태로 반환받는다.

        구조분해 할당을 통해 응답 객체에서
        data와 error를 꺼내 사용한다.

        data : 조회한 상품 데이터
        error : 요청 중 발생한 오류 정보
      */


      // console.log(data, error);


      if(ignore) return;

      /*
        [추가 정리 - 이전 요청 결과 무시]

        ignore가 true라면 이전 요청의 결과이므로
        상태를 변경하지 않고 함수 실행을 종료한다.

        이전 상품의 응답이 뒤늦게 도착하여
        현재 상품 정보를 덮어쓰는 것을 방지한다.
      */


      if(error){
        console.error('상품 조회 실패 : ',error);
        setError('상품을 불러올 수 없습니다.');
      }else{
        setProduct(data);
      }
      setLoading(false);

      /*
        [추가 정리 - 요청 결과에 따른 상태 변경]

        요청에 실패했다면 console.error()를 통해
        개발자에게 오류 정보를 보여준다.

        setError()를 사용하여 사용자에게 보여줄
        오류 메시지를 상태에 저장한다.

        요청에 성공했다면 setProduct(data)를 통해
        가져온 상품 정보를 상태에 저장한다.

        무시되지 않은 요청의 처리가 끝나면
        setLoading(false)를 통해 로딩을 종료한다.
      */
    }


    fetchProduct();

    /*
      함수를 선언하는 것만으로는 실행되지 않으므로
      fetchProduct()를 호출하여 비동기 작업을 실행한다.
    */


    return () => {
      ignore = true;
    }

  },[id])

  /*
    [추가 정리 - 클린업 함수와 의존성 배열]

    useEffect의 return으로 반환하는 함수를
    클린업 함수(Cleanup Function)라고 한다.

    컴포넌트가 언마운트되거나 id가 변경되어
    기존 Effect가 정리될 때 클린업 함수가 실행된다.

    ignore를 true로 변경하여 이전 요청의 결과가
    현재 상태에 반영되지 않도록 한다.

    의존성 배열에 [id]를 작성했기 때문에
    최초 마운트 및 id가 변경될 때 Effect가 실행된다.
  */


  if(loading) return <p>상품 정보 불러오는 중.....</p>
  if(error || !product) return <p>{error ?? '해당 상품이 존재하지 않습니다.'}</p>

  /*
    [추가 정리 - 조건부 렌더링]

    loading이 true라면 로딩 화면을 보여준다.

    error가 존재하거나 product가 없다면
    오류 또는 상품 없음 안내 화면을 보여준다.

    ??는 널 병합 연산자이다.

    error가 null 또는 undefined라면
    기본 안내 메시지를 사용한다.

    Early Return을 활용하여 로딩 및 오류 상황을
    먼저 처리한 후 정상적인 상품 화면을 렌더링한다.
  */


  return (
    // <div>ProductDetail: {id}</div>
    <div>{product.name}</div>
  )

  /*
    상품 데이터를 정상적으로 가져왔다면
    product 객체의 name 속성에 접근하여
    상품 이름을 화면에 보여준다.
  */
}

export default ProductDetail


// 1. URL에서 상품 ID를 가져온다.

// 2. 상품 데이터를 저장할 상태를 만든다.

// 3. 로딩 상태를 만든다.

// 4. 오류 상태를 만든다.

// 5. 상품 ID가 변경되면 데이터를 요청한다.

// 6. 상품 ID가 존재하는지 확인한다.

// 7. 이전 요청을 무시하기 위한 변수를 만든다.

// 8. 비동기 함수를 선언한다.

// 9. 로딩을 시작한다.

// 10. Supabase에서 해당 상품 하나를 조회한다.

// 11. 무시해야 하는 요청인지 확인한다.

// 12. 실패했다면 오류를 저장한다.

// 13. 성공했다면 상품 정보를 저장한다.

// 14. 로딩을 종료한다.

// 15. 비동기 함수를 호출한다.

// 16. 클린업 함수를 작성한다.

// 17. 로딩 중이라면 로딩 화면을 보여준다.

// 18. 오류가 있거나 상품이 없다면 안내 화면을 보여준다.

// 19. 상품 정보를 화면에 보여준다.