
import reactImagePath from '@/assets/react.svg';
import viteImagePath from '@/assets/vite.svg';
import nextImagePath from '@/assets/next-js.svg';
import kakaoImagePath from '@/assets/kakao-talk.svg';
import isTrueOrFalse from '../utils/isTrueOrFalse';
import type { PropsWithChildren } from 'react';

interface Props {
  imageType: string;
  // children?:React.ReactNode //가장 많이 사용 유하게 받아 주기 때문이다. 그리고  PropsWithChildren<Props>게 사용하는 것이랑 같다. 이 앞에는 제너럴 방식이다. 
  children?:React.ReactElement
  // 이걸로 하면 태그만 가능하다, 널이나 문자 숫자는 안된다.
}

function ConditionalRendering({ imageType }: PropsWithChildren<Props>) {
  // console.log(imageType);
  
  let imagePath = '';
  let printText;

  switch (imageType.toLowerCase()) {
    case 'react':
      imagePath = reactImagePath;
      printText = 'React';
      break;

    case 'vite':
      imagePath = viteImagePath;
      printText = 'vite';
      break;

    case 'next.js':
      imagePath = nextImagePath;
      printText = 'next.js';
      break;

    case 'kakao talk':
      imagePath = kakaoImagePath;
      printText = 'kakao talk';
      break;

    default:
      printText = '허용된 이미지 타입이 존재하지 않습니다.';
  }

  const isShowSpinner = isTrueOrFalse();

  const spinnerOnVite =
  isShowSpinner ?
    (<img className='spinner' src="/icons/spinner.svg" alt="로딩 중..." />) :
    (<img src="/vite.svg" alt="vite logo" />)

  return (
    <>
      <dt>
        조건부 렌더링(ConditionalRendering) ({isShowSpinner && '스피너 표시'}) {`이 데이터는 ${false}입니다.`}
          <hr />
        React - 이 데이터는 {null} 입니다.
        {/* flase한 값은 내보내 주지 않는다. ${false}것은 화면에 나오지만 {false}은 안나온다. 널도 마찬가지고 안나온다. 언디퐈인드 도 마찬가지 이다.*/}
        <hr />
        JS - {`이 데이터는 ${null} 입니다.`}
        
        {/* {isShowSpinner ? <img className='spinner' src="/icons/spinner.svg" alt="로딩 중..." /> : <img src="/vite.svg" alt="vite logo" />} */}
        {/* <img className='spinner' src="/icons/spinner.svg" alt="로딩중" /> */}
      </dt>
      <dd>
        <p>이미지 타입(image type)에 따라 렌더링 여부를 결정합니다.</p>
        <div className="conditionalRendering">
          {
            imagePath && <img src={imagePath} alt="" />
          }
          <p>{printText}</p>
        </div>
      </dd>
      <dd style={{marginTop:12}}>
        <p>spinner 또는 vite 이미지가 랜덤으로 화면에 렌더링 되도록 합니다.</p>
        <div className="conditionalRendering">{spinnerOnVite}</div>
      </dd>
    </>
  );
}

export default ConditionalRendering;