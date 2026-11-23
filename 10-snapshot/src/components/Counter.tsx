import { useState } from "react"

// 스냅샷 이론
// 리액트의 스냅샷은 사진을 찍는 것과 같다.
// 렌더링 순간에 State가 변경될 때 그 지점을 사진으로 찰칵 찍는 행위입니다.
// 사진을 찍고 나서 실제 값이 변경되더라도 이미 찍힌 사진 속 값은 바뀌지 않는다.
// State를 변경하면 기존 스냅샷을 수정하는 게 아니라, 다음 렌더링에서 새로운 스냅샷을 만들어냅니다.

// 이러한 개념은 공식문서에서 State as a snapshop이라 한다.

/*
  <추가 정리>

  스냅샷(Snapshot)은 사진을 찍는 것과 같은 개념이다.
  React는 화면을 그릴 때 그 순간의 상태값을 사용한다.

  예를 들어 처음 count가 3이라면,
  React는 count가 3인 상태로 화면을 그린다.

  이후 setCount(7)을 실행하면
  현재 값을 바로 바꾸는 것이 아니라
  다음 렌더링에서 7을 사용하도록 요청한다.

  그래서 setCount(7) 바로 아래에서 console.log(count)를
  실행하면 현재 상태값인 3이 출력된다.

  이후 React가 다시 렌더링하면 화면에는 7이 나타난다.
  하지만 콘솔에 이미 출력된 3은 바뀌지 않는다.

  즉, 이전에 찍은 사진을 수정하는 것이 아니라
  변경된 값으로 새로운 사진을 찍는 것과 같다.
*/

// useState의 초기값은 언제 계산될까?
// 몇번 실행되는걸까?

function slowInit(){
  console.log('초기값 계산중. . . ');
  let sum = 0;
  for(let i = 0; i < 1000; i++){
    sum += i;
  }
  return sum;
}

function Counter() {

  //지연 초기화 Lazy (Initialization)
  const [number,setNumber] = useState(slowInit);


  const handleClick = () => {
    setNumber(number + 5);
    // setNumber((n)=> n + 5);
    // setNumber(42);
  }


  return (
    <>
      <button type="button" onClick={()=>{setNumber(number - 1)}}>감소</button>
      <h1>{number}</h1>
      <button type="button" onClick={handleClick}>증가</button>
    </>
  )
}
export default Counter