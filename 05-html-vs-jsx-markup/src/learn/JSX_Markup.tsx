import * as learnData from '@/data/learn';
import type { JSX } from 'react/jsx-runtime';
import DataBinding from './DataBinding';
import JSXAttributes from './JSXAttributes';
import ConditionalRendering from './ConditionalRendering';
import ConditionalDisplay from './ConditionalDisplay';
import RenderList from './RenderList';

function JSX_Markup(): JSX.Element {
  const {
    statusMessage,
    imageType,
    isShowReactImage,
    statusMessagesWithID,
    reactLibrary
  } = learnData;

  // console.log(statusMessage);

  return (
    <dl className="descriptionList">
      <DataBinding statusMessages={statusMessage}/>
      {/* 리엑트에서는 태그를 쓰면 함수를 쓰는 것이다. 리엑트에서는 여러세 받는게 아니라 하나만 받는다 근데 객체만 받는다. 그게 푸롭스이다..?? 그러면 어떻게 넣어 속성과 갑으로 넣으면 된다. 여러게 넣어도 된다. 다 담아간다. 아규먼트..???  const Databinding = (props) => {} 이렇게 생각하면 된다. 데이타가 메게변수인다.. 아 이름은 프롭스는 내가 지은 이름 이름은 내가 지어 되 되나 관례가 프롭스라고 한다. 데이타 키값도 내가 정한 거면 관례는 전달되는 이음을 적어주는 것이다. data={statusMessage} 가 이니라 statusMessage={statusMessage} 이렇게 적는 덕 이다.*/}
      {/* <JSXAttributes/> */}
      {/* 
        태그 사이에 넣기 - 자식으로 들어가 진다.
        아니면 <JSXAttributes 안에 children을 적어도 된다. - children 속성으로 전달하기/> 에시) <JSXAttributes children={<p>안녕하세요!</p>} />
      */}
      {/*
        children (칠드런)
        - 컴포넌트 태그 사이에 작성한 내용이 자식(children)으로 전달된다.
        - 또는 <JSXAttributes children={...} />처럼 속성으로 전달할 수도 있다.
        - 전달받은 children은 컴포넌트 안에서 사용해야 화면에 나타난다.
      */}
      {/* ======================================== */}
      <ConditionalRendering imageType={imageType}>
        {/* hello,{123},null <h1>hello</h1> */}
      </ConditionalRendering>

      {/* <ConditionalRendering imageType={imageType}>
        hello
      </ConditionalRendering> 이렇게만 작성을 하면 오류가 난다. 
      interface Props {
        imageType: string;
        children:string
      } 이렇게 타입을 적어주면 에러가 사라지게 된다. 그러나 숫자나 널을 넣으면 에러가 난다.. 태그도.. 그래서 타입을 확장시키는 일이 발생한다. 드떄 리엑트. 노드를 사용하면 된다.
       */}
      <ConditionalDisplay isShowReactImage = {isShowReactImage}/>
      <RenderList items={statusMessagesWithID} reactLibrary={reactLibrary}/>
    </dl>
  )
}

export default JSX_Markup





// rfce