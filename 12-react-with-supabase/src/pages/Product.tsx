import { useRef } from 'react';
import S from './Product.module.css'
import gsap from 'gsap'
// import supabase from '@/supabase/supabase'
import useProducts from '@/hook/useProducts';
import { useGSAP } from '@gsap/react';

function Product() {


  // supabase.from('products').select('*').then(console.log);
  const {products, loading} = useProducts();

  console.log(products, loading);
  

  const UL = useRef<HTMLUListElement>(null);

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
    gsap.fromTo('li', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1
    })
  }, {dependencies: [products], scope: UL, revertOnUpdate: true});

  if(loading) return <p>로딩중....❤️</p>

  return (
    <div className={S.container}>
      <ul ref={UL}>
        {
          products &&
          products.map((item) => (
            <li key={item.id}>
              <a href="/">
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