import { createRoot } from "react-dom/client";
import Headline from "./components/Headline";
import { StrictMode } from "react";


const container = document.getElementById('root');

if(!container) throw new Error('문서에 #root 요소가 존재 하지 않습니다.')

createRoot(container).render(
  <StrictMode>
    <Headline/>
  </StrictMode>
  
)

// 리엑트의 컴포넌트는 순수성을 강조 하기 때문에 순수해야 한다.  (순수 함수)
//순수함수라고 하며 순수함수는 동일 입력 -> 동일 출력 원리 다른 값을 널어도 나오는 값이 같아야 한다.
//함수가  순수한지 불순한지 확일 할수 있는 방법은?? 함수를 2번 실행 시켜보면 된다.. 근데 그걸 계속 해볼수 없으니 <StrictMode> 을 이용해서 2번을 실행 한 것이다.
//리엑트 컴포넌트 내에서는 순수해야 한다.