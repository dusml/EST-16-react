# HTML과 JSX 마크업

JSX 문법과 속성, 데이터 바인딩, 조건부 렌더링, 목록 렌더링을 학습합니다.

## 주요 파일

- `src/main.tsx`: Learn과 Practice 화면 선택
- `src/learn/`: JSX·속성·렌더링 가능한 값·조건·목록 예제
- `src/practice/dataBinding/`: 프로필 카드
- `src/practice/conditionalRendering/`: 주문 상태 카드
- `src/practice/renderList/`: 플레이리스트 카드
- `src/data/`: 학습 데이터

## 실행 방법

Node.js와 npm이 필요합니다. 저장소 루트에서 실행합니다.

```sh
cd 05-html-vs-jsx-markup
npm install
npm run dev
```

터미널에 표시된 Vite 개발 서버 주소에 접속합니다.

## 실습 방법

기본 화면은 `<Learn />`입니다. 카드 실습은 `src/main.tsx`에서 `<Learn />`을 주석 처리하고 `<Practice />`를 활성화해 확인합니다. 학습 화면 구성은 `src/learn/index.tsx`에서 확인하세요. `className`, 중괄호 표현식, 조건식, `map()`과 `key`를 비교해 봅니다.

## 명령어

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | TypeScript 검사와 배포 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 미리 보기 |

`preview` 전에 `build`를 실행합니다.
