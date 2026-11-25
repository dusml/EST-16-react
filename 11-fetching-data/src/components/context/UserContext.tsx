

import { createContext } from "react";

export interface UserContextType {
  username: string;
  setUsername:(name:string)=> void
}

export const UserContext = createContext<UserContextType | null>(null);



/*
  [추가]
  <Context 파일을 분리한 이유>

  기존에는 App.tsx에서 createContext()를 사용하여
  Context 객체를 직접 생성했다.

  다른 컴포넌트에서도 같은 Context 객체를 사용하기 편하도록
  UserContext.ts 파일로 분리하였다.

  실제 상태는 App.tsx의 useState에서 관리한다.
  이 파일에서는 Context의 타입을 정의하고 Context 객체를 생성한다.
*/