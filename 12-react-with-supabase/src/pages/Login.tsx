import { useContext, useId, useState } from 'react';
import S from './Login.module.css';
import supabase from '@/supabase/supabase';
import Swal from 'sweetalert2';
import { RouterContext } from '@/router/RouterProvider';


function Login() {
  const userId = useId();
  const pwId = useId();
  
  // 1. 상태 설정하기
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const {setHistoryRoute} = useContext(RouterContext)!;

  // 2. 이벤트 바인딩하기 onChange, onSubmit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 3. supabase 통신하기 
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      // console.log(data, error);

      // 에러 처리
      if(error){
        console.log(error);
        setError(error.message);
      }else{
        Swal.fire({
          icon:'success',
          title:'로그인 성공!',
          text: "확인을 누르면 메인 페이지로 이동합니다.",
          showConfirmButton:true,
          iconColor:'#FD98AF',
          confirmButtonColor:'#FD98AF',
        }).then(() => {
          history.pushState(null,'','/');
          // location.reload();
          setHistoryRoute('/')
        });
      }
          
    }
  // 4. redirect 하기 


  return (
    <div className={S.container}>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>로그인</h2>
          <hr />
          <div>
            <label htmlFor={userId}>이메일:</label>
            <input 
              id={userId}
              type="email" 
              name="email"
              required
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={pwId}>비밀번호:</label>
            <input 
              id={pwId}
              type="password" 
              name="password"
              required
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className={S.error} role="alert">
              <span className={S.errorIcon} aria-hidden="true">!</span>
              {error}
            </p>
          )}
          <button type="submit">로그인</button>
          <hr />
          <a href="" onClick={(e)=>{
            e.preventDefault();
            history.pushState(null,'','/Register');
            setHistoryRoute('/Register') // 이걸 안주면 뒤로가기 안됨
          }}>
            아직도 효블리 회원이 아니세요?
          </a>
        </form>
      </div>
    </div>
  )
}
export default Login


/*
  <이벤트 바인딩 및 제어 컴포넌트>

  value : 현재 상태값을 input에 연결한다.
  onChange : 사용자가 입력할 때 실행되는 이벤트이다.
  e.target.value : 사용자가 입력한 값을 가져온다.
  setEmail(), setPw() : 입력한 값으로 상태 변경을 요청한다.
*/


/*
  <Controlled Component - 제어 컴포넌트>

  React의 State로 input의 입력값을 관리하는 방식이다.

  [실행 순서]
  1. 사용자가 input에 값을 입력한다.
  2. onChange 이벤트가 발생한다.
  3. e.target.value로 사용자가 입력한 값을 가져온다.
  4. setEmail()로 상태 변경을 요청한다.
  5. 리렌더링이 발생한다.
  6. 변경된 State가 input의 value에 다시 반영된다.

  value : State와 입력창을 연결한다.
  onChange : 입력값이 변경되면 State를 변경하도록 한다.

  즉, State가 input의 값을 제어하기 때문에
  제어 컴포넌트(Controlled Component)라고 부른다.
*/