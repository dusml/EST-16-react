
/* export function HTMLCode() {
  return (
    <div>
      <h2>HTMLCode</h2>
    </div>
  );
} */


// component namespace pattern
// 관련된 컴포넌트를 하나의 이름 아래 묶는 방식
// compound component와 design system에서 활용할 수 있다.

// compound component
//디자인 시스템을 가져다가 쓰기 편하다.
// 여러 컴포넌트를 조합해 하나의 UI를 구성하는 방식
// 디자인 시스템에서 재사용하기 편하다.

// design system 

import { useState } from "react";
import EventHandleProp from "./responding-to-events/EventHandleProp"



function RespondingToEvents(){

  const [text, setText] = useState('hello')
  

  let message = 'message hello';
  const updateMessage = (add:string):void => {
    message += add;
    console.log(message);
  }
  return (
    <div className="ViewRespondingToEvent">
      <h1>이벤트 응답</h1>
      <p>사용자와 상호작용하도록 이벤트를 구성합니다.</p>
      <form 
        action="/?submitted"
        onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault();
          const form = e.currentTarget;
          const input = form.elements.namedItem('username') as HTMLInputElement;
          const value = input.value;

          // form 찾기 
          // input 찾기
          // input 값 가져오기

          setText(value);
          input.value = "";
          
          // updateMessage('hello');
            
        }}
        >
        
        <input type="text" name="username"/> {' '}
        <button type="submit">보내기</button>
        <div>
          <p>{text}</p>
          <p>{message}</p>  
        </div> 
      </form>
      <EventHandleProp text={text} setText={setText} message={message} onPrintMessage={updateMessage}/>
    </div>
  )
}

function HTMLCode(){
  return (
    <div hidden>
      <h2>HTMLCode</h2>
    </div>
  )
}

function View() {
  return (
    <div>View</div>
  )
}
export default View



View.HTMLCode = HTMLCode
View.RespondingToEvents = RespondingToEvents