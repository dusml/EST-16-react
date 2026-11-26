import supabase from "@/supabase/supabase";
import { createContext, useContext, useEffect, useState } from "react";

// 로그인한 사용자의 데이터 구조를 정의한다.
interface User {
  id: string;
  email: string;
  nickname: string
}

// Context에서 공유할 인증 정보의 타입을 정의한다.
interface AuthContextType {
  user: User | null; // 사용자 정보 또는 null
  isAuth: boolean;  // 로그인 여부
  logOut: () => Promise<void>;
}

// 사용자 인증 정보를 공유하기 위한 Context를 생성한다.
// Provider에서 값을 제공받지 못했을 때의 기본값은 null이다.
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}:{children:React.ReactNode}){

  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    supabase.auth.getUser().then(({data:{user}})=>{
      if(user){
        setUser({ id:user.id, email: user.email!, nickname: user.user_metadata.nickname ?? user.email!.split('@')[0] })
      }
    })
  },[])

  /*
    value를 통해 하위 컴포넌트에 인증 정보를 공유한다.

    user : 현재 사용자 정보
    isAuth : 로그인 여부

    !!user : 사용자 정보의 존재 여부를 boolean으로 변환한다.
    사용자 정보가 있으면 true, 없으면 false가 된다.

    별도의 isAuth 상태를 만들지 않고
    user 상태를 기반으로 로그인 여부를 계산한다.
  */

    // 로그아웃 함수 만들기,
    // signOut넣기
    // value에 담아서 내보내기
      async function logOut(){
        await supabase.auth.signOut();
        setUser(null);
}

  return (
    <AuthContext value={{user, isAuth:!!user, logOut}}>
      {children}
    </AuthContext>
  )
}

// 훅

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(){
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error('useAuth는 AuthProvider 안에서 사용해야 합니다.');
  return ctx;
}
