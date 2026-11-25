import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import S from './Home.module.css';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

function Home() {

  const textRef = useRef<HTMLDivElement>(null);

  // useGSAP: gsap.context + 언마운트 시 revert()를 자동으로 처리해줌
  // unmount 될 때 알아서 revert 해준다, 한 번만 실행, StrictMode에서 1회 실행
  useGSAP(() => {
    gsap.fromTo(textRef.current!.children, {
      y: 50,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.inOut'
    })
  }, { scope: textRef })

  return (
    <div className={S.container}>
      <div ref={textRef}>
        <h2> <strong> 예쁜 건 죄가 아니잖아요? </strong> </h2>
        <span> 하지만 카드값은 유죄입니다. </span>
      </div>
      <img src="/image.png" alt="" />
    </div>
  )

}
export default Home
