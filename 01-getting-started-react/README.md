# React 시작하기

배열 데이터로 React 요소 목록을 만들고 데이터 변경과 화면 갱신의 관계를 학습합니다.

## 주요 파일

- `src/main.js`: Proxy와 행성 목록 렌더링
- `src/1.rendering-react-app.js`: React 앱 렌더링 예제
- `src/lib/`: CDN 기반 React와 React DOM 모듈
- `src/styles/`: 공통 스타일

## 실행 방법

Node.js와 npm이 필요합니다. 저장소 루트에서 실행합니다.

```sh
cd 01-getting-started-react
npm install
npm run dev
```

http://localhost:3000 에 접속합니다. React를 CDN에서 불러오므로 인터넷 연결이 필요합니다. 같은 포트를 사용하는 다른 실습 서버는 먼저 종료합니다.

## 실습 방법

시간이 지나면서 목록에 항목이 추가되는 모습을 확인합니다. `map()`과 `key`, 새 배열을 할당하는 부분을 읽어보세요. 이 예제의 Proxy는 바깥 객체의 속성 할당을 감지하므로 내부 배열에 `push()`만 하는 경우와 결과가 다를 수 있습니다. React state를 구현한 코드는 아닙니다.

## 명령어

`npm run dev`로 개발 서버를 실행합니다. `npm test`는 테스트 미구현 안내와 함께 실패하도록 설정되어 있으므로 실행 결과는 브라우저에서 확인합니다.
