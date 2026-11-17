

//타입 지정하고 이벤트 연결

import { debounce } from "@/utils/debounce";
import { useId } from "react";

interface Props {
  onSearch: (userInput: string) => void;
  searchTerm:string;
  handleReset: ()=> void;
  isInstantSearch: boolean
}

function UserSearchBox({ onSearch, searchTerm, handleReset, isInstantSearch }: Props) {


  const id = useId();

  const handleSearch_ = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const input = document.getElementById(id) as HTMLInputElement;
    // #을 안주면 안되기 떄무네 q에서 g으로 변경
    const value = input.value.trim();

    if(value.length > 0){
      onSearch(value);
      input.value = ''
    }else{
      alert('검색어를 입력하세요!!!!!')
      input.focus()
    }

    // 사이드 이펙트.. 헨들러 안에서 관리..
  }
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value), 300)

  return (
    <form className="UserSearchBox" onSubmit={handleSearch_}>
      {/* 전체에 거는 경우가 많앋.. / 매계번수가 실행 되어 나와야 할떄는..?? 매개변수를 함수로 받으면..??? 그래야 원하는 인수를 넣을 수 있다. 값을 넣어줘야 하는데? 아 함수 넣어서 전닿해 준다 . 그리고 함수를 계솟해서 작성하다보면 지저분해 보이지 때문에 밖으로 빼낸다. */}
      <div className="control">
        <label htmlFor={id}>사용자 검색</label>
        <input type="search" id = {id} placeholder='사용자 정보 입력'
        // value = {'안경찬'} 이걸 작성을 하면 값을 변경을 할수가 없다. 리엑트가 제어를 하기 때문이다.
        defaultValue = {searchTerm}
        onChange={isInstantSearch ? handleChange : undefined}
        />
      </div>
      <button type="submit">찾기</button>
      <button type="reset" onClick={handleReset}>목록 초기화</button>
    </form>
  )
}
export default UserSearchBox