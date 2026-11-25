import { useState } from "react"
import Parent from "./Parent"
import { UserContext } from "./UserContext"
import { ThemeProvider } from "./ThemeContext"



function App() {

  const [username, setUsername] = useState('안경찬')

  // export const UserContext = createContext<{username:string} | null>(null);
  // 컴포넌트..?? 가상돔..?? 내보내야 사용이 가능한데..?  불편해.. 따로 분리를 한다. UserContext 이동하고 내보내기
  // console.log(UserContext); - 확인용

  /*
  [추가] createContext()와 Context 파일 분리

  createContext()는 데이터를 공유하기 위한 Context 객체를 생성하는 함수이다.
  컴포넌트나 가상 DOM, 상태를 생성하는 함수는 아니다.

  중간 컴포넌트마다 Props를 전달하는 불편함을 줄이기 위해 사용한다.
  쉽게 생각하면 공용 사물함을 만드는 것과 같다.

  createContext(null)에서 null은 상위 Provider가 없을 때
  사용하는 기본값이다.

  Context 객체를 생성하는 것만으로 데이터가 자동으로 공유되지는 않는다.
  이후 Provider를 통해 공유할 값을 제공해야 한다.

  기존에는 App에서 Context를 직접 생성했지만,
  다른 컴포넌트에서도 사용하기 편하도록
  UserContext.ts 파일로 분리하고 export한다.

  필요한 컴포넌트에서는 import를 통해 같은 Context 객체를 사용할 수 있다.

  실제 username 상태는 App의 useState에서 관리한다.

  - useState() : 상태를 생성하고 관리하는 역할
  - createContext() : 값을 공유하기 위한 Context 객체를 생성하는 역할
*/

  


  /*
  [추가] 
  <Props Drilling을 줄이기 위한 Context API>

  기존에는 GrandChild에서 username을 사용하기 위해
  App → Parent → Child → GrandChild 순서로 Props를 전달했다.

  하지만 Parent와 Child는 해당 데이터를 직접 사용하지 않는데도
  다음 컴포넌트에게 전달해야 하는 불편함이 있었다.

  이러한 Props Drilling을 줄이기 위해 Context API를 사용한다.

  createContext()로 Context 객체를 생성하고,
  UserContext의 value를 통해 공유할 값을 제공한다.

  이렇게 하면 중간 컴포넌트에서 Props를 전달하지 않아도
  필요한 하위 컴포넌트에서 Context 값을 읽을 수 있다.

  상태 값(username)뿐만 아니라
  상태 변경 함수(setUsername)도 함께 제공할 수 있다.
*/
  
  return (
    <ThemeProvider>
      <UserContext value={{username , setUsername}}>
        {/* 기본 적으로 벨류가 들어가야 한다. 스트링에 널이 드어간다며? 알려줌
          그래서 타임 설정을 해줘야 한다. <{username:string} | null> 중괄호가 2개 인것은 객체로 전달하여야 하기 때문 숏헨드 르로퍼티..? */}
        {/* 그리고 setUsername도 내보내주면 좋기 떄무넹 UserContext에 타입 설정을 하고 내보내기 함수도 전달이 가증하다.  */}

        {/*
          [추가]
          <UserContext의 value 역할>
            value는 하위 컴포넌트와 공유할 값을 지정하는 Props이다.

            createContext()가 공용 사물함을 만드는 역할이라면, value는 사물함을 통해 공유할 값을 제공하는 역할이다.

            - username : 현재 사용자 이름(상태 값)
            - setUsername : 사용자 이름을 변경하는 함수

            Context를 통해 상태 값뿐만 아니라 함수도 제공할 수 있다.

          <중괄호를 두 번 사용하는 이유>
            바깥쪽 중괄호는 JSX 안에서 JavaScript 표현식을 사용하기 위해 작성한다.

            안쪽 중괄호는 username과 setUsername을 하나의 객체로 묶기 위해 작성한다.

            객체를 별도의 변수에 저장하지 않고 value에 직접 전달하기 때문에 중괄호가 두 개가 된다.

          <Shorthand Property - 단축 속성 표기법>
            객체의 속성 이름과 변수 이름이 같으면 하나만 작성할 수 있다.

            기존 방식 : { username: username, setUsername: setUsername }
            단축 방식 : { username, setUsername }

            작성 방법만 짧아졌을 뿐 객체의 내용은 동일하다.
            React 전용 문법이 아니라 JavaScript의 객체 문법이다.
        */}
        <div style={{ border: '1px solid gray', padding: '10px' }}>
          <h1>버튼을 클릭하면 사용자가 변경됩니다!</h1>
          <Parent/>

          <button
            type="button"
            onClick={() => setUsername('신재훈')}
          >사용자 변경</button>
        </div>
      </UserContext>
    </ThemeProvider>
  )
}
export default App



// 그러면 그랜드 차일드에서 하는게 좋지 않아요? 버든은 앱에 있는데..?? 아래로 내리는것 쉽지만 올리는건 어렵다.. 올리는건 인잉..??  앱에서 셋을 호출.. 프롭스가 도로로로내려간다고 해서 드릴링 패런츠와 촤일드는 필요 없는데.. 이를 인젭트 라고 한다. 이걸 리엑트에서는 겈테스트 에이피 아리 

/*
  Props Drilling (프롭스 드릴링)

  기존 구조:
  App → Parent → Child → GrandChild

  - App에서 username 상태를 관리한다.
  - GrandChild에서 username을 사용하려면
    Parent와 Child를 거쳐 Props를 전달해야 한다.
  - Parent와 Child가 username을 직접 사용하지 않아도
    GrandChild에게 전달하기 위해 Props를 받아야 한다.

  React의 Props는 부모에서 자식 방향으로 전달된다.

  자식에서 부모의 상태를 변경하려면
  부모가 전달한 콜백 함수를 호출할 수 있다.
  이때 실제 상태는 해당 상태를 관리하는 컴포넌트에서 변경된다.

  Context API

  - 중간 컴포넌트를 거치지 않고 데이터를 전달할 수 있다.
  - Provider 하위 컴포넌트에서 Context 값을 읽을 수 있다.
  - 문자열, 숫자, 객체뿐만 아니라 함수도 전달할 수 있다.
  - username(상태 값)과 setUsername(상태 변경 함수)을 함께 전달할 수 있다.
  - 하위 컴포넌트에서 전달받은 함수를 호출하여 상태 변경을 요청할 수 있다.
  - Props Drilling을 줄이는 데 도움이 된다.
*/


/*
  <App.tsx 최종 정리 - Context API>

  1. useState()
    App에서 username 상태와 setUsername 상태 변경 함수를 관리한다.

  2. createContext()
    데이터를 공유하기 위한 Context 객체를 생성한다.
    다른 파일에서도 사용할 수 있도록 UserContext.ts로 분리한다.

  3. Props Drilling
    중간 컴포넌트마다 Props를 전달해야 하는 구조이다.
    이러한 불편함을 줄이기 위해 Context API를 사용한다.

  4. UserContext의 value
    하위 컴포넌트에서 사용할 username과 setUsername을 제공한다.
    상태 값뿐만 아니라 상태 변경 함수도 공유할 수 있다.

  5. 중괄호와 단축 속성 표기법
    바깥쪽 {} : JSX에서 JavaScript 표현식 사용
    안쪽 {} : 객체 생성

    { username: username, setUsername: setUsername }
    → { username, setUsername }

  6. Provider 중첩 구조
    ThemeProvider는 테마 정보를 제공한다.
    UserContext는 사용자 정보를 제공한다.
    두 Provider 내부의 하위 컴포넌트는 두 Context 값을 읽을 수 있다.


  <사용자 변경 버튼 클릭 시 실행 흐름>

  ① 사용자 변경 버튼 클릭
  ② setUsername('신재훈') 호출
  ③ username 상태 변경 요청
  ④ App 컴포넌트 리렌더링
  ⑤ UserContext의 value에 새로운 상태 값 제공
  ⑥ Context를 읽는 GrandChild도 리렌더링
  ⑦ 화면에 변경된 사용자 이름 출력


  <핵심>

  useState       : 상태 관리
  createContext  : Context 객체 생성
  Provider       : 공유할 값 제공
  value          : 실제 공유할 값

  상태는 App에서 관리하고,
  필요한 하위 컴포넌트에서는 Context를 통해 값을 읽는다.
*/