# 08. 명령형 vs 선언형 프로그래밍

> 같은 퀴즈 폼을 명령형(DOM 직접 조작)과 선언형(상태 → UI)으로 각각 만들어 보고, React가 선언형 UI를 사용하는 이유를 이해합니다.

## 목차

1. [명령형 프로그래밍](#1-명령형-프로그래밍)
2. [명령형 방식의 문제점](#2-명령형-방식의-문제점)
3. [선언형 프로그래밍](#3-선언형-프로그래밍)
4. [상태 관리 도구 직접 만들기 (createState)](#4-상태-관리-도구-직접-만들기-createstate)
5. [React로 선언형 폼 만들기](#5-react로-선언형-폼-만들기)
6. [핵심 정리](#6-핵심-정리)
7. [실행 방법](#7-실행-방법)

---

## 1. 명령형 프로그래밍

"**어떻게**" 화면을 바꿀지 하나하나 지시합니다.

```ts
async function handleFormSubmit(e) {
  e.preventDefault();
  disable(textarea);
  disable(button);
  show(loading);
  hide(error);
  try {
    await submitForm(textarea.value);
    show(success);
    hide(form);
  } catch (err) {
    show(error);
  } finally {
    hide(loading);
    enable(textarea);
    enable(button);
  }
}
```

- 파일: `src/programming/imperative-step1.ts`(체크박스), `src/programming/imperative.ts`(퀴즈 폼)

## 2. 명령형 방식의 문제점

- 상태가 늘어날수록 `show/hide/enable/disable` 호출이 복잡해집니다.
- 하나라도 빠뜨리면 화면이 잘못된 상태로 남습니다.
- 현재 화면이 어떤 상태인지 코드만 보고 알기 어렵습니다.

## 3. 선언형 프로그래밍

"**무엇을**" 보여줄지 상태로 정의하고, `render`는 상태를 보고 UI를 그립니다.

```ts
const data = { checked: false };

const render = () => {
  checkbox.checked = data.checked;
  button.disabled = data.checked;
  button.textContent = data.checked ? '비활성 상태' : '활성 상태';
};
```

- 상태가 같으면 언제, 몇 번을 그려도 **같은 화면**이 나옵니다.
- 파일: `src/programming/declarative.ts`

## 4. 상태 관리 도구 직접 만들기 (createState)

Proxy로 상태를 감싸 **직접 수정은 막고**, `setState`로만 변경하며 변경 시 `render`를 호출합니다. React `useState`의 원리를 흉내 낸 미니 도구입니다.

```ts
const [state, setState] = createState(data, render);
setState('checked', true);   // 값 변경 + 자동 render
state.checked = true;        // 🚫 경고: 직접 수정 불가
```

- 파일: `src/lib/createState.ts`

## 5. React로 선언형 폼 만들기

화면의 상태를 먼저 정의하고, 이벤트 핸들러는 **상태만** 바꿉니다. 화면은 React가 그립니다.

```tsx
type Status = 'typing' | 'submitting' | 'success';

const [answer, setAnswer] = useState('');
const [error, setError] = useState<Error | null>(null);
const [status, setStatus] = useState<Status>('typing');

if (status === 'success') return <h1>정답입니다~~!!</h1>;

<textarea disabled={status === 'submitting'} onChange={(e) => setAnswer(e.target.value)} />
<button disabled={answer.length === 0 || status === 'submitting'}>Submit</button>
{error && <p style={{ color: 'red' }}>{error.message}</p>}
{status === 'submitting' && <p>Loading....</p>}
```

- 파일: `src/programming/declarative.tsx`

### 선언형 UI 설계 순서

1. 화면의 시각적 상태를 정리한다 (입력 중 / 제출 중 / 성공 / 실패)
2. 상태를 바꾸는 계기를 찾는다 (입력, 제출 버튼, 응답)
3. `useState`로 필요한 최소한의 상태를 선언한다
4. 이벤트 핸들러에서 상태를 변경한다
5. JSX에서 상태에 따라 UI를 표현한다

## 6. 핵심 정리

| | 명령형 | 선언형 |
| --- | --- | --- |
| 관점 | 어떻게(How) 바꿀지 | 무엇을(What) 보여줄지 |
| 화면 변경 | DOM을 직접 조작 | 상태를 바꾸면 자동 렌더링 |
| 유지보수 | 상태가 많아질수록 어려움 | 상태만 보면 화면을 알 수 있음 |

## 7. 실행 방법

```sh
cd 08-declarative-programming
npm install
npm run dev
```

- `index.html`이 세 가지 예제를 한 화면에 함께 불러옵니다.
  - `#imperative-programming`, `#app`: 명령형 체크박스·퀴즈 폼 (`imperative.ts`, `declarative.ts`)
  - `#root`: React 선언형 퀴즈 폼 (`main.tsx` → `declarative.tsx`)
- 브라우저 콘솔에서 `update(true)`, `state`, `setState`를 직접 호출해 볼 수 있습니다.
