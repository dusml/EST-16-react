import { useReducer } from "react"

type State = {count:number};

const INITIAL:State = {count:0};

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return INITIAL
    case 'set':
      // Action의 payload로 전달받은 숫자를
      // 새로운 count 값으로 사용한다.
      return { count: action.payload }
    default:
      return state
  }
}

export default function CounterReducer(){

  const [state, dispatch] = useReducer(reducer,INITIAL);

  const setTo = 10;

  return (
    <div>
      <p>count: {state.count}</p>
        <button className="px-2 py-1 border border-accent m-1 rounded" onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button className="px-2 py-1 border border-accent m-1 rounded" onClick={() => dispatch({ type: "increment" })}>+</button>
        <button className="px-2 py-1 border border-accent m-1 rounded" onClick={() => dispatch({ type: "reset" })}>reset</button>
        <button className="px-2 py-1 border border-accent m-1 rounded" onClick={() => dispatch({ type: "set", payload:setTo })}>{setTo}으로</button>
    </div>
  )
}



// 상태를 더 깔끔하게..?? 에??
// useReducer는 상태 변경 로직을 reducer 함수에 모아서
// 상태를 체계적으로 관리할 수 있도록 도와주는 React 내장 훅이다.

// state: 현재 상태
// dispatch: 상태 변경 요청(Action)을 전달하는 함수
// reducer: 현재 상태와 Action을 받아 다음 상태를 계산하는 함수
// INITIAL: 초기 상태 값

// dispatch는 상태 변경 요청(Action)을 전달하는 함수이다.
// reducer는 현재 상태와 Action을 받아 다음 상태를 계산한다.
// 상태 변경 로직을 reducer에 모아 관리할 수 있다.

/*
  <useReducer - 상태 관리>

  useReducer는 상태를 관리하는 React 내장 훅이다.
  useState와 달리 상태 변경 로직을 reducer 함수에 모아서 관리한다.

  상태 변경 로직이 복잡해질 때 코드를 체계적으로 관리하고,
  유지보수하기 쉽도록 도와준다.


  [주요 구성 요소]

  - state    : 현재 상태 값
  - INITIAL  : 상태의 초기값
  - action   : 어떤 상태 변경을 요청하는지 나타내는 정보
  - dispatch : 상태 변경 요청(Action)을 전달하는 함수
  - reducer  : 현재 상태와 Action을 받아 다음 상태를 계산하는 함수


  [실행 흐름]

  1. 사용자가 버튼을 클릭한다.
  2. dispatch가 상태 변경 요청(Action)을 전달한다.
  3. reducer가 action.type을 확인한다.
  4. 요청에 맞는 상태 변경 로직을 실행한다.
  5. 계산된 새로운 상태를 return 한다.
  6. React가 반환된 값을 다음 상태로 사용하고,
     상태가 변경되면 화면을 리렌더링한다.


  [useState와 useReducer의 차이]

  useState   : setter를 통해 다음 상태 값이나 계산 함수를 전달한다.
  useReducer : dispatch를 통해 어떤 작업을 할 것인지 요청하고,
               reducer에서 다음 상태를 계산한다.


  [핵심 정리]

  dispatch는 요청을 전달하는 역할,
  reducer는 요청에 따라 다음 상태를 계산하는 역할이다.

  코드의 양을 줄이는 것이 목적이 아니라,
  상태 변경 로직을 한곳에서 체계적으로 관리하는 것이 목적이다.
*/

/*
  <Action과 Payload>

  Action은 어떤 상태 변경을 요청하는지 나타내는 정보이다.

  - type    : 실행할 작업의 종류
  - payload : 작업을 처리할 때 필요한 추가 데이터

  모든 Action에 payload가 필요한 것은 아니다.
  set처럼 외부에서 특정 값을 전달받아야 할 때 사용한다.
*/


/*
  <React의 불변성(Immutability)>

  [관련 함수 - reducer]

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      case 'reset':
        return INITIAL
      case 'set':
        return { count: action.payload }
      default:
        return state
    }
  }


  [불변성이란?]

  일반 JavaScript에서는 객체 내부의 값을 직접 변경할 수 있다.
  하지만 React에서 관리하는 상태는 직접 수정하지 않는다.

  기존 객체를 직접 수정하면 객체의 참조가 동일하기 때문에
  React가 상태 변경을 감지하지 못할 수 있다.

  따라서 기존 상태는 유지하고,
  변경된 값을 담은 새로운 객체를 만들어 반환해야 한다.


  [잘못된 상태 변경 방식]

  case 'increment':
    state.count++;
    return state;

  - 기존 state 객체의 count 값을 직접 수정한다.
  - count 값은 변경되지만 객체의 참조는 동일하다.
  - React가 동일한 상태라고 판단하여 리렌더링을
    건너뛸 수 있다.


  [올바른 상태 변경 방식]

  case 'increment':
    return { count: state.count + 1 }

  - 기존 state 객체는 직접 수정하지 않는다.
  - 기존 count에 1을 더한 값을 계산한다.
  - 계산된 값을 담은 새로운 객체를 만들어 반환한다.
  - React는 반환된 객체를 다음 상태로 사용한다.


  [핵심 정리]

  불변성이란 기존 데이터를 직접 수정하지 않고 유지하는 것이다.

  reducer 함수에서는 기존 상태를 직접 수정하는 것이 아니라,
  현재 상태를 바탕으로 다음 상태를 계산하여 반환해야 한다.

  이러한 불변성은 useReducer뿐만 아니라
  useState로 객체나 배열을 관리할 때도 지켜야 한다.
*/




