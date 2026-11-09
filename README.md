# EST-16 React 실습

React의 렌더링 원리부터 컴포넌트와 props까지 단계별로 학습하는 실습 저장소입니다. JSX 대신 `React.createElement()`를 사용해 요소를 만들고, 브라우저의 ES Modules로 코드를 실행합니다.

## 실습 구성

| 폴더 | 학습 내용 | 기본 실행 예제 |
| --- | --- | --- |
| [`00-basic`](./00-basic/) | 실제 DOM과 가상 DOM 비교, 간단한 가상 요소 생성 및 렌더러 구현 | 무작위 언어 인사말 렌더링 |
| [`01-getting-started-react`](./01-getting-started-react/) | `createElement`, `createRoot`, 배열 렌더링, `Proxy`를 이용한 데이터 변경 감지 | 1초 간격으로 항목이 추가되는 행성 목록 |
| [`02-component-with-props`](./02-component-with-props/) | 클래스형·함수형 컴포넌트, props와 children, 컴포넌트 조합 | 접속 상태를 표시하는 아바타 목록 |

## 사용 기술

- JavaScript (ES Modules)
- React / React DOM: `src/lib/`에서 esm.sh CDN 모듈을 가져와 사용
- HTML, CSS
- Node.js, npm, live-server

`00-basic`은 React 19.1.0을 지정하고, 나머지 실습은 CDN URL에 React 버전을 고정하지 않습니다.

## 실행 방법

Node.js와 npm이 설치된 환경에서 실행합니다. React 모듈을 CDN에서 불러오므로 인터넷 연결이 필요합니다.

1. 실행할 실습 폴더로 이동합니다.

   ```sh
   cd 02-component-with-props
   ```

2. 해당 폴더의 의존성을 설치합니다.

   ```sh
   npm install
   ```

3. 개발 서버를 실행합니다.

   ```sh
   npm run dev
   ```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

다른 실습도 해당 폴더에서 같은 명령으로 실행할 수 있습니다. 각 실습은 독립적인 `package.json`을 사용하므로 처음 실행할 때 각각 의존성을 설치해야 합니다. 모든 서버가 3000번 포트를 사용하므로 실습을 바꿀 때는 실행 중인 서버를 `Ctrl+C`로 종료합니다.

## 폴더 구조

```text
EST-16-react/
├── 00-basic/
│   └── src/
│       ├── lib/virtual/       # 가상 요소 생성 관련 구현
│       └── lib/virtual-dom/   # 가상 요소를 실제 DOM으로 렌더링
├── 01-getting-started-react/
│   ├── public/               # 행성 이미지와 아이콘
│   └── src/                  # 목록 렌더링 및 데이터 변경 실습
└── 02-component-with-props/
    ├── public/               # 아바타·행성 이미지와 상태 아이콘
    └── src/
        ├── components/       # Avatar, PlanetItem, PlanetList
        ├── pages/            # AvatarPage, PlanetPage, PlanetPage_
        ├── lib/              # React / React DOM 모듈 진입점
        └── styles/           # 공통 및 예제 스타일
```

각 실습의 `index.html`은 `src/main.js`를 불러옵니다. `server.js`는 개발 서버를 설정하고, `public/`의 정적 파일을 루트 경로에 연결합니다.

## 컴포넌트 예제 전환

`02-component-with-props/src/main.js`의 렌더링 호출을 변경하면 다른 예제를 확인할 수 있습니다. 한 번에 하나의 호출을 사용합니다.

```js
reactDomRoot.render(h(AvatarPage));   // 아바타와 접속 상태
// reactDomRoot.render(h(PlanetPage));  // 클래스형 페이지 컴포넌트
// reactDomRoot.render(h(PlanetPage_)); // 함수형 페이지 컴포넌트
```

`Avatar`는 `name`과 `status` props를 받아 이미지와 상태 아이콘을 표시합니다. 상태는 `online`, `offline`, `away`, `disturb`를 사용합니다.

## 복습할 때 읽는 순서

처음에는 실행 결과를 보고, 아래 순서로 코드를 따라가며 화면이 만들어지는 과정을 확인합니다.

1. `index.html`: React가 화면을 표시할 `#app` 요소와 모듈 진입점을 찾습니다.
2. `src/main.js`: 어떤 데이터를 준비하고, 어떤 요소나 컴포넌트를 렌더링하는지 확인합니다.
3. `src/lib/react.js`, `src/lib/react-dom.js`: React와 React DOM을 어디서 가져오는지 확인합니다.
4. `src/pages/`, `src/components/`: 부모가 자식에게 넘기는 props와 반환하는 요소를 따라갑니다.
5. `src/styles/`: 반환한 요소의 `className`이 어떤 스타일과 연결되는지 확인합니다.

복습 전에는 실행 결과를 예상해 보고, 실행 후 예상과 다른 부분을 개발자 도구의 Console과 Elements에서 확인합니다.

## 1. DOM과 React 요소 이해하기 — `00-basic`

### 학습 목표

- 브라우저의 DOM 노드와 화면 구조를 표현하는 JavaScript 객체를 구분합니다.
- 요소 생성과 화면 렌더링이 서로 다른 단계라는 점을 이해합니다.
- 직접 구현한 가상 DOM 예제의 역할과 한계를 설명합니다.

### 실제 DOM 생성

[`VartualvsActual.js`](./00-basic/src/VartualvsActual.js)에서는 브라우저 API로 요소를 만들고 부모와 자식을 연결합니다.

```js
const divElement = document.createElement('div');
const buttonElement = document.createElement('button');
buttonElement.textContent = 'hello';

divElement.append(buttonElement);
document.getElementById('app').append(divElement);
```

`createElement()`로 만든 DOM 노드는 메모리에 존재합니다. 문서에 연결된 `#app`에 추가해야 화면에 나타납니다.

### 가상 요소 생성과 렌더링

[`lib/virtual/createElement.js`](./00-basic/src/lib/virtual/createElement.js)의 함수는 DOM 노드 대신 `type`, `key`, `props` 등을 가진 객체를 반환합니다. `props.children`에는 자식 요소가 들어갑니다.

```js
// 직접 구현한 createElement가 만드는 객체의 구조를 단순화한 예시
{
  type: 'button',
  key: null,
  props: {
    type: 'button',
    children: ['hola~'],
  },
}
```

[`VirtualDomRoot.js`](./00-basic/src/lib/virtual-dom/VirtualDomRoot.js)는 이 객체를 읽어 DOM 요소를 생성합니다. 자식도 같은 방식으로 처리하고, 완성된 노드를 루트 요소에 추가합니다.

```text
가상 요소 객체 생성
→ type에 맞는 DOM 요소 생성
→ 속성 설정
→ 자식 요소를 재귀적으로 변환
→ 루트에 추가
```

이 구현은 원리를 관찰하기 위한 예제입니다. 변경 전후 트리를 비교하는 기능은 없으며, `render()`는 노드를 추가하고 `unmount()`는 루트의 자식을 비웁니다. 실제 React의 전체 렌더링 동작과 구분해서 읽습니다.

### 기본 진입점에서 확인할 내용

[`main.js`](./00-basic/src/main.js)는 직접 구현한 렌더러 대신 React와 React DOM을 사용합니다. `Greeting`의 키 중 하나를 무작위로 선택한 뒤 인사말을 표시합니다.

```js
const root = ReactDOM.createRoot(app);
const element = React.createElement('h1', { title: '인사말' }, '안녕하세요');
root.render(element);
```

- `createElement(type, props, ...children)`: 화면에 표시할 요소를 만듭니다.
- `createRoot(container)`: React가 렌더링을 관리할 루트를 만듭니다.
- `root.render(element)`: 해당 루트에 요소를 렌더링하도록 요청합니다.

여기서 `React.createElement()`와 `document.createElement()`는 반환하는 대상이 다릅니다. 앞의 함수는 React 요소를, 뒤의 함수는 실제 DOM 요소를 만듭니다.

### 직접 해보기

- 인사말을 고정한 후 다시 무작위 선택으로 바꿔 봅니다.
- 제목 아래에 문단을 추가하고 부모·자식 요소가 어떻게 중첩되는지 확인합니다.
- 별도 가상 DOM 예제를 실행하려면 `index.html`의 모듈 진입점을 `src/VartualvsActual.js`로 바꿉니다. 실습 후 `src/main.js`로 복원합니다.
- 직접 구현한 렌더러에서 `render()`를 두 번 호출했을 때 결과를 예상하고 확인합니다.

## 2. 데이터로 목록 만들기 — `01-getting-started-react`

### 학습 목표

- 배열을 React 요소 목록으로 변환합니다.
- 데이터 변경과 렌더링 호출의 관계를 설명합니다.
- 예제에서 사용하는 `Proxy`가 어느 변경을 감지하는지 이해합니다.

### 코드의 실행 흐름

[`main.js`](./01-getting-started-react/src/main.js)를 다음 순서로 읽습니다.

1. `listData.items`를 빈 배열로 초기화합니다.
2. `Proxy`로 `listData`의 속성 읽기와 할당을 가로챕니다.
3. React 루트를 한 번 생성합니다.
4. `render()`에서 `items.map()`으로 각 데이터를 `li` 요소로 바꿉니다.
5. 목록을 `ul`로 감싼 뒤 루트에 렌더링합니다.
6. 타이머가 1초 간격으로 `items`에 새 배열을 할당합니다.
7. Proxy의 `set`이 실행되면서 `render()`를 다시 호출합니다.

처음에는 빈 목록이 표시되고, 약 1초부터 4초까지 차례로 네 항목이 추가됩니다. 화면 갱신은 이 예제에서 명시적으로 호출하는 `render()`를 통해 이루어집니다.

### `map()`과 `key`

```js
const children = listData.items.map(({ id, title }) =>
  createElement('li', { key: id, className: 'item' }, title)
);
```

`map()`은 각 데이터에 대응하는 요소를 반환해 새 배열을 만듭니다. `key`는 형제 요소 사이에서 항목을 식별할 수 있도록 지정합니다. 이 실습에서는 데이터의 `id`를 사용합니다. `key`는 React가 처리하는 특별한 값이므로 일반 props처럼 자식에서 읽는 용도로 사용하지 않습니다.

### 새 배열을 할당하는 이유

```js
reactiveListData.items = [
  ...reactiveListData.items,
  { id: 1, title: 'Life of Earth' },
];
```

스프레드 문법으로 기존 항목을 복사하고 새 항목을 추가한 배열을 만듭니다. 그 배열을 프록시 객체의 `items`에 할당하면 `set`이 실행됩니다.

현재 Proxy는 바깥 객체인 `listData`만 감쌉니다. `reactiveListData.items.push(...)`처럼 내부 배열을 직접 변경하면 이 Proxy의 `items` 할당 처리를 거치지 않아 예제의 `render()`가 자동 호출되지 않습니다. 또한 `listData.items = ...`처럼 원본 객체에 직접 할당해도 Proxy를 거치지 않습니다.

이 코드는 데이터 변경과 렌더링 연결을 관찰하는 실습입니다. React의 state나 Hooks를 구현한 코드는 아닙니다.

### 직접 해보기

- 타이머 시간을 바꿔 화면에 추가되는 순서를 관찰합니다.
- `filter()`로 특정 항목을 제외한 새 배열을 할당해 삭제를 실습합니다.
- `map()`으로 특정 항목의 제목을 바꾼 새 배열을 할당합니다.
- `push()`와 새 배열 할당의 결과를 비교하고, Proxy의 `set` 안에 로그를 넣어 이유를 확인합니다.

## 3. 컴포넌트와 props — `02-component-with-props`

### 학습 목표

- 반복되는 화면을 컴포넌트로 분리합니다.
- 부모가 넘긴 props로 자식의 화면을 구성합니다.
- 클래스형과 함수형 컴포넌트에서 props를 읽는 방법을 비교합니다.
- `children`을 이용해 목록의 틀과 내용을 조합합니다.

### 컴포넌트에 전달하는 값

```js
import { createElement as h } from './lib/react.js';

h(Avatar, { name: 'sinzzang', status: 'online' });
```

`h`는 `createElement`에 붙인 별칭입니다. `h('li', ...)`처럼 문자열을 넘기면 HTML 요소를 만들고, `h(Avatar, ...)`처럼 컴포넌트를 넘기면 해당 컴포넌트의 요소를 만듭니다. 컴포넌트는 전달받은 props를 바탕으로 화면 구조를 반환합니다.

### 클래스형과 함수형 비교

```js
// 클래스형: 인스턴스의 this.props에서 읽기
class PlanetItem extends React.Component {
  render() {
    const { title } = this.props;
    return h('li', null, title);
  }
}

// 함수형: 함수의 매개변수에서 읽기
function PlanetItem_({ title }) {
  return h('li', null, title);
}
```

함수형 컴포넌트는 props를 매개변수로 받으므로 `this.props`가 필요하지 않습니다. props는 부모가 전달한 입력값으로 취급하고, 자식에서 직접 변경하지 않습니다.

비교할 파일은 [`PlanetItem.js`](./02-component-with-props/src/components/planet/PlanetItem.js)와 [`PlanetItem_.js`](./02-component-with-props/src/components/planet/PlanetItem_.js), [`PlanetList.js`](./02-component-with-props/src/components/planet/PlanetList.js)와 [`PlanetList_.js`](./02-component-with-props/src/components/planet/PlanetList_.js)입니다.

현재 `PlanetPage_`는 함수형 페이지이지만 내부에서는 클래스형 `PlanetList`와 `PlanetItem`을 사용합니다. 함수형 목록·항목 예제를 연결하려면 해당 import와 요소 생성에 사용하는 이름도 변경해야 합니다.

### `children`으로 목록 조합하기

행성 예제의 역할은 다음과 같이 나뉩니다.

| 컴포넌트 | 역할 | 사용하는 props |
| --- | --- | --- |
| `PlanetPage` | 데이터를 읽고 목록과 항목을 조합 | 현재 목록 데이터는 `listData`에서 읽음 |
| `PlanetList` | `ul`과 목록 공통 속성 제공 | `lang`, `children` |
| `PlanetItem` | 개별 행성의 이미지·제목·버튼 표시 | `id`, `title` |

`PlanetPage`가 만든 항목 배열은 `PlanetList`의 `children`으로 전달되고, `PlanetList`는 이를 `ul` 안에 배치합니다. 항목을 어떤 데이터로 만드는지와 목록을 어떻게 감싸는지의 역할을 나눠 읽으면 이해하기 쉽습니다.

### 아바타 예제 따라가기

기본 화면은 [`AvatarPage.js`](./02-component-with-props/src/pages/AvatarPage.js)에서 네 개의 `Avatar`를 생성합니다. [`Avatar.js`](./02-component-with-props/src/components/avatar/Avatar.js)는 전달받은 값으로 이미지 경로와 상태 설명을 구성합니다.

| props | 역할 | 현재 구현 |
| --- | --- | --- |
| `name` | 아바타 이미지 파일명과 레이블 구성 | `/avatar/${name}.png` 사용 |
| `status` | 상태 아이콘과 설명 선택 | `switch`로 네 가지 상태 처리 |
| `size` | 크기를 전달하기 위한 매개변수 | 기본값은 `64`이며 아직 스타일에는 적용하지 않음 |

| 상태 값 | 표시하는 설명 |
| --- | --- |
| `online` | 온라인 |
| `offline` | 오프라인 |
| `away` | 자리비움 |
| `disturb` | 방해금지 |

컴포넌트는 이름과 상태를 합쳐 `figure`의 `aria-label`과 `title`에 설정합니다. 내부 이미지의 `alt`는 빈 문자열로 지정되어 있습니다. 화면의 이미지뿐 아니라 어떤 텍스트가 접근성 이름으로 제공되는지도 확인합니다.

### 직접 해보기

- `AvatarPage`에서 `status`를 바꾸고 아이콘·설명이 함께 바뀌는지 확인합니다.
- `public/avatar/`에 있는 다른 이미지의 파일명을 `name`에 넣어 아바타를 추가합니다.
- 아바타 정보를 배열로 분리하고 `map()`으로 렌더링합니다. 각 요소에 고유한 `key`도 지정합니다.
- `size`가 실제 크기에 반영되도록 스타일과 연결합니다.
- 알 수 없는 `status`가 들어왔을 때 사용할 기본 아이콘과 설명을 정합니다. 현재 구현에는 `default` 분기가 없습니다.
- 함수형 `PlanetList_`, `PlanetItem_`을 연결한 뒤 기존 행성 화면과 결과를 비교합니다.

## 복습 체크리스트

코드를 보지 않고 아래 내용을 설명할 수 있는지 확인합니다. 막히는 항목은 해당 실습을 다시 실행하고, 입력값을 하나씩 바꿔 봅니다.

- [ ] React 요소와 실제 DOM 노드의 차이를 설명할 수 있다.
- [ ] `createElement`, `createRoot`, `render`의 역할을 구분할 수 있다.
- [ ] 중첩된 `createElement` 호출이 만드는 HTML 구조를 예상할 수 있다.
- [ ] `map()`으로 배열 데이터를 요소 목록으로 바꿀 수 있다.
- [ ] 목록에 `key`를 지정하는 이유를 설명할 수 있다.
- [ ] 이 예제에서 Proxy의 `set`이 실행되는 시점을 설명할 수 있다.
- [ ] props를 전달하고 구조 분해 할당으로 읽을 수 있다.
- [ ] 클래스형의 `this.props`와 함수형의 매개변수를 비교할 수 있다.
- [ ] `children`으로 부모와 자식 컴포넌트를 조합할 수 있다.
- [ ] 기본값이 선언된 props와 실제 화면에 적용된 props를 구분할 수 있다.

## 실행 중 확인할 문제

| 증상 | 확인할 내용 |
| --- | --- |
| `npm run dev`가 실행되지 않음 | 실습 폴더 안인지, `npm install`을 실행했는지 확인 |
| 3000번 포트를 사용할 수 없음 | 다른 실습 서버를 종료하거나 `server.js`의 `port` 변경 |
| 화면에 아무것도 표시되지 않음 | Console 오류, `#app`, `src/main.js` 경로, 렌더링 호출 확인 |
| React 모듈을 가져오지 못함 | 인터넷 연결과 Network의 esm.sh 요청 확인 |
| 이미지가 보이지 않음 | `public/`의 실제 파일명과 요청 경로 확인. 예: `public/avatar/sinzzang.png` → `/avatar/sinzzang.png` |
| 배열을 변경해도 화면이 그대로임 | `01` 실습에서 Proxy를 통해 새 배열을 할당했는지 확인 |

## 학습 기록 양식

실습을 마친 뒤 아래 양식으로 짧게 기록합니다. 동작을 확인한 예시와 아직 설명하기 어려운 부분을 남겨 두면 다음 복습의 출발점이 됩니다.

```text
학습 날짜:
실습 폴더:
오늘 이해한 개념:
직접 바꿔 본 코드:
예상한 결과 / 실제 결과:
발생한 오류와 해결 방법:
아직 헷갈리는 점:
다음에 확인할 내용:
```

## 참고

- `00-basic/src/VartualvsActual.js`에는 실제 DOM과 직접 구현한 가상 DOM을 비교하는 별도 예제가 있습니다. 기본 진입점에서는 불러오지 않습니다.
- 현재 자동화 테스트는 구성되어 있지 않습니다. `npm test`는 안내 메시지와 함께 실패하도록 설정되어 있습니다.
- 실행 결과는 각 실습의 개발 서버를 켠 뒤 브라우저에서 확인합니다.
