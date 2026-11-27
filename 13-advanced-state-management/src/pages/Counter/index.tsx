import Divider from "@/components/Divider";
// import useCounter from "@/hook/useCounter";
import Counter from "@/miniApp/Counter";
import CounterControls from "@/miniApp/Counter/CounterControls";
// import { useCountStore } from "@/miniApp/Counter/@store";
// import CountDisplay_ from "@/miniApp/Counter/CountDisplay_";
import Counter_ from "@/miniApp/Counter/index_";
// import S from '@/miniApp/Counter/style.module.css';
import CounterReducer from "@/miniApp/CounterReducer";

function CounterPage() {

  // const {count, increment, reset} = useCounter();

  // 전체 구독 방식
  // const { count, increment } = useCountStore();
  // console.log(store); 
  
  // selector 방식 ( 선택적 구독 방식 )
  // 스토어에 필요한 상태와 함수만 선택적으로 구독하는 방식
  // 스토어의 다른 상태가 변경되어도 선택한 값이 변경되지 않으면 해당 변경으로 인한 리렌더링은 발생하지 않습니다.
  // const count = useCountStore((s) => s.count);
  // const increment = useCountStore((s) => s.increment);
  
  return (
    <>
      {/* <p>
        스토어 카운트 : {count}
        <button onClick={increment}>+1</button>
      </p> */}
      <title>카운터</title>

      <section id="page">
        <div className="learn">
          <h1>카운터</h1>
          <p>같은 카운터를 커스텀 훅 · useReducer · Zustand로 만들어 비교합니다.</p>

          <Divider />
          {/* 구분자 가시성 컴포넌트 */}

          <h2 lang="en" className="uppercase">Counter</h2>
          <p>간단한 카운터 앱의 상태를 CustomHook을 사용해 관리합니다.</p>

          <Counter_ className="mb-3"/>
          <Counter_ />
          {/* lifting state up */}
          {/* <div className="flex gap-2 items-center mt-4">
            <div className={S.component}><CountDisplay_ count={count} /></div>
            <div className={S.component}><CountDisplay_ count={count} /></div>
            <button type="button" onClick={increment} className="px-3 py-1 border border-accent rounded-xs">+1</button>
            <button type="button" onClick={reset} className="px-3 py-1 border border-accent rounded-xs">reset</button>
          </div> */}

          <Divider />

          <h2 lang="en" className="uppercase">Counter Reducer</h2>
          <p>카운터의 상태를 useReducer를 사용해 관리합니다.</p>
          <CounterReducer />

            <Divider />
            <h2 lang="en" className="uppercase">Counter</h2>
            <p>간단한 카운터 앱의 상태를 Zustand를 사용해 관리합니다.</p>
            <Counter className="mb-3" />
            <Counter className="mb-3" />
            {/* 쥬스탄트로 만든.. 여기는 상태를 공유한다. 예는 스토어가 관리를 한다. 그게 핵심이다. 이를 전역 상태관리 라고 한다. 다른페이지 갔다가 와도 값이 저장 되고 옵저버 페턴이 예를 감시한다. 으으어어어어ㅓ어어어어어어ㅓㅇ어엉 */}
            <CounterControls />
        </div>
      </section>
    </>
  );
}

export default CounterPage;

/*
  ==================================================
  <CounterPage - React 상태 관리 방식 비교>
  ==================================================


  <1. CounterPage의 역할>

  동일한 카운터 기능을 여러 상태 관리 방식으로 구현하여
  각각의 상태 관리 방법과 특징을 비교하는 페이지이다.

  - Custom Hook (useState)
  - Lifting State Up (상태 끌어올리기)
  - useReducer
  - Zustand

  상태를 어디에서 관리하는지,
  상태를 어떻게 변경하는지,
  여러 컴포넌트에서 어떻게 공유하는지 비교한다.



  <2. Custom Hook - 독립적인 상태 관리>

  [관련 코드]

  <Counter_ className="mb-3"/>
  <Counter_ />


  [개념 설명]

  useCounter 커스텀 훅을 사용하여 카운터의 상태를 관리한다.

  상태와 상태 변경 로직을 별도의 함수로 분리하여
  여러 컴포넌트에서 재사용할 수 있다.

  각각의 컴포넌트에서 useCounter를 호출하면
  각각 독립적인 상태를 가진다.

  첫 번째 카운터의 숫자를 변경하더라도
  두 번째 카운터의 숫자는 변경되지 않는다.


  [핵심]

  현재 useCounter 커스텀 훅은 상태 관리 로직을
  재사용하는 것이며, 상태 자체를 공유하는 것은 아니다.



  <3. Lifting State Up - 상태 끌어올리기>

  [관련 코드 - 현재 주석 처리된 부분]

  const { count, increment, reset } = useCounter();

  <CountDisplay_ count={count} />
  <CountDisplay_ count={count} />

  <button onClick={increment}>+1</button>
  <button onClick={reset}>reset</button>


  [개념 설명]

  여러 자식 컴포넌트에서 동일한 상태를 사용해야 할 때
  공통 부모 컴포넌트로 상태를 끌어올려 관리하는 방식이다.

  현재 코드에서는 CounterPage가 상태를 관리하고,
  CountDisplay_에 count를 props로 전달한다.


  [실행 흐름]

  부모 컴포넌트에서 상태 관리
    → 자식 컴포넌트에 props 전달
    → 버튼 클릭
    → 부모의 상태 변경
    → 두 자식 컴포넌트에 변경된 상태 반영


  [핵심]

  공통 부모 컴포넌트에서 하나의 상태를 관리하여
  여러 자식 컴포넌트에서 동일한 상태를 사용할 수 있다.



  <4. useReducer - 상태 변경 로직 관리>

  [관련 코드]

  <CounterReducer />

  const [state, dispatch] = useReducer(reducer, INITIAL);


  [개념 설명]

  useReducer는 상태를 관리하는 React 내장 훅이다.

  상태 변경 로직을 reducer 함수에 모아서
  체계적으로 관리할 수 있도록 도와준다.

  상태 변경 규칙이 많아지거나 복잡해질 때
  유지보수하기 편리하다.


  [주요 구성 요소]

  - state    : 현재 상태
  - INITIAL  : 초기 상태
  - dispatch : 상태 변경 요청을 전달하는 함수
  - action   : 어떤 작업을 할 것인지 나타내는 정보
  - reducer  : 현재 상태와 action을 받아 다음 상태를 계산
  - payload  : 작업에 필요한 추가 데이터


  [실행 흐름]

  버튼 클릭
    → dispatch 실행
    → Action 전달
    → reducer에서 action.type 확인
    → 다음 상태 계산
    → 새로운 상태 반환
    → 화면 업데이트


  [핵심]

  코드의 양을 줄이는 것이 목적이 아니라,
  상태 변경 로직을 한곳에 모아 관리하는 것이 목적이다.

  useReducer 자체가 전역 상태 관리 기능을
  제공하는 것은 아니다.



  <5. Zustand - 전역 상태 관리(Global State)>

  [관련 코드]

  <Counter className="mb-3" />
  <Counter className="mb-3" />
  <CounterControls />


  [개념 설명]

  Zustand는 전역 상태를 관리할 수 있도록 도와주는
  외부 상태 관리 라이브러리이다.

  상태와 상태 변경 함수를 하나의 Store에 모아 관리한다.

  각각의 Counter 컴포넌트는 동일한 Store를 사용하므로
  같은 count 상태를 공유한다.

  첫 번째 카운터에서 count를 변경하면
  동일한 count를 구독하는 두 번째 카운터에도 반영된다.

  부모 컴포넌트에서 props를 통해 전달하지 않아도
  필요한 컴포넌트에서 Store에 직접 접근할 수 있다.


  [실행 흐름]

  Counter에서 버튼 클릭
    → Store의 상태 변경 함수 실행
    → set을 통해 상태 변경
    → 동일한 상태를 구독하는 컴포넌트에 반영
    → 변경된 값이 화면에 표시


  [핵심]

  Custom Hook에서는 각각 독립적인 상태를 관리하지만,
  현재 Zustand 예제에서는 하나의 Store가 상태를 관리한다.

  여러 컴포넌트에서 동일한 상태를 공유하는 것이
  전역 상태 관리의 핵심이다.



  <6. 전체 구독 방식>

  [관련 코드 - 현재 주석 처리된 부분]

  const { count, increment } = useCountStore();


  [개념 설명]

  스토어 전체를 구독한 후 구조 분해 할당을 사용하여
  필요한 상태와 함수를 가져오는 방식이다.

  count와 increment만 꺼내 사용하더라도
  구독하는 대상은 스토어 전체이다.

  따라서 사용하지 않는 다른 상태가 변경되어도
  불필요한 리렌더링이 발생할 수 있다.



  <7. Selector - 선택적 구독 방식>

  [관련 코드 - 현재 주석 처리된 부분]

  const count = useCountStore((s) => s.count);
  const increment = useCountStore((s) => s.increment);


  [개념 설명]

  스토어에서 필요한 상태와 함수만
  선택적으로 구독하는 방식이다.

  구독이란 상태의 변경을 전달받을 수 있도록
  연결하는 것을 의미한다.


  [주요 구성 요소]

  - s            : 현재 스토어의 전체 상태
  - s.count      : 필요한 count 상태를 선택
  - s.increment  : 필요한 증가 함수를 선택
  - Selector     : 필요한 값을 선택하여 반환하는 함수


  [사용하는 이유]

  스토어의 다른 상태가 변경되더라도
  선택한 값이 변경되지 않으면 해당 변경으로 인한
  리렌더링은 발생하지 않는다.

  필요한 값만 선택적으로 구독하여
  불필요한 리렌더링을 줄일 수 있다.

  단, 부모 컴포넌트의 리렌더링 등
  다른 원인에 의한 리렌더링까지 막는 것은 아니다.



  <8. 전체 구독과 선택적 구독의 차이>

  [전체 구독]

  const { count } = useCountStore();

  스토어 전체를 구독한 후
  구조 분해 할당으로 필요한 값을 가져온다.


  [선택적 구독]

  const count = useCountStore(s => s.count);

  스토어에서 필요한 count만 선택하여 구독한다.


  [주의 사항]

  구조 분해 할당 자체가 불필요한 리렌더링을
  발생시키는 것은 아니다.

  스토어 전체를 구독하는지,
  필요한 값만 선택적으로 구독하는지의 차이이다.


  [핵심]

  Selector를 활용하면 필요한 상태와 함수만 구독하여
  불필요한 리렌더링을 줄일 수 있다.



  <9. Zustand 상태 변경 확인 예제>

  [관련 코드 - 현재 주석 처리된 부분]

  const count = useCountStore((s) => s.count);
  const increment = useCountStore((s) => s.increment);

  <p>
    스토어 카운트 : {count}
    <button onClick={increment}>+1</button>
  </p>


  [실행 흐름]

  1. Store에서 count와 increment를 가져온다.
  2. 현재 count 값을 화면에 표시한다.
  3. 사용자가 +1 버튼을 클릭한다.
  4. Store에 정의된 increment 함수가 실행된다.
  5. set 함수를 통해 Store의 상태가 변경된다.
  6. 변경된 count를 구독하는 컴포넌트에 반영된다.

  Zustand의 상태 공유와 상태 변경 방식을
  확인하기 위해 작성한 예제이다.



  <10. CounterControls - 카운터 제어 컴포넌트>

  [관련 코드]

  <CounterControls />

  Zustand 카운터 영역에 배치된 제어 컴포넌트이다.

  구체적인 제어 기능과 상태 변경 방식은
  CounterControls의 내부 코드에서 확인한다.



  <11. 전역 상태 관리 시 주의 사항>

  [강사님 설명]

  전역이기 때문에 여러 컴포넌트에서
  공유하여 값을 꺼내 사용하는 것은 편리하다.

  하지만 전역 상태를 변경할 때는 주의해야 한다.


  [상태 읽기]

  const count = useCountStore(s => s.count);

  Store에서 필요한 상태를 가져와 사용한다.

  상태를 읽는 것만으로는 기존 상태가 변경되지 않는다.


  [상태 변경]

  const increment = useCountStore(s => s.increment);

  increment();

  Store에 정의된 상태 변경 함수를 실행한다.

  하나의 컴포넌트에서 전역 상태를 변경하면
  해당 상태를 구독하는 다른 컴포넌트에도 영향을 준다.


  [주의해야 하는 이유]

  전역 상태는 특정 컴포넌트만 사용하는 데이터가 아니라
  여러 컴포넌트에서 함께 사용하는 데이터이기 때문이다.

  따라서 상태를 변경할 때 다른 컴포넌트에
  어떤 영향을 주는지 고려해야 한다.


  [전역 상태 관리 원칙]

  - 기존 상태 객체를 직접 수정하지 않는다.
  - Store에 정의된 상태 변경 함수를 활용한다.
  - 상태 변경에 따른 영향 범위를 고려한다.
  - 모든 상태를 전역으로 관리할 필요는 없다.
  - 여러 컴포넌트에서 공유할 필요가 있는 상태를
    전역 상태로 관리한다.


  [핵심]

  전역 상태를 변경하면 안 된다는 의미가 아니라,
  공유되는 상태이기 때문에 변경하는 방법과
  변경에 따른 영향 범위를 주의해야 한다는 의미이다.



  <12. Zustand - 페이지 이동과 상태 유지>

  [강사님 설명]

  다른 페이지로 이동했다가 다시 돌아와도
  Zustand에서 관리하는 상태 값은 유지될 수 있다.


  [개념 설명]

  Zustand는 컴포넌트 외부의 Store에서 상태를 관리한다.

  SPA에서 다른 페이지로 이동하여
  카운터 컴포넌트가 언마운트되더라도
  Store 자체가 유지된다면 상태 값도 유지된다.

  다시 카운터 페이지로 돌아오면
  Store에 저장되어 있는 현재 상태를 가져와 사용한다.


  [실행 흐름]

  1. 카운터의 초기 상태는 0이다.
  2. 증가 버튼을 눌러 count를 5로 변경한다.
  3. 다른 페이지로 이동한다.
  4. 카운터 컴포넌트가 언마운트된다.
  5. Store에는 count: 5가 유지된다.
  6. 다시 카운터 페이지로 이동한다.
  7. Store의 현재 상태인 5를 가져와 표시한다.


  [useState와 Zustand의 차이]

  useState
  - 컴포넌트 내부에서 상태를 관리한다.
  - 해당 컴포넌트가 언마운트되면 상태는 사라진다.
  - 다시 마운트되면 초기값부터 시작한다.

  Zustand
  - 컴포넌트 외부의 Store에서 상태를 관리한다.
  - 컴포넌트가 언마운트되어도 Store가 유지되면
    기존 상태 값도 유지된다.


  [주의 사항]

  페이지 이동과 브라우저 새로고침은 다르다.

  SPA 내부에서 페이지를 이동하면
  Store가 유지되는 동안 기존 상태를 사용할 수 있다.

  하지만 일반적인 Zustand Store는
  브라우저를 새로고침하면 초기값으로 돌아간다.

  새로고침 이후에도 상태를 유지하려면
  persist 등의 별도 저장 기능이 필요하다.

  ※ persist는 추가 참고 개념이며,
     현재 수업 코드에서 구현한 기능은 아니다.


  [핵심]

  Zustand의 상태가 페이지 이동 후에도 유지되는 이유는
  상태를 컴포넌트 외부의 Store에서 관리하기 때문이다.



  <13. Observer Pattern - 옵저버 패턴>

  [관련 코드]

  const count = useCountStore(s => s.count);


  [개념 설명]

  옵저버 패턴은 특정 대상의 상태 변화를 관찰하고,
  상태가 변경되면 이를 구독하는 대상에게
  변경 사실을 알려주는 디자인 패턴이다.

  Observer는 관찰자라는 의미이다.

  Zustand는 이러한 구독과 알림 방식을 활용하여
  Store의 상태 변경을 컴포넌트에 전달한다.


  [주요 구성 요소]

  - Store     : 상태를 관리하는 대상
  - Observer  : 상태 변경을 관찰하는 구독자
  - Subscribe : 상태 변경을 전달받기 위한 구독
  - Notify    : 상태가 변경되었음을 알리는 것
  - Selector  : 필요한 값을 선택하는 함수


  [실행 흐름]

  1. 컴포넌트가 Store의 count 상태를 구독한다.
  2. 사용자가 증가 버튼을 클릭한다.
  3. Store에 정의된 increment 함수가 실행된다.
  4. set을 통해 Store의 count 상태가 변경된다.
  5. Store가 구독자에게 상태 변경을 알린다.
  6. Selector로 선택한 count 값의 변경 여부를 확인한다.
  7. 선택한 값이 변경되면 컴포넌트가 리렌더링된다.
  8. 변경된 상태 값이 화면에 표시된다.


  [쉽게 이해하기]

  Store      : 정보를 관리하는 곳
  컴포넌트   : 정보를 구독하는 구독자
  Subscribe  : 구독 신청
  Notify     : 정보가 변경되었을 때 전달되는 알림

  컴포넌트가 직접 상태를 계속 확인하는 것이 아니라,
  Store에서 상태가 변경되었을 때 알림을 전달받는다.


  [핵심]

  옵저버 패턴은 상태 변경을 구독자에게 알려주는 방식이다.

  Zustand는 구독과 알림을 활용하여
  변경된 상태를 필요한 컴포넌트에 반영한다.



  <14. 상태 관리 방식 비교>

  [Custom Hook - useState]

  - 상태 관리 로직을 재사용한다.
  - 현재 useCounter의 각 호출은 독립적인 상태를 관리한다.


  [Lifting State Up]

  - 공통 부모 컴포넌트에서 상태를 관리한다.
  - 자식 컴포넌트에 props로 상태를 전달한다.


  [useReducer]

  - dispatch를 통해 상태 변경을 요청한다.
  - reducer에서 다음 상태를 계산한다.
  - 복잡한 상태 변경 로직을 한곳에 모아 관리한다.


  [Zustand]

  - 공용 Store에서 상태와 상태 변경 함수를 관리한다.
  - 여러 컴포넌트에서 동일한 상태를 공유한다.
  - Selector를 활용하여 필요한 상태만 구독한다.
  - Store가 유지되면 페이지 이동 후에도 상태가 유지된다.
  - 구독과 알림을 활용하여 상태 변경을 전달한다.
  - 전역 상태를 변경할 때 영향 범위를 고려해야 한다.



  ==================================================
  <최종 핵심 정리>
  ==================================================

  상태 관리 방식에 따라 상태를 관리하는 위치와
  상태를 변경하고 공유하는 방법이 달라진다.


  Custom Hook
    : 상태 관리 로직의 재사용

  Lifting State Up
    : 공통 부모를 통한 상태 공유

  useReducer
    : 상태 변경 로직의 체계적인 관리

  Zustand
    : Store를 활용한 전역 상태 공유

  Selector
    : 필요한 상태만 선택적으로 구독하여
      불필요한 리렌더링을 줄이는 방식

  Observer Pattern
    : 상태 변경을 관찰하고 구독자에게 알려주는 방식

  페이지 이동과 상태 유지
    : 컴포넌트 외부의 Store가 유지되는 동안
      기존 상태를 계속 사용할 수 있다.


  모든 상태를 전역으로 관리하는 것이 좋은 것은 아니다.

  전역 상태는 여러 컴포넌트에서 공유하기 때문에
  상태를 변경할 때 다른 컴포넌트에 미치는 영향을
  고려해야 한다.

  프로젝트의 구조와 상태의 사용 범위에 따라
  적절한 상태 관리 방식을 선택하는 것이 중요하다.
*/