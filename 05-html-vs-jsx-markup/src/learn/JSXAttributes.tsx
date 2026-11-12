import type { CSSProperties } from "react";



function JSXAttributes() {

  const boxStyle: CSSProperties = {
    width: 200, // 200px
    padding: 8, // 8px
    borderRadius: 4,
    backgroundColor: '#d9e6fc',
    lineHeight: 1.5 // 150%
  };

  return (
    <>
      <dt>HTML vs JSX 속성(attribute)의 차이</dt>
      <dd>
        <p>
          1. JavaScript 예약어와 겹치는 속성은 이름이 바뀐다.
        </p>
        <div>
          {/* htmlFor ,className */}
          <label htmlFor="jsx-name" className="status"></label>
          <input type="text" id="jsx-name" />
        </div>
      </dd>
      <dd>
        <p>
          2. 여러 단어로 된 속성은 camalCase로 작성합니다.
        </p>
        <div>
          {/* <input tabindex="0" maxlength="10" readonly value="읽기 전용"> */}
          <input type="text" aria-label="입력창" tabIndex={0} maxLength={10} readOnly value="읽기 전용" />
        </div>
      </dd>
      <dd>
        <p>
          3. 예외로 aria-*, data-* 속성은 HTML과 똑같이 kabab-case 방식을 그대로 사용합니다.
        </p>
        <div>
          <span role="status" aria-live="polite" data-state="success" data-name="안내창">✅ 로딩 성공</span>
        </div>
      </dd>
      <dd>
        <p>
          4. style 속성에는 문자열이 아닌 객체를 전달합니다. (그래서 중괄호가 두 겹)
        </p>
        <div>
          <div style={boxStyle}>변수에 담은 스타일 객체</div>
          <p style={{ color: 'orange', fontWeight: 800 }}>인라인 방식으로 작성한 스타일 객체</p>
        </div>
      </dd>
      <dd>
        <p>
          5. 내용이 없는 요소고 반드시 닫아야 합니다. (self closing tag)
        </p>
        <div>
          <img src="/favicon.svg" alt="" />
          <input type="text" placeholder="닫는 슬래시는 필수 입니다." />
        </div>
      </dd>
      <dd>
        <p>
          6. boolean 속성은 값이 생각하면 true이고, false를 전달하면 곳성 자체가 빠집니다.
        </p>
        <div>
          <button type="button" disabled>BUTTON</button>
          <hr />
          <button type="button" disabled={false}>BUTTON</button>
          <p hidden={false}>보이는 문단</p>
          {/* 히든을 주는 것만으롣도 투루인 것이다. 그리고 속성만 전달을 했을 경우에는 트루이다. <JSXAttributes hello={false} /> 이렇게 하면 풜스로 나온다. */}
          <p hidden={false}>안 보이는 문단</p>
        </div>
      </dd>
    </>
  )
}
export default JSXAttributes

{/*
  1. HTML과 JSX 속성의 차이
  - JavaScript 예약어와 겹치거나 React에서 별도로 정한 속성은 이름이 달라진다.
  - HTML의 for는 JSX에서 htmlFor로 작성한다.
  - HTML의 class는 JSX에서 className으로 작성한다.
  - htmlFor와 id의 값을 같게 작성하면 label과 input이 연결된다.
*/}

{/*
  2. JSX 속성은 camelCase로 작성하는 경우가 많다.
  - 여러 단어로 된 속성은 두 번째 단어부터 첫 글자를 대문자로 작성한다.
  - tabindex → tabIndex
  - maxlength → maxLength
  - readonly → readOnly
  - {} 안에는 JavaScript 값을 작성할 수 있다.
  - type: 입력창의 종류
  - tabIndex: Tab 키로 이동하는 순서에 관여
  - maxLength: 입력할 수 있는 최대 글자 수
  - readOnly: 읽기 전용 (수정 불가능)
  - value: 입력창에 표시할 값
*/}

{/*
  3. aria-*, data-* 속성은 예외적으로 kebab-case를 사용한다.
  - kebab-case: 단어 사이에 하이픈(-)을 사용하는 방식
  - aria-*: 웹 접근성을 위한 속성
  - data-*: HTML 요소에 추가 데이터를 저장하는 속성
  - data-*에 저장한 값은 JavaScript의 dataset으로 가져올 수 있다.
*/}

{/*
  4. JSX의 style 속성에는 문자열이 아닌 객체를 전달한다.

  ① 스타일 객체를 변수에 따로 작성
  - const boxStyle = { color: 'red' };
  - style={boxStyle}로 전달한다.

  ② JSX 안에 바로 작성하는 인라인 방식
  - style={{ color: 'orange', fontWeight: 800 }}
  - 바깥쪽 {}: JavaScript 값을 사용
  - 안쪽 {}: CSS 스타일 객체

  - CSS 속성은 camelCase로 작성한다.
  - CSSProperties는 스타일 객체의 타입을 지정할 때 사용한다.
*/}

{/*
  5. 내용이 없는 요소도 반드시 닫아야 한다. (Self-closing tag)
  - HTML에서는 <img>, <input>처럼 작성할 수 있다.
  - JSX에서는 <img />, <input />처럼 반드시 닫아야 한다.
  - 내용이 있는 태그는 <p>내용</p>처럼 작성한다.

  HTML 태그와 React 컴포넌트의 차이
  - 소문자로 시작하면 HTML 태그이다. (div, p, img)
  - 대문자로 시작하면 React 컴포넌트이다. (JSXAttributes)
  - 직접 만든 컴포넌트도 태그처럼 사용할 수 있다.
  - 내용이 없으면 <JSXAttributes />처럼 닫을 수 있다.
*/}

{/*
  6. Boolean 속성은 true 또는 false 값을 사용한다.
  - 속성 이름만 작성하면 true로 처리된다.
  - disabled: true이면 버튼이 비활성화된다.
  - hidden: true이면 요소가 화면에서 숨겨진다.
  - false를 전달하면 해당 불리언 속성이 적용되지 않는다.

  예시
  - disabled = disabled={true}
  - disabled={false} → 버튼 활성화
  - hidden={true} → 요소 숨김
  - hidden={false} → 요소 표시
  - disabled 또는 disabled={true} → 버튼 비활성화
  - disabled={false} → 버튼 활성화
*/}