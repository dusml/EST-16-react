# 05. HTML vs JSX 마크업

> HTML과 JSX의 차이를 익히고, 데이터 바인딩·조건부 렌더링·리스트 렌더링을 학습(Learn)과 카드 실습(Practice)으로 연습합니다.

## 목차

1. [데이터 바인딩](#1-데이터-바인딩)
2. [HTML vs JSX 속성 차이](#2-html-vs-jsx-속성-차이)
3. [JSX가 렌더링하는 값 / 하지 않는 값](#3-jsx가-렌더링하는-값--하지-않는-값)
4. [조건부 렌더링](#4-조건부-렌더링)
5. [조건부 표시](#5-조건부-표시)
6. [리스트 렌더링](#6-리스트-렌더링)
7. [props와 children 타입](#7-props와-children-타입)
8. [실습 (Practice)](#8-실습-practice)
9. [핵심 정리](#9-핵심-정리)
10. [실행 방법](#10-실행-방법)

---

## 1. 데이터 바인딩

`{ }` 안에 변수나 표현식을 넣어 화면에 출력합니다.

```tsx
<span className="status">{statusMessage}</span>
```

- 여러 요소를 하나로 묶을 때는 `<>...</>`(Fragment)를 사용합니다.
- 파일: `src/learn/DataBinding.tsx`

## 2. HTML vs JSX 속성 차이

| 규칙 | HTML | JSX |
| --- | --- | --- |
| 예약어 | `class`, `for` | `className`, `htmlFor` |
| 여러 단어 | `tabindex`, `maxlength`, `readonly` | `tabIndex`, `maxLength`, `readOnly` (camelCase) |
| 예외 | `aria-*`, `data-*` | 그대로 kebab-case 사용 |
| style | 문자열 `"color: red"` | 객체 `style={{ color: 'red' }}` |
| 빈 태그 | `<img>` | `<img />` (반드시 닫기) |
| boolean | `disabled` | `disabled` = `disabled={true}`, `disabled={false}`면 속성이 빠짐 |

- 파일: `src/learn/JSXAttributes.tsx`

## 3. JSX가 렌더링하는 값 / 하지 않는 값

- **렌더링 O**: 문자열, 숫자(`0`, `NaN` 포함), 배열(요소를 이어 붙임)
- **렌더링 X**: `null`, `undefined`, `true`, `false`, `''`
- **오류**: 객체 → `JSON.stringify()`로 문자열로 바꿔야 출력 가능
- 주의: `{count && <p>...</p>}`에서 `count`가 `0`이면 화면에 **0이 찍힙니다** → `count > 0 &&`로 작성

- 파일: `src/learn/RenderableValues.tsx`

## 4. 조건부 렌더링

조건에 따라 요소를 **만들거나 만들지 않습니다.**

```tsx
{imagePath && <img src={imagePath} alt="" />}            // && 연산자
{isShowSpinner ? <img src="/icons/spinner.svg" /> : <img src="/vite.svg" />}  // 삼항 연산자
```

- `switch`로 값을 먼저 계산한 뒤 JSX에서 사용하는 방법도 있습니다.
- 예시: 로그인/로그아웃 화면, 에러 메시지, 장바구니 목록
- 파일: `src/learn/ConditionalRendering.tsx`

## 5. 조건부 표시

요소는 **항상 존재**하고 `hidden` 속성이나 CSS로 보이기/숨기기만 합니다.

```tsx
<picture hidden={isShowReactImage}>...</picture>
```

- 예시: 아코디언, 탭 메뉴, 드롭다운
- 파일: `src/learn/ConditionalDisplay.tsx`

## 6. 리스트 렌더링

```tsx
items.map((item) => <li key={item.id}>{item.message}</li>)
```

- 역순 렌더링은 원본을 훼손하지 않도록 복사 후 뒤집습니다: `[...items].reverse()` 또는 `items.toReversed()`
- 객체는 `Object.entries()`로 `[key, value]` 배열로 바꿔 렌더링합니다.
- `<>`에는 key를 줄 수 없으므로 key가 필요하면 `<Fragment key={key}>`를 사용합니다.
- 파일: `src/learn/RenderList.tsx`

## 7. props와 children 타입

- 컴포넌트는 props를 **하나의 객체**로 받습니다. 관례상 `statusMessage={statusMessage}`처럼 이름을 같게 씁니다.
- children 타입
  - `React.ReactNode`: 문자열, 숫자, null, 요소 등 모두 허용 (가장 많이 사용)
  - `React.ReactElement`: JSX 요소만 허용
  - `PropsWithChildren<Props>`: Props에 `children?: ReactNode`를 추가한 타입

## 8. 실습 (Practice)

| 실습 | 파일 | 연습 내용 |
| --- | --- | --- |
| 프로필 카드 | `src/practice/dataBinding/` | 구조 분해 할당, 나이 계산, 랜덤 명언, style 바인딩 |
| 주문 카드 | `src/practice/conditionalRendering/` | early return, 상태별 className, 삼항·`&&`, 쿠폰 0 처리 |
| 플레이리스트 카드 | `src/practice/renderList/` | `map()`과 key로 카드 목록 렌더링 |

## 9. 핵심 정리

- JSX 속성은 **camelCase**, 예외는 `aria-*`, `data-*`
- `{ }` 안에는 **표현식**만 쓸 수 있습니다 (`if`문 X → 삼항, `&&` 사용)
- 조건부 렌더링은 요소를 없애고, 조건부 표시는 숨깁니다.
- 목록에는 항상 **고유한 key**를 줍니다.

## 10. 실행 방법

```sh
cd 05-html-vs-jsx-markup
npm install
npm run dev
```

- 기본 화면은 `<Learn />`입니다. 카드 실습은 `src/main.tsx`에서 `<Practice />`로 바꿔 확인합니다.
