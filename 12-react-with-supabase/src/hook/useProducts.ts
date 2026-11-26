// Supabase 데이터베이스의 자동 생성된 타입을 가져온다.
// 실제 상품 데이터가 아닌 데이터베이스의 구조와 타입 정보이다.
// 타입 정보만 가져오기 때문에 import type을 사용한다.
import type { Database } from "@/supabase/database.types";
// Supabase 서버와 통신하기 위해 만들어 놓은 클라이언트 객체를 가져온다.
// 이 객체를 사용하여 데이터 조회, 회원가입, 로그인 등의 요청을 할 수 있다.
import supabase from "@/supabase/supabase";
import { useEffect, useState } from "react";

// **인덱스 접근 타입(Indexed Access Type)** []를 이용한 것
/*
  Database에는 전체 데이터베이스의 타입 정보가 들어 있다. 그중에서 products 테이블의 Row(상품 한 개) 타입을 꺼내온다.
  이미 만들어진 타입을 사용하기 때문에 상품의 타입을 직접 하나씩 작성하지 않아도 된다.
  꺼내온 타입을 편리하게 사용하기 위해 ProductRow라는 이름을 붙여준다.
*/
type ProductRow = Database['public']['Tables']['products']['Row'];

// 조회
// type ProductType = Tables<'products'>;

// 생성
// type ProductType = TablesInsert<'products'>;

// 수정
// type ProductType = TablesUpdate<'products'>;


function useProducts() {

  // 서버에서 가져온 상품 데이터를 저장하는 상태
  // 처음에는 상품 데이터가 없으므로 null로 설정한다.
  /*
    [추가 설명]
    products : 현재 저장된 상품 데이터
    setProducts : 상품 데이터를 변경하는 상태 변경 함수

    ProductRow는 상품 하나의 타입이고,
    ProductRow[]는 상품 여러 개를 담는 배열 타입이다.

    처음에는 서버에서 데이터를 받지 못했으므로 null로 설정하고,
    이후 상품 배열이 들어올 수 있도록
    ProductRow[] | null 두 가지 타입을 허용한다.
  */
  const [products, setProducts] = useState<ProductRow[] | null>(null);

  // 데이터를 불러오는 중인지 확인하는 상태
  // 처음에는 데이터를 불러오는 중이므로 true로 설정한다.
  /*
    [추가 설명]
    loading : 현재 로딩 상태
    setLoading : 로딩 상태를 변경하는 함수

    true : 데이터를 불러오는 중
    false : 데이터를 불러오는 작업이 끝난 상태

    loading 상태에 따라 로딩 화면 또는 상품 화면을 보여준다.

    <추가 설명>
    loading은 데이터를 불러오는 중인지 기억하는 상태이다.
    데이터를 불러오는 작업이 끝나면 setLoading(false)를 실행한다.

    Product.tsx에서는 이 loading 값을 이용하여
    로딩 화면을 보여줄지 결정한다.

    단, false는 요청이 끝났다는 의미이지
    데이터를 성공적으로 가져왔다는 의미는 아니다.
  */
  const [loading, setLoading] = useState(true);
  
  // useEffect의 콜백 함수에는 async를 직접 사용할 수 없다.
  // 따라서 비동기 작업을 처리하기 위해 내부에 비동기 함수를 별도로 선언한다.
  /*
    [추가 설명]
    React는 리렌더링될 때마다 컴포넌트 함수가 다시 실행된다.

    하지만 렌더링할 때마다 서버에 상품 데이터를
    요청할 필요는 없다.

    따라서 useEffect를 사용하여 필요한 작업의
    실행 시점을 관리한다.

    의존성 배열을 빈 배열([])로 설정하면
    컴포넌트가 처음 마운트될 때 Effect가 실행된다.
  
    [추가 설명 - useEffect]

    React는 상태가 변경되면 리렌더링이 발생하고,
    컴포넌트 함수가 다시 실행된다.

    하지만 렌더링할 때마다 서버에 상품 데이터를
    요청할 필요는 없다.

    따라서 useEffect를 사용하여 작업의 실행 시점을 관리한다.

    의존성 배열을 빈 배열([])로 설정하면
    처음 마운트될 때 Effect가 실행되고,
    일반적인 리렌더링에서는 다시 실행되지 않는다.

    [추가 설명 - useEffect]
    처음에는 상품 데이터가 없으므로 로딩 화면을 보여준다.

    서버에서 상품 데이터를 받아 State를 변경하면
    컴포넌트 함수가 다시 실행된다. (리렌더링)

    그래야 로딩 화면 대신 상품 목록을 보여줄 수 있다.

    그런데 이미 상품 데이터를 받아왔기 때문에
    서버에 다시 상품을 요청할 필요는 없다.

    그래서 useEffect의 의존성 배열을 []로 설정한다.

    이렇게 하면 일반적인 리렌더링이 발생하더라도
    useEffect 내부의 상품 요청 작업은 다시 실행되지 않는다.
  */
  useEffect(() => {
    // ignore 플래그: 컴포넌트가 사라지거나 effect가 다시 실행되면 clean up 함수가 정리한다 -> 요청이 늦게 도착해도 return이 걸림 
    let ignore = false;

    const fetchProducts = async () => {

      // await를 사용하여 서버의 응답을 기다린다.
      // 객체 구조 분해 할당으로 data를 꺼낸다.
      const {data, error } = await supabase
        .from('products')
        .select('*')
        // 원래는 필요한 데이터를 가져 온다. 그때는 픽으로 가져 올수 있다.
        /*
          [추가 설명 - 상품 데이터 요청]

          supabase : 서버와 통신하는 도구
          from() : 어떤 테이블에서 가져올지 선택한다.
          select() : 어떤 데이터를 가져올지 선택한다.

          '*'는 모든 컬럼을 의미한다.

          즉, products 테이블에 저장된
          상품의 모든 컬럼을 조회하기 위한 코드이다.
        */

        /*
          [추가 설명 - 구조 분해 할당]

          Supabase에 데이터를 요청하면 응답을 객체로 받는다.
          응답받은 객체에서 data와 error를 각각 꺼내기 위해
          구조 분해 할당을 사용한다.

          data : 서버에서 가져온 상품 데이터
          error : 요청 과정에서 발생한 오류 정보

          구조 분해 할당을 사용하면 필요한 값을
          하나씩 꺼내지 않고 한 번에 꺼낼 수 있다.

          참고로 select()는 실제 데이터를 선택하는 것이고,
          Pick은 TypeScript에서 필요한 속성의 타입을 선택하는 것이다.
          */
      
      if(ignore) return;

      if(data){
        // 상태 설정 유즈 스테이트
        setProducts(data);
        
      }
      
      setLoading(false);
      
      if(error){
        console.warn('상품정보 불러오기 실패',error);
        return null;
      }
    }

    // 선언한 비동기 함수를 호출하여 상품 데이터를 가져온다.
    fetchProducts();
    return () => {
      ignore = true;
    }


    // 의존성 배열을 빈 배열([])로 설정하면
    // 컴포넌트가 처음 마운트될 때 Effect가 실행된다.
  }, [])

  return {products, loading}
}

export default useProducts;


/*
  const fetchProducts = async () => {

  [추가 설명 - 비동기 함수]

  fetchProducts는 서버에서 상품 데이터를 가져오기 위해
  내가 직접 만든 함수이다.

  서버에 데이터를 요청하면 응답이 오기까지 시간이 걸린다.
  따라서 async를 붙여 비동기 함수로 만들어 준다.

  async를 붙이면 함수 내부에서 await를 사용할 수 있다.
  await를 사용하면 서버의 응답을 기다린 후 다음 코드를 실행한다.

  현재는 함수를 선언만 한 상태이기 때문에
  실제로 데이터를 요청하려면 fetchProducts()를 호출해야 한다.
*/


/*
  const { data, error } = await supabase
    .from('products')
    .select('*')
  [추가 설명 - async / await]

  서버에 상품 데이터를 요청하면 응답이 오기까지 시간이 걸린다.

  async : 비동기 함수를 만들기 위해 사용한다.
  await : 서버에서 응답이 올 때까지 기다리기 위해 사용한다.

  응답을 받은 후 다음 코드를 실행한다.

  이때 전체 프로그램이 멈추는 것이 아니라
  해당 비동기 함수의 다음 작업만 기다리는 것이다.


  [추가 설명 - Promise / async / await]

    Promise는 비동기 작업의 결과를 나타내는 객체이다.

    async는 함수를 비동기 함수로 만들어 주는 문법이다.
    async 함수는 항상 Promise를 반환하며,
    함수 내부에서 await를 사용할 수 있다.

    await는 비동기 작업의 결과가 나올 때까지
    기다렸다가 성공한 결과값을 가져오는 역할을 한다.

    서버에 상품 데이터를 요청하면 응답을 기다려야 한다.
    데이터를 받아야 그다음 작업을 할 수 있기 때문이다.

    이때 웹페이지 전체가 멈추는 것이 아니라
    해당 비동기 함수의 실행만 잠시 중단된다.

    그래서 서버의 응답을 기다리는 동안에도
    사용자에게 로딩 화면을 보여줄 수 있다.

    응답을 받으면 그다음 코드를 이어서 실행한다.
*/