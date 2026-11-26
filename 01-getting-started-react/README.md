# 01. React 시작하기

> `createElement`로 중첩된 요소와 목록을 만들고, 데이터가 바뀌면 화면을 다시 그리는(리렌더링) 흐름을 Proxy로 직접 체험합니다.

## 목차

1. [안쪽부터 요소 만들기](#1-안쪽부터-요소-만들기)
2. [리스트 렌더링과 key](#2-리스트-렌더링과-key)
3. [데이터 변경 감지하기 (Proxy)](#3-데이터-변경-감지하기-proxy)
4. [데이터가 바뀌면 다시 렌더링하기](#4-데이터가-바뀌면-다시-렌더링하기)
5. [핵심 정리](#5-핵심-정리)
6. [실행 방법](#6-실행-방법)

---

## 1. 안쪽부터 요소 만들기

가장 안쪽 요소(img, span, button)부터 만들어 부모(li → ul)의 children으로 넘깁니다.

```js
const img = React.createElement('img', { src: '/planet/image-01.jpg', alt: '기후학' });
const span = React.createElement('span', { className: 'content' }, 'Climatology');
const li = React.createElement('li', { className: 'item' }, img, span, button);
```

- HTML의 `class` 대신 `className`을 사용합니다.
- 파일: `src/1.rendering-react-app.js`

## 2. 리스트 렌더링과 key

배열 데이터를 `map()`으로 순회해 React 요소 배열을 만들고, `ul`의 children으로 전달합니다.

```js
const children = listData.items.map(({ id, title }) =>
  createElement('li', { key: id, className: 'item' }, /* img, span, button */)
);
const ul = createElement('ul', { className: 'planet' }, children);
```

- **key**는 목록의 각 항목을 구별하는 고유한 값입니다. 화면에는 보이지 않습니다.
- React는 이전 화면과 새 화면을 비교(재조정, Reconciliation)할 때 key로 어떤 항목이 바뀌었는지 판단합니다.
- key는 목록의 가장 바깥 요소(`li`)에 줍니다.

## 3. 데이터 변경 감지하기 (Proxy)

`Proxy`로 객체를 감싸면 값을 읽거나(get) 쓸 때(set) 원하는 동작을 끼워 넣을 수 있습니다.

```js
const reactiveListData = new Proxy(listData, {
  set(target, prop, newValue) {
    target[prop] = newValue;
    render();      // 값이 바뀌면 다시 그리기
    return true;   // 할당 성공
  },
});
```

- 파일: `src/main.js`

## 4. 데이터가 바뀌면 다시 렌더링하기

`setTimeout`으로 1초마다 행성을 하나씩 추가합니다. 기존 배열을 전개해 **새 배열을 할당**하므로 Proxy의 `set`이 실행되고 화면이 갱신됩니다.

```js
reactiveListData.items = [...reactiveListData.items, { id: 1, title: 'Life of Earth' }];
```

- `items.push()`처럼 내부 배열만 바꾸면 바깥 객체의 속성 할당이 아니므로 감지되지 않습니다.
- 이 예제는 React state를 구현한 것이 아니라 "데이터 변경 → 리렌더링" 개념을 보여주는 실습입니다.

## 5. 핵심 정리

- `createElement(type, props, ...children)`로 요소를 **안쪽부터** 조립합니다.
- 목록은 `map()`으로 만들고 각 항목에 **고유한 key**를 줍니다.
- 데이터가 바뀌면 화면을 다시 그려야 합니다. React에서는 이 역할을 state가 맡습니다.
- 데이터는 직접 수정하지 않고 **새 값(새 배열)으로 교체**합니다.

## 6. 실행 방법

```sh
cd 01-getting-started-react
npm install
npm run dev
```

- http://localhost:3000 에 접속합니다. React를 CDN에서 불러오므로 인터넷 연결이 필요합니다.
