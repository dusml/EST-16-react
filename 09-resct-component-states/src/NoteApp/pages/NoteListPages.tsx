// import { convertSlug } from '@/utils/convertSlug';
import type { Note } from '../api/getNote';
import './NoteListPages.css'
import NoteList from '../components/NoteList';
import { ROUTES } from '../routes';

interface Props {
  list:Note[];
  onChangeRoute:(nextRoute:string,pikcNodeId:number) => void;
}

//서버에서 ..?가져오는 것처처럼..?

function NoteListPage({list,onChangeRoute}:Props) {

  // console.log( ...list )


  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onChangeRoute(ROUTES.create, 0)
  }

  return (
    <div className="NoteListPage">
      <NoteList list={list} onChangeRoute={onChangeRoute}/>
      <a href="#create-note" className="createNoteLink" onClick={handleClick}>
        노트 작성
      </a>
    </div>
  )
}

export default NoteListPage