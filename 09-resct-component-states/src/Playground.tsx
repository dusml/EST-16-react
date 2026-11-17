import ProductPage from "./pages/products/types/ProductPage";
import UserPage from "./users/UserPage";



function Playground() {
  return (
    <div style={styles}>
      {/* <UserPage/> */}
      <ProductPage/>
    </div>
  )
}

export default Playground;

const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20
}