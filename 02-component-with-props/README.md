# 컴포넌트와 props

클래스형·함수형 컴포넌트를 비교하고 props와 children으로 화면을 조합합니다.

## 주요 파일

- `src/main.js`: 렌더링할 페이지 선택
- `src/pages/`: 아바타·행성 페이지
- `src/components/avatar/`: 이름과 접속 상태를 받는 Avatar
- `src/components/planet/`: 행성 목록과 항목
- `src/data.js`: 목록 데이터

## 실행 방법

Node.js와 npm이 필요합니다. 저장소 루트에서 실행합니다.

```sh
cd 02-component-with-props
npm install
npm run dev
```

http://localhost:3000 에 접속합니다. React를 CDN에서 불러오므로 인터넷 연결이 필요합니다. 같은 포트를 사용하는 다른 실습 서버는 먼저 종료합니다.

## 실습 방법

기본 화면은 `AvatarPage`입니다. `src/main.js`의 렌더링 호출을 바꾸면 행성 목록을 확인할 수 있습니다. 부모가 전달하는 props와 자식이 읽는 값, `children`으로 목록을 조합하는 흐름을 따라가 보세요.

## 명령어

`npm run dev`로 개발 서버를 실행합니다. `npm test`는 테스트 미구현 안내와 함께 실패하도록 설정되어 있으므로 실행 결과는 브라우저에서 확인합니다.
