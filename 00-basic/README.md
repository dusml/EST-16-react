# React와 DOM 기초

실제 DOM과 React 요소의 차이를 비교하고 가상 요소 생성기와 렌더러를 직접 구현합니다.

## 주요 파일

- `src/main.js`: React 인사말 렌더링
- `src/VartualvsActual.js`: 실제 DOM과 직접 구현한 가상 DOM 비교
- `src/lib/virtual/`: 가상 요소 생성과 검사
- `src/lib/virtual-dom/`: 가상 요소를 실제 DOM으로 렌더링

## 실행 방법

Node.js와 npm이 필요합니다. 저장소 루트에서 실행합니다.

```sh
cd 00-basic
npm install
npm run dev
```

http://localhost:3000 에 접속합니다. React를 CDN에서 불러오므로 인터넷 연결이 필요합니다. 같은 포트를 사용하는 다른 실습 서버는 먼저 종료합니다.

## 실습 방법

기본 진입점은 `src/main.js`입니다. 직접 구현한 렌더러를 확인하려면 `index.html`의 모듈 경로를 `src/VartualvsActual.js`로 바꾸고 실습 후 복원합니다. 직접 구현한 렌더러에는 변경 전후 트리 비교 기능이 없습니다.

## 명령어

`npm run dev`로 개발 서버를 실행합니다. `npm test`는 테스트 미구현 안내와 함께 실패하도록 설정되어 있으므로 실행 결과는 브라우저에서 확인합니다.
