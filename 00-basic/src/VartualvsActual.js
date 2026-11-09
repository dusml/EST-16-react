

import { createElement } from "./lib/virtual/index.js";// 가상 돔 생성기
import { createRoot } from './lib/virtual-dom/index.js'; // 실제 돔 -> 가상 돔 컨버터

/*
actual DOM 실제 돔
웹 API를 사용해서 객체를 생성
*/

//부모 요소 생성
const divElement = document.createElement('div');

//자식 요소 생성
const buttonElement = document.createElement('button');
buttonElement.textContent = 'hello';


// 요소간의 관계 생셩
divElement.append(buttonElement);

//렌더링 위치 정하기
const actualDomElement = document.getElementById('app');

//실제 DOM에 마운트 (Mount, 착장 === 렌더링)
actualDomElement.append(divElement);

// console.log(divElement,buttonElement);


// ------

// console.log(createElement);

// 가상(추상화된, 단순화 된)요소(엘리먼트)생성

// 자식 가상 요소
const buttonV_Element = createElement('button',{type:'button',class:'btn'},'hola~');

const divV_Element = createElement('div',{class:'tiger'},buttonV_Element);




console.log(buttonElement);
// 무겁다..
console.log(buttonV_Element);
//이건 기능이 별로 없다.. js 를 이용해서 가상의 태그 생성을 하였다. 이 안에 내용물을 다 가지고 있지 않아 도 된다. 가볍다.
console.log(divV_Element);


//가상 요소를 실제 DOM 요소에 렌더링
const virtualRootElement = document.getElementById('app')

const vRoot = createRoot(virtualRootElement);

vRoot.render(divV_Element)

console.log(vRoot);



