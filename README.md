# EST-16 React 실습

> React의 렌더링 원리부터 상태 관리, Hooks, Context, Supabase 연동까지 단계별로 학습하는 실습 저장소입니다. 각 폴더는 독립된 프로젝트이며, 폴더마다 README에 핵심 개념이 정리되어 있습니다.

## 목차

1. [학습 로드맵](#1-학습-로드맵)
2. [단계별 학습 내용](#2-단계별-학습-내용)
3. [사용 기술](#3-사용-기술)
4. [실행 방법](#4-실행-방법)
5. [폴더 공통 구조](#5-폴더-공통-구조)
6. [복습하는 방법](#6-복습하는-방법)
7. [복습 체크리스트](#7-복습-체크리스트)
8. [실행 중 확인할 문제](#8-실행-중-확인할-문제)
9. [학습 기록 양식](#9-학습-기록-양식)

---

## 1. 학습 로드맵

| 단계 | 폴더 | 주제 | 핵심 키워드 |
| --- | --- | --- | --- |
| 1 | [`00-basic`](./00-basic/) | React와 DOM 기초 | 실제 DOM, 가상 요소, `createElement`, `createRoot` |
| 1 | [`01-getting-started-react`](./01-getting-started-react/) | React 시작하기 | 리스트 렌더링, `key`, Proxy, 리렌더링 |
| 1 | [`02-component-with-props`](./02-component-with-props/) | 컴포넌트와 props | 클래스형·함수형, props, children |
| 2 | [`03-react-with-jsx-transform`](./03-react-with-jsx-transform/) | JSX와 JSX 변환 | JSX, Babel, TypeScript `react-jsx` |
| 2 | [`04-vite-template`](./04-vite-template/) | Vite 템플릿 | Vite, `@` 별칭, props 타입, 환경 변수 |
| 2 | [`05-html-vs-jsx-markup`](./05-html-vs-jsx-markup/) | HTML vs JSX 마크업 | JSX 속성, 데이터 바인딩, 조건부·리스트 렌더링 |
| 3 | [`06-component-purity`](./06-component-purity/) | 컴포넌트 순수성 | 순수 함수, 부수 효과, StrictMode |
| 3 | [`07-responding-to-events`](./07-responding-to-events/) | 이벤트 응답과 useState | 이벤트 핸들러, 전파, `useState`, 업데이터 함수 |
| 3 | [`08-declarative-programming`](./08-declarative-programming/) | 명령형 vs 선언형 | 선언형 UI, 상태 → 화면, `createState` |
| 4 | [`09-resct-component-states`](./09-resct-component-states/) | 컴포넌트 상태 설계 | 상태 끌어올리기, 파생 상태, CRUD, debounce |
| 4 | [`10-snapshot`](./10-snapshot/) | 스냅샷과 메모이제이션 | 스냅샷, 지연 초기화, 제어 입력, `memo`, `useCallback`, `useMemo` |
| 5 | [`11-fetching-data`](./11-fetching-data/) | Effect, Ref, Context | `useEffect`, `useRef`, `useLayoutEffect`, Context, 커스텀 훅 |
| 5 | [`12-react-with-supabase`](./12-react-with-supabase/) | React + Supabase | 회원가입·로그인, 인증 Context, DB 조회, SPA 라우터 |

## 2. 단계별 학습 내용

### 1단계: React의 렌더링 원리 (00 ~ 02)

JSX 없이 `React.createElement()`로 요소를 만들며 React가 화면을 그리는 원리를 이해합니다.

- React 요소는 화면을 설명하는 **가벼운 자바스크립트 객체**입니다.
- `createRoot(container).render(element)`로 실제 DOM에 그립니다.
- 목록은 `map()`으로 만들고 각 항목에 고유한 `key`를 줍니다.
- 컴포넌트는 props를 받아 요소를 반환하는 함수(또는 클래스)입니다.

### 2단계: JSX와 개발 환경 (03 ~ 05)

JSX 문법과 변환 과정을 익히고, Vite + TypeScript 환경에서 마크업을 작성합니다.

- JSX는 빌드 과정에서 `jsx()` / `createElement()` 호출로 변환됩니다.
- JSX 속성은 camelCase(`className`, `htmlFor`, `tabIndex`)를 사용합니다.
- 조건부 렌더링(`&&`, 삼항)과 조건부 표시(`hidden`)를 구분합니다.

### 3단계: 순수성, 이벤트, 상태 (06 ~ 08)

렌더링은 순수하게 유지하고, 부수 효과는 이벤트 핸들러에서 처리하며, 화면에 반영할 값은 state로 관리합니다.

- 컴포넌트는 같은 입력에 항상 같은 JSX를 반환해야 합니다.
- `useState`의 변경 함수는 리렌더링을 일으키는 **렌더 트리거**입니다.
- 선언형 UI: 이벤트 핸들러는 **상태만** 바꾸고, 화면은 React가 그립니다.

### 4단계: 상태 설계와 최적화 (09 ~ 10)

어떤 값을 state로 만들고 어디에 둘지 결정하고, 불필요한 리렌더링을 줄입니다.

- 공유되는 상태는 공통 부모로 끌어올리고, 계산 가능한 값은 파생 상태로 만듭니다.
- 배열·객체 state는 `...`, `map`, `filter`로 **새 값을 만들어** 교체합니다.
- state는 렌더링 순간의 스냅샷입니다.
- `memo` / `useCallback` / `useMemo`로 컴포넌트·함수·값을 기억합니다.

### 5단계: 외부와 연결하기 (11 ~ 12)

Effect로 서버와 통신하고, Context로 앱 전체에 데이터를 공유하며, Supabase로 실제 인증과 데이터베이스를 연동합니다.

- 서버 요청은 `useEffect` 안에서 실행하고 cleanup으로 정리합니다.
- props drilling은 Context API와 커스텀 훅으로 해결합니다.
- Supabase `auth`로 회원가입·로그인·로그아웃, `from()`으로 데이터 조회를 처리합니다.

## 3. 사용 기술

| 구분 | 00 ~ 03 | 04 ~ 12 |
| --- | --- | --- |
| 언어 | JavaScript (ES Modules), 03은 TypeScript 일부 | TypeScript (TSX) |
| React | esm.sh CDN 모듈 | npm 패키지 (React 19) |
| 개발 서버 | live-server (`server.js`) | Vite |
| 기타 | HTML, CSS | ESLint, CSS Modules, Supabase, GSAP, SweetAlert2 (12) |

## 4. 실행 방법

각 폴더는 독립된 `package.json`을 사용하므로 **폴더마다 처음 한 번** 의존성을 설치합니다.

```sh
cd 07-responding-to-events   # 실행할 실습 폴더
npm install
npm run dev
```

| 폴더 | 접속 주소 | 참고 |
| --- | --- | --- |
| 00 ~ 03 | http://localhost:3000 | React를 CDN에서 불러오므로 인터넷 연결 필요 |
| 04 | 터미널에 표시된 Vite 주소 | `04-vite-template/vite-custom-template` 안에서 실행 |
| 05 ~ 12 | 터미널에 표시된 Vite 주소 | 12는 `.env`에 Supabase 정보 필요 |

Vite 프로젝트(04 ~ 12)의 명령어:

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사와 배포 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리 보기 (`build` 후 실행) |

## 5. 폴더 공통 구조

```text
NN-주제/
├── README.md        # 폴더별 핵심 개념 정리 (목차 순서대로)
├── index.html       # 진입 HTML (#app 또는 #root, #react-app)
├── package.json
├── public/          # 이미지, 아이콘 등 정적 파일
└── src/
    ├── main.(js|tsx)    # 렌더링 진입점
    ├── Playground.tsx   # (09, 10) 확인할 예제 선택
    ├── learn/           # 개념 학습 예제
    ├── practice/        # 실습 과제
    ├── pages/           # 페이지 컴포넌트
    ├── components/      # 재사용 컴포넌트
    ├── hook/            # 커스텀 훅 (11, 12)
    └── styles/          # 공통 스타일
```

- 한 폴더에 예제가 여러 개 있으면 `main.tsx`나 `Playground.tsx`에서 import와 JSX 주석을 바꿔 확인합니다.
- 파일 이름 끝에 `_강사님`, `_초안`, ` copy`가 붙은 파일은 비교용 버전입니다.

## 6. 복습하는 방법

1. 폴더의 **README 목차**를 보고 오늘 복습할 개념을 고릅니다.
2. 실행 결과를 먼저 **예상**한 뒤 `npm run dev`로 확인합니다.
3. 아래 순서로 코드를 따라갑니다.
   - `index.html` → `src/main.tsx` → `Playground.tsx` / `pages/` → `components/`
4. 값을 하나씩 바꿔 보고, 브라우저 개발자 도구의 **Console**(렌더링 로그)과 **Elements**(DOM 구조)를 확인합니다.
5. 아래 체크리스트로 설명할 수 있는지 점검합니다.

## 7. 복습 체크리스트

코드를 보지 않고 설명할 수 있는지 확인합니다.

**렌더링 원리 (00 ~ 03)**
- [ ] React 요소와 실제 DOM 노드의 차이를 설명할 수 있다.
- [ ] `createElement`, `createRoot`, `render`의 역할을 구분할 수 있다.
- [ ] 목록에 `key`를 지정하는 이유를 설명할 수 있다.
- [ ] props를 전달하고 구조 분해 할당으로 읽을 수 있다.
- [ ] JSX가 어떤 코드로 변환되는지 설명할 수 있다.

**JSX와 상태 (04 ~ 08)**
- [ ] HTML과 JSX 속성의 차이를 세 가지 이상 말할 수 있다.
- [ ] `{count && ...}`에서 0이 출력되는 이유를 설명할 수 있다.
- [ ] 순수 함수와 부수 효과를 구분하고, 부수 효과를 둘 위치를 말할 수 있다.
- [ ] 지역 변수와 state의 차이를 설명할 수 있다.
- [ ] `setCount(count + 1)`과 `setCount(prev => prev + 1)`의 차이를 설명할 수 있다.
- [ ] 명령형과 선언형 UI의 차이를 설명할 수 있다.

**상태 설계와 최적화 (09 ~ 10)**
- [ ] 상태를 공통 부모로 끌어올리는 이유를 설명할 수 있다.
- [ ] 파생 상태를 state로 만들지 않는 이유를 설명할 수 있다.
- [ ] 배열 state를 추가·수정·삭제하는 코드를 작성할 수 있다.
- [ ] "state는 스냅샷"이라는 말의 의미를 설명할 수 있다.
- [ ] 제어 컴포넌트와 비제어 컴포넌트를 구분할 수 있다.
- [ ] `memo`, `useCallback`, `useMemo`가 각각 무엇을 기억하는지 말할 수 있다.

**Effect와 외부 연결 (11 ~ 12)**
- [ ] `useEffect`의 의존성 배열과 cleanup의 역할을 설명할 수 있다.
- [ ] `useEffect`와 `useLayoutEffect`의 실행 시점을 비교할 수 있다.
- [ ] `useRef`로 DOM을 선택하고 자식에게 ref를 전달할 수 있다.
- [ ] Context의 생성 → 제공 → 읽기 흐름을 설명할 수 있다.
- [ ] Supabase로 회원가입·로그인·데이터 조회를 하는 흐름을 설명할 수 있다.

## 8. 실행 중 확인할 문제

| 증상 | 확인할 내용 |
| --- | --- |
| `npm run dev`가 실행되지 않음 | 실습 폴더 안인지, `npm install`을 실행했는지 확인 |
| 3000번 포트를 사용할 수 없음 (00 ~ 03) | 다른 실습 서버를 `Ctrl+C`로 종료하거나 `server.js`의 `port` 변경 |
| 화면에 아무것도 표시되지 않음 | Console 오류, 루트 요소 id, `main` 진입점 경로 확인 |
| React 모듈을 가져오지 못함 (00 ~ 03) | 인터넷 연결과 Network 탭의 esm.sh 요청 확인 |
| 이미지가 보이지 않음 | `public/`의 실제 파일명과 요청 경로 확인 (`public/avatar/a.png` → `/avatar/a.png`) |
| 콘솔 로그가 두 번씩 찍힘 | 개발 환경의 `StrictMode` 동작이므로 정상 |
| Supabase 요청 실패 (12) | `.env`의 `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` 확인 후 서버 재시작 |

## 9. 학습 기록 양식

```text
학습 날짜:
실습 폴더:
오늘 이해한 개념:
직접 바꿔 본 코드:
예상한 결과 / 실제 결과:
발생한 오류와 해결 방법:
아직 헷갈리는 점:
다음에 확인할 내용:
```
