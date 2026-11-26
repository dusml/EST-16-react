# 07. 이벤트 응답과 useState

> 이벤트 핸들러로 사용자와 상호작용하고, 이벤트 전파를 제어하며, `useState`로 컴포넌트가 값을 기억하는 방법을 배웁니다.

## 목차

1. [이벤트 핸들러 추가하기](#1-이벤트-핸들러-추가하기)
2. [폼 제출과 기본 동작 막기](#2-폼-제출과-기본-동작-막기)
3. [이벤트 핸들러를 props로 전달하기](#3-이벤트-핸들러를-props로-전달하기)
4. [이벤트 전파 막기](#4-이벤트-전파-막기)
5. [useState: 컴포넌트의 기억](#5-usestate-컴포넌트의-기억)
6. [이전 상태로 업데이트하기 (업데이터 함수)](#6-이전-상태로-업데이트하기-업데이터-함수)
7. [이벤트 핸들러와 부수 효과](#7-이벤트-핸들러와-부수-효과)
8. [컴포넌트 네임스페이스 패턴](#8-컴포넌트-네임스페이스-패턴)
9. [핵심 정리](#9-핵심-정리)
10. [실행 방법](#10-실행-방법)

---

## 1. 이벤트 핸들러 추가하기

함수를 정의하고 JSX 요소에 prop으로 **전달**합니다(호출 X).

```tsx
const handleMouseEnter = () => { /* ... */ };

<summary onMouseEnter={handleMouseEnter}>...</summary>  // O 함수 전달
<summary onMouseEnter={handleMouseEnter()}>...</summary> // X 렌더링 중 즉시 실행
```

- 이벤트 이름은 camelCase입니다: `onClick`, `onSubmit`, `onMouseEnter`
- 이벤트 객체 타입: `React.MouseEvent<HTMLAnchorElement>`, `React.FormEvent<HTMLFormElement>`
- 파일: `src/learn/NavContents.tsx`, `src/learn/responding-to-events/EventHandleProp.tsx`

## 2. 폼 제출과 기본 동작 막기

```tsx
<form onSubmit={(e) => {
  e.preventDefault();                       // 페이지 새로고침 막기
  const form = e.currentTarget;
  const input = form.elements.namedItem('username') as HTMLInputElement;
  setText(input.value);
}}>
```

- 파일: `src/learn/View.tsx`

## 3. 이벤트 핸들러를 props로 전달하기

부모의 상태 변경 함수(`setText`)나 핸들러를 자식에게 넘기면, 자식에서 부모 상태를 바꿀 수 있습니다.

```tsx
<EventHandleProp text={text} setText={setText} onPrintMessage={updateMessage} />
```

- 이벤트 핸들러 prop 이름은 관례상 `on` + 동작으로 짓습니다 (`onPrintMessage`).
- `setText` 타입: `Dispatch<SetStateAction<string>>`

## 4. 이벤트 전파 막기

중첩된 요소를 클릭하면 이벤트가 안쪽 → 바깥쪽으로 **전파(버블링)** 됩니다.

```tsx
const handlePrint = (color: string, e: React.MouseEvent) => {
  e.stopPropagation();   // 부모로 전파 중단
  console.log(color, e.target);
};

<LayoutBox onClick={(e) => handlePrint('cyan', e)}>
  <LayoutBox onClick={(e) => handlePrint('magenta', e)} />
</LayoutBox>
```

- 인수를 넘기고 싶을 때는 화살표 함수로 감쌉니다.
- `{...restProps}`로 나머지 props를 한 번에 전달할 수 있습니다.
- 파일: `src/learn/responding-to-events/EventPropgation.tsx`, `LayoutBox.tsx`

## 5. useState: 컴포넌트의 기억

| | 일반 지역 변수 | `useState` |
| --- | --- | --- |
| 값 변경 | `localCount += 1` | `setCount(1)` |
| 리렌더링 | 일어나지 않음 → 화면 그대로 | 일어남 (렌더 트리거) |
| 다시 실행되면 | 초기값으로 리셋 | React가 값을 기억 |

```tsx
const [count, setCount] = useState(0);   // [현재 값, 변경 함수] = useState(초기값)
```

- 상태 값은 컴포넌트 함수 안이 아니라 React 내부(Fiber)에 저장됩니다.
- 파일: `src/learn/responding-to-events/UseStatateCounter.tsx`

## 6. 이전 상태로 업데이트하기 (업데이터 함수)

상태 업데이트는 **즉시 반영되지 않고 모아서(batching)** 처리됩니다.

```tsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);   // 결과: +1 (세 번 모두 같은 count를 봄)

setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);   // 결과: +3 (이전 값을 받아 계산)
```

## 7. 이벤트 핸들러와 부수 효과

렌더링은 순수해야 하지만 **이벤트 핸들러는 순수할 필요가 없습니다.** DOM 조작, 타이머 같은 부수 효과를 두기에 가장 좋은 위치입니다.

- 파일: `src/learn/responding-to-events/EventWithSideEffects.tsx`

## 8. 컴포넌트 네임스페이스 패턴

관련 컴포넌트를 하나의 이름 아래 묶는 방식입니다. 디자인 시스템이나 compound component에서 사용합니다.

```tsx
View.HTMLCode = HTMLCode;
View.RespondingToEvents = RespondingToEvents;

<View.RespondingToEvents />
```

## 9. 핵심 정리

- 핸들러는 **함수를 전달**하고, 인수가 필요하면 화살표 함수로 감쌉니다.
- `e.preventDefault()`: 기본 동작 막기 / `e.stopPropagation()`: 전파 막기
- 화면에 반영할 값은 지역 변수가 아니라 **state**로 관리합니다.
- 이전 값 기반 업데이트는 `setState(prev => ...)`를 사용합니다.

## 10. 실행 방법

```sh
cd 07-responding-to-events
npm install
npm run dev
```

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사와 배포 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리 보기 |
