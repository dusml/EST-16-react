import './NoteAPP.css'
import { useState } from 'react';
import { getNoteList, type Note } from './api/getNote'
import NoteListPage from './pages/NoteListPages';
import { ROUTES } from './routes';
import NoteDetailPage from './pages/NoteDetailPage';
import NoteCreatePage from './pages/NoteCreatePage';


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

  // 파생 상태: 새 노트의 id값
  const newNoteId = list.length + 1;


  /* return (
    <NoteListPages list = {list}/>

    spa방식을 사용하기 위해 주석 리엑트는 이반식을 사용한다,
  ) */


  switch (routeInfo.route) {
    case ROUTES.list:
      return <NoteListPage list={list} onChangeRoute={handleChangeRoute}/>

    case ROUTES.detail:
      return <NoteDetailPage noteId={routeInfo.noteId} onChangeRoute={handleChangeRoute}/>

    case ROUTES.create:
      return <NoteCreatePage onCreate={handleCreateNote} newNoteId={newNoteId} onChangeRoute={handleChangeRoute}/>

    case ROUTES.edit:
      return <div>edit page</div>
  }
}
export default NoteApp