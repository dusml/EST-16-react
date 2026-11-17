import { useState } from 'react';
import './UserPage.css';

import userData from '@/data/users.json';
import UserList from './components/UserList';
import UserSearchBox from './components/UserSearchBox';
import InstantSearch from './components/InstantSearch';
import UserListCount from './components/UserListCount';


function UserPage() {

  // console.log( userData ); 데이터 확인
  //[ 상태 선언 ]
  const [searchTerm, setSearchTerm] = useState('')

  const [users] = useState(userData);
  // set은 삭제하거나 추가 할때 필요한거고 여기서는 필터로만 할거기 때문에 필요가 없다...

  //체크박스??
  const [isInstantSearch ,setIsInstantSearch] = useState(false)
  
  //[상태 업데이트]
  //컴포넌트 상태를 업테이트 하는 곳
  const handleSearch = (userInput:string) => setSearchTerm(userInput);
  //핸들이 일어나면 정보응 럽데이트하도 ..?? 


  //검색된 유저 목록만 
  // [파생 상태] 원래 대이터를 가공함...?
  /* const 검색된유저목록 = users.filter((user) =>
    user.name.includes(searchTerm) ||
    user.email.includes(searchTerm) ||
    user.city.includes(searchTerm)
  ) */

  // every 모두 만족해야 true (and)
  // some  하나라도 만족하면 true (or)
  /* const searchedUserList = users.filter((user) =>
    [user.name, user.email, user.city].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
      // 영문일수 도 있으니 includes(searchTerm.toLowerCase()) 안에도 toLowerCase를 돌리자...
    )
  ) */

  // console.log(searchedUserList);


  const searchedUserList = users.filter((user) =>
    [user.name, user.email, user.city].some(
      (field) => field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  console.log(isInstantSearch);


  const handleReset = () => {
    setSearchTerm('');
  };

  // 헤더 핸들러 이벤트..??
  const handleToggleInstantSearch = () => setIsInstantSearch(!isInstantSearch);



  return (
    <div className='UserPage'>

      <InstantSearch onToggle = {handleToggleInstantSearch} isInstantSearch ={isInstantSearch}/>

      <UserSearchBox
        onSearch = {handleSearch}
        searchTerm = {searchTerm}
        handleReset={handleReset}
        isInstantSearch ={isInstantSearch} />
        {/* 함수르 전달함  / 사용하기 위해서는 전달을 해주는데 이름 과 값을 같게하는 것이 관례이다..??*/}

      <UserList users={searchedUserList} />
      {/*  <UserList users={userData} /> 검색을 했을 때 유저 데이커가 바뀌어 야한다.. 지금은 통체로 가져와진도 있고 가져옴에 따라서 가져와야 하기 떄문에 사ㅏㅇ태가 피룡하다..?? */}

      <UserListCount
        userCount={searchedUserList.length}
        totalUserCount={users.length}
      />


    </div>
  )
}
export default UserPage






/*
  [React 데이터 렌더링 - 나중에 다시 복습할 내용]

  1. 렌더링(Rendering)
  - 데이터를 화면에 표시하는 과정이라고 배웠다.
  - JSX에서 {user.name}처럼 작성하면 데이터의 값을 보여줄 수 있다.
  - 아직 데이터가 실제 화면에 나타나는 과정이 헷갈린다.

  2. props (데이터 전달)
  - 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달한다.
  - UserPage → UserList → UserItem 순서로 데이터를 전달한다.
  - 전달하는 부분과 전달받는 부분이 아직 헷갈린다.

  3. 구조 분해 할당
  - function UserList({ users }: Prop)
  - props 객체에서 users를 꺼내 사용하는 문법이다.
  - 왜 중괄호를 사용하는지 다시 복습해야 한다.

  4. map()을 이용한 목록 렌더링
  - users는 여러 사용자 정보가 들어 있는 배열이다.
  - map()으로 사용자 정보를 하나씩 꺼낼 수 있다.
  - users.map((user) => (...)) 구조가 아직 어렵다.
  - user가 어디서 만들어지고 어떻게 전달되는지 복습이 필요하다.

  5. UserItem 컴포넌트
  - UserList에서 사용자 한 명의 정보를 전달받는다.
  - <UserItem user={user} /> 형태로 전달할 수 있다.
  - 왼쪽 user와 오른쪽 {user}의 차이를 다시 공부해야 한다.

  6. 실제 데이터 화면에 출력하기
  - <strong>{user.name}</strong>
  - user 객체에서 name 값을 가져와 화면에 표시한다.
  - 이름, 이메일, 지역을 각각 출력하는 방법을 연습해야 한다.

  7. TypeScript 타입
  - UserType은 사용자 한 명의 데이터 타입이다.
  - UserType[]은 사용자 여러 명이 들어 있는 배열 타입이다.
  - interface Props와 함수 매개변수의 관계를 복습해야 한다.

  [나중에 질문할 내용]
  - React 렌더링을 처음부터 다시 설명해 줘.
  - props로 데이터가 전달되는 과정을 그림으로 설명해 줘.
  - map()에서 user가 무엇인지 한 줄씩 설명해 줘.
  - UserPage → UserList → UserItem 코드를 연결해서 설명해 줘.
  - 정답을 먼저 보여주지 말고 한 단계씩 연습하고 싶어.
*/



/* 유저 페이지 에서 데이터 유저 리스트에 넘기고 아이템으로.... */