import type { JSX } from "react/jsx-runtime";
import JSX_Markup from "./JSX_Markup";

export function Learn(){

  return (
    <div className="learn">
      <Headline/>
      {/* 이게 컴포넌트 태그 */}
      <hr />
      <JSX_Markup/>
    </div>
  )
}

export default Learn;


function Headline(): JSX.Element {
  const abbr = {
    html: 'Hyper Text Markup Language',
    jsx: {
      abbr: 'Javascript eXtension for ECMAScript',
      title: 'JSX'
    }
  }

  return (
    <h1>
      <abbr title={abbr.html}>HTML</abbr> vs {' '} {/* 띄어쓰기 하는 법!! */}
      {/* 줄임말을 사용할때...? 컴포넌트 태그는 아니다... 구분을 잘 해야 한다. */}
      <abbr title={abbr.jsx.abbr}>{abbr.jsx.title}</abbr> 마크업
    </h1>
  )
}
