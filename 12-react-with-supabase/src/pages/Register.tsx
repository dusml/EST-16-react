import React, { useId, useState } from 'react';
import S from './Register.module.css';
import supabase from '@/supabase/supabase';
import Swal from 'sweetalert2';

function Register() {

  const emailId = useId();
  const pwId = useId();
  const pwConfirmId = useId();
  const nickId = useId();
  const avatarId = useId();

  // controlled component  state가 value에 연결 + onChange로 state 제어
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  // 유효성 검사
  const handleSubmit = async (e:React.FormEvent<HTMLElement>)=>{
    e.preventDefault();

    setError(null);

    if(password !== passwordConfirm){
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const {
      data:{user},
      error: signUpError} = await supabase.auth.signUp({
      email,
      password,
      options:{
        data: {nickname}
      }
    })

    if(signUpError || !user){
      console.log(signUpError);
      setError(signUpError?.message || '회원가입에 실패했습니다.');
      return;
    }

    console.log(user);

    const userId = user.id;

    if(avatarFile){
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${userId}.${fileExt}`;
      const filePath = `${fileName}`;

      
      const { error : uploadError} = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile,{
        upsert:true, // 덮러쓰기 가능하게

      })

      if(uploadError){
        console.log(uploadError);
        setError('이미지 업로드에 실패했습니다.');
        return;
      }

    }

  Swal.fire({
    icon:'success',
    title:'로그인 성공!',
    text: "확인을 누르면 로그인 페이지로 이동합니다.",
    showConfirmButton:true,
    iconColor:'#fd98af',
    confirmButtonColor:'#fd98af',
  }).then(() => {
    history.pushState(null,'','/Login');
    location.reload();
  });

    // alert('회원가입 완료!');
    // history.pushState(null, '', '/Login');
    // location.reload();

  }
  return (
    <div className={S.container}>
      <form onSubmit={handleSubmit}>
        {/* 접근성 떄문에 from에 서브및으로 작성을 한것이다.. 또한 프로젝트에서는 틀렸을시 포커스 이동..*/}
        <h2>회원가입</h2>
        <hr />
        <div>
          <label htmlFor={emailId}>이메일</label>
          <input
            type="email"
            required
            id={emailId}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={pwId}>비밀번호</label>
          <input
            type="password"
            required
            id={pwId}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={pwConfirmId}>비밀번호 확인</label>
          <input
            type="password"
            required
            id={pwConfirmId}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={nickId}>닉네임</label>
          <input
            type="text"
            required
            id={nickId}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={avatarId}>프로필 이미지</label>
          <input
            type="file"
            accept='image/*'
            id={avatarId}
            onChange={(e)=>{
              // console.log(e.target.files);
              const file = e.target.files?.[0] ?? null;
              setAvatarFile(file);
              // console.log(file);
              if(file){
                const reader = new FileReader();
                // 생성자 함수
                // console.log(reader);
                reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                // 이미지가 문자처럼...?? 
              }
                reader.readAsDataURL(file)
              }else{
                setAvatarPreview(null)
              }
              
            }}
          />
          {
            avatarPreview && (
              <div style={{marginTop: '1rem', textAlign:'center'}}>
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  style={{
                    width:'80px',
                    height:'80px',
                    borderRadius:'50%',
                    objectFit:'cover',
                    border:'1px solid #ccc'
                  }}
                />
              </div>
            )
          }
        </div>
        <button type="submit">가입하기</button>
        {error && (
          <p className={S.error} role="alert">
            <span className={S.errorIcon} aria-hidden="true">!</span>
            {error}
          </p>
        )}
      </form>
    </div>
  )
}

export default Register