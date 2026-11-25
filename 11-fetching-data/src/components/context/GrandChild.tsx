import useUserContext from "@/hook/useUserContext";
import { useTheme } from "./ThemeContext";





function GrandChild() {


  // React 18+
  // const ctx = useContext(UserContext);
  // 안에 내용을 넣어 주어야 하는데 ..??

  // React 19+
  // use()는 컨텍스트도 받고 Promise도 받음 (then이랑 비슷한 위치)
  // const ctx = use(delayP());


  /* const ctx = use(UserContext);
    [추가]
    <useContext() - Context 값 읽기>
      useContext()는 Provider에서 제공한 Context 값을 읽는 React Hook이다.

      App에서는 value를 통해 공유할 값을 제공하고, GrandChild에서는 useContext(UserContext)로 그 값을 읽는다.

      createContext() : 공용 사물함 만들기
      Provider의 value : 공유할 값 제공하기
      useContext() : 제공된 값 읽기

    console.log(ctx); // username이 들어가 있다. 
    if(!ctx) return; 
    현제 내용을 훅에 옮겨 아래처럼 사용이 가능하다..??
  */

  // const{username} = ctx; 훅 폴더를 만들어서 와래와 같이 만들어 사용을 할수 있다. 
  
  /*
    [추가]
    <Context 관련 로직을 커스텀 훅으로 분리>

    기존에는 GrandChild에서 직접 Context 값을 읽고,
    값이 있는지 검사한 후 구조 분해 할당으로 username을 꺼냈다.

    Context 값을 읽고 검사하는 로직을 useUserContext.ts로 분리하여
    다른 컴포넌트에서도 재사용할 수 있도록 만들었다.

    const { username } = useUserContext();

    이제 GrandChild에서는 커스텀 훅을 호출하고,
    반환된 객체에서 필요한 값을 꺼내 사용하면 된다.

    코드가 없어진 것이 아니라 역할을 나누어 분리한 것이다.
  */

  /*
    [추가]
    <객체의 구조 분해 할당>

    커스텀 훅을 호출하여 객체를 반환받고,
    반환된 객체에서 필요한 속성만 꺼내 사용한다.

    구조 분해 할당은 React 전용 문법이 아니라
    JavaScript의 객체 문법이다.
  */
  const{username} = useUserContext();
  /*
    [추가]
    <useTheme() - 테마 정보 가져오기>

    useTheme()는 ThemeProvider에서 제공한 테마 정보를
    읽기 위한 커스텀 훅이다.

    반환된 객체에서 구조 분해 할당으로 필요한 값을 꺼낸다.

    - theme : 현재 테마의 스타일 정보
    - toggleTheme : 라이트 모드와 다크 모드를 전환하는 함수

    useUserContext()와 같은 원리이며,
    가져오는 Context의 정보가 다르다.
  */

  
  const { theme, toggleTheme } = useTheme();



  return (
  <div style={{
    background: theme.colors.background,
    color: theme.colors.text,
    padding: theme.spacing.md
  }}>
    <h4>바뀐다44444</h4>
    <p>안녕하세요, <strong>{username}</strong>님!</p>
    <button type="button" onClick={toggleTheme}>Change Theme</button>
  </div>
)
}

export default GrandChild

// 훅은 조건문 언애서 사용이 안된다..const ctx = useContext(UserContext); 그런데 19버전 const ctx = use(UserContext);은 조건안에서 가능 해졌다.. 그래서 유즈를 좀더 편하게 사용한다.


/*
  React Hook 사용 규칙

  - 일반적인 Hook(useState, useContext 등)은
    컴포넌트나 커스텀 훅의 최상위에서 호출해야 한다.
  - 조건문이나 반복문 안에서 호출하면 안 된다.

  - React 19에서 추가된 use()는 예외적으로
    조건문이나 반복문 안에서도 호출할 수 있다.
  - 단, use()도 컴포넌트나 커스텀 훅 내부에서 호출해야 한다.

  - useUserContext()는 커스텀 훅이므로
    조건문 안이 아닌 최상위에서 호출해야 한다.
*/

/*
  Custom Hook (커스텀 훅)

  - React Hook을 활용하는 공통 로직을 재사용하기 위해
    개발자가 직접 만드는 함수이다.

  - 함수 이름은 use로 시작한다.
  - 내부에서 useState, useContext, use 등의 Hook을 사용할 수 있다.
  - 중복 코드를 줄이고 컴포넌트의 코드를 간결하게 만든다.
  - 일반적인 Hook 규칙에 따라 최상위에서 호출해야 한다.

  이번 실습의 useUserContext()
  1. use(UserContext)로 Context 값을 가져온다.
  2. 값이 null인지 확인한다.
  3. 값이 없으면 오류를 발생시킨다.
  4. return으로 Context 값을 반환한다.

  GrandChild에서는 useUserContext()를 호출하여
  username을 가져와 화면에 출력한다.

  커스텀 훅은 로직을 재사용하기 위한 것이고,
  Context API는 하위 컴포넌트에 값을 제공하기 위한 기능이다.
*/


/*
  [추가]
  <React 19의 use()>

  기존에는 useContext(UserContext)를 사용하여
  Context 값을 읽었다.

  React 19에서는 use(UserContext)로도
  동일한 Context 값을 읽을 수 있다.

  useContext()는 Context 값을 읽는 Hook이고,
  use()는 Context와 Promise를 읽을 수 있는 API이다.

  React 19에서도 기존 useContext()를 사용할 수 있다.
*/