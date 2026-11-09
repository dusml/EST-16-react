import React, {createElement} from './lib/react.js';
import ReactDOM, {createRoot} from './lib/react-dom.js';

//리스트 렌더링


const listData = {
  items: [
    { id: "1", title: 'Life on Earth' },
    { id: "2", title: 'Jupiter`s massive storm' },
    { id: "3", title: 'Explore Mars now' },
    { id: "4", title: 'Moonlight and craters' },
  ]
}


//안에서 부터 하나씩 만드는..

const childImage = React.createElement(
  'img',
  { src: '/icons/handle.svg', alt: '아이템 이동' },
)

const button = React.createElement(
  'button',
  { type: 'button', title: '아이템 이동 가능'},
  childImage
)

const span = React.createElement(
  'span',
  {className:'content'},
  'Climatology'
)

const img = React.createElement(
  'img',
  {src:'/planet/image-01.jpg', alt:"기후학"}
)

const li = React.createElement(
  'li',
  {className:'item'},
  img, span, button
)

// listData를 반복 선환해서 children은 만들어 주세요.
//-map을 사용해 새로운 배열을 반환
// - 반환된 배열을 ul의 children으로 전달


const children = listData.items.map(({id,title})=>{
  
  const li = createElement(
    'li',
    {key:id, className:'item'},
    createElement('img',{
      src:`/planet/image-0${id}.jpg`,
      alt:title
    }),
    createElement('span',{
      className:'content',
    },title),
    createElement('button',
      {type:'button',title:'아이템 이동'},
      createElement('img',{
        src:'/icons/handle.svg',
        alt:'아이템 이동'
      })
    ),
  )
  return li;
})


//만들고 이미지 스펜 버튼을 가져오면 안된다  왜냐 다 다르기 때문에.. 이미지 등등 동일 선상에 있어야 한다. 태그를 만들어야 하기 때문에 드리고 안에 속성들 입력
//칠드런은 안에 작성을 해도 된다.
//이게 가상의 돔을 만든다.

//리컨스 레이션 - 일치를 하는지 비교 가상돔에서 만든 것과 현실돔에서 만들 것을 비교, 오늘 날에는 엔징이 피버 엔진으로 변경...이름이 구성을 변경되지 않았다. 이거는 유니크한거 야 라고 키를 주어애 ㅎ나다. 리스트 렌더링을 할께!!! 제일 큰 li에 키를 준다.. 사용자에게는 보이지 않는다..????


/* const ul = React.createElement(
  'ul',
  {className:'planet'},
  li
) */

  
const ul = React.createElement(
  'ul',
  { className: 'planet' },
  children
)


const app = document.getElementById('app');

const reactDomRoot = createRoot(app);

reactDomRoot.render(ul);
// reactDomRoot.unmout;