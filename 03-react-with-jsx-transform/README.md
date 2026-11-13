# JSX 변환

아바타 UI를 JSX와 변환된 JavaScript로 비교하며 JSX 변환 과정을 학습합니다.

## 주요 파일

- `src/main.tsx`: TypeScript와 JSX 아바타 목록
- `src/main.js`: 브라우저에서 실행하는 JavaScript
- `src/main.babel.js`: Babel 변환용 JSX 예제
- `tsconfig.json`: react-jsx 변환 설정
- `index.html`: 모듈 진입점과 JSX 런타임 import map

## 실행 방법

Node.js와 npm이 필요합니다. 저장소 루트에서 실행합니다.

```sh
cd 03-react-with-jsx-transform
npm install
npm run dev
```

http://localhost:3000 에 접속합니다. React를 CDN에서 불러오므로 인터넷 연결이 필요합니다. 같은 포트를 사용하는 다른 실습 서버는 먼저 종료합니다.

## 실습 방법

현재 `index.html`은 `src/main.js`를 실행합니다. `src/main.tsx` 수정 사항을 반영하려면 별도 터미널에서 `npx tsc --watch`를 실행합니다. JavaScript는 같은 폴더에 출력됩니다. Babel 실험용 스크립트는 `index.html`에 주석으로 남아 있으며 비교할 때는 한 가지 진입점만 활성화합니다.

## 명령어

`npm run dev`로 개발 서버를 실행합니다. `npm test`는 테스트 미구현 안내와 함께 실패하도록 설정되어 있으므로 실행 결과는 브라우저에서 확인합니다.
