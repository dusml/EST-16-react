import { useId, useState } from 'react'
import './NoteForm.css'
import { getUserList } from '../api/getUser';
import type { Note } from '../api/getNote';
import { convertTextToHTMLString } from '@/utils/convertTextToHTMLString';


interface FormData {
  title: string;
  content: string;
  userId: number;
}

type FormEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

// 컴포넌트 밖에서 호출 : 렌더링마다 다시 부를 필요가 없기 때문이다.
const userList = getUserList();


interface Props {
  onCreate: (newNoteItem: Note) => void;
  onBackLink: () => void;
  newNoteId: number;
}



function NoteForm({onBackLink, onCreate, newNoteId}:Props) {

  const titleId = useId();
  const contentId = useId();
  const userId = useId();

  // 입력칸 여러개 관리 -> 상태관리 객체 하나로 상태관리 안그러면 유즈스테리트가 망히 낭ㅎ게떄문
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    userId: 0
  });
  console.log(formData);
  

  // title input에 글자를 입력하면 formData가 업데이트가 될 수 있도록 만들어주세요
  // - 업데이트 핸들러 함수
  // - 핸들러 함수 바인딩

  const handleUpdateFormData = (e:FormEvent) => {
    // formData.title = e.target.value; 이건 안됀다 자바스크립트 방식..
    // setFormData(새 오브젝트를 만들면 되..)

    const { name, value } = e.target;
    const nextFormData = {
      ...formData,
      [name]: value
    }
    // computed property

    setFormData(nextFormData);

    console.log(formData);
    
  }

  const handleReset = () => {
    setFormData({
      title: '',
      content: '',
      userId: 0
    }) 
  }

  // ⭐⭐⭐
  // handleCreateNote 핸들러 함수 만들기 ✔️
  // form에 핸들러 연결 ✔️
  // handleCreateNote 안에서
  //  -> formData에서 필요한 값을 구조분해
  //  -> user의 항목 1개 가져오기 ..??find
  //  -> newNote 객체 만들기 ....?????
  //      -> content는 covertTextToHTMLString함수를 사용해서
  //  -> 객체 값 조립
  //  -> onCreate에 완성된 객체 전달
  //  -> 목록으로 되돌아가기

  const handleCreateNote = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    const {title, content, userId} = formData;

    const user = userList.find((item)=> {
      return item.id === userId
    })
    // console.log(user);
    const newNote = {
      id: newNoteId,
      title,
      content:convertTextToHTMLString(content)
    };
    
  }

  return (

    //form에게 주면 된다.. 꼭 초기화 버듵에 주지 랂아고 가지고 있느 함수가 ㅣㅇㅆ다.onReset 서브밋이라 같은 ..??
    // reset 버튼은 DOM만 비움 -> 상태도 비워야 화면이 초기화가 됨

    <form className="NoteForm" onReset={handleReset} onSubmit={handleCreateNote}>

      <div className="formControl">
        <label htmlFor={titleId}>제목</label>
        <input type="text" id={titleId} name="title" value={formData.title} onChange={handleUpdateFormData} />
      </div>

      <div className="formControl">
        <label htmlFor={contentId}>내용</label>
        <textarea id={contentId} name="content" value={formData.content} onChange={handleUpdateFormData} />
      </div>

      <div className="formControl">
        <label htmlFor={userId}></label>
        <select
          name="userId"
          id={userId}
          value={formData.userId}
          onChange={handleUpdateFormData}
          >
            <option value={0}>작성자 선택</option>
            {
              userList.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }

          </select>
      </div>


      <div className="buttonGroup">
        <button type="submit">추가</button>
        <button type="reset">초기화</button>
      </div>

    </form>
  )
}

export default NoteForm