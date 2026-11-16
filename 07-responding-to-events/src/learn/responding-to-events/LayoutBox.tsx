
interface Props{
  // onClick:React.MouseEventHandler<HTMLDivElement>
  onClick:(e: React.MouseEvent<HTMLDivElement>)=> void;
  style:React.CSSProperties & { [key:string] : string | number } 
  //확장..??
  title?:string
  name?:string
  children?:React.ReactNode
}

function LayoutBox({onClick, children, ...restProps}:Props) {
  return (
    <div className="box" onClick={onClick} {...restProps}>
      {/* {...restProps} 이렇게 작성을 하면 한번에 할 수있다. 정말 많이 사용 제스크 파라민터.. */}
      {children}
    </div>
  )
}
export default LayoutBox