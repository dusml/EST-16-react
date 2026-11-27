import { create } from 'zustand';

type Store = {
  count: number;
  step: number;
  max: number;
  min: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setStep:(newStep:number) => void;
}

export const useCountStore = create<Store>()((set, _get, store) => {

  const increment = () =>
  set(({ count, step, max }) => {
    let nextCount = count + step;
    if (nextCount >= max) nextCount = max;
    return { count: nextCount }
  })

  const decrement = () =>
    set(({ count, step, min }) => {
      let nextCount = count - step;
      if (nextCount <= min) nextCount = min;
      return { count: nextCount }
    })

    const setStep = (newStep: number) => {
      set({ step: newStep });
    }

    const reset = ()=> set(store.getInitialState())

  return {
    step: 1,
    min: 0,
    max: 10,
    count: 0,
    increment,
    decrement,
    reset,
    setStep
  }
})



// 커링 뭪션?
//객체를 내보내서 만들어준다, 구조 분해 할당이 아닌 셀렉더 중에 리렌더링을 덜 가져 옭수 있다..>

/*
  [9. 객체 반환(Object Return)]

  - 관련 코드

  return {
    step: 1,
    min: 0,
    max: 10,
    count: 0,
    increment,
    decrement
  }

  상태의 초기값과 상태 변경 함수를 하나의 객체로 반환하여
  Zustand 스토어를 구성한다.

  increment와 decrement는 앞에서 정의한 함수이며,
  함수를 실행하는 것이 아니라 함수 자체를 반환하는 것이다.

  객체의 속성 이름과 변수 이름이 같으면
  객체 속성 단축 문법을 사용할 수 있다.

  increment: increment → increment
  decrement: decrement → decrement


  [10. 전체 구독 방식]

  - 관련 코드

  const { count, increment } = useCountStore();

  스토어 전체를 구독한 후 구조 분해 할당을 사용하여
  필요한 상태와 함수를 가져오는 방식이다.

  count와 increment만 꺼내 사용하더라도
  구독 대상은 스토어 전체이다.

  따라서 현재 컴포넌트에서 사용하지 않는 상태가 변경되어도
  불필요한 리렌더링이 발생할 수 있다.


  [11. 선택적 구독 방식(Selector)]

  - 관련 코드

  const count = useCountStore(s => s.count);
  const step = useCountStore(s => s.step);
  const min = useCountStore(s => s.min);
  const max = useCountStore(s => s.max);

  스토어에서 필요한 상태와 함수만 선택적으로 구독하는 방식이다.

  - s            : 현재 스토어의 전체 상태
  - s.count      : 스토어의 count 값을 선택
  - s => s.count : 필요한 값을 선택하여 반환하는 Selector

  Selector는 JavaScript의 콜백 함수를 활용하여
  스토어에서 필요한 값을 선택하는 함수이다.

  스토어의 다른 상태가 변경되더라도
  선택한 값이 변경되지 않으면 해당 변경으로 인한
  리렌더링은 발생하지 않는다.


  [12. 전체 구독과 선택적 구독의 차이]

  전체 구독 방식:
    const { count } = useCountStore();

    스토어 전체를 구독한 후 필요한 값을 꺼내 사용한다.

  선택적 구독 방식:
    const count = useCountStore(s => s.count);

    처음부터 필요한 값만 선택하여 구독한다.

  구조 분해 할당 자체가 불필요한 리렌더링을
  발생시키는 것은 아니다.

  스토어 전체를 구독하는지,
  필요한 값만 선택적으로 구독하는지의 차이이다.


  [13. 렌더링 최적화]

  Selector를 활용하면 컴포넌트에서 사용하지 않는 상태의
  변경으로 인한 불필요한 리렌더링을 줄일 수 있다.

  - Selector    : 필요한 스토어 상태만 선택적으로 구독
  - memo        : 컴포넌트의 불필요한 리렌더링 감소
  - useMemo     : 계산된 값이나 JSX 객체의 참조 재사용
  - useCallback : 함수의 참조 재사용

  각각 최적화하는 대상과 방식이 다르다.

  단, Selector를 사용한다고 해서
  모든 리렌더링이 방지되는 것은 아니다.


  [핵심 정리]

  Zustand는 전역 상태 관리를 위한 외부 라이브러리이다.

  - Store    : 상태와 함수의 타입 정의
  - Generic  : 스토어의 타입 지정
  - Currying : 함수를 단계적으로 호출하는 구조
  - create   : 상태 저장소 생성
  - return   : 초기 상태와 상태 변경 함수 반환
  - set      : 스토어의 상태 변경
  - Selector : 필요한 상태와 함수의 선택적 구독

  상태와 상태 변경 로직을 하나의 스토어에서 관리하고,
  여러 컴포넌트에서 동일한 상태를 공유할 수 있다.

  또한 Selector를 활용하여 필요한 값만 구독함으로써
  불필요한 리렌더링을 줄일 수 있다.
*/


/*
  <사용하지 않는 매개변수 - Underscore(_)

  [관련 코드]

  create<Store>()((set, _get) => { ... })


  [개념 설명]

  매개변수 이름 앞에 언더바(_)를 붙이는 것은
  해당 매개변수를 의도적으로 사용하지 않는다는
  의미를 전달하기 위한 명명 관례이다.

  JavaScript에서 제공하는 특별한 문법은 아니다.


  [이전 수업 내용 - 11/23]

  Array.from({ length: 5 }, (_, i) => i + count)

  첫 번째 매개변수는 사용하지 않고
  두 번째 매개변수인 인덱스(i)만 사용한다.


  [현재 수업 내용 - Zustand]

  set  : 스토어의 상태를 변경하는 함수
  _get : 현재 스토어의 상태를 가져오는 함수이지만
         해당 코드에서는 사용하지 않음을 나타낸다.


  [핵심 정리]

  _는 사용하지 않는 매개변수임을 표현하는 명명 관례이다.
  언더바를 붙여도 매개변수의 기능 자체가 사라지는 것은 아니다.
*/