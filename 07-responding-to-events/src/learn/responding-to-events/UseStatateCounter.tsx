import { useState } from "react";


// 함수는 데이터를 기억하지 못한다.
// - 컴포넌트 함수가 다시 실행되면 지역 변수도 새로 만들어진다.
function UseStateCounter() {


  // ==== 일반 지역 변수 ====
  // 리엑트는 변수의 값이 바뀌어도 리렌더링하지 않습니다.
  // 설련 리렌더링이 된다 하더라도 변수는 0으로 최기화 합니다.
  
  /* 
  <추가 정리>
  - 일반 변수의 값이 바뀌어도 React는 리렌더링하지 않는다. 버튼을 클릭하면 이벤트 핸들러 함수는 실행된다. localCount += 1도 실행되므로 실제 변수 값은 증가한다. 하지만 React가 리렌더링하지 않아서 화면에는 여전히 0이 표시된다.

  - 일반 변수의 값이 바뀌어도 React는 리렌더링하지 않는다.
  - 컴포넌트가 다시 실행되면 localCount는 0으로 초기화된다.
 */
  let localCount = 0;

  const handleLocalIncrement = () => {
    // console.log('..?'); 이벤트 확인
    localCount += 1
    console.log(localCount);
    // 이게 리렌더링이 되지 않음을 보여준다. 
    // 변수의 값은 증가했으므로 콘솔에는 증가 값이 출력된다. 하지만 React가 리렌더링하지 않아 화면에는 반영되지 않는다. <output>{localCount}</output> 이 부분은 바뀌지 않는다.
  }

  // ===== React 상태(useState) =====

  // useState는 컴포넌트 내부에서 변수의 값을 기억하기 위해 (클로저)
  // setCount에서 나온 set... 함수를 컴포넌트를 리렌더링 시키는 renderTrigger를 내장하고 있습니다.
  // useState에서 지정한 변수는 컴포넌트 내부에 저장되지 않는다. (Fiber 엔진에 저장소)

  /* 
  <useState 추가 정리>

  - useState는 React가 컴포넌트의 상태 값을 기억하고 관리하도록 해준다. useState(0)의 0은 처음 렌더링할 때 사용하는 초기값이다. 이후 setCount로 변경한 값은 React가 기억한다. 컴포넌트가 리렌더링되어도 0으로 초기화되지 않고 변경된 값을 유지한다.

  - etCount는 상태를 변경하도록 React에 요청하는 함수이다. 상태가 변경되면 React가 리렌더링을 요청하고 컴포넌트를 다시 실행한다. 이를 렌더 트리거(Render Trigger)라고 한다.

  - 일반 지역 변수는 컴포넌트가 다시 실행되면 새로 만들어진다. 하지만 useState의 상태는 React가 컴포넌트와 연결해서 별도로 관리한다. React는 내부적으로 Fiber라는 구조를 사용해 상태를 관리한다. 따라서 상태를 기억하는 이유가 단순히 클로저 때문만은 아니다.

  */
  const [count, setCount] = useState(0);
  //useState(0) ()안에는 초기갑을 넣는것 이다. setCount는 함수이며 앞에 있는 값을 재설정 하는..
  /* 
  <추가 설명>
  - count는 현재 상태 값이다.
  - setCount는 React에 상태 변경을 요청하는 함수이다.
  - setCount(10)을 호출하면 React가 새로운 상태 값을 관리한다.
  - 다음 렌더링에서 count는 10이 되고 화면에도 반영된다.

  - setCount에 새 값을 전달하면 React에 상태 변경을 요청한다.
  - React는 변경된 상태 값을 기억하고 다음 렌더링에서 count로 제공한다.
  - JSX의 {count}를 통해 변경된 값이 화면에 표시된다.
  */
  console.log('난 컴포넌트야');
  //버튼을 누를 때만다 콘솔창에 그려진다. 
  /* 
  <추가 설명>
  
  */

  // console.log(count,setCount)

  // React의 상태는 업데이트가 일어날 때, 즉시 반영되지 않습니다.여러 업데이트를 모아서 처리(batching) 할수 있는 방법이 있다
  // 기존 변수의 상태값을 이전 값을 받아 업데이트하고싶다? => useState callback
  // 간단한 값을 업데이트 input.value => setValue(input.value)
  const handleIncrement = () => {

    // setCount(count + 1)
    //이거를 하면 리 렌더링을 하고 있다는 것이다. 함수를 만들지 않았지만 이걸 실행하면 컴포넌트가 다시 실행이 되면 이건 렌더 트리거 라고 한다. 화면에 그림을 다시 그린다..

    // =+하면 상수는 재할장이 안되기 떄문에..?? 클로저로 관리.. 함수 밖에 저장되는 곳이 있다..?? 컴포넌트 밖으로 나가서 설정이 된다. 리엑트가 그렇게 처리를한다. useState를 사용하게 된면..?
    // 추가 - =를 넣어도 왜? 함수 안에서 변수로 지정을 한게 아니라 useState의 의해서 변술ㄹ 설정을 한것이며, 여기 함수란에 저장이 되는게 아니랑 함수 밖에 저장이도니다. (메모이즈?)이변수는 밖에 저장이 된다. 이렇게 들어가면 뭐가 다르냐 렌더 트리거가 발생 컴포넌트를 다시 실핼 그러면 함수 레비지 컬렉터 발생 데이터 날아감 기억하는 법이 클로저를 사용하면 된다. 그레서 리엑트 팀이 클래스를 사용하다. 클로저를 하여.. 리엑트 훅에 의해서 메모이즈?로 변수는 따로..?? 밭에 변수를 1로 저장.. 새로고침을 하면 초기값을 쓰는게 아니라 저장된 것을 사용.. 그리고 업데이트..?? 업데이트가 끝나면 화면 업데이드..? 세카운드가 먼저 호출 화면에 출려되기전 업데이트 ? 그러면 다시 화면에 그린다. 로컬변수랑을 차원이 다르다.

    //리엑트의 생면 주기 라이프 사이클..?


    // setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1) 을 하고 싶으면 아래와 같이 코드를 작성을 하면 된다. 

     // 이전 상태를 기반으로 계산함
    setCount((prev) => {
      console.log(prev);
      return prev + 1;
    });

    setCount((prev) => {
      console.log(prev);
      return prev + 1;
    });

    setCount((prev) => {
      console.log(prev);
      return prev + 1;
    });
  }

  const handleIncrement_ = () => {
    setCount(count - 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <details>
      <summary>
        <b>useState: 컴포넌트의 기억</b>
      </summary>
      <p>상태(state)는 렌더링 사이에 값을 기억하고, 값이 바뀌면 화면을 다시 그립니다.</p>
      <div>
        <button type="button" onClick={handleLocalIncrement}>지역 변수 + 1</button>
        {' '}
        <output>{localCount}</output>
        {/* 화면에 출력은 되지 않는다. */}
        <span> ← 출력 결과</span>
      </div>
      <hr />
      <div>
        <button type="button" onClick={handleIncrement}>상태 변수 + 1</button>
        <button type="button" onClick={handleIncrement_}>상태 변수 - 1</button>
        {' '}
        <output>{count}</output>
        <span> ← 출력 결과</span>
      </div>
      <div>
        <button type="button" onClick={handleReset}>초기화</button>
        {' '}
        <output>{count}</output>
        <span> ← 출력 결과</span>
      </div>
    </details>
  );
}

export default UseStateCounter;





/* // setCount(count + 1);

// setCount를 호출하면 React에 상태 변경을 요청한다.
// 상태가 변경되면 리렌더링이 발생하고 컴포넌트 함수가 다시 실행된다.
// 이렇게 렌더링을 요청하는 것을 렌더 트리거라고 한다.

// count는 const로 선언했기 때문에 직접 count += 1로 변경할 수 없다.
// 대신 setCount를 사용해 상태 값을 변경해야 한다.

// useState로 만든 상태는 일반 지역 변수와 다르게 React가 별도로 관리한다.
// 컴포넌트 함수가 다시 실행되어도 이전 상태 값을 기억할 수 있다.

// 컴포넌트 함수가 다시 실행되면 함수 내부의 지역 변수는 새로 만들어진다.
// 하지만 useState의 상태 값은 React가 기억하고 있기 때문에 유지된다.

// React는 상태를 관리하기 위해 내부적으로 Fiber 구조를 사용한다.
// 따라서 useState의 상태가 단순히 클로저에만 저장되는 것은 아니다. */