# 10. 상태 스냅샷과 메모이제이션

> state가 렌더링 순간의 "스냅샷"이라는 개념, 지연 초기화, 제어·비제어 입력을 익히고 `memo`, `useCallback`, `useMemo`로 불필요한 리렌더링을 줄입니다.

## 목차

1. [State as a Snapshot](#1-state-as-a-snapshot)
2. [지연 초기화 (Lazy Initialization)](#2-지연-초기화-lazy-initialization)
3. [객체 상태 업데이트](#3-객체-상태-업데이트)
4. [제어 vs 비제어 컴포넌트](#4-제어-vs-비제어-컴포넌트)
5. [부모가 렌더링되면 자식도 렌더링된다](#5-부모가-렌더링되면-자식도-렌더링된다)
6. [memo + useCallback: 함수 기억하기](#6-memo--usecallback-함수-기억하기)
7. [memo + useMemo: 값 기억하기](#7-memo--usememo-값-기억하기)
8. [key와 재조정](#8-key와-재조정)
9. [핵심 정리](#9-핵심-정리)
10. [실행 방법](#10-실행-방법)

---

## 1. State as a Snapshot

state는 렌더링 순간에 찍은 **사진(스냅샷)** 과 같습니다. `setState`는 현재 사진을 고치는 게 아니라 **다음 렌더링에서 새 사진**을 찍도록 요청합니다.

```tsx
// number가 3일 때
setNumber(number + 5);
console.log(number);   // 3 (아직 이번 렌더링의 스냅샷)
// 다음 렌더링에서 화면에 8이 표시됨
```

- 파일: `src/components/Counter.tsx`

## 2. 지연 초기화 (Lazy Initialization)

```tsx
useState(slowInit());   // X 렌더링할 때마다 slowInit 실행
useState(slowInit);     // O 첫 렌더링에서만 실행 (함수 자체를 전달)
```

- 초기값 계산이 무거울 때 사용합니다.
- 파일: `src/components/Counter.tsx`, `src/components/Form.tsx`

## 3. 객체 상태 업데이트

객체를 직접 수정하지 않고 기존 값을 **전개**한 뒤 바뀐 속성만 덮어씁니다.

```tsx
form.title = e.target.value;                  // X 직접 수정 → 리렌더링 안 됨
setForm({ ...form, title: e.target.value });  // O 새 객체로 교체
```

- 파일: `src/components/Form.tsx`

## 4. 제어 vs 비제어 컴포넌트

| | 제어 (Controlled) | 비제어 (Uncontrolled) |
| --- | --- | --- |
| 속성 | `value` + `onChange` | `defaultValue` |
| 값 관리 | React state | 브라우저 DOM |
| 사용 | 폼 리셋, 검증, 자동완성, 회원가입 | 초기값만 필요한 간단한 입력 |

```tsx
<input value={text} onChange={(e) => setText(e.target.value)} />  // 제어
<input defaultValue="처음 한번만 반영됨" />                          // 비제어
```

- 파일: `src/components/controlled/Form.tsx`

## 5. 부모가 렌더링되면 자식도 렌더링된다

React는 부모가 리렌더링되면 자식도 리렌더링합니다. 잘못된 동작이 아니라 기본 동작입니다. 자식의 props가 그대로라면 `memo`로 건너뛸 수 있습니다.

```tsx
export default memo(Child);   // props가 같으면 리렌더링 생략
```

## 6. memo + useCallback: 함수 기억하기

부모가 렌더링될 때마다 함수가 **새로 만들어지므로** `memo`를 써도 자식이 다시 렌더링됩니다. `useCallback`으로 함수 참조를 유지합니다.

```tsx
const handleClick = useCallback(() => {
  console.log('clicked!');
}, []);   // 의존성 배열: 값이 바뀔 때만 함수를 새로 만듦
```

- `[]`: 비교할 값이 없으므로 항상 같은 함수
- `[count]`: count가 바뀌면 새 함수
- 파일: `src/components/memo-1/`

## 7. memo + useMemo: 값 기억하기

배열·객체도 렌더링마다 새로 만들어집니다. `useMemo`로 **계산 결과**를 기억합니다.

```tsx
const students = useMemo(() => ['🐭이소망', '🐰이유정', /* ... */], []);
const items = useMemo(() => Array.from({ length: 5 }, (_, i) => i + count), [count]);
```

- 절대 바뀌지 않는 값이라면 컴포넌트 **밖의 상수**로 빼는 것이 더 간단합니다.
- 파일: `src/components/memo-2/`, `src/components/memo-3/App.tsx`

## 8. key와 재조정

목록이 `[10…14]` → `[11…15]`로 바뀌면 React는 key를 비교해 11~14는 기존 항목, 15는 새 항목이라고 판단합니다. 기존 항목의 props가 같으면 `memo`로 리렌더링을 생략합니다.

- key: 항목을 **구별** / memo: 불필요한 렌더링을 **줄임**
- 파일: `src/components/memo-3/List.tsx`, `ListItem.tsx`

## 9. 핵심 정리

| 도구 | 기억하는 것 | 사용 시점 |
| --- | --- | --- |
| `memo` | 컴포넌트 렌더링 결과 | props가 같으면 리렌더링 생략 |
| `useCallback` | 함수 참조 | memo 자식에게 함수를 넘길 때 |
| `useMemo` | 계산 결과(배열·객체·값) | 무거운 계산, memo 자식에게 배열·객체를 넘길 때 |

- state는 스냅샷이므로 `setState` 직후에도 이전 값이 보입니다.
- 이전 값 기반 업데이트는 `setState(prev => ...)`를 사용합니다.

## 10. 실행 방법

```sh
cd 10-snapshot
npm install
npm run dev
```

- `src/Playground.tsx`에서 보고 싶은 예제(`Counter`, `Form`, `memo-1~3`, `controlled/Form`)의 import와 JSX 주석을 바꿔 확인합니다. 기본값은 `controlled/Form`입니다.
- 브라우저 콘솔에서 어떤 컴포넌트가 다시 렌더링되는지 확인합니다.
