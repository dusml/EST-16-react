# 09. 컴포넌트 상태 설계

> 상태를 어디에 둘지(상태 끌어올리기), 무엇을 상태로 만들지(파생 상태)를 결정하고, 검색 필터와 CRUD 노트 앱을 만들어 봅니다.

## 목차

1. [상태 끌어올리기 (Lifting State Up)](#1-상태-끌어올리기-lifting-state-up)
2. [파생 상태 (Derived State)](#2-파생-상태-derived-state)
3. [실습 1: 사용자 검색 (UserPage)](#3-실습-1-사용자-검색-userpage)
4. [실습 2: 상품 필터 (ProductPage)](#4-실습-2-상품-필터-productpage)
5. [debounce와 throttle](#5-debounce와-throttle)
6. [실습 3: 노트 앱 (NoteApp)](#6-실습-3-노트-앱-noteapp)
7. [배열 상태 불변성 (추가·수정·삭제)](#7-배열-상태-불변성-추가수정삭제)
8. [핵심 정리](#8-핵심-정리)
9. [실행 방법](#9-실행-방법)

---

## 1. 상태 끌어올리기 (Lifting State Up)

여러 자식이 같은 데이터를 사용하면 상태를 **가장 가까운 공통 부모**에 둡니다. 부모는 값과 변경 함수를 props로 내려줍니다.

```
UserPage (searchTerm 상태)
 ├─ UserSearchBox  ← searchTerm, onSearch
 ├─ UserList       ← 검색된 목록
 └─ UserListCount  ← 개수
```

## 2. 파생 상태 (Derived State)

다른 state나 props로 **계산할 수 있는 값은 state로 만들지 않습니다.** 렌더링 중에 계산합니다.

```tsx
const [searchTerm, setSearchTerm] = useState('');

// 파생 상태: searchTerm이 바뀌면 자동으로 다시 계산됨
const searchedUserList = users.filter((user) =>
  [user.name, user.email, user.city].some((field) =>
    field.toLowerCase().includes(searchTerm.toLowerCase())
  )
);
```

- `some()`: 하나라도 만족하면 true (OR) / `every()`: 모두 만족해야 true (AND)

## 3. 실습 1: 사용자 검색 (UserPage)

- 이름·이메일·도시로 검색하고, 검색 결과 수 / 전체 수를 표시합니다.
- **즉시 검색** 체크박스를 켜면 입력할 때마다 검색합니다(debounce 적용).
- `useId()`로 label과 input을 연결하는 고유 id를 만듭니다.
- 파일: `src/users/UserPage.tsx`, `src/users/components/`

## 4. 실습 2: 상품 필터 (ProductPage)

```tsx
const [searchTerm, setSearchTerm] = useState('');
const [stockOnly, setStockOnly] = useState(false);

const filteredProducts = productData.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (!stockOnly || product.inStock)
);
```

- 검색어 + "재고 있는 상품만 보기" 두 조건을 조합합니다.
- 파일: `src/pages/products/` (`products_1`, `products copy`는 연습 버전)

## 5. debounce와 throttle

| | debounce | throttle |
| --- | --- | --- |
| 동작 | 마지막 입력 후 일정 시간이 지나면 **한 번** 실행 | 일정 시간 동안 **최대 한 번** 실행 |
| 예시 | 검색어 입력 | 스크롤, 리사이즈 |

- 제네릭과 `Parameters<T>`, `ReturnType<T>` 유틸리티 타입도 함께 연습합니다.
- 파일: `src/utils/debounce.ts`, `src/utils/throttle.ts`

## 6. 실습 3: 노트 앱 (NoteApp)

상태는 `App`에만 두고, `routeInfo`로 어떤 페이지를 보여줄지 결정하는 간단한 SPA입니다.

```
App (list, routeInfo 상태 / 추가·수정·삭제 핸들러)
 ├─ NoteListPage    목록 → 클릭 시 detail, 작성 시 create
 ├─ NoteDetailPage  상세 → 수정 시 edit
 ├─ NoteCreatePage  NoteForm(mode="create")
 └─ NoteEditPage    NoteForm(mode="edit") + 삭제
```

- **지연 초기화**: `useState(() => getNoteList())` — 초기값 계산 함수가 첫 렌더링에만 실행됩니다.
- **파생 상태**: `selectedNote`(선택된 노트), `newNoteId`(새 id = 최대 id + 1)
- **여러 입력 관리**: 입력 필드를 하나의 `formData` 객체 상태로 관리합니다.
- 파일: `src/NoteApp/App.tsx`, `src/NoteApp/routes.ts`, `src/NoteApp/components/NoteForm.tsx`

## 7. 배열 상태 불변성 (추가·수정·삭제)

state는 직접 수정하지 않고 **새 배열**을 만들어 교체합니다.

```tsx
// 추가
setList([...list, newNote]);

// 수정: id가 같은 항목만 교체
setList(list.map((item) => (item.id === edited.id ? edited : item)));

// 삭제: 해당 id만 제외
setList(list.filter((item) => item.id !== deleteId));
```

- `newNoteId`를 `list.length + 1`로 만들면 삭제 후 id가 겹칠 수 있으므로 `Math.max(0, ...ids) + 1`을 사용합니다.

## 8. 핵심 정리

- 공유되는 상태는 **공통 부모로 끌어올리고**, 변경 함수를 props로 전달합니다.
- 계산 가능한 값은 state가 아니라 **파생 상태**로 만듭니다.
- 배열·객체 state는 `...`, `map`, `filter`로 **새 값을 만들어** 업데이트합니다.
- 무거운 초기값은 `useState(() => 계산())`처럼 **지연 초기화**합니다.

## 9. 실행 방법

```sh
cd 09-resct-component-states
npm install
npm run dev
```

- `src/Playground.tsx`에서 `<UserPage />`, `<ProductPage />`, `<NoteApp />` 중 하나를 활성화해 확인합니다. 기본값은 `<NoteApp />`입니다.
