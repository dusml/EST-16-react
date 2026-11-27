import { useState } from 'react';
import S from './CreateProduct.module.css';
import { useRouter } from '@/router/RouterProvider';
import { useAuth } from '@/components/auth/AuthProvider';
import supabase from '@/supabase/supabase';




function CreateProduct() {

  const [name, setName] = useState('')
  const [sale, setSale] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth();
  const { setHistoryRoute } = useRouter();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if(!user){
      setError('로그인 후 사용 가능합니다.');
      return;
    }

    if(!name || !price || !imageFile){
      setError('필수 입력값을 확인해주세요.');
      return;
    }

    // 이미지를 업로드
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    // 여러게 올려야 하는데 이러면 리플레이스를 해줘야 하기 떄문에 
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, imageFile, {
      upsert: true
    })

    if(uploadError){
      setError('이미지 업로드 실패');
      return;
    }

    // 공개 Url 만들기
    const imageUrl = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath).data.publicUrl;

    // console.log(imageUrl);


    // step 3 : 상품 데이터 업로드
    const {error: insertError} = await supabase // 넣기만 하면 되서 데이터는 필요가 없다..
    .from('products') // 업로드 할곳을 생각해보고 여기에 올려야 함르호.. 그다음 인설트
    .insert({
      name,
      description,
      price: Number(price),
      sale: Number(sale),
      image_url: imageUrl,
      email: user.email
    })

    if(insertError){
      console.log(insertError)
      setError('상품 등록 실패:' + insertError.message)
    }else{
      alert('상품 등록 완료!');
      history.pushState(null, '', '/Product');
      setHistoryRoute('/Product');
    }
    
    
    // supabase의 insert 메서드를 사용해 상품 올리기

    // insert안에는 객체가 들어가야함.

    // 우리가 만들고 싶은 객체 name, description, price, sale, imageUrl, email 등등..

    // 근데 잘 안될거임 ㅋ
  



  }
  


  return (
    <div className={S.container}>
      <h2>상품 등록</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>상품명</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
        </div>

        <div>
          <label>설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label>가격</label>
          <input
            value={price}
            onChange={(e) => {
              const value = e.target.value
              if(/^\d*$/.test(value)) setPrice(value); //숫자만 작성이 가든하게
            }}
            type="text"
            required
          />
        </div>

        <div>
          <label>할인율 (%)</label>
          <input
            value={sale}
            onChange={(e) => {
              const value = e.target.value
              if(/^\d*$/.test(value)) setSale(e.target.value)
            }}
            type="text"
          />
        </div>

        <div>
          <label>상품 이미지</label>
          <input
            type="file"
            accept='image/*'
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <button type='submit'>등록하기</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </div>
  )
}
export default CreateProduct


/*
  [추가 정리 - 정규표현식을 활용한 입력값 제한]

  정규표현식은 문자열이 특정 규칙에 맞는지
  검사할 때 사용하는 문법이다.

  /^\d*$/
  ^  : 문자열의 시작
  \d : 숫자(0~9)
  *  : 0번 이상 반복
  $  : 문자열의 끝

  .test(value)는 입력값이 정규표현식의 조건과
  일치하는지 검사하여 true 또는 false를 반환한다.

  숫자 또는 빈 문자열일 때만 setPrice를 실행한다.

  조건에 맞지 않으면 상태를 변경하지 않으므로
  기존 입력값이 유지된다.

  빈 문자열도 허용하여 입력한 숫자를
  모두 삭제할 수 있도록 한다.
*/

/*
  [추가 정리 - 상품 등록 유효성 검사]

  e.preventDefault()
  form 제출 시 발생하는 기본 동작을 방지한다.

  setError(null)
  이전에 발생했던 오류 메시지를 초기화한다.

  if(!user)
  로그인한 사용자가 없다면 오류 메시지를 저장하고
  함수 실행을 종료한다.

  if(!name || !price || !imageFile)
  필수 입력값 중 하나라도 비어 있는지 확인한다.

  필수 조건을 만족하지 못하면 Early Return을 사용하여
  이후 상품 등록 코드가 실행되지 않도록 한다.

  이러한 입력값 확인 과정을 유효성 검사(Validation)라고 한다.
*/

// 403 권한 설정 에러
