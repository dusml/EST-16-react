import type React from "react";

function NavContents() {


  // 사이드 이펙트 (부수효과)
  // 이벤트는 컴포넌트 안에 있으면 안됨.
  // 사이드 이펙트를 처리할 수 있는 함수 안에 있는건 가능함 
  // 이벤트 핸들러

  const handleClickFirstLink = (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const firstLink = document.querySelector('[href="#jsx-markup"]') as HTMLAnchorElement;

    console.log(firstLink);
  };


  /* const firstLink = document.querySelector('[href="#jsx-markup"]') as HTMLAnchorElement;
  console.log(firstLink); 
  헨들러 함수 안에 넣게 된다.
  이렇게만 사용하지 않으면 충분하게 사용이 가능하다.

  <정리>
  - 이렇게 컴포넌트 안에서 바로 실행하면 안 된다. 이벤트 핸들러 함수 안에 넣어서 사용하면 된다. 즉, 렌더링 중에 직접 실행하지 않으면 된다.
  */
  

  return (
    <nav className="NavContents" aria-label="학습 주제 탐색">
      <a href="#jsx-markup" onClick={handleClickFirstLink}>JSX마크업</a>
      <a href="#responding-to-event">이벤트 응답</a>
    </nav>
  )
}
export default NavContents