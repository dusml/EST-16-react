import { JSX } from "react/jsx-runtime";
import { Avatar } from "@/components/Avatar";
// import { Avatar } from "/src/components/Avatar"; 여기서 나는 오류는 타입스크립트 오류이다, 이거 할려면 컴프그에서.. "paths": {"/src/*":["./src/*"]}이거 추가 하면 에러가 안나게 된다.

export function AvatarPage():JSX.Element {
  
  return (
    <ul className="avatarList">
      <Avatar name="sinzzang" status="offline"/>
      <Avatar name="sinpapa" status="online"/>
      <Avatar name="bongmiseon" status="away"/>
    </ul>
  )
}