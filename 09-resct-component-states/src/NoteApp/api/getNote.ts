import notesData from '@/data/notes.json';
import usersData from '@/data/users.json';


export type Note = (typeof notesData)[number] & {
  expand?: {
    user: typeof usersData[number];
  }
}

// 노트의 목록 가져오기 (노트 데이터 + 유저 정보 합치기) - 관계형 데이터
export function getNoteList(): Note[] {
  return notesData.map((note) => {
    const user = usersData.find((user) => user.id === note.userId);
    return user ? { ...note, expand: { user } } : note;
  })
}

// /{ ...note, expend: { user } } 열거해서 만들어야 한다. 리엑트는 불변성..? 불편해?? 임머..??

//.single()
//.getOne()

// 노트 하나만 조회
export function getNoteItem(noteId: number) {
  const notes = getNoteList();
  const note = notes.find((note) => note.id === noteId);
  return note ? note : null;
}

// 함번 만들어 두면 편하게 사용 할 수 있다. 계속 파인드를 찾을 것닌야..?