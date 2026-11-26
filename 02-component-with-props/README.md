# 02. 컴포넌트와 props

> 화면을 컴포넌트 단위로 나누고, 클래스형과 함수형 컴포넌트를 비교하며 props와 children으로 데이터를 전달합니다.

## 목차

1. [컴포넌트란?](#1-컴포넌트란)
2. [클래스형 컴포넌트](#2-클래스형-컴포넌트)
3. [함수형 컴포넌트](#3-함수형-컴포넌트)
4. [props로 데이터 전달하기](#4-props로-데이터-전달하기)
5. [children으로 화면 조합하기](#5-children으로-화면-조합하기)
6. [폴더 구조: pages와 components](#6-폴더-구조-pages와-components)
7. [핵심 정리](#7-핵심-정리)
8. [실행 방법](#8-실행-방법)

---

## 1. 컴포넌트란?

UI를 재사용 가능한 조각으로 나눈 것입니다. `createElement`의 첫 번째 인자에 문자열(`'li'`) 대신 **컴포넌트**를 넣으면 됩니다.

```js
h(PlanetItem, { id, title })  // h는 createElement의 별칭
```

## 2. 클래스형 컴포넌트

`React.Component`를 상속하고 `render()` 메서드에서 요소를 반환합니다. props는 `this.props`로 읽습니다.

```js
export class PlanetItem extends React.Component {
  render() {
    const { id, title } = this.props;
    return h('li', { className: 'item' }, /* ... */);
  }
}
```

- 파일: `src/components/planet/PlanetItem.js`, `src/pages/PlanetPage.js`

## 3. 함수형 컴포넌트

함수가 요소를 반환합니다. props는 **매개변수**로 받으며 구조 분해 할당을 자주 사용합니다.

```js
export function PlanetPage_({ title, lang, children }) {
  return h(PlanetList, { lang: 'en', children: /* ... */ });
}
```

- `this` 없이 매개변수로 바로 받기 때문에 더 간결합니다. 현재 React는 함수형 컴포넌트를 주로 사용합니다.
- 파일: `src/pages/PlanetPage_.js`

## 4. props로 데이터 전달하기

부모가 속성으로 값을 넘기면 자식은 props 객체로 받습니다. 기본값도 지정할 수 있습니다.

```js
// 부모
h(Avatar, { name: 'sinzzang', status: 'online' })

// 자식
export function Avatar({ name, status, size = 64 }) {
  // status에 따라 아이콘과 메시지 결정 (switch)
}
```

- `status` 값(`online`, `offline`, `away`, `disturb`)에 따라 아이콘과 접근성 라벨이 달라집니다.
- 파일: `src/components/avatar/Avatar.js`, `src/pages/AvatarPage.js`

## 5. children으로 화면 조합하기

`children`은 컴포넌트 안에 들어갈 내용을 전달하는 특별한 prop입니다.

```js
// PlanetList는 받은 children을 ul 안에 그대로 넣는다
h('ul', { className: 'planet', lang }, children)
```

- `PlanetPage`가 `PlanetItem` 목록을 만들어 `PlanetList`의 children으로 넘깁니다.

## 6. 폴더 구조: pages와 components

| 폴더 | 역할 |
| --- | --- |
| `src/pages/` | 화면 하나를 구성하는 페이지 (AvatarPage, PlanetPage) |
| `src/components/` | 페이지에서 재사용하는 부품 (Avatar, PlanetList, PlanetItem) |
| `src/data.js` | 목록 데이터 |
| `src/main.js` | 어떤 페이지를 렌더링할지 선택 |

## 7. 핵심 정리

- 컴포넌트 이름은 **대문자**로 시작합니다.
- 클래스형은 `this.props`, 함수형은 **매개변수**로 props를 받습니다.
- props는 부모 → 자식 방향으로만 흐르며 자식은 props를 수정하지 않습니다.
- `children`으로 컴포넌트를 조합할 수 있습니다.

## 8. 실행 방법

```sh
cd 02-component-with-props
npm install
npm run dev
```

- http://localhost:3000 에 접속합니다. React를 CDN에서 불러오므로 인터넷 연결이 필요합니다.
- 기본 화면은 `AvatarPage`입니다. `src/main.js`의 `render()` 호출을 `h(PlanetPage)`로 바꾸면 행성 목록을 볼 수 있습니다.
