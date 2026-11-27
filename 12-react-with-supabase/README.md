# 12. React + Supabase

> Supabase와 연동해 회원가입·로그인·로그아웃, 상품 목록·상세·등록·수정을 구현합니다. 직접 만든 라우터(동적 라우팅 포함)와 Context로 인증 상태를 앱 전체에 공유합니다.

## 목차

1. [Supabase 클라이언트 설정](#1-supabase-클라이언트-설정)
2. [데이터베이스 타입 생성](#2-데이터베이스-타입-생성)
3. [직접 만드는 SPA 라우터](#3-직접-만드는-spa-라우터)
4. [동적 라우팅 (/Product/:id)](#4-동적-라우팅-productid)
5. [회원가입 (signUp + Storage 업로드)](#5-회원가입-signup--storage-업로드)
6. [로그인 (signInWithPassword)](#6-로그인-signinwithpassword)
7. [인증 상태 공유 (AuthProvider)](#7-인증-상태-공유-authprovider)
8. [헤더: 메뉴 제어, 프로필 이미지, 로그아웃](#8-헤더-메뉴-제어-프로필-이미지-로그아웃)
9. [상품 목록 조회 (useProducts)](#9-상품-목록-조회-useproducts)
10. [상품 상세 조회와 수정 (ProductDetail)](#10-상품-상세-조회와-수정-productdetail)
11. [상품 등록 (CreateProduct)](#11-상품-등록-createproduct)
12. [GSAP 애니메이션](#12-gsap-애니메이션)
13. [CSS Modules](#13-css-modules)
14. [핵심 정리](#14-핵심-정리)
15. [실행 방법](#15-실행-방법)

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

- 앱 전체에서 이 클라이언트 하나로 인증(`auth`), 데이터베이스(`from`), 스토리지(`storage`)를 사용합니다.
- 파일: `src/supabase/supabase.tsx`

## 2. 데이터베이스 타입 생성

Supabase CLI로 테이블 구조를 TypeScript 타입으로 생성합니다. 타입을 직접 작성하지 않아도 됩니다.

```ts
// 인덱스 접근 타입으로 products 테이블의 한 행(Row) 타입 꺼내기
type ProductRow = Database['public']['Tables']['products']['Row'];

// 헬퍼 타입: 조회 Tables<'products'> / 생성 TablesInsert / 수정 TablesUpdate
type Product = Tables<'products'>;
```

- 파일: `src/supabase/database.types.ts`

## 3. 직접 만드는 SPA 라우터

페이지 정보를 배열로 정의하고, Context로 현재 경로와 이동 함수를 공유합니다.

```tsx
export const routes = [
  { title: '메인', path: '/', element: <Home /> },
  { title: '상품등록', path: '/Create', element: <CreateProduct /> },
  { title: '상품상세', path: '/Product/:id', element: <ProductDetail /> },
  { title: '상품목록', path: '/Product', element: <Product /> },
  { title: '로그인', path: '/Login', element: <Login /> },
  // ...
];
```

| 파일 | 역할 |
| --- | --- |
| `src/router/router.tsx` | 경로(path), 메뉴 이름(title), 보여줄 요소(element) 정의 |
| `src/router/RouterProvider/index.tsx` | 현재 경로에 맞는 페이지 렌더링, `popstate`(뒤로가기) 처리, `useRouter()`·`useParams()` 제공 |
| `src/router/RouterProvider/NotFound.tsx` | 일치하는 경로가 없을 때 보여주는 404 페이지 |
| `src/components/NavLink.tsx` | 클릭 시 새로고침 없이 이동 (`e.preventDefault()` + `history.pushState()`), 현재 메뉴에 active 클래스 |

페이지 이동은 항상 두 단계로 처리합니다.

```ts
history.pushState(null, '', '/Product');   // 1. 주소창 URL 변경 (새로고침 X)
setHistoryRoute('/Product');               // 2. 해당 경로의 페이지 렌더링
```

## 4. 동적 라우팅 (/Product/:id)

경로에 `:id`처럼 **변하는 부분**을 두고, 실제 URL에서 그 값을 꺼내 씁니다.

1. `:id`를 정규식 `([^/]+)`로 바꿔 패턴을 만듭니다. (`/Product/:id` → `^/Product/([^/]+)$`)
2. 이동할 URL(`/Product/7`)과 패턴을 비교합니다.
3. 일치하면 `{ id: '7' }` 형태의 `params`를 저장합니다.
4. 페이지에서는 `useParams()`로 값을 꺼냅니다.

```tsx
const { id } = useParams();   // /Product/7 → id = '7'
```

- `:`이 없는 경로는 기존처럼 문자열이 완전히 같은지 비교합니다.
- 파일: `src/router/RouterProvider/index.tsx` (`matchRoute`)

## 5. 회원가입 (signUp + Storage 업로드)

1. 제어 컴포넌트로 이메일·비밀번호·닉네임·프로필 이미지를 입력받습니다.
2. 비밀번호 확인 검사를 합니다.
3. `supabase.auth.signUp()`으로 가입하고, 닉네임은 `user_metadata`에 저장합니다.
4. 프로필 이미지가 있으면 `avatars` 버킷에 `{userId}.{확장자}`로 업로드합니다.
5. SweetAlert2로 완료 알림을 띄운 뒤 로그인 페이지로 이동합니다.

```ts
const { data: { user }, error } = await supabase.auth.signUp({
  email, password, options: { data: { nickname } },
});

await supabase.storage.from('avatars').upload(`${user.id}.${ext}`, avatarFile, { upsert: true });
```

- 에러 메시지는 `role="alert"`로 스크린 리더에도 전달합니다.
- 파일: `src/pages/Register.tsx`

## 6. 로그인 (signInWithPassword)

```ts
const { error } = await supabase.auth.signInWithPassword({ email, password });
if (error) setError(error.message);          // 에러 메시지 표시 (role="alert")
else setHistoryRoute('/');                   // 성공 시 메인으로 이동
```

- `useId()`로 label과 input을 연결합니다.
- 파일: `src/pages/Login.tsx`

## 7. 인증 상태 공유 (AuthProvider)

로그인한 사용자 정보를 Context로 앱 전체에 공유합니다.

### 처음 접속할 때: getUser()

```ts
supabase.auth.getUser().then(({ data: { user } }) => {
  if (user) setUser({ id: user.id, email: user.email!, nickname: user.user_metadata.nickname ?? /* 이메일 앞부분 */ });
});
```

### 로그인·로그아웃할 때: onAuthStateChange() 구독

인증 상태가 바뀔 때마다 콜백이 실행됩니다. 이벤트 리스너와 비슷한 **구독(subscription)** 방식입니다.

```ts
const { data } = supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) setUser({ /* session.user 정보 */ });
  else if (event === 'SIGNED_OUT') setUser(null);
});

return () => data.subscription.unsubscribe();   // cleanup: 언마운트 시 구독 해제
```

- `event`: 어떤 인증 이벤트가 발생했는지 (`SIGNED_IN`, `SIGNED_OUT` 등)
- `session`: 현재 로그인 정보 (로그아웃하면 `null`)
- 구독 덕분에 로그인 후 새로고침하지 않아도 헤더와 페이지가 바로 바뀝니다.

### Context 값

```tsx
<AuthContext value={{ user, isAuth: !!user, logout }}>{children}</AuthContext>
```

- `isAuth`는 별도 state가 아니라 `!!user`로 계산한 **파생 값**입니다.
- `useAuth()` 커스텀 훅으로 어디서든 `user`, `isAuth`, `logout`을 꺼내 씁니다.
- 파일: `src/components/auth/AuthProvider.tsx`

## 8. 헤더: 메뉴 제어, 프로필 이미지, 로그아웃

### 메뉴 제어

```tsx
const alwaysHidden = ['상품상세', '상품등록'];   // 메뉴에 항상 숨길 페이지
const hideWhenLoggedIn = ['로그인', '회원가입']; // 로그인하면 숨길 페이지

const visibleRoutes = routes.filter(({ title }) =>
  !alwaysHidden.includes(title) && !(isAuth && hideWhenLoggedIn.includes(title))
);
```

### 프로필 이미지 (getAvatarUrl)

1. `storage.from('avatars').list()`로 `userId`로 검색한 파일 목록을 가져옵니다.
2. 이름이 `userId`로 시작하는 파일을 찾습니다. (확장자를 몰라도 찾을 수 있음)
3. `getPublicUrl()`로 이미지 주소를 만듭니다.

```ts
const { data } = supabase.storage.from('avatars').getPublicUrl(matchedFile.name);
return data?.publicUrl || null;
```

- 헤더는 `[user]`가 바뀔 때마다 `useEffect`로 이미지 주소를 다시 가져옵니다. 이미지가 없으면 기본 이미지를 보여줍니다.
- 파일: `src/api/getAvatarUrl.ts`, `src/components/Layout/Header.tsx`

### 로그아웃

- `logout()`은 `supabase.auth.signOut()` 후 `user`를 `null`로 바꿉니다.
- 로그인 상태에서는 프로필 이미지, `{닉네임}님 반갑습니다` 인사, 로그아웃 버튼을 보여줍니다.

## 9. 상품 목록 조회 (useProducts)

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

- `useEffect` 콜백에는 `async`를 직접 붙일 수 없으므로 안에 비동기 함수를 선언해 호출합니다.

상품 목록 페이지(`Product.tsx`)의 동작:

| 상황 | 화면 |
| --- | --- |
| 데이터 불러오는 중 | 로딩 문구 |
| 로그인하지 않음 | "상품 목록은 로그인 후 이용 가능합니다." 안내 |
| 로그인함 | `+ 상품등록` 버튼과 상품 카드(이미지, 이름, 가격, 할인율, 할인가) |

- 상품 카드를 클릭하면 `/Product/{id}` 상세 페이지로 이동합니다.
- 파일: `src/hook/useProducts.ts`, `src/pages/Product.tsx`

## 10. 상품 상세 조회와 수정 (ProductDetail)

### 한 개 조회: eq() + single()

```ts
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('id', id)    // id가 일치하는 행만
  .single();       // 배열이 아니라 객체 하나로 받기
```

- `id`는 `useParams()`로 URL에서 꺼내고, `[id]`가 바뀔 때마다 다시 조회합니다.
- 로딩 중 / 에러 / 상품 없음 / 성공 화면을 나눠 보여줍니다.

### 수정: update() + eq()

```ts
const { data, error } = await supabase
  .from('products')
  .update({ name })
  .eq('id', id)    // ⚠️ 빠뜨리면 모든 행이 바뀜
  .select();       // 수정된 행을 돌려받아 성공 여부 확인
```

- 수정 권한(RLS)이 없으면 에러 없이 빈 배열이 돌아올 수 있으므로 `data.length === 0`도 실패로 처리합니다.
- 가져온 상품 이름을 `useEffect`로 입력창 state(`name`)에 넣어 제어 컴포넌트로 수정합니다.
- 파일: `src/pages/ProductDetail.tsx`

## 11. 상품 등록 (CreateProduct)

1. 로그인 여부와 필수 입력값(상품명, 가격, 이미지)을 검사합니다.
2. 가격·할인율은 정규식 `/^\d*$/`로 **숫자만** 입력받습니다.
3. 이미지를 `product-images` 버킷에 `{userId}_{Date.now()}.{확장자}`로 업로드합니다.
4. `getPublicUrl()`로 이미지 주소를 만듭니다.
5. `insert()`로 `products` 테이블에 새 행을 추가합니다.
6. 성공하면 상품 목록으로 이동합니다.

```ts
await supabase.storage.from('product-images').upload(filePath, imageFile, { upsert: true });
const imageUrl = supabase.storage.from('product-images').getPublicUrl(filePath).data.publicUrl;

await supabase.from('products').insert({
  name, description, price: Number(price), sale: Number(sale), image_url: imageUrl, email: user.email,
});
```

- 입력값은 문자열이므로 저장할 때 `Number()`로 바꿉니다.
- 파일: `src/pages/CreateProduct.tsx`

## 12. GSAP 애니메이션

`useGSAP` 훅으로 상품 목록이 바뀔 때 카드가 아래에서 위로 차례대로 나타나게 합니다.

```tsx
useGSAP(() => {
  gsap.fromTo('li', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 });
}, { dependencies: [products, isAuth], scope: UL, revertOnUpdate: true });
```

- `scope`: ref로 지정한 영역 안의 요소만 선택합니다.
- cleanup은 `useGSAP`이 자동으로 처리합니다.

## 13. CSS Modules

`*.module.css` 파일의 클래스 이름은 빌드할 때 고유한 이름으로 바뀌어서 컴포넌트끼리 스타일이 충돌하지 않습니다.

```tsx
import S from './Header.module.css';
<header className={S.header}>
```

## 14. 핵심 정리

| 기능 | Supabase API |
| --- | --- |
| 회원가입 | `supabase.auth.signUp()` |
| 로그인 | `supabase.auth.signInWithPassword()` |
| 현재 사용자 | `supabase.auth.getUser()` |
| 인증 상태 감지 | `supabase.auth.onAuthStateChange()` |
| 로그아웃 | `supabase.auth.signOut()` |
| 전체 조회 | `from('products').select('*')` |
| 한 개 조회 | `from('products').select('*').eq('id', id).single()` |
| 추가 | `from('products').insert({ ... })` |
| 수정 | `from('products').update({ ... }).eq('id', id)` |
| 파일 업로드 | `storage.from('버킷').upload()` |
| 파일 목록 / 주소 | `storage.from('버킷').list()` / `getPublicUrl()` |

- 인증 상태는 **Context + 커스텀 훅(useAuth)** 으로 공유하고, `onAuthStateChange`로 변화를 구독합니다.
- 서버 요청은 **useEffect + cleanup(ignore 플래그, unsubscribe)** 으로 처리합니다.
- SPA 이동은 `history.pushState()` + `setHistoryRoute()`로 새로고침 없이 처리합니다.
- 동적 경로(`:id`)는 정규식으로 매칭하고 `useParams()`로 값을 꺼냅니다.
- `update`, `delete`에는 반드시 `eq()` 같은 조건을 붙입니다.

## 15. 실행 방법

1. 프로젝트 루트에 `.env` 파일을 만들고 Supabase 값을 입력합니다. (`.env`는 git에 올리지 않습니다.)

   ```sh
   VITE_SUPABASE_URL=https://<프로젝트-ref>.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
   ```

2. Supabase에 다음이 준비되어 있어야 합니다.
   - `products` 테이블
   - `avatars`, `product-images` 스토리지 버킷
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

- 파일 이름 끝에 `_강사님`, `_내용주석`, `_11월 26일`, ` copy`가 붙은 파일은 비교용 버전입니다.
