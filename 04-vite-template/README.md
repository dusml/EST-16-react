# 04. Vite 템플릿

> React + TypeScript 프로젝트를 Vite로 직접 구성하고, 이후 실습에서 사용할 사용자 정의 템플릿을 만듭니다.

## 목차

1. [Vite란?](#1-vite란)
2. [프로젝트 구성 파일](#2-프로젝트-구성-파일)
3. [경로 별칭 (@)](#3-경로-별칭-)
4. [TypeScript로 props 타입 지정하기](#4-typescript로-props-타입-지정하기)
5. [환경 변수 (import.meta.env)](#5-환경-변수-importmetaenv)
6. [핵심 정리](#6-핵심-정리)
7. [실행 방법](#7-실행-방법)

---

## 1. Vite란?

빠른 개발 서버와 빌드 도구입니다. 03에서 직접 했던 JSX·TypeScript 변환을 **자동으로 처리**하고, 저장하면 화면이 바로 갱신(HMR)됩니다.

## 2. 프로젝트 구성 파일

| 파일 | 역할 |
| --- | --- |
| `package.json` | 의존성과 명령어(`dev`, `build`, `lint`, `preview`) |
| `vite.config.ts` | Vite 설정 (React 플러그인, 경로 별칭) |
| `tsconfig.json` | TypeScript 설정 (`jsx: react-jsx`, `strict`, `noEmit`) |
| `eslint.config.js` | 코드 검사 규칙 |
| `index.html` | 앱의 진입 HTML (`#root`) |
| `src/main.tsx` | React 루트 생성 및 렌더링 |

## 3. 경로 별칭 (@)

긴 상대 경로(`../../`) 대신 `@`로 `src` 폴더를 가리킵니다. Vite와 TypeScript 양쪽에 설정해야 합니다.

```ts
// vite.config.ts
resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }
```

```json
// tsconfig.json
"paths": { "@/*": ["./src/*"] }
```

## 4. TypeScript로 props 타입 지정하기

```tsx
type AvatarProps = {
  name: string;
  status: 'online' | 'offline' | 'away' | 'disturb'; // 유니온 타입
  size?: number;                                     // 선택 속성
};

export function Avatar({ name, status, size = 64 }: AvatarProps): JSX.Element { /* ... */ }
```

- 잘못된 값을 넘기면 실행 전에 에디터에서 오류를 알려줍니다.
- 파일: `vite-custom-template/src/components/Avatar.tsx`

## 5. 환경 변수 (import.meta.env)

`.env` 파일에 `VITE_`로 시작하는 변수를 넣으면 코드에서 `import.meta.env`로 읽을 수 있습니다.

```ts
console.log(import.meta.env.VITE_USER_NAME);
```

- `VITE_` 변수는 브라우저에 그대로 노출되므로 **공개해도 되는 값만** 넣습니다.
- `.env` 파일은 `.gitignore`로 저장소에 올리지 않습니다.

## 6. 핵심 정리

- Vite는 JSX/TS 변환, 개발 서버, 빌드를 한 번에 처리합니다.
- `@` 별칭은 `vite.config.ts`와 `tsconfig.json` **두 곳**에 설정합니다.
- props 타입을 지정하면 컴포넌트 사용 실수를 미리 막을 수 있습니다.
- 이 템플릿은 05번 이후 실습의 기본 구조가 됩니다.

## 7. 실행 방법

이 폴더에는 `package.json`이 없으므로 내부 프로젝트에서 실행합니다.

```sh
cd 04-vite-template/vite-custom-template
npm install
npm run dev
```

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사와 배포 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리 보기 (`build` 후 실행) |

세부 구성은 [템플릿 README](./vite-custom-template/README.md)를 참고하세요.
