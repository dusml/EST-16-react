# 11. Effect, Ref, Context와 데이터 가져오기

> `useEffect`로 서버 데이터를 가져오고, `useRef`로 DOM을 다루며, `useLayoutEffect`의 실행 시점을 비교하고, Context API와 커스텀 훅으로 props drilling을 해결합니다.

## 목차

1. [useEffect로 데이터 가져오기](#1-useeffect로-데이터-가져오기)
2. [커스텀 훅으로 로직 분리하기](#2-커스텀-훅으로-로직-분리하기)
3. [useRef로 DOM 요소 선택하기](#3-useref로-dom-요소-선택하기)
4. [ref를 자식에게 전달하기](#4-ref를-자식에게-전달하기)
5. [useEffect + useRef: 채팅 자동 스크롤](#5-useeffect--useref-채팅-자동-스크롤)
6. [useLayoutEffect vs useEffect](#6-uselayouteffect-vs-useeffect)
7. [Props Drilling과 Context API](#7-props-drilling과-context-api)
8. [Context + 커스텀 훅 (useUserContext, useTheme)](#8-context--커스텀-훅-useusercontext-usetheme)
9. [Hook 사용 규칙](#9-hook-사용-규칙)
10. [핵심 정리](#10-핵심-정리)
11. [실행 방법](#11-실행-방법)

---

## 1. useEffect로 데이터 가져오기

서버 요청은 부수 효과이므로 렌더링 중이 아니라 `useEffect` 안에서 실행합니다.

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
    .then((res) => { if (!res.ok) throw new Error('네트워크 응답 오류'); return res.json(); })
    .then((data) => { setUsers(data); setLoading(false); })
    .catch((err) => { if (err.name === 'AbortError') return; setError(err); setLoading(false); });

  return () => controller.abort();   // cleanup: 언마운트 시 요청 취소
}, []);   // 빈 배열: 마운트 시 한 번 실행
```

- `loading`, `error`, `users` 세 가지 상태로 로딩·에러·성공 화면을 나눕니다.
- StrictMode에서는 Effect가 두 번 실행되므로 cleanup으로 이전 요청을 취소합니다.

## 2. 커스텀 훅으로 로직 분리하기

| 파일 | 역할 |
| --- | --- |
| `src/hook/useUser.ts` (`useUsers`) | 상태 관리 + 데이터 요청 |
| `src/components/effect/Effect.tsx` (`UserList`) | 훅 호출 + 화면 출력 |

```tsx
const { loading, error, users } = useUsers();
if (loading) return <p>로딩 중....</p>;
if (error) return <p>에러 발생 : {error.message}</p>;
```

- 커스텀 훅 이름은 반드시 `use`로 시작합니다.

## 3. useRef로 DOM 요소 선택하기

`document.querySelector` 대신 React 방식으로 DOM을 선택합니다. React가 커밋 단계에서 `ref.current`에 실제 DOM을 넣어줍니다.

```tsx
const inputRef = useRef<HTMLInputElement>(null);
const handleFocus = () => inputRef.current?.focus();

<input ref={inputRef} />
```

- `ref.current`를 바꿔도 리렌더링은 일어나지 않습니다.
- 파일: `src/components/ref/Parent.tsx`

## 4. ref를 자식에게 전달하기

React 19부터는 `ref`를 **일반 prop처럼** 받을 수 있습니다. (React 18에서는 `forwardRef` 필요)

```tsx
function Child({ placeholder, ref }: { placeholder: string; ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} placeholder={placeholder} />;
}
```

- 파일: `src/components/ref/Child.tsx`

## 5. useEffect + useRef: 채팅 자동 스크롤

메시지가 추가될 때마다(`[messages]`) 스크롤 박스를 맨 아래로 이동합니다.

```tsx
useEffect(() => {
  const list = listRef.current;
  if (!list) return;
  list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
}, [messages]);
```

- ref가 스크롤 박스를 가리키면 `scrollTo()`, 맨 아래 빈 div를 가리키면 `scrollIntoView()`를 사용합니다.
- 파일: `src/components/effectAndRef/`

## 6. useLayoutEffect vs useEffect

```
컴포넌트 렌더링 → DOM 업데이트 → useLayoutEffect → 화면 그리기(paint) → useEffect
```

- `useEffect`에서 높이를 측정하면 초기값 `0`이 잠깐 보였다가 바뀌어 **깜빡일 수** 있습니다.
- `useLayoutEffect`는 화면을 그리기 전에 실행되므로 깜빡임 없이 측정할 수 있습니다.
- 사용 예: 툴팁·팝오버 위치 계산, 요소 크기 측정, 스크롤 위치 조정
- 화면 그리기를 지연시키므로 꼭 필요할 때만 사용합니다.
- 파일: `src/components/layoutEffect/Parent.tsx`

## 7. Props Drilling과 Context API

`App → Parent → Child → GrandChild`로 props를 전달하면, 값을 쓰지 않는 중간 컴포넌트도 props를 받아 넘겨야 합니다(**props drilling**). Context는 이를 해결합니다.

| 단계 | 코드 | 비유 |
| --- | --- | --- |
| 1. 만들기 | `createContext<Type \| null>(null)` | 공용 사물함 만들기 |
| 2. 제공하기 | `<UserContext value={{ username, setUsername }}>` | 사물함에 값 넣기 |
| 3. 읽기 | `use(UserContext)` / `useContext(UserContext)` | 사물함에서 꺼내기 |

- `value={{ ... }}`의 바깥 중괄호는 JSX 표현식, 안쪽 중괄호는 객체입니다.
- 값뿐 아니라 **변경 함수**도 함께 제공할 수 있습니다.
- React 19에서는 `<Context.Provider>` 대신 `<Context>`를 바로 사용할 수 있습니다.
- 파일: `src/components/context/App.tsx`, `UserContext.tsx`

## 8. Context + 커스텀 훅 (useUserContext, useTheme)

Context 값을 읽고 `null`을 검사하는 로직을 훅으로 묶어 재사용합니다.

```tsx
function useUserContext() {
  const ctx = use(UserContext);
  if (!ctx) throw new Error('useUserContext는 <UserContext> 안에서 사용해야 합니다.');
  return ctx;
}

const { username } = useUserContext();
const { theme, toggleTheme } = useTheme();   // ThemeProvider: 라이트/다크 테마 전환
```

- 파일: `src/hook/useUserContext.tsx`, `src/components/context/ThemeContext.tsx`, `GrandChild.tsx`

## 9. Hook 사용 규칙

- Hook은 컴포넌트나 커스텀 훅의 **최상위**에서만 호출합니다.
- 조건문·반복문 안에서 호출하지 않습니다.
- 예외: React 19의 `use()`는 조건문 안에서도 호출할 수 있습니다.

## 10. 핵심 정리

| Hook | 역할 |
| --- | --- |
| `useEffect` | 화면을 그린 뒤 부수 효과 실행 (데이터 요청, 구독, 타이머) |
| `useLayoutEffect` | 화면을 그리기 전 DOM 측정·조정 |
| `useRef` | DOM 참조 또는 리렌더링 없이 값 보관 |
| `createContext` / `use` | 깊은 컴포넌트에 값 공유 |
| 커스텀 훅 | 반복되는 Hook 로직을 함수로 분리 |

## 11. 실행 방법

```sh
cd 11-fetching-data
npm install
npm run dev
```

- `src/main.tsx`에서 확인할 예제의 import와 JSX를 바꿉니다. 기본값은 Context 예제(`context/App`)입니다.
- 데이터 요청 예제는 JSONPlaceholder API를 사용하므로 인터넷 연결이 필요합니다.
- `src/react-lifecycle.html`에서 React 생명주기 정리를 볼 수 있습니다.
