
import { useCallback, useMemo, useState } from "react";
import List from "./List";

function App() {

  const [count, setCount] = useState(0);

  // const items = Array.from({length:5}, (_,i) => i + count);
  // 숫자들을 담아놓은 배열을 만든 것
  // 기존 방식은 App이 리렌더링될 때마다 새로운 배열을 만든다.


  // useMemo는 이전에 계산한 결과를 재사용한다.
  // count가 같으면 기존 배열을 사용하고, 변경되면 다시 계산한다.
  // count가 변경되면 Array.from을 다시 실행해 새로운 배열을 만든다.
  const items = useMemo(() => {
    //  Array.from 숫자들을 담아놓은 배열을 만든 것
    // length: 5는 배열에 들어갈 칸을 5개 만든다는 뜻이다.
    // i는 각 칸의 번호로, 첫 번째는 0, 두 번째는 1, 세 번째는 2이다.
    // 각 칸마다 i + count를 계산해 그 결과를 배열에 넣는다.
    return Array.from({ length: 5 }, (_, i) => i + count);
  }, [count]);


  /* const handleItemClick = (value:number) => {
    console.log('클릭한 값', value);
  }*/
  
    // 기존 방식은 App이 리렌더링될 때마다 새로운 함수가 만들어진다.

  // useCallback은 이전 함수의 참조를 기억하고 재사용한다.
  // []는 의존성 배열로, 변경되는 의존성이 없다는 뜻이다.
  // 같은 함수를 List에 전달하면 memo의 렌더링 최적화에 도움이 된다.
  
  const handleItemClick = useCallback((value:number) => {
    console.log('클릭한 값', value);
  }, [])


  return (
    <div>
      <h1>Count:{count}</h1>
      {/* setCount에 함수를 전달하면 React가 이전 state 값을 매개변수로 넣어준다. */}
      {/* c는 매개변수 이름일 뿐이며, React가 이전 count 값을 전달한다. */}
      {/* c + 1을 반환하면 그 값이 새로운 count가 된다 */}
      <button type="button" onClick={()=> setCount((c)=> c + 1)}> + 1</button>
      <List items={items} onItemClick={handleItemClick}/>
    </div>
  )
}

export default App

/*
  <App.tsx 수업 내용 정리>

  1. useState - 상태 관리
  - count는 현재 숫자를 기억하는 state이다.
  - setCount는 React에 상태 변경을 요청하는 함수이다.
  - 버튼을 클릭하면 이전 count 값에 1을 더한다.
  - setCount((c) => c + 1)에서 c는 이전 state 값을 받는 매개변수이다.
  - c는 이름일 뿐이며, React가 이전 상태 값을 전달해 준다.
  - state가 변경되면 React는 리렌더링한다.


  2. Array.from() - 배열 만들기
  - Array.from()은 새로운 배열을 만드는 JavaScript 메서드이다.
  - length: 5는 배열의 칸을 5개 만든다는 뜻이다.
  - _는 첫 번째 매개변수이며, 여기서는 사용하지 않는다.
  - i는 배열의 인덱스로 0부터 시작한다.
  - 첫 번째 칸은 i = 0, 두 번째는 i = 1, 세 번째는 i = 2이다.
  - 각 칸에서 i + count를 계산한 결과를 배열에 넣는다.

  예시)
  count = 0 → [0, 1, 2, 3, 4]
  count = 1 → [1, 2, 3, 4, 5]


  3. useMemo - 계산 결과 재사용
  - 기존 Array.from() 방식은 App이 리렌더링될 때마다 새 배열을 만든다.
  - useMemo는 계산 함수를 실행하고 그 결과값을 기억한다.
  - count가 변경되지 않으면 이전 배열을 재사용한다.
  - count가 변경되면 Array.from()을 다시 실행한다.
  - [count]는 의존성 배열이다.
  - 같은 배열 참조를 List에 전달하면 memo의 최적화에 도움이 된다.


  4. useCallback - 함수 참조 재사용
  - 기존 handleItemClick 함수는 App이 리렌더링될 때마다 새로 만들어진다.
  - useCallback은 함수를 실행하지 않고 함수의 참조를 기억한다.
  - 의존성이 변경되지 않으면 이전 함수 참조를 재사용한다.
  - []는 변경되는 의존성이 없다는 뜻이다.
  - handleItemClick은 실제 버튼을 클릭했을 때 실행된다.
  - 같은 함수를 List에 전달하면 memo의 최적화에 도움이 된다.


  5. useMemo와 useCallback의 차이
  - useMemo는 계산 함수를 실행한 뒤 결과값을 기억한다.
  - useCallback은 함수 자체의 참조를 기억한다.
  - 둘 다 의존성이 같으면 이전 값을 재사용한다.
  - 불필요한 계산이나 props의 참조 변경을 줄이는 데 사용한다.


  6. 부모에서 자식으로 props 전달
  - App은 부모 컴포넌트이고 List는 자식 컴포넌트이다.
  - items={items}로 숫자 배열을 전달한다.
  - onItemClick={handleItemClick}으로 클릭 처리 함수를 전달한다.
  - List는 전달받은 배열과 함수를 ListItem에 다시 전달한다.
  - ListItem의 버튼을 클릭하면 App에서 만든 함수가 실행된다.


  7. memo와의 관계
  - memo는 이전 props와 새로운 props를 비교한다.
  - props가 같으면 불필요한 리렌더링을 생략할 수 있다.
  - useMemo는 배열 참조를 유지하는 데 도움이 된다.
  - useCallback은 함수 참조를 유지하는 데 도움이 된다.
  - count가 변경되면 items도 변경되므로 List는 다시 렌더링될 수 있다.
  - ListItem의 props가 같으면 memo로 리렌더링을 생략할 수 있다.


  <전체 실행 흐름>

  1. App 컴포넌트가 처음 실행된다.
  2. useState로 count의 초기값 0을 준비한다.
  3. useMemo가 Array.from()을 실행해 배열을 만든다.
  4. useCallback이 handleItemClick 함수 참조를 기억한다.
  5. items와 handleItemClick을 List에 props로 전달한다.
  6. List는 map으로 ListItem 컴포넌트들을 만든다.
  7. +1 버튼을 클릭하면 setCount가 이전 count에 1을 더한다.
  8. count 변경으로 App이 리렌더링된다.
  9. count가 변경되었으므로 useMemo가 새 배열을 계산한다.
  10. useCallback은 이전 함수 참조를 재사용한다.
  11. 변경된 items가 List에 전달되어 List가 다시 렌더링된다.
  12. 각 ListItem은 key로 식별되고 memo로 props 변경 여부를 비교한다.


  <핵심 정리>

  useState    → 상태를 기억하고 변경한다.
  Array.from  → 배열을 만든다.
  useMemo     → 계산 결과를 재사용한다.
  useCallback → 함수 참조를 재사용한다.
  memo        → 불필요한 컴포넌트 리렌더링을 줄인다.
  key         → 목록의 각 항목을 구별한다.
*/