import type { JSX } from "react/jsx-dev-runtime"
import { getRandom } from "../utils/getRandom";

interface props {
  statusMessages:StateMessage[];
}
//컴포넌트 타입을 위에다 만든다.. 


function DataBinding({statusMessages}:props):JSX.Element {
  // 매개변수가 객체면은 구조분해를 할수 있다.
  // console.log(statusMessages);
  const statusMessage = statusMessages[getRandom(statusMessages.length)];
  return (
    
    
    <>
      {/* 이게 뭐였지..?? <Fragment> 또는 <>사용 이건 프레그 먼트를 안불러 와도 된다.*/}
      <dt>데이터 바인딩(data binding)</dt>
      <dd>
        <p>상태 메시지(status message)를 연결해 화면에 출력합니다.</p>
        <span className="status">{statusMessage}</span>
      </dd>
    </>
    
  )
}

export default DataBinding