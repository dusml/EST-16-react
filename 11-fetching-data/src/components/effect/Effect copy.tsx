import { useEffect, useState } from "react";




function UserList() {

  const [count, setCount] = useState(0);

  console.log('🐯 렌더링됨.');

  /*
    useEffect는 렌더링 중에 바로 실행되는 것이 아니라,
    React에 Effect를 등록해 두었다가 나중에 실행한다.

    1. 컴포넌트가 렌더링된다.
    2. React가 렌더링 결과를 DOM에 반영한다.
    3. 이후 useEffect 안의 코드가 실행된다.

    의존성 배열이 없으면 렌더링이 반영될 때마다 실행된다.
    */


  // useEffect(fn) => 매 렌더링마다 실행
  // useEffect(fn, []) => 첫 렌더링(마운트) 이후 딱 한 번만 
  // useEffect(fn, [count]) => count가 지난번 값과 같지 않다면 호출


  // useEffect => 컴포넌트 안에서 [이벤트 핸들러를 제외한] 일반 함수 또 만들고 싶을 때


  /* setInterval(()=>{
    console.log('실행');
    // 왜 2번 식 실행이 될까??
    // 스트릭트 모델 때문이다..! 
  },1000) */

  useEffect(() => {
    console.log('useEffect 실행!');

    // setCount(count + 1);

    const id = setInterval(()=>{
        console.log('실행');
        // 안으로 이동..?
      },1000)

    return () => {
      console.log('청소를 깨끗이 하자!!');
      // 컴포넌트가 리렌더링 되었을 때 나온다. 그때 나온다. 
      // 로고가 찍히는 순서가 중요하다. 청소가 먼저 찍히고 유즈가 나중에 이건 리렌더링 했을떄 나타난다. 
      // 콜백은 클리너 함수 이다..???

      /*
      useEffect의 콜백 함수와 클린업 함수

      useEffect에 전달하는 첫 번째 함수는 Effect 함수이다.
      그 함수 안에서 return으로 반환하는 함수가
      클린업 함수(Cleanup Function)이다.

      클린업 함수는
      1. 의존성이 변경되어 Effect를 다시 실행하기 전
      2. 컴포넌트가 언마운트될 때
      실행된다.

      현재 코드에서는 count가 변경되면

      리렌더링
      → 이전 Effect의 클린업 함수 실행
      → 새로운 Effect 실행

      순서로 진행된다.

      즉, 새로운 Effect를 실행하기 전에
      이전에 등록했던 작업을 먼저 정리하는 것이다.
      */

      /*
        useEffect의 클린업 실행 순서

        count가 변경되면 컴포넌트가 리렌더링된다.

        이때 이전 useEffect에서 반환했던
        클린업 함수가 먼저 실행된다.

        그다음 새로운 count 값을 기준으로
        useEffect가 다시 실행된다.

        즉, 이전 작업 정리 → 새로운 작업 실행 순서이다.

        ※ useEffect 자체를 삭제하는 것이 아니다.
        ※ 클린업 함수는 실제 정리할 작업을 작성해야 한다.
        */
    
      clearInterval(id)
    }

  }, [count]);
  // [] 의존성 배열..?? 잉>>.

  return (
    <div>
      <p>카운트 : {count}</p>
      <button type="button" onClick={()=>setCount(count + 1)}> +1 </button>
    </div>
  )
}

export default UserList


/* 
컴포넌트는 순수 순수하지 않으면 리렌더링이 나옸을떄 온전한 값인지 아닌지 확인 불가능 검수를 해야 한다. 잉? 그런 부수효과들 이벤트 핸들러.. 모든걸 다 하면 무조건 이벤트가 발생햐ㅐ햐지만.. 만약에 화면이 로드가 되었을때 서버에서 데이터를 받아와서서 뿌려줘야 한다면..? 그림을 그릴때 부수효과// 이벤트를 넣지 않악도.. 데이터가 저절로 들어오게 ... 안에다 적게 되면 사이드 이펙스 제대로된 수순함수 유지 어려움 내가 원하는 함수만을 컴포넌트안에서 호출  유즈 이펙트라는 훅이가.
*/

// 아래는 주석을 설명이다.

/*
컴포넌트는 순수 함수처럼 동작해야 한다.
순수하지 않으면 리렌더링될 때마다 결과가 달라질 수 있어
올바른 결과인지 예측하기 어려워진다.

이벤트 핸들러는 클릭처럼 특정 이벤트가 발생했을 때 실행된다.

그런데 화면이 나타났을 때 서버에서 데이터를 받아와
자동으로 화면에 보여줘야 한다면 어떻게 해야 할까?

이런 작업을 컴포넌트의 렌더링 과정에서 직접 실행하면
부수 효과(Side Effect)가 발생해 순수성을 유지하기 어려워진다.

React에서는 이런 외부 시스템과의 동기화 작업을
useEffect라는 Hook을 사용해 처리할 수 있다.
*/




/*
React Lifecycle(생명주기)와 useEffect

React 컴포넌트는 순수 함수처럼 동작해야 한다.
렌더링 중에 부수 효과(Side Effect)를 직접 실행하면
결과를 예측하기 어려워질 수 있다.

그래서 React는 useEffect를 사용해
렌더링과 별도로 실행할 작업을 처리할 수 있다.

[React 생명주기]
1. Mount(마운트)
   - 컴포넌트가 처음 화면에 나타나는 단계

2. Update(업데이트)
   - state나 props 변경 등으로 다시 렌더링되는 단계

3. Unmount(언마운트)
   - 컴포넌트가 화면에서 제거되는 단계

[React Fiber와 useEffect 실행 순서]
1. 컴포넌트 함수가 실행되면서 렌더링을 시작한다.

2. useEffect를 만나면 React는
   Effect를 나중에 실행하도록 등록(예약)한다.
   이때 useEffect 내부 코드는 바로 실행되지 않는다.

3. 컴포넌트 함수 안의 console.log가 실행된다.
   → '렌더링됨.' 출력

4. React가 렌더링 결과를 실제 DOM에 반영한다.

5. DOM에 반영한 후 등록된 useEffect를 실행한다.
   → 'useEffect 실행!' 출력

즉, 지금 예제에서는 useEffect가 가장 나중에 실행된다.

※ 여기서 '예약'은 몇 초 뒤에 실행한다는 뜻이 아니다.
   렌더링 중에는 실행하지 않고 나중에 처리한다는 뜻이다.

※ 의존성 배열이 없으면 커밋된 렌더링 이후마다 실행된다.
※ 개발 환경의 StrictMode에서는 추가 실행될 수 있다.
*/



/*
useEffect의 의존성 배열

1. useEffect(fn)
   - 렌더링 결과가 반영될 때마다 실행된다.

2. useEffect(fn, [])
   - 처음 마운트된 후 실행된다.
   - 일반적인 리렌더링에서는 다시 실행되지 않는다.

3. useEffect(fn, [count])
   - 처음 마운트된 후 실행된다.
   - 이후 count가 변경되면 다시 실행된다.

※ 개발 환경의 StrictMode에서는 추가 실행될 수 있다.
※ [] 안에서 count를 직접 사용하면 의존성 누락 경고가 발생한다.
*/



