import React, {createElement} from './lib/react.js';
import ReactDOM, {createRoot} from './lib/react-dom.js';

//반응성 데이터

const listData = {
  items:[],
}

// const reactiveListData = new Proxy();
// Proxy() 반응성 데이터로..?? 엥?? 우회하다. 


const reactiveListData = new Proxy(listData, {
  get(target, prop) {

    // console.log(target, prop);
    
    return target[prop]
  },
  set(target, prop, newValue) {
    const oldValue = target[prop];

    console.log(`${oldValue} -> ${newValue}`);
    
    // const result = Reflect.set(target,prop,newValue);

    target[prop] = newValue;

    render(); // re-render !!
    return true;
  }
});

// console.log(reactiveListData);
// console.log(reactiveListData.items = 'hello');
// console.log(reactiveListData.items = 'bye');

// 트루가 나오면 값을 리턴을 한다는 뜻이다.
// 큰 구조는 크게 달라짖 않는다. 제대로 세팅이 들어가면 트루를 줘서 반환해하 !! 
// const result = Reflect.set(target,prop,newValue); 프렉시를 하면 리플렉드!! 가 따라온다.. 어?? 

const container = document.getElementById('app');
const reactDomRoot = ReactDOM.createRoot(container);


function render(){
  const children = listData.items.map(({id,title})=>{
    
    const reactElement = createElement(
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
    return reactElement;
  })

  const list = createElement(
    'ul',
    {className:'planet',lang:'en'},
    children
  )
  reactDomRoot.render(list)
}

// 최초 마운트 시 실행 (렌더링)
render()

//내 값을 먼저 전개해서 넣어주고, 객체를 넣어준다.
/* reactiveListData.items = [
  ...reactiveListData.items,
  {
    id: 1,
    title: 'Life of Earth'
  }
] */

  
setTimeout(() => {
  reactiveListData.items = [
    ...reactiveListData.items,
    {
      id:1,
      title:'Life of Earth'
    }
  ]
}, 1000);



setTimeout(() => {
  reactiveListData.items = [
    ...reactiveListData.items,
    {
      id:2,
      title:'Jupiter'
    }
  ]
}, 2000);



setTimeout(() => {
  reactiveListData.items = [
    ...reactiveListData.items,
    {
      id:3,
      title:'화성 가자!'
    }
  ]
}, 3000);



setTimeout(() => {
  reactiveListData.items = [
    ...reactiveListData.items,
    {
      id:4,
      title:'고요한 바다'
    }
  ]
}, 4000);



//근데 데이터가 없어서 안그려 진다. 그래서 데이터를 넣는다. 동적으로 데이터를 사용한다.. 위에 데이터 넣는 법
//에는 선언만 하는데.. 이렇게 선언만 함으로 동적으로 데이터를 넣는다.