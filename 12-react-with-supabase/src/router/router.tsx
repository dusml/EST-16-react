import CreateProduct from "@/pages/CreateProduct";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Product from "@/pages/Product";
import ProductDetail from "@/pages/ProductDetail";
import Register from "@/pages/Register";



export const routes = [
  {
    title:'메인',
    path:'/',
    element: <Home />
  },
  {
    title: '상품등록',
    path: '/Create',
    element: <CreateProduct />
  },
  {
    title: '상품상세',
    path: '/Product/:id',// 동적 라우팅 dynamic routing :id로 작성 되어 있는 부분
    element: <ProductDetail />
  },
  {
    title:'상품목록',
    path:'/Product',
    element: <Product />
  },
  {
    title:'고객지원',
    path:'/Contact',
    element: <div>CONTACT</div>
  },
  {
    title:'로그인',
    path:'/Login',
    element: <Login />
  },
  {
    title:'회원가입',
    path:'/Register',
    element: <Register />
  },

]


/*
 * 페이지 정의 (라우팅 정보)
 *
 * URL 경로에 따라 어떤 페이지를 보여줄지 정의한다.
 * 각각의 페이지 정보를 객체로 만들고,
 * 여러 페이지 정보를 routes라는 배열에 담아 관리한다.
 *
 * title   : 메뉴에 표시할 이름
 * path    : 페이지의 URL 경로
 * element : 해당 경로에서 보여줄 React 요소
 *
 * 배열로 관리하면 map()을 활용하여 메뉴를 생성하거나
 * 라우팅 처리에 필요한 정보로 활용할 수 있다.
 *
 * 현재는 페이지 정보를 정의한 단계이며,
 * 이 배열을 만드는 것만으로 라우팅이 실행되지는 않는다.
 */