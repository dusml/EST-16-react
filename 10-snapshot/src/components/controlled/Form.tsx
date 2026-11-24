import { useState } from "react";




function Form() {
  
  const [text, setText] = useState('');

  // 폼 상태를 React에 의해 제어/통제 => value + onChange (controlled)
  // 간단한 초기 입력값만 필요할 때, 외부 상태와 무관한 정보를 입력 => 'defaultValue' (uncontrolled)

  // 폼 리셋, 검증, 자동완성 => 'value' 권장됨 (훨씬 제어가 쉬움)
  // 회원가입 폼을 만들때..??

  return (
    <div>
      <h2>Controlled Input</h2>
      <input
        type="text"
        aria-label="제어 입력"
        value={text}
        // 내가 장제로 ..? 체인지 ?? 바꿔??
        onChange={(e)=>setText(e.target.value)}
      />
      <p>입력 값 : {text}</p>

      <hr />

      <h2>Uncontrolled Input</h2>
      <input
        type="text"
        aria-label="비제어 입력"
        defaultValue={'처음 한번만 반영됨'}
        onChange={(e) => console.log(e.target.value)}
      />
      <p>입력 값 : {text}</p>
      <hr />
    </div>
  )

}
export default Form




/*
  <추가 정리>

  1. 제어 컴포넌트 (Controlled)

  React가 입력창의 값을 관리하는 방식이다.

  value는 현재 입력창에 보여줄 값이고,
  onChange는 사용자가 입력한 값을 감지해서 상태를 변경한다.

  사용자가 글자를 입력하면
  onChange 실행 → setState로 상태 변경 → 리렌더링
  → 변경된 value가 입력창에 표시된다.


  2. 비제어 컴포넌트 (Uncontrolled)

  React 상태로 입력값을 계속 관리하지 않는 방식이다.

  defaultValue는 입력창의 초기값만 설정한다.
  이후 사용자가 입력한 값은 브라우저 DOM이 관리한다.

  따라서 입력할 때마다 React 상태를 변경할 필요가 없다.


  3. value와 defaultValue의 차이

  value        : React 상태를 이용해 입력값을 관리한다.
  defaultValue : 처음 표시할 값만 설정한다.

  입력값을 React 상태와 연결해 관리해야 한다면
  value와 onChange를 함께 사용한다.
*/