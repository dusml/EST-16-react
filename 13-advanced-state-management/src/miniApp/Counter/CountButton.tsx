import { memo } from 'react';
import S from './style.module.css'
import { useCountStore } from './@store';

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  type?: '+' | '-';
};

function CountButton({ children, type = '+', ...restProps }: Props) {

  const handler = useCountStore((s) =>
    type === '+' ? s.increment : s.decrement
  )

  return (
    <button
      type="button"
      className={S.button}
      onClick={handler}
      {...restProps}
    >
      {children}
    </button>
  )
}
export default memo(CountButton)


/*
  <Zustand - CountButton 컴포넌트>


  [관련 코드]

  type Props = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'
  > & {
    type?: '+' | '-';
  };

  function CountButton({ children, type = '+', ...restProps }: Props) {

    const handler = useCountStore((s) =>
      type === '+' ? s.increment : s.decrement
    )

    return (
      <button
        type="button"
        className={S.button}
        onClick={handler}
        {...restProps}
      >
        {children}
      </button>
    )
  }

  export default memo(CountButton)


  [1. Omit - 유틸리티 타입]

  기존 타입에서 특정 속성을 제외할 때 사용한다.

  HTML 버튼의 기존 속성 타입을 활용하되,
  기존 type 속성을 제외하고 '+' 또는 '-'를 사용하는
  새로운 type 속성을 정의한다.


  [2. Props 구조 분해 할당]

  { children, type = '+', ...restProps }

  - children  : 버튼 내부에 표시할 내용
  - type      : 증가 또는 감소를 구분하는 값
  - type = '+' : type을 전달하지 않았을 때 사용하는 기본값
  - restProps : 구조 분해하고 남은 나머지 props

  ...restProps를 통해 전달받은 나머지 속성을
  실제 HTML 버튼에 적용할 수 있다.


  [3. Selector와 삼항 연산자]

  const handler = useCountStore((s) =>
    type === '+' ? s.increment : s.decrement
  )

  type이 '+'이면 증가 함수를 선택하고,
  그렇지 않으면 감소 함수를 선택한다.

  함수를 즉시 실행하는 것이 아니라,
  필요한 함수를 선택하여 handler에 저장한다.


  [4. 이벤트 연결]

  onClick={handler}

  버튼을 클릭하면 handler에 저장된 함수가 실행된다.
  Zustand 스토어의 count 상태가 변경된다.


  [5. memo - 렌더링 최적화]

  export default memo(CountButton)

  부모 컴포넌트가 리렌더링되었을 때
  props가 동일하면 불필요한 리렌더링을 줄인다.


  [핵심 정리]

  증가 버튼과 감소 버튼을 각각 만들지 않고,
  하나의 CountButton 컴포넌트로 재사용한다.

  props의 type 값에 따라 Zustand 스토어에서
  필요한 상태 변경 함수를 선택하여 사용한다.
*/