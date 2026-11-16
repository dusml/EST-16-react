import LayoutBox from "./LayoutBox"


function EventPropgation() {

  //핸들러를 반환하는 함수 .. 고차 함수..? 

  //함수를 전당해야함 -> 인수를 내가 원하는 인수로 전달하고 싶다..?
  // const returnHandlePrint = (color:string) => {
  //   // console.log(color);
  //   return (e:React.MouseEvent<HTMLDivElement>) => {
  //     console.log(color, e.target);
  //   }
  // }

  const returnHandlePrint = (color:string, e:React.MouseEvent) => {
    // return (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); //이벤트 위임 을 멈춰
    console.log(color, e.target);
    // }
  }

  return (
    <details>
      <summary>
        <b>이벤트 전파 & 기본 동작 차단</b>
      </summary>
      {/* 기존 코드 */}
      {/* <LayoutBox style={styles.cyan} onClick={returnHandlePrint('cyan')} ></LayoutBox> */}

      {/* 최신 코드 */}
      <LayoutBox title='layoutBox' name='레이아웃박스' style={styles.cyan} onClick={(e) => returnHandlePrint('cyan', e)}>
        <LayoutBox style={styles.magenta} onClick={(e) => returnHandlePrint('magenta', e)}>
          <LayoutBox style={styles.yellow} onClick={(e) => returnHandlePrint('yellow', e)}>
            <LayoutBox style={styles.purple} onClick={(e) => returnHandlePrint('purple', e)}></LayoutBox>
          </LayoutBox>
        </LayoutBox>
      </LayoutBox>
      
    </details>
  )
}
export default EventPropgation

const styles = {
  cyan: {
    "--color": "var(--cyan)",
  },
  magenta: {
    "--color": "var(--magenta)",
  },
  yellow: {
    "--color": "var(--yellow)",
  },
  purple: {
    "--color": "var(--purple, #7423f6)",
  },
};