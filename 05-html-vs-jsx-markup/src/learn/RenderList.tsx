import { Fragment } from "react/jsx-runtime";

interface Props{
  items:StatusMessageObject[];
  reactLibrary:ReactLibrary
}


function RenderList({items,reactLibrary}:Props) {
  console.log(items);
  console.log(reactLibrary);
  

  const demoList = items.map((item)=>
          <li key={item.id}>{item.message}</li>
  )

  const renderDemoList = () => items.map((item) =>
      <li key={item.id}>{item.message}</li>);

  const demoList_ = [...items].reverse().map((item)=>
          <li key={item.id}>{item.message}</li>
  )
  // 원본을 회손하면 안되지 때문에 복제를 해서 만든다.

  /*  items.toReversed().map((item) =>
    <li>{item.message}</li>
  원본을 유지..
  ) */

  const renderDefinitionList = (data: ReactLibrary) => {
    const definitionItem = Object.entries(data).map(([key, value]) =>
      <Fragment key={key}>
        <dt>{key}</dt>
        <dd>{value}</dd>
      </Fragment>
    );

    return definitionItem;
  };

  return (
    <>
      <dt>리스트 렌더링 (List Rendering)</dt>
      <dd>
        <ul>
          {demoList}
        </ul>
        <hr />
        <ul>
          {items && renderDemoList()}
        </ul>
      </dd>
      <dd>
        <p>상태 메시지(status message)</p>
        <ul>
          {/* 역순으로 렌더링 해주세요 */}
          {demoList_}
        </ul>
      </dd>
      <dd>
        <p>React라이브러리(reactLibrary) 객체의 키, 값을 <q>설명 목록</q>으로 렌더링합니다.</p>
        {/* <dl>
          {Object.entries(reactLibrary).map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </Fragment>
          ))}
        </dl> */}
        <dl>
          {renderDefinitionList(reactLibrary)}
        </dl>
        {/* 키오 벨류가 구조분해.. */}
      </dd>
    </>
  )
}
export default RenderList

// 리엑트에 키가 필요 하는 이유는 재조정 뭐식시 떄문에 가상돔과 실제돔을 비교, 달라진게 뭐가있는지 호가인하고 .. 하는데 키를 통홰서 확인을 하기 때문에