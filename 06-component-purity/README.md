# 컴포넌트 순수성

순수 함수와 부수 효과를 구분하고 렌더링 중 외부 값을 변경했을 때의 문제를 관찰합니다.

## 주요 파일

- `src/main.tsx`: StrictMode 안에서 Headline 렌더링
- `src/components/Headline.tsx`: 외부 카운터를 변경하는 비순수 컴포넌트
- `src/learn/about-purity.ts`: 순수 함수와 부수 효과 예제
- `src/pages/AvatarList.tsx`: 아바타 목록

## 실행 방법

Node.js와 npm이 필요합니다. 저장소 루트에서 실행합니다.

```sh
cd 06-component-purity
npm install
npm run dev
```

터미널에 표시된 Vite 개발 서버 주소에 접속합니다.

## 실습 방법

기본 화면의 Headline과 Console의 카운터를 비교합니다. 개발 환경의 StrictMode는 렌더링 함수를 추가 호출하여 순수성 문제를 발견하는 데 도움을 줍니다. 외부 count 증가는 문제 관찰용 예제입니다. 순수 함수는 동일 입력에 동일 출력을 반환하고 외부 상태를 변경하지 않습니다.

`about-purity.ts`는 현재 진입점에서 불러오지 않습니다. 이 모듈을 실행하면 파일 끝의 `fetchUserInfo('10')`도 실행되어 네트워크 요청이 발생합니다.

## 명령어

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사와 배포 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리 보기 |

`preview` 전에 `build`를 실행합니다.
