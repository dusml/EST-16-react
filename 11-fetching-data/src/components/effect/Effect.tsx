import useUsers from "@/hook/useUser";

// 컴포넌트는 "무엇을 보여줄지" / 혹은 "어떻게 가져올지"
// 관심사의 분리

function UserList() {

  // const [count, setCount] = useState(0);

  const {loading, error, users} = useUsers();

  if(loading) return <p>로딩 중....</p>;
  if(error) return <p>❌ 에러 발생!!! : {error.message} ❌</p>;

  return (
    <ul>
      {
        users && users.map((user)=>
          <li key={user.id}>{user.name} ({user.email})</li>
        )
      }
    </ul>
  )
}

export default UserList



/*
  [React 커스텀 훅으로 코드 분리하기]

  1. 기존 UserList.tsx

  원래 UserList 컴포넌트에서는 세 가지 일을 모두 처리했다.

  ① useState로 상태 관리
    - users   : 서버에서 가져온 사용자 목록
    - loading : 데이터를 불러오는 중인지 확인
    - error   : 데이터 요청 중 발생한 오류

  ② useEffect와 fetch로 데이터 가져오기
    - 컴포넌트가 마운트된 후 서버에 데이터를 요청한다.
    - 요청이 성공하면 users 상태를 변경한다.
    - 요청이 실패하면 error 상태를 변경한다.
    - 요청이 끝나면 loading을 false로 변경한다.
    - cleanup 함수에서 진행 중인 요청을 취소한다.

  ③ JSX로 화면 출력
    - loading이 true이면 로딩 메시지를 출력한다.
    - error가 있으면 오류 메시지를 출력한다.
    - 데이터가 있으면 map으로 사용자 목록을 출력한다.


  2. 왜 코드를 분리했을까?

  기존 UserList는 데이터 가져오기와 화면 출력까지
  모두 담당하고 있어서 코드가 길고 복잡했다.

  그래서 역할을 두 가지로 나누었다.

  useUsers.ts   → 데이터 요청과 상태 관리
  UserList.tsx  → 상태에 따른 화면 출력

  이렇게 하면 데이터 요청 로직을 다른 컴포넌트에서도
  재사용할 수 있고 코드를 이해하기 쉬워진다.


  3. useUsers.ts로 옮긴 코드

  기존 UserList에서 다음 코드를 옮겼다.

  - users, loading, error를 관리하는 useState
  - 서버에 데이터를 요청하는 useEffect
  - fetch와 then, catch를 이용한 비동기 처리
  - AbortController를 이용한 요청 취소

  이 코드들을 useUsers()라는 커스텀 훅으로 묶었다.

  그리고 다른 컴포넌트에서도 상태를 사용할 수 있도록
  return { users, loading, error }로 객체를 반환한다.


  4. UserList.tsx에 남긴 코드

  - loading 상태에 따른 로딩 화면
  - error 상태에 따른 오류 화면
  - users.map()을 이용한 사용자 목록 출력

  기존의 useState와 useEffect는 제거하고
  useUsers() 커스텀 훅을 호출하도록 변경했다.


  5. 두 파일이 연결되는 방법

  [useUsers.ts]

  return { users, loading, error };

  → 상태 값 세 개를 하나의 객체로 반환한다.


  [UserList.tsx]

  const { loading, error, users } = useUsers();

  → useUsers()를 호출한다.
  → 반환된 객체를 구조 분해 할당으로 받는다.
  → 필요한 상태를 사용해 화면을 렌더링한다.


  6. 실제 실행 흐름

  ① UserList 컴포넌트가 실행된다.

  ② UserList에서 useUsers()를 호출한다.

  ③ useUsers 내부의 useState가 초기 상태를 준비한다.

  ④ useUsers가 users, loading, error를 반환한다.

  ⑤ 처음에는 loading이 true이므로 로딩 화면이 나타난다.

  ⑥ 마운트 후 useEffect가 실행되고 fetch로 데이터를 요청한다.

  ⑦ 요청이 성공하면 setUsers(data)로 목록을 저장하고
    setLoading(false)로 로딩을 종료한다.

  ⑧ 상태가 변경되면 UserList가 다시 렌더링된다.

  ⑨ UserList에서 users.map()으로 사용자 목록을 출력한다.

  ※ 요청이 실패하면 error 상태를 저장하고 오류 화면을 출력한다.


  [핵심 정리]

  기존:
  UserList.tsx = 상태 관리 + 데이터 요청 + 화면 출력

  변경:
  useUsers.ts  = 상태 관리 + 데이터 요청
  UserList.tsx = 커스텀 훅 호출 + 화면 출력

  커스텀 훅은 공통 로직을 분리하고 재사용하기 위해 만든다.
  useUsers()는 사용자 데이터를 준비하고,
  UserList는 그 데이터를 화면에 보여주는 역할을 한다.

  ※ 커스텀 훅은 호출하는 컴포넌트마다 독립적인 상태를 가진다.
  ※ .ts와 .tsx의 차이는 객체 반환 여부가 아니라 JSX 사용 여부이다.
*/