import NavContents from "./NavContents"
// import View, { HTMLCode } from "./View"
import View from "./View"


function Learn() {
  return (
    <div className="Learn">
      <NavContents/>
      <View/>
      {/* <HTMLCode/> */}
      <View.HTMLCode/>
      <View.RespondingToEvents/>
    </div>
  )
}
export default Learn


{/* HTMLCode 컴포넌트를 직접 사용하는 방식 */}
{/* <HTMLCode/> */}

{/* View에 연결된 HTMLCode 컴포넌트 사용 */}
<View.HTMLCode/>

{/* View에 연결된 이벤트 컴포넌트 사용 */}
<View.RespondingToEvents/>