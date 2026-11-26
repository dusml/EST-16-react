# 12. React + Supabase

> Supabase와 연동해 회원가입·로그인·로그아웃을 구현하고, 상품 목록을 데이터베이스에서 가져옵니다. 직접 만든 라우터와 Context로 인증 상태를 앱 전체에 공유합니다.

## 목차

1. [Supabase 클라이언트 설정](#1-supabase-클라이언트-설정)
2. [데이터베이스 타입 생성](#2-데이터베이스-타입-생성)
3. [직접 만드는 SPA 라우터](#3-직접-만드는-spa-라우터)
4. [회원가입 (signUp + Storage 업로드)](#4-회원가입-signup--storage-업로드)
5. [로그인 (signInWithPassword)](#5-로그인-signinwithpassword)
6. [인증 상태 공유 (AuthProvider)](#6-인증-상태-공유-authprovider)
7. [로그아웃과 메뉴 제어](#7-로그아웃과-메뉴-제어)
8. [상품 목록 조회 (useProducts)](#8-상품-목록-조회-useproducts)
9. [GSAP 애니메이션](#9-gsap-애니메이션)
10. [CSS Modules](#10-css-modules)
11. [핵심 정리](#11-핵심-정리)
12. [실행 방법](#12-실행-방법)

---

## 1. Supabase 클라이언트 설정

```ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
```

- 앱 전체에서 이 클라이언트 하나로 인증(auth), 데이터베이스(from), 스토리지(storage)를 사용합니다.
- 파일: `src/supabase/supabase.tsx`

## 2. 데이터베이스 타입 생성

Supabase CLI로 테이블 구조를 TypeScript 타입으로 생성합니다. 타입을 직접 작성하지 않아도 됩니다.

```ts
// 인덱스 접근 타입으로 products 테이블의 한 행(Row) 타입 꺼내기
type ProductRow = Database['public']['Tables']['products']['Row'];

// 헬퍼 타입: 조회 Tables<'products'> / 생성 TablesInsert / 수정 TablesUpdate
```

- 파일: `src/supabase/database.types.ts`

## 3. 직접 만드는 SPA 라우터

페이지 정보를 배열로 정의하고, Context로 현재 경로와 이동 함수를 공유합니다.

```tsx
export const routes = [
  { title: '메인', path: '/', element: <Home /> },
  { title: '상품목록', path: '/Product', element: <Product /> },
  { title: '로그인', path: '/Login', element: <Login /> },
  // ...
];
```

| 파일 | 역할 |
| --- | --- |
| `src/router/router.tsx` | 경로(path), 메뉴 이름(title), 보여줄 요소(element) 정의 |
| `src/router/RouterProvider/index.tsx` | 현재 경로에 맞는 페이지 렌더링, `popstate`(뒤로가기) 처리, 없는 경로는 `NotFound` |
| `src/components/NavLink.tsx` | 클릭 시 새로고침 없이 이동 (`e.preventDefault()` + `history.pushState()`), 현재 메뉴에 active 클래스 |

## 4. 회원가입 (signUp + Storage 업로드)

1. 제어 컴포넌트로 이메일·비밀번호·닉네임·프로필 이미지 입력
2. 비밀번호 확인 검사
3. `supabase.auth.signUp()`으로 가입하고 닉네임은 `user_metadata`에 저장
4. 프로필 이미지가 있으면 `avatars` 버킷에 `{userId}.{확장자}`로 업로드
5. SweetAlert2로 완료 알림 후 로그인 페이지로 이동

```ts
const { data: { user }, error } = await supabase.auth.signUp({
  email, password, options: { data: { nickname } },
});

await supabase.storage.from('avatars').upload(`${user.id}.${ext}`, avatarFile, { upsert: true });
```

- 파일: `src/pages/Register.tsx`

## 5. 로그인 (signInWithPassword)

```ts
const { error } = await supabase.auth.signInWithPassword({ email, password });
if (error) setError(error.message);          // 에러 메시지 표시 (role="alert")
else setHistoryRoute('/');                   // 성공 시 메인으로 이동
```

- `useId()`로 label과 input을 연결합니다.
- 파일: `src/pages/Login.tsx`

## 6. 인증 상태 공유 (AuthProvider)

로그인한 사용자 정보를 Context로 앱 전체에 공유합니다.

```tsx
useEffect(() => {
  supabase.auth.getUser().then(({ data: { user } }) => {
    if (user) setUser({ id: user.id, email: user.email!, nickname: user.user_metadata.nickname ?? /* 이메일 앞부분 */ });
  });
}, []);

<AuthContext value={{ user, isAuth: !!user, logOut }}>{children}</AuthContext>
```

- `isAuth`는 별도 state가 아니라 `!!user`로 계산한 **파생 값**입니다.
- `useAuth()` 커스텀 훅으로 어디서든 `user`, `isAuth`, `logOut`을 꺼내 씁니다.
- 파일: `src/components/auth/AuthProvider.tsx`

## 7. 로그아웃과 메뉴 제어

```tsx
const { user, isAuth, logOut } = useAuth();

// 로그인 상태면 '로그인', '회원가입' 메뉴 숨기기
const visibleRoutes = routes.filter(({ title }) => !(isAuth && ['로그인', '회원가입'].includes(title)));
```

- 로그인 상태에서는 `{닉네임}님 반갑습니다` 인사와 로그아웃 버튼을 보여줍니다.
- `logOut()`은 `supabase.auth.signOut()` 후 `user`를 `null`로 바꿉니다.
- 파일: `src/components/Layout/Header.tsx`

## 8. 상품 목록 조회 (useProducts)

```ts
useEffect(() => {
  let ignore = false;
  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (ignore) return;            // 늦게 도착한 응답 무시
    if (data) setProducts(data);
    setLoading(false);
    if (error) console.warn('상품정보 불러오기 실패', error);
  };
  fetchProducts();
  return () => { ignore = true; }; // cleanup
}, []);
```

- `useEffect` 콜백에는 `async`를 직접 붙일 수 없으므로 내부에 비동기 함수를 선언해 호출합니다.
- 상품 페이지는 `loading` 중이면 로딩 문구를, 완료되면 상품 카드(이미지, 이름, 가격, 할인율, 할인가)를 보여줍니다.
- 파일: `src/hook/useProducts.ts`, `src/pages/Product.tsx`

## 9. GSAP 애니메이션

`useGSAP` 훅으로 상품이 바뀔 때 카드가 아래에서 위로 차례대로 나타나게 합니다.

```tsx
useGSAP(() => {
  gsap.fromTo('li', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 });
}, { dependencies: [products], scope: UL, revertOnUpdate: true });
```

- `scope`: ref로 지정한 영역 안의 요소만 선택 / cleanup은 `useGSAP`이 자동 처리

## 10. CSS Modules

`*.module.css` 파일의 클래스 이름은 빌드 시 고유한 이름으로 바뀌어 컴포넌트끼리 스타일이 충돌하지 않습니다.

```tsx
import S from './Header.module.css';
<header className={S.header}>
```

## 11. 핵심 정리

| 기능 | Supabase API |
| --- | --- |
| 회원가입 | `supabase.auth.signUp()` |
| 로그인 | `supabase.auth.signInWithPassword()` |
| 현재 사용자 | `supabase.auth.getUser()` |
| 로그아웃 | `supabase.auth.signOut()` |
| 데이터 조회 | `supabase.from('products').select('*')` |
| 파일 업로드 | `supabase.storage.from('avatars').upload()` |

- 인증 상태는 **Context + 커스텀 훅(useAuth)** 으로 공유합니다.
- 서버 요청은 **useEffect + cleanup**, 로직은 **커스텀 훅**으로 분리합니다.
- SPA 이동은 `history.pushState()` + 상태 변경으로 새로고침 없이 처리합니다.

## 12. 실행 방법

1. 프로젝트 루트에 `.env` 파일을 만들고 Supabase 값을 입력합니다. (`.env`는 git에 올리지 않습니다.)

   ```sh
   VITE_SUPABASE_URL=https://<프로젝트-ref>.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
   ```

2. Supabase에 `products` 테이블과 `avatars` 스토리지 버킷이 필요합니다.
3. 개발 서버를 실행합니다.

   ```sh
   cd 12-react-with-supabase
   npm install
   npm run dev
   ```

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사와 배포 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리 보기 |
