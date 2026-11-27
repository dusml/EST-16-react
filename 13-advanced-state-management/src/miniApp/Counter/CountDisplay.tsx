import { memo } from 'react';
import S from './style.module.css'
import { useCountStore } from './@store';

function CountDisplay() {

  // const count = 0;

  // selector 구독 방식
  const count = useCountStore( s => s.count );
  // 난 카운트만 구독해준다..??
  console.log(' counter display');
  

  return (
    <output className={S.output}>{count}</output>
    
  )
}

export default memo(CountDisplay)


/*
  <CountDisplay - Zustand 상태 구독 및 렌더링 최적화>


  [관련 코드]

  import { memo } from 'react';
  import S from './style.module.css'
  import { useCountStore } from './@store';

  function CountDisplay() {

    // const count = 0;

    // selector 구독 방식
    const count = useCountStore( s => s.count );

    return (
      <output className={S.output}>{count}</output>
    )
  }

  export default memo(CountDisplay)


  [1. CountDisplay 컴포넌트의 역할]

  Zustand 스토어에서 관리하는 count 값을 가져와
  화면에 표시하는 컴포넌트이다.

  상태를 직접 생성하거나 변경하지 않고,
  스토어에서 필요한 상태를 가져와 사용한다.


  [2. 선택적 구독(Selector)]

  const count = useCountStore( s => s.count );

  - useCountStore : Zustand 스토어를 사용하는 훅
  - s             : 현재 스토어의 전체 상태
  - s.count       : 스토어에서 count 값을 선택
  - s => s.count  : 필요한 값을 선택하여 반환하는 Selector
  - count         : 선택한 상태 값을 저장하는 변수

  스토어 전체를 구독하지 않고,
  해당 컴포넌트에서 필요한 count만 선택하여 구독한다.

  다른 스토어 상태가 변경되더라도 count가 동일하면
  해당 변경으로 인한 리렌더링은 발생하지 않는다.


  [3. 기존 Props 전달 방식과의 차이]

  기존 방식(Lifting State Up)
  - 부모 컴포넌트에서 상태를 관리한다.
  - 자식 컴포넌트에 props로 상태를 전달한다.

  Zustand 방식
  - 공용 스토어에서 상태를 관리한다.
  - 필요한 컴포넌트에서 상태를 직접 가져온다.
  - 부모로부터 count를 props로 전달받을 필요가 없다.


  [4. 화면에 상태 표시]

  <output className={S.output}>{count}</output>

  - output   : 계산 결과 등을 표시하는 HTML 요소
  - S.output : CSS Module에서 가져온 클래스
  - {count}  : 스토어에서 가져온 현재 상태 값

  count 상태가 변경되면 변경된 값을 화면에 표시한다.


  [5. memo - 렌더링 최적화]

  export default memo(CountDisplay)

  memo는 React에서 제공하는 컴포넌트 최적화 기능이다.

  부모 컴포넌트가 리렌더링되더라도
  전달받은 props가 동일하면 불필요한 리렌더링을 줄인다.

  단, CountDisplay에서 구독하고 있는 count가 변경되면
  memo를 사용하더라도 리렌더링된다.

  memo가 모든 리렌더링을 막는 것은 아니다.


  [6. Selector와 memo의 차이]

  Selector
  - 스토어에서 필요한 상태만 선택하여 구독한다.
  - 선택하지 않은 상태의 변경으로 인한 리렌더링을 줄인다.

  memo
  - 컴포넌트의 props를 비교한다.
  - 부모 컴포넌트의 리렌더링으로 인한
    불필요한 리렌더링을 줄인다.

  두 기능 모두 렌더링 최적화에 사용되지만
  최적화하는 대상과 방식이 다르다.


  [7. 전체 실행 흐름]

  1. CountDisplay 컴포넌트가 렌더링된다.
  2. useCountStore를 통해 스토어에 접근한다.
  3. Selector를 통해 count 상태만 선택하여 구독한다.
  4. 가져온 count 값을 output 요소에 표시한다.
  5. 스토어의 count 상태가 변경된다.
  6. CountDisplay 컴포넌트가 리렌더링된다.
  7. 변경된 count 값이 화면에 표시된다.


  [핵심 정리]

  CountDisplay는 상태를 변경하는 컴포넌트가 아니라,
  스토어의 상태를 구독하고 화면에 표시하는 컴포넌트이다.

  Zustand를 활용하여 props 전달 없이 공용 상태를 가져오고,
  Selector와 memo를 활용하여 불필요한 리렌더링을 줄인다.
*/

/*
  <8. 전체 구독과 단일 상태 구독의 차이>

  [관련 코드]

  const count = useCountStore( s => s.count );
  console.log(' counter display');


  [CountDisplay에서 count만 구독하는 이유]

  CountDisplay는 현재 count 값을 화면에 표시하는
  컴포넌트이므로 다른 스토어 상태는 필요하지 않다.

  따라서 스토어 전체를 구독하지 않고
  필요한 count 상태만 선택적으로 구독한다.


  [전체 구독 방식]

  const { count } = useCountStore();

  스토어 전체를 구독한 후 구조 분해 할당으로
  필요한 count 값을 가져온다.

  count가 변경되지 않더라도 step, min, max 등
  다른 상태가 변경되면 리렌더링될 수 있다.


  [단일 상태 구독 방식]

  const count = useCountStore(s => s.count);

  스토어에서 count만 선택적으로 구독한다.

  step, min, max가 변경되더라도
  count 값이 동일하다면 해당 스토어 변경으로 인한
  리렌더링은 발생하지 않는다.


  <9. console.log를 사용하는 이유>

  [관련 코드]

  console.log(' counter display');

  CountDisplay 컴포넌트 함수가 실행되는지
  콘솔을 통해 확인하기 위해 작성한다.

  상태 변경에 따라 컴포넌트가 다시 실행되는지 확인하고,
  전체 구독과 선택적 구독의 차이를 비교할 수 있다.

  단, 개발 환경의 StrictMode 등에 의해
  컴포넌트 함수가 추가로 실행될 수 있으므로
  콘솔 출력 횟수가 실제 화면 반영 횟수와
  항상 동일한 것은 아니다.


  <10. 구독 범위와 렌더링 최적화>

  스토어에서 값을 몇 개 가져오는 것과
  스토어의 어느 범위를 구독하는 것은 다른 문제이다.

  구조 분해 할당 자체가 불필요한 리렌더링을
  발생시키는 것은 아니다.

  Zustand에서는 필요한 상태만 선택적으로 구독하여
  불필요한 리렌더링을 줄일 수 있다.


  <핵심 정리>

  CountDisplay는 count만 필요한 컴포넌트이므로
  count만 선택적으로 구독한다.

  컴포넌트의 역할에 따라 필요한 상태만 구독하는 것이
  Zustand를 활용한 렌더링 최적화의 핵심이다.
*/


