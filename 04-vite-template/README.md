# Vite 템플릿

React와 TypeScript 실습을 위한 Vite 사용자 정의 템플릿을 보관합니다.

## 주요 파일

- `vite-custom-template/`: 실제 Vite 프로젝트
- `vite-custom-template/src/main.tsx`: 앱 진입점
- `vite-custom-template/src/pages/AvatarPage.tsx`: 아바타 페이지

## 실행 방법

Node.js와 npm이 필요합니다. 저장소 루트에서 실행합니다.

```sh
cd 04-vite-template/vite-custom-template
npm install
npm run dev
```

터미널에 표시된 Vite 개발 서버 주소에 접속합니다.

## 실습 방법

이 폴더에는 package.json이 없으므로 내부 프로젝트에서 명령어를 실행합니다. 세부 구성은 [템플릿 README](./vite-custom-template/README.md)를 참고하세요.

## 명령어

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사와 배포 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리 보기 |

`preview` 전에 `build`를 실행합니다.
