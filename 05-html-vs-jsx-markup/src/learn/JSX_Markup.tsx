import * as learnData from '@/data/learn';
import type { JSX } from 'react/jsx-runtime';
import DataBinding from './DataBinding';

function JSX_Markup(): JSX.Element {
  const {
    statusMessage,
  } = learnData;

  console.log(statusMessage);

  return (
    <dl className="descriptionList">
      <DataBinding statusMessages={statusMessage}/>
      {/* 리엑트에서는 태그를 쓰면 함수를 쓰는 것이다. 리엑트에서는 여러세 받는게 아니라 하나만 받는다 근데 객체만 받는다. 그게 푸롭스이다..?? 그러면 어떻게 넣어 속성과 갑으로 넣으면 된다. 여러게 넣어도 된다. 다 담아간다. 아규먼트..???  const Databinding = (props) => {} 이렇게 생각하면 된다. 데이타가 메게변수인다.. 아 이름은 프롭스는 내가 지은 이름 이름은 내가 지어 되 되나 관례가 프롭스라고 한다. 데이타 키값도 내가 정한 거면 관례는 전달되는 이음을 적어주는 것이다. data={statusMessage} 가 이니라 statusMessage={statusMessage} 이렇게 적는 덕 이다.*/}
    </dl>
  )
}

export default JSX_Markup





// rfce