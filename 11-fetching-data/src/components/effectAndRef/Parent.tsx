import { useEffect, useRef, useState } from "react"
import Child from "./Child";





function Parent() {

  const [messages, setMessages] = useState<string[]>([
    '다했어?',
    '넘어가도 돼',
    '나중에 안보여 준다?'
  ]);

  const addMessage = ()=> {
    setMessages((prev)=>[...prev,`새 메시지 ${prev.length + 1}`])
  }

  // const bottomRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    // 해당 요소가 보이도록 스크롤 가능한 조상들을 전부 움직임
    // bottomRef.current?.scrollIntoView({behavior:'smooth'});

    const list = listRef.current;
    if(!list) return;


    // 메시지 박스만 스크롤 scrollTo 스크롤의 어디 지점까지 이동을 시킬까
    // elem.scrollHeight => 스크롤의 전체 영역
    list.scrollTo({top: list.scrollHeight, behavior:'smooth'});
    // 스크롤에 어디 지점까지 이동을 시킬까..??

    // ref가 가리키는 대상이 맨 아래 div이나 아니면 스크롤 박스
    
    // ref가 맨 아래 div를 가리키면 scrollIntoView()를 사용한다.
    // ref가 스크롤 박스를 가리키면 scrollTo()를 사용할 수 있다.

    
  },[messages])


  return (
    
    <div>
      <h2>채팅방</h2>
      <div
        ref={listRef}
        style={{
        height: "200px",
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '10px'
      }}>
        {
          messages.map((msg,idx)=>
          <Child key={idx} message={msg}/>
          // 쌓이기만하는 것이기 떄무네 아이디가 아니라 인덱스를 입력해고 된다.
          )
        }
        {/* <div ref={bottomRef}></div> */}
      </div>
      <button type="button" onClick={addMessage}>메시지 보내기</button>
    </div>

  )
}
export default Parent