# Vite 사용자 정의 템플릿

React, TypeScript, Vite 기반 아바타 페이지를 실습용 시작 프로젝트로 구성합니다.

## 주요 파일

- `src/main.tsx`: React 루트 생성
- `src/pages/AvatarPage.tsx`: 아바타 페이지
- `src/components/Avatar.tsx`: 아바타 컴포넌트
- `src/styles/`: 공통 스타일
- `vite.config.ts`: Vite 설정

## 실행 방법

Node.js와 npm이 필요합니다. 저장소 루트에서 실행합니다.

```sh
cd 04-vite-template/vite-custom-template
npm install
npm run dev
```

터미널에 표시된 Vite 개발 서버 주소에 접속합니다.

## 실습 방법

`src/main.tsx`는 `import.meta.env.VITE_USER_NAME`을 콘솔에 출력합니다. 프로젝트 루트의 `.env.local`에 `VITE_USER_NAME=학습자`를 추가하고 서버를 재시작하면 값을 확인할 수 있습니다. `VITE_` 환경 변수에는 클라이언트에 공개 가능한 값을 사용합니다.

## 명령어

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사와 배포 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리 보기 |

`preview` 전에 `build`를 실행합니다.
