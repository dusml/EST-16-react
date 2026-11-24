import type { Ref } from "react";

interface Props {
  placeholder: string;
  ref?:Ref<HTMLInputElement>
}

function Child({placeholder, ref}:Props) {
  return (
    <input ref={ref} placeholder={placeholder} type="text" />
  )
}
export default Child



// React 18 방식
/* const Child = forwardRef<HTMLInputElement, Props>(({ placeholder }, ref) => {
  return <input ref={ref} type="text" placeholder={placeholder} />
});
 */