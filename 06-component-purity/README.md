# 06. 컴포넌트 순수성

> React 컴포넌트는 순수 함수여야 합니다. 순수 함수와 부수 효과(side effect)를 구분하고, StrictMode로 비순수 컴포넌트의 문제를 관찰합니다.

## 목차

1. [순수 함수란?](#1-순수-함수란)
2. [비순수 함수와 부수 효과](#2-비순수-함수와-부수-효과)
3. [비순수 컴포넌트의 문제](#3-비순수-컴포넌트의-문제)
4. [StrictMode로 순수성 확인하기](#4-strictmode로-순수성-확인하기)
5. [부수 효과는 어디에 둘까?](#5-부수-효과는-어디에-둘까)
6. [핵심 정리](#6-핵심-정리)
7. [실행 방법](#7-실행-방법)

---

## 1. 순수 함수란?

- **동일 입력 → 동일 출력**
- 함수 밖의 값을 변경하지 않습니다.

```ts
function square(n: number): number {
  return n * n;   // 몇 번을 호출해도 같은 결과
}
```

- 파일: `src/learn/about-purity.ts` (`truncateText`, `square`, `sum`)

## 2. 비순수 함수와 부수 효과

함수 밖의 값에 의존하거나 외부를 변경하면 비순수 함수입니다.

```ts
let multiplier = 2;
function multiply(n: number) {
  return n * multiplier;   // 외부 값이 바뀌면 결과도 달라짐
}
```

대표적인 부수 효과(side effect):

1. DOM 조작 (`document.querySelector`)
2. 타이머 (`setTimeout`, `setInterval`)
3. 스토리지 접근 (localStorage, sessionStorage, Cookie)
4. 서버 요청 (`fetch`, Axios)
5. 외부 상태 도구 접근
6. 콘솔 출력 (React에서 예외적으로 허용)

## 3. 비순수 컴포넌트의 문제

```tsx
let count = 0;   // 컴포넌트 밖의 변수

function Headline() {
  console.log(++count);   // 렌더링할 때마다 외부 값을 변경
  return <div>Headline {count}</div>;
}
```

- 렌더링 횟수에 따라 화면 결과가 달라집니다 → 예측할 수 없는 UI
- 파일: `src/components/Headline.tsx`

## 4. StrictMode로 순수성 확인하기

순수한지 확인하는 가장 쉬운 방법은 **두 번 실행해 보는 것**입니다. `<StrictMode>`는 개발 환경에서 컴포넌트를 두 번 렌더링해 순수성 문제를 드러냅니다.

```tsx
createRoot(container).render(
  <StrictMode>
    <Headline />
  </StrictMode>
);
```

- 콘솔과 화면의 `count` 값이 1씩이 아니라 더 크게 증가하는 것을 확인할 수 있습니다.
- 배포(production) 빌드에서는 두 번 실행하지 않습니다.
- 파일: `src/main.tsx`

## 5. 부수 효과는 어디에 둘까?

렌더링 중에는 순수해야 하므로 부수 효과는 **정해진 곳**에서 실행합니다.

- **이벤트 핸들러** (07에서 학습)
- **useEffect** (11에서 학습)

## 6. 핵심 정리

- 컴포넌트는 같은 props/state에 **항상 같은 JSX**를 반환해야 합니다.
- 렌더링 중에 외부 변수, DOM, 네트워크를 건드리지 않습니다.
- `StrictMode`는 개발 중 두 번 렌더링해 비순수 코드를 찾아줍니다.

## 7. 실행 방법

```sh
cd 06-component-purity
npm install
npm run dev
```

- 화면의 Headline과 브라우저 Console의 카운트를 비교합니다.
- `about-purity.ts`는 현재 진입점에서 불러오지 않습니다. 불러오면 파일 끝의 `fetchUserInfo('10')`이 실행되어 네트워크 요청이 발생합니다.
