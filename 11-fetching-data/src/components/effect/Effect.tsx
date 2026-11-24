import { useEffect, useState } from "react";




function UserList() {

  // const [count, setCount] = useState(0);
  // users: 서버에서 가져온 사용자 목록을 저장하는 상태
  // 처음에는 데이터가 없으므로 null로 설정한다.
  const [users, setUsers] = useState<User[] | null>(null);

  // loading: 데이터를 불러오는 중인지 확인하는 상태
  // 처음에는 로딩 중이므로 true로 설정한다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  // useEffect(fn) => 매 렌더링마다 실행
  // useEffect(fn,[]) => 첫 렌더링(마운트)이후 딱 한 번만
  // useEffect(fn,[count]) => count가 지난번값과 같지 않다면 호출

  // useEffect => 컴포넌트 안에서 [이벤트 핸들러를 제외한] 일반 함수 또 만들고 싶을 때


  // 절대 비동기 함수가 되면 안됀다. 비동기가 되니ㅡㄴ 순산 프라미스가 된다.. 난 죽어도 비동기로 만들고 싶다 그러면 그 안에서 사용하면 된다. 유즈 이펙트 안에서 .. 호출도 안에서 하면 된다. 만들고 싶다면..
  useEffect(() => {
    const controller = new AbortController();
    
    // 사이드 이펙트 .. 데이터 가져오기,,>>
    fetch("https://jsonplaceholder.typicode.com/users",{signal: controller.signal})
    .then( res => {
      if (!res.ok) throw new Error('네트워크 응답 오류');
      return res.json();
    })
    .then( (data:User[]) => {
      // console.log(data);
      setUsers(data)
      setLoading(false)
    })
    // 데이터 요청이나 처리 중 오류가 발생하면 catch 실행
    .catch((err:Error) => {
      if(err.name === 'AbortError') return
      // 오류 메시지와 오류 내용을 콘솔에 출력
      console.error('데이터 가져오기 실패', err);
      // 실패했더라도 로딩 상태는 종료
      setLoading(false);
      setError(err)
    });

    return () => controller.abort();

  }, []);

  // console.log('🐯 렌더링됨.');
  if(loading) return <p>로딩중...❤️</p>
  if(error) return <p>❌에러 발생!!! : {error.message}❌</p>;



  return (
    <ul>
      {
        users && users.map((user)=>
          <li key={user.id}>{user.name} ({user.email})</li>
        )
      }
    </ul>
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



