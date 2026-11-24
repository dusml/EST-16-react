import { useEffect, useLayoutEffect, useRef, useState } from "react";



/*
컴포넌트 실행 (렌더링)
↓
DOM 업데이트
↓
??????useLayoutEffecㅅ
↓
화면 그리기
↓
useEffect 실행
*/


// 레이아웃에 관련된 작업을 미리 수행해야 할 때
// 툴팁 & 팝오버 위치 계산
// 아코디언 & 애니메이션 크기 측정
// 스크롤 위치 조정
// 탭 인디케이터 위치 조정
//  이럴 사용한다. 



function Parent() {

  useLayoutEffect(()=>{
    console.log('🐯useLayoutEffec 실행 영역');
    if(boxRef.current){
      const h = boxRef.current?.getBoundingClientRect().height;
        setHeight(h)
      }
  },[])

  const boxRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0);

  console.log('🐶 컴포넌트 실행 영역');

  useEffect(() => {
    console.log('🐱 useEffect 실행 영역');

    // 내가 가지고 있는 높이
    // console.log(boxRef.current?.getBoundingClientRect());
    // console.log(boxRef.current?.getBoundingClientRect().height);
    /* if(boxRef.current){
      const h = boxRef.current?.getBoundingClientRect().height;
      setHeight(h)
    } */
    
    
  })


  return (
    <div>
      <div
        ref={boxRef}
        style={{
          background:'#000000',
          padding:'20px',
          fontSize:'24px'
        }}
      >
        이 박스의 높이: {height}px
      </div>
    </div>
  )
}
export default Parent


/*
[DOM 높이 측정과 화면 깜빡임]

현재 코드는 div 박스의 실제 높이를 측정해서
화면에 출력하는 코드이다.

그런데 useEffect는 일반적으로 브라우저가
화면을 그린 후에 실행된다.

따라서 처음에는 height의 초기값인 0이 보이고,
이후 실제 높이를 측정해서 setHeight로 변경하면
화면에 표시되는 숫자가 바뀌면서 깜빡일 수 있다.

[실행 순서]
1. 컴포넌트 렌더링 → height = 0
2. React가 DOM에 결과를 반영한다.
3. 브라우저가 초기 화면을 보여줄 수 있다.
4. useEffect에서 실제 박스 높이를 측정한다.
5. setHeight로 상태를 변경한다.
6. 리렌더링되어 측정한 높이가 화면에 표시된다.

[그래서 useLayoutEffect가 필요할 수 있다.]

useLayoutEffect는 DOM이 변경된 후,
브라우저가 화면을 그리기 전에 실행된다.

따라서 화면에 초기값이 보이기 전에
실제 높이를 측정하고 상태를 변경할 수 있다.

실행 순서
렌더링 → DOM 반영 → useLayoutEffect
→ 높이 측정 및 상태 변경 → 화면 그리기

※ useLayoutEffect는 화면 그리기를 지연시킬 수 있으므로
   화면 깜빡임을 방지해야 하는 경우에 사용한다.
*/
