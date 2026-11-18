import './NoteAPP.css'
import { useState } from 'react';
import { getNoteList, type Note } from './api/getNote'
import NoteListPage from './pages/NoteListPages';
import { ROUTES } from './routes';
import NoteDetailPage from './pages/NoteDetailPage';
import NoteCreatePage from './pages/NoteCreatePage';
import NoteEditPage from './pages/NoteEditpage';



/* 


                  ┌────────────── App (상태는 여기에만) ──────────────┐
                  │  list       ← useState(() => getNoteList())      │
                  │  routeInfo  ← { route, noteId }                  │
                  │  파생       selectedNote, newNoteId              │
                  │  함수       handleChangeRoute / Create / Edit / Delete │
                  └─────────────────────┬────────────────────────────┘
                                      │ switch (routeInfo.route)
        ┌──────────────────┬────────────┴─────┬───────────────────┐
        ▼                  ▼                  ▼                   ▼
  NoteListPage       NoteDetailPage     NoteCreatePage      NoteEditPage
  └ NoteList         ├ BackLink         ├ BackLink          ├ BackLink
  (클릭 → detail)    ├ PrintError       └ NoteForm(create)  └ NoteForm(edit)
  (작성 → create)    (수정 → edit)





*/










function NoteApp() {

  const [list, setList] = useState(()=>getNoteList());
  // const [list, setlist] = useState(getNoteList()) ; 이렇게 하면 .. 데이터를 지우고 계속 새로 시작을 한다..?? 잉..??? 콜백으로 하는 이유??
  // console.log(data);
  // console.log(list);
  const [routeInfo, setRouteInfo] = useState<{
    route:string;
    noteId:number | null
  }>({
    route:'list',
    noteId:null
  }); //문자만 쓰면 몇번째 인데를 모른다..
  
  const handleChangeRoute = (nextRoute:string,pikcNodeId:number) => {

    //nextRoute - 어디페이지로 갈껀지..??
    //현제 선택된 노트의 NodeId
    setRouteInfo({
      ...routeInfo,
      route: nextRoute,
      noteId: pikcNodeId ? pikcNodeId : routeInfo.noteId
    })
  }

  const handleCreateNote = (newNoteItem: Note) => {
    setList([...list, newNoteItem]);
  }

  //노트 수정 : 아이디가 같은 노트말 새 객체로 변경한 이우 새로운 배열을 반환
  //내가 바꾸고 싶은 노트의 정보가 들어가고 리스트를 변경 맵을 돌려서 아이템이 떨어지면, 아이템의 아이디돠 바꾸고자하 하는 아이디가 일치한다면 ...으로
  const handleEditNote = (willEditNote: Note) => {
    const nextList = list.map((item) =>
      item.id === willEditNote.id ? willEditNote : item
    );
    setList(nextList);
    //바꾸고 업데이트를 한다.
  };

  //삭제 부분
  // 삭제 핸들러 만들기
  // array.filter를 사용해 선택된 Id만 배열에서 제외
  // list 갱신
  // 핸들러 전달하기
  /* const handleDelete = (deleteNoteId: number) => {
    console.log('삭제');
    const nextList = list.filter(
      (item) => item.id !== deleteNoteId
    );
    setList(nextList)
  }
 */

  const handleDeleteNote = (willDeleteNoteId: number) => {
    const nextList = list.filter((item) => item.id !== willDeleteNoteId);
    setList(nextList);
  };
  // 부모가 데이터를 가지고 있으니 부모에서 만들어서 계속 안쪽으로 넣기,,????


  // 파생 상태: 새 노트의 id값
  // const newNoteId = list.length + 1; 지웠다가 하면 겹치게 된다. 그래서 아래와 같이 작성을 하면 된다.
  const newNoteId = Math.max(0, ...list.map((item)=>item.id)) + 1 ;


  /* return (
    <NoteListPages list = {list}/>

    spa방식을 사용하기 위해 주석 리엑트는 이반식을 사용한다,
  ) */

  const selectedNote = list.find((item) => item.id === routeInfo.noteId) ?? null;

  switch (routeInfo.route) {
    case ROUTES.list:
      return <NoteListPage list={list} onChangeRoute={handleChangeRoute}/>

    case ROUTES.detail:
      return <NoteDetailPage note={selectedNote} noteId={routeInfo.noteId} onChangeRoute={handleChangeRoute}/>

    case ROUTES.create:
      return <NoteCreatePage onCreate={handleCreateNote} newNoteId={newNoteId} onChangeRoute={handleChangeRoute}/>

    case ROUTES.edit:
      return <NoteEditPage noteId={routeInfo.noteId} note={selectedNote} onChangeRoute={handleChangeRoute} onEdit={handleEditNote} onDelete={handleDeleteNote}/>
  }
}
export default NoteApp

//제이슨은 머데이트가 안됨 그러니 리스트로 왜냐 리스트는 업데이트가 되어 ㅆ기 때문에..???