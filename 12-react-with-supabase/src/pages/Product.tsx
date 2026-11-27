import { useContext, useRef } from 'react';
import S from './Product.module.css'
import gsap from 'gsap'
// import supabase from '@/supabase/supabase'
import useProducts from '@/hook/useProducts';
import { useGSAP } from '@gsap/react';
import { useAuth } from '@/components/auth/AuthProvider';
import { RouterContext } from '@/router/RouterProvider';

function Product() {


  // supabase.from('products').select('*').then(console.log);
  const {products, loading} = useProducts();

  const { isAuth } = useAuth();
  // console.log(isAuth);
  

  // console.log(products, loading);
  

  const UL = useRef<HTMLUListElement>(null);

const {setHistoryRoute} = useContext(RouterContext)!;

  /* useEffect(()=>{
    if(!UL.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(UL.current!.children,{
        y:30,
        opacity:0
      },{
        y:0,
        opacity:1,
        stagger:0.1
      })
    });

    return () => ctx.revert();
  }, [products]) */

  useGSAP(() => {

    if (!UL.current || !UL.current.children) return;

    gsap.fromTo('li', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1
    })
  }, {dependencies: [products, isAuth], scope: UL, revertOnUpdate: true});


  const handleRouter = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    history.pushState(null, '', `/Product/${id}`)
    setHistoryRoute(`/Product/${id}`)
  }

  const handleCreate = () => {
    history.pushState(null, '', '/Create');
    setHistoryRoute('/Create');
  }

  if(loading) return <p className={S.loading}>로딩중....❤️</p>
  // 로그링 되지 않으면..? 프로텍트라우팅..?? 이게 유스어스랑..?? 서비스 만들때 하나 만들어 두면 편하다.. 
  if (!isAuth) {
  return (
    <div className={S.invalid}>
      <span style={{fontSize:'10rem'}}>⚠️</span>
      <h3>상품 목록은 로그인 후 이용 가능합니다.</h3>
      <a href="">설마? 아직도 효블리 회원이 아니세요??????</a>
    </div>
  )
}

  return (
    <div className={S.container}>
      <div className={S.toolbar} >
        <button className={S.createButton} type="button" onClick={handleCreate}>
          + 상품등록
        </button>
      </div>
      <ul ref={UL}>
        {
          products &&
          products.map((item) => (
            <li key={item.id}>
              <a href={`/Product/${item.id}`} onClick={(e)=> handleRouter(e, item.id)}>
                <figure>
                  <img src={item.image_url} alt="" />
                </figure>
                <span className={S.brand}>{item.name}</span>
                <span className={S.description}>{item.description}</span>
                <span className={S.price}>{item.price.toLocaleString()}원</span>
                <div>
                  <span className={S.discount}>{item.sale}%</span>
                  <span className={S.realPrice}>{(item.price - (item.price * item.sale * 0.01)).toLocaleString()}원</span>
                </div>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default Product