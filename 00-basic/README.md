# 00. React와 DOM 기초

> 실제 DOM과 React 요소(가상 요소)의 차이를 비교하고, `createElement`와 `createRoot`를 직접 구현해 React의 렌더링 원리를 이해합니다.

## 목차

1. [실제 DOM으로 요소 만들기](#1-실제-dom으로-요소-만들기)
2. [React로 요소 만들기](#2-react로-요소-만들기)
3. [가상 요소 직접 구현하기 (createElement)](#3-가상-요소-직접-구현하기-createelement)
4. [가상 요소를 실제 DOM으로 렌더링하기 (createRoot)](#4-가상-요소를-실제-dom으로-렌더링하기-createroot)
5. [핵심 정리](#5-핵심-정리)
6. [실행 방법](#6-실행-방법)

---

## 1. 실제 DOM으로 요소 만들기

웹 API(`document.createElement`)로 요소를 만들고, 관계를 맺은 뒤 화면에 붙입니다(마운트).

```js
const div = document.createElement('div');
const button = document.createElement('button');
button.textContent = 'hello';
div.append(button);                          // 요소 간 관계 만들기
document.getElementById('app').append(div);  // 실제 DOM에 마운트
```

- 실제 DOM 객체는 수많은 속성과 메서드를 가지고 있어 **무겁습니다.**
- 파일: `src/VartualvsActual.js`

## 2. React로 요소 만들기

React는 `React.createElement(type, props, ...children)`으로 **React 요소**를 만들고, `ReactDOM.createRoot(container).render(element)`로 화면에 그립니다.

```js
const root = ReactDOM.createRoot(document.getElementById('app'));
const element = React.createElement('h1', { title: '나라별 인사말' }, '인사말 : 안녕하세요');
root.render(element);
```

- `src/data.js`의 나라별 인사말 중 하나를 무작위로 골라 출력합니다.
- 파일: `src/main.js`

## 3. 가상 요소 직접 구현하기 (createElement)

React 요소는 화면을 설명하는 **가벼운 자바스크립트 객체**입니다. 이를 직접 만들어 봅니다.

```js
{
  $$typeof: VIRTUAL_ELEMENT_TYPE, // 가상 요소인지 구분하는 Symbol
  type: 'button',
  key: null,
  props: { type: 'button', class: 'btn', children: ['hola~'] },
}
```

- `children`은 배열로 합치고 `null`, `undefined`, `false`는 걸러냅니다.
- `isValidElement()`는 `$$typeof`를 확인해 가상 요소인지 판별합니다.
- 파일: `src/lib/virtual/createElement.js`, `src/lib/virtual/isValidElement.js`

## 4. 가상 요소를 실제 DOM으로 렌더링하기 (createRoot)

`VirtualDomRoot`는 가상 요소 트리를 재귀적으로 돌며 실제 DOM을 만듭니다.

1. 문자열·숫자면 텍스트로 반환
2. `type`으로 `document.createElement` 실행
3. `props`를 속성으로 설정 (`className`은 별도 처리)
4. `children`을 재귀로 변환해 `append`
5. `render()`에서 루트 요소에 붙이고, `unmount()`에서 비움

- 직접 구현한 렌더러에는 변경 전후 비교(재조정, diffing) 기능은 없습니다.
- 파일: `src/lib/virtual-dom/VirtualDomRoot.js`, `src/lib/virtual-dom/createRoot.js`

## 5. 핵심 정리

| 구분 | 실제 DOM | 가상 요소 (React 요소) |
| --- | --- | --- |
| 생성 방법 | `document.createElement()` | `createElement(type, props, ...children)` |
| 정체 | 브라우저의 DOM 객체 | 일반 자바스크립트 객체 |
| 무게 | 무거움 | 가벼움 |
| 화면 반영 | 바로 반영 | `render()`가 실제 DOM으로 변환 |

## 6. 실행 방법

```sh
cd 00-basic
npm install
npm run dev
```

- http://localhost:3000 에 접속합니다. React를 CDN에서 불러오므로 인터넷 연결이 필요합니다.
- 기본 진입점은 `src/main.js`입니다. 직접 만든 렌더러를 확인하려면 `index.html`의 모듈 경로를 `src/VartualvsActual.js`로 바꿉니다.
