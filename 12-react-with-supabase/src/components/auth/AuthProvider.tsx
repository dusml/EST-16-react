import supabase from "@/supabase/supabase";
import { createContext, useContext, useEffect, useState } from "react";

// 로그인한 사용자의 데이터 구조를 정의한다.
interface User {
  id: string;
  email: string;
  nickname: string
}

// Context에서 공유할 인증 정보의 타입을 정의한다.
/*
  [추가 정리 - AuthContextType]

  Context를 통해 공유할 인증 정보의 구조를 정의한다.

  User | null : 유니온 타입으로,
  사용자 객체 또는 null을 허용한다.

  user : 현재 로그인한 사용자 정보
  isAuth : 현재 로그인 여부(true 또는 false)

  interface는 타입을 정의하는 것이므로 실제 값을 저장하거나 로그인 여부를 계산하지 않는다.

  <async 함수는 항상 Promise를 반환한다.>

  return 값이 숫자라면 Promise<number>, return 값이 문자열이라면 Promise<string>, 별도의 반환값이 없다면 Promise<void>가 된다.

*/
interface AuthContextType {
  user: User | null; // 사용자 정보 또는 null
  isAuth: boolean;  // 로그인 여부
  logout: () => Promise<void>;
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

    const {data} = supabase.auth.onAuthStateChange((event, session)=>{
      // 비슷한게 api 레디뭐기시?? 
      // 이벤트가 상태를 반환해..

      // console.log(event, session);
    
      if (event === 'SIGNED_IN' && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          nickname: session.user.user_metadata.nickname 
            ?? session.user.email!.split('@')[0]
        })
      }
      else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    })

    /*
      [추가 정리 - 클린업 함수와 구독 해제]

      onAuthStateChange()를 사용하면 Supabase의 인증 상태를
      지속적으로 감시할 수 있다. 이를 구독(Subscription)이라고 한다.

      컴포넌트가 언마운트되면 더 이상 감시할 필요가 없으므로
      unsubscribe()를 사용하여 구독을 해제한다.

      useEffect에서 반환하는 함수를 클린업 함수라고 한다.
      불필요한 구독이나 중복 이벤트 실행을 방지하기 위해 사용한다.
    */

    return () => data.subscription.unsubscribe();

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
      async function logout(){
        await supabase.auth.signOut();
        setUser(null);
}

  return (
    <AuthContext value={{user, isAuth:!!user, logout}}>
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

// 상태가 바뀌면 리엑트에게 알려주는 기능 수파베이스로 구독을 넣을 것이다. 

/*
  [추가 정리 - 인증 상태 변경 감지]

  onAuthStateChange()는 사용자의 로그인, 로그아웃 등
  인증 상태의 변화를 감지하는 Supabase 메서드이다.

  인증 이벤트가 발생하면 등록된 콜백 함수가 실행된다.

  event : 어떤 인증 이벤트가 발생했는지 알려준다.
  session : 현재 사용자의 로그인 및 인증 정보를 담고 있다.

  로그아웃하면 session은 null이 된다.

  Session이라는 용어는 Supabase뿐만 아니라
  다양한 인증 관련 라이브러리에서도 사용된다.

  이벤트 리스너처럼 특정 이벤트가 발생했을 때
  콜백 함수가 실행되는 방식이다.
*/


// 뭘 했으먄 클립업을 해주는게 졸다. 꼭 해야 할것
