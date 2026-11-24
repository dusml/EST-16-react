
import { memo } from "react";
import ListItem from "./ListItem";

// 부모 App에서 전달받을 props의 타입을 정의한다.
// items는 숫자 배열, onItemClick은 숫자를 전달받는 함수다.
type Props = {
  items: number[];
  onItemClick: (value:number) => void;
}

function List({items, onItemClick}:Props) {
  console.log('List Component 렌더링');

  return (
    <ul>
      {
        // map으로 배열을 순회하며 ListItem을 만든다.
        // key는 React가 각 항목을 구별하기 위한 고유한 값이다.
        // 배열이 변경되면 key를 비교해 기존 항목과 새 항목을 판단한다.
        // key는 항목 식별, memo는 불필요한 리렌더링을 줄이는 역할을 한다.
        items.map((item)=>
          <ListItem key={item} value={item} onClick={onItemClick} />
        )
      }
    </ul>
  )
}

// 기존 ListItem의 props가 같다면 memo(ListItem)을 통해
// 해당 ListItem의 리렌더링을 생략할 수 있다.
export default memo(List)


/* 
키를통해 재조정 재조정 알고리즘..?? 값이 증가혐 15번으로 증가 아 14번은 바뀌지 않앆구나.. 그 컴포넌트 하나만 다시 렌더링..??
*/

/*
  <key와 재조정(Reconciliation)>

  React는 이전 렌더링 결과와 새로운 렌더링 결과를 비교한다.
  이 과정을 재조정(Reconciliation)이라고 한다.

  예를 들어 목록이 [10, 11, 12, 13, 14]에서
  [11, 12, 13, 14, 15]로 변경되었다고 가정하자.

  key를 비교하면 11~14는 기존에 있던 항목이고,
  15는 새로 추가된 항목이라는 것을 알 수 있다.

  기존 항목의 props가 같다면 memo를 통해 리렌더링을 생략할 수 있다.
  새로 추가된 15번 항목은 새롭게 렌더링된다.

  key는 항목을 구별하는 역할이고,
  memo는 불필요한 리렌더링을 줄이는 역할이다.
*/