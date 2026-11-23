import { useCallback, useState } from "react";
import Child from "./Child"


// 리액트 : 부모 컴포넌트를 렌더링하면 자식 컴포넌트가 리렌더링이 된다.
// 잘못됐다 X 그냥 이렇게 동작한다.

// 내 자식은 리렌더링될 필요가 없는데? memo(컴포넌트)

// useCallback 함수를 기억하기(memo) 위해

// useCallback(함수, [의존성]), useEffect도 똑같이 나옴

// [count] -> count값이 변경되면 함수를 다시 기억
// 첫 렌더링 -> 함수를 기억해 둠
// 다음 렌더링 -> 의존성 있나? 의존성이 지난번이랑 똑같나? 똑같은 함수
//              의존성이 바뀌었다? 새 함수를 다시 기억하고 돌려줌
// [] -> 비교할 게 없으니 항상 같은 함수 기억하고 있을게~

function Parent() {

  const [count, setCount] = useState(0);

  /* const handleClick = () => {
    console.log('clicked!');
  } */
  // 함수가 계속 리렌더링... 그런데 리레더링 할 필요 없어..  그래서 아래와 같이 작성을 하면 된다.
  // useCallback 함수를 메모라기 위해 기억하기 위해 사용을 한다. 
  // useCallback(함수, [의존성 배열]) 내가 바뀌는 값에 따라거 다시 보내줘야 해! 그럴때 ..?? 그때 너가 뭐에 의존하고 있을꺼야?? 라고 할꺠 쓰는게 의존성배열..?? 나는 값이 바뀔게 없어 그러면 비워두면 된다 ([])이렇게 하면 나는 항상 같은 함수를 내보낼께! 근데 안에 들어 있으면 그 값이 변경이 되면 함수를 다시 실행할께[여기 내용이 바뀌게 되면..] 유즈 이펙트에서도 똑같이 나온다. 이 구조가 중요하다....ㅜㅜㅜ

  const handleClick = useCallback(() => {
    console.log('clicked!');
  },[])

  return (
    <div>
      <h1>Parent Count : {count}</h1>
      <button type="button" onClick={() => setCount(count + 1)}> +1 </button>
      <hr />
      {/* <Child label="야호!" onClick={handleClick}/> */}
      <Child label="야호!" onClick={handleClick}/>
      {/* onClick={handleClick}을 하면 자식이 렌더링이 된다..?? 오잉? 메모는 되는데 렌더링이 된다,,?? */}
    </div>
  )
}
export default Parent