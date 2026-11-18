import type { Note } from "../api/getNote";
import BackLink from "../components/BackLink";
import NoteForm from "../components/NoteForm";
import { ROUTES } from "../routes";


interface Props {
  noteId: number | null;
  note: Note | null;
  onChangeRoute: (nextRoute: string, pickNoteId: number) => void;
  onEdit: (willEditNote: Note) => void;
  onDelete?:(willDeleteNoteId: number) => void
}

function NoteEditPage({ noteId, note, onChangeRoute, onEdit, onDelete }: Props) {

  console.log(note , noteId);
  

  const handleBackLink = () => onChangeRoute(ROUTES.list, 0);

  return (
    <div className="NoteEditPage">
      <BackLink onChangeRoute={handleBackLink} />
      {
        note && (
          <>
            <h2>노트 편집</h2>
            <NoteForm mode='edit' note={note} onEdit={onEdit} onBackLink={handleBackLink} onDelete={onDelete}/>
            {/* mode - 스위치 처럼 에딧이야 크리에트냐에 따라 변경이 되게... 민들어 준다. 재사용하게 이아이로 스위칭을 하자 note는 그래서 뭘 수정을 할꺼네...?? 그래서 노트에 데이터를 노트 폼으로 전달 */}
          </>
        )
      }

    </div>
  )
}
export default NoteEditPage