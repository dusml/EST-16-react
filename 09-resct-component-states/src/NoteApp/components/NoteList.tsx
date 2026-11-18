import './NoteList.css'
import { convertSlug } from "@/utils/convertSlug";
import type { Note } from "../api/getNote";
import { ROUTES } from '../routes';


interface Props {
  list:Note[];
  onChangeRoute:(nextRoute:string,pikcNodeId:number) => void;
}


function NoteList({list,onChangeRoute}:Props) {
  // console.log(list);

  const handleClick = (pickNoteId: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onChangeRoute(ROUTES.detail, pickNoteId);
  }

  //클로저로 만든이유 온체인지를 실행하려면 2개의 매개변수 을 전당.. 그러면 함수가 실해되고 끝나게 된다. 그해서 안정하게 사용하기 귀애허 함구가 함수 를 픽 노트 아이드도 밭아야 하고 이벤트 동작도 차단하기 위해서 세번..?? 그래서 위에서 정의 ㅐ서 사용하면 이렇게 된다. 마지맋 함ㅅ구사 실행되는 곳이..?{handleClick(item.id)}이다.. ????????

  return (
    <div className="NoteList">
      <h2>노트 필기 목록</h2>
      <ul>
        {
          list.map((item)=>{

            const slug = `#${convertSlug(item.title)}`;

            return(
              <li key={item.id}>
                {/* 라우트..?? 페이지 전환 */}
                <a href={slug} onClick={handleClick(item.id)}>{item.title}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export default NoteList


/*
    <클로저를 사용한 이유>
    onChangeRoute를 실행하려면 페이지 정보와 노트 ID, 총 2개의 인수가 필요하다.

    handleClick(item.id)를 사용하면 노트 ID를 먼저 전달하고,
    클릭했을 때 실행할 이벤트 핸들러 함수를 반환한다.

    반환된 함수는 클로저를 통해 pickNoteId를 기억한다.
    실제 클릭이 발생하면 e.preventDefault()로 링크의 기본 동작을 막고,
    onChangeRoute(ROUTES.detail, pickNoteId)를 실행한다.

    즉, handleClick(item.id)는 렌더링 중 실행되어 함수를 반환하고,
    반환된 함수는 클릭했을 때 실행된다.
  */