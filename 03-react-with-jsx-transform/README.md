# 03. JSX와 JSX 변환

> `createElement`로 작성하던 코드를 JSX로 바꾸고, JSX가 브라우저에서 실행되도록 변환(Babel, TypeScript)되는 과정을 이해합니다.

## 목차

1. [JSX란?](#1-jsx란)
2. [createElement → JSX 비교](#2-createelement--jsx-비교)
3. [JSX 작성 규칙](#3-jsx-작성-규칙)
4. [Babel로 브라우저에서 변환하기](#4-babel로-브라우저에서-변환하기)
5. [TypeScript로 변환하기 (react-jsx)](#5-typescript로-변환하기-react-jsx)
6. [핵심 정리](#6-핵심-정리)
7. [실행 방법](#7-실행-방법)

---

## 1. JSX란?

JSX(JavaScript XML)는 자바스크립트 안에서 HTML처럼 UI를 작성하는 문법입니다. 브라우저는 JSX를 이해하지 못하므로 **반드시 변환 과정이 필요**합니다.

## 2. createElement → JSX 비교

```js
// createElement 방식
h('li', { className: 'avatar' },
  h('figure', { 'aria-label': label, title: label }, /* ... */)
)

// JSX 방식
<li className="avatar">
  <figure aria-label={label} title={label}>{/* ... */}</figure>
</li>
```

- 컴포넌트도 태그처럼 사용합니다: `<Avatar name="sinzzang" status="online" />`

## 3. JSX 작성 규칙

- 여러 줄 JSX는 `( )`로 감쌉니다.
- 자바스크립트 값은 `{ }` 안에 씁니다: `src={`/avatar/${name}.png`}`
- 따옴표 안에 쓰면 문자열 그대로 들어갑니다: `alt="{name}"` → 글자 `{name}`
- 내용이 없는 태그는 반드시 닫습니다: `<img />`
- JSX 주석은 `{/* 주석 */}` 형태로 씁니다.

## 4. Babel로 브라우저에서 변환하기

`@babel/standalone`을 불러오고 `type="text/babel"` 스크립트로 JSX 파일을 실행하면 브라우저가 실행 시점에 변환합니다.

```html
<script src="https://unpkg.com/@babel/standalone@7.26.0/babel.min.js"></script>
<script type="text/babel" data-type="module" data-presets="react" src="src/main.babel.js"></script>
```

- 간단하지만 실행할 때마다 변환하므로 실습용으로만 사용합니다.
- 파일: `src/main.babel.js` (사용 시 `index.html` 주석 해제)

## 5. TypeScript로 변환하기 (react-jsx)

`tsconfig.json`의 `"jsx": "react-jsx"` 설정으로 `.tsx`를 `.js`로 미리 변환합니다. 변환된 코드는 `react/jsx-runtime`의 `jsx()` 함수를 호출합니다.

```html
<!-- import map으로 jsx-runtime 경로 지정 -->
<script type="importmap">
  { "imports": { "react/jsx-runtime": "https://esm.sh/react/jsx-runtime" } }
</script>
```

- 원본: `src/main.tsx` → 변환 결과: `src/main.js`
- `npx tsc --watch`를 실행하면 저장할 때마다 자동 변환됩니다.

## 6. 핵심 정리

| 방식 | 변환 시점 | 특징 |
| --- | --- | --- |
| `createElement` | 변환 없음 | 직접 작성, 코드가 길어짐 |
| Babel standalone | 브라우저 실행 시 | 설정이 간단, 느림 |
| TypeScript (`react-jsx`) | 빌드(컴파일) 시 | 타입 검사 + `jsx-runtime` 사용 |

- JSX는 결국 **React 요소를 만드는 함수 호출**로 변환됩니다.
- 다음 단계(04)에서는 Vite가 이 변환을 자동으로 처리합니다.

## 7. 실행 방법

```sh
cd 03-react-with-jsx-transform
npm install
npm run dev
```

- http://localhost:3000 에 접속합니다.
- `src/main.tsx`를 수정했다면 별도 터미널에서 `npx tsc --watch`를 실행합니다.
- Babel 실습과 TypeScript 실습은 `index.html`에서 진입점을 하나만 활성화합니다.
