import { useState } from 'react';
import S from './CreateProduct.module.css';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from '@/router/RouterProvider';
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

    // step 1 : 이미지 업로드 

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
 
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, imageFile,{
        upsert: true,
      });
 
    if (uploadError) {
      setError("이미지 업로드 실패");
      return;
    }
 
    const imageUrl = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath).data.publicUrl;
 
    console.log(imageUrl);

  }

  return (
    <div className={S.container}>
      <h2>상품 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>상품명</label>
          <input value={name} onChange={(e)=> setName(e.target.value)} type="text" required />
        </div>
        <div>
          <label>설명</label>
          <textarea value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label>가격</label>
          <input value={price} onChange={(e)=> {
            const value = e.target.value
            if(/^\d*$/.test(value)) setPrice(value);
          }} type="text" required />
        </div>
        <div>
          <label>할인율 (%)</label>
          <input value={sale} onChange={(e)=> {
            const value = e.target.value
            if(/^\d*$/.test(value)) setSale(e.target.value)
          }} type="text" />
        </div>
        <div>
          <label>상품 이미지</label>
          <input
            type="file"
            accept='image/*' 
            onChange={(e)=> setImageFile(e.target.files?.[0] ?? null)}
            />
        </div>
        <button type='submit'>등록하기</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </div>
  )
}
export default CreateProduct