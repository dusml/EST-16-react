import { useId, useState } from 'react'
import './NoteForm.css'
import { getUser, getUserList } from '../api/getUser';
import type { Note } from '../api/getNote';
import { convertHTMLToText, convertTextToHTMLString } from '@/utils/convertTextToHTMLString';


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
  newNoteId?: number;
  mode: 'create' | 'edit';
  note?:Note;
  onBackLink: () => void;
  onCreate?: (newNoteItem: Note) => void;
  onEdit?:(willEditNote:Note) => void;
  onDelete?:(willDeleteNoteId: number) => void
}



function NoteForm({ onBackLink, onCreate, newNoteId, mode, note, onEdit, onDelete }:Props) {

  const titleId = useId();
  const contentId = useId();
  const userId = useId();

  // 입력칸 여러개 관리 -> 상태관리 객체 하나로 상태관리 안그러면 유즈스테리트가 망히 낭ㅎ게떄문
  /* const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    userId: 0
  }); 
  mode: 'create' | 'edit'; 조건에 따라서 바뀌어야 하기 때문에 밑에 식을 사용을 한다. 콜백을 사용하는 이유는 조건문을 널허야 하기 때문이다.
  */

  const [formData, setFormData] = useState<FormData>(()=>{

    // edit 모드에서 객체의 값을 설정
    if(mode === 'edit' && note){
      return{
        title:note.title,
        content: convertHTMLToText(note.content), //이거응 하지 않으면 태그가 그대로 나오기 떄문에 작정을 해주어야 한다.
        userId: note.userId
      }
    }

    // create 모드에서 객체의 값을 비워두는 설정
    return{
      title: '',
      content: '',
      userId: 0
    }


  });


  const isCreateMode = mode.includes('create');

  // console.log(formData);
  

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
  //  -> user의 항목 1개 가져오기
  //  -> newNote 객체 만들기
  //      -> content는 covertTextToHTMLString함수를 사용해서
  //  -> 객체 값 조립
  //  -> onCreate에 완성된 객체 전달
  //  -> 목록으로 되돌아가기

  const handleCreateNote = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    // console.log('전송 성공');
    
    
    const {title, content, userId} = formData;

    const newUserId = Number(userId); // 문자에서 숫자로 들어가겠금 그 셀러터는 문자로 들어오기 떄문이다..??
    const user = getUser(newUserId);
    // console.log(user);

    if(!user) return; //작성자가 없으면 고르지 않으면 리텅
    if(!newUserId || !newNoteId) return; //or연산자고 한번에 작성도 가능


    /* const user = userList.find((item)=> {
      return item.id === userId
    }) */


    //새로운 객제
    const newNote = {
      id: newNoteId,
      title:title.trim(),
      content:convertTextToHTMLString(content),
      userId: newUserId,
      createdAt:'',
      updatedAt:'',
      expand:{
        user:user
      }
    };

    onCreate?.(newNote);
    onBackLink();//목록으로 되돌아 가기
    
  }

  //수정 부분
  const handleEidt = (e:React.FormEvent<HTMLFormElement>) =>{
    // console.log('aaa');
    e.preventDefault();

    if (note && onEdit) {
      const willEditNote = {
        ...note,
        title: formData.title.trim(),
        content: convertTextToHTMLString(formData.content),
        userId: Number(formData.userId)
      };

      onEdit(willEditNote);
      onBackLink();
    }
  }

  // 삭제부분
  const handleDelete = () => {

    if(note && onDelete){
      onDelete(note.id);
      onBackLink();
    }

  }

  

  return (

    //form에게 주면 된다.. 꼭 초기화 버듵에 주지 랂아고 가지고 있느 함수가 ㅣㅇㅆ다.onReset 서브밋이라 같은 ..??
    // reset 버튼은 DOM만 비움 -> 상태도 비워야 화면이 초기화가 됨

    <form className="NoteForm" onReset={handleReset} onSubmit={isCreateMode ? handleCreateNote : handleEidt}>

      <div className="formControl">
        <label htmlFor={titleId}>제목</label>
        <input type="text" id={titleId} name="title" value={formData.title} onChange={handleUpdateFormData} />
      </div>

      <div className="formControl">
        <label htmlFor={contentId}>내용</label>
        <textarea id={contentId} name="content" value={formData.content} onChange={handleUpdateFormData} />
      </div>

      {/* <div className="formControl">
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
      조건에 따라서 해야 하기 때문에 아래와 같이 작성을 한다.
      */}

      {
        isCreateMode && (
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
        )
      }


      <div className="buttonGroup">
        <button type="submit">{isCreateMode  ? '추가' : '수정'}</button>
        {isCreateMode ? <button type="reset">초기화</button> : <button type="button" onClick={handleDelete}>삭제</button>}
      </div>

    </form>
  )
}

export default NoteForm