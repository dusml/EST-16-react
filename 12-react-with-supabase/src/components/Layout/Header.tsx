import { routes } from '@/router/router';
import S from './Header.module.css';
import NavLink from '../NavLink';
import { useAuth } from '../auth/AuthProvider';



function Header() {

  // routes

  const { user, isAuth, logOut } = useAuth();
  // console.log(data);
  // console.log(isAuth);
  // console.log(user);

  const hideWhenLoggedIn = ['로그인','회원가입']

  const visibleRoutes = routes.filter(
    ({title})=> !(isAuth && hideWhenLoggedIn.includes(title))
  )

  // 로그아웃 버튼이 필요함  isAuth
  // 그 버튼에 핸들러가 연결 동작
  // supabase의 signOut()
  // useAuth훅 업데이트

  return (
    <header className={S.header}>
      <h1><img width={120} src="/logo_2.png" alt="" /></h1>
      <nav>
        <h2 className="a11y-hidden">메인 메뉴</h2>
        {user && <p className={S.greeting}>{user.nickname}님 반갑습니다 ❤️</p>}
        {/* <ul>
          <li><a href="/">메인</a></li>
          <li><a href="/product">상품목록</a></li>
          <li><a href="/contact">고객지원</a></li>
          <li><a href="/login">로그인</a></li>
          <li><a href="/register">회원가입</a></li>
        </ul> */}
        <ul>
          {
            // routes.map(({path, title})=>( 이걸 아래로 바꾸기
            visibleRoutes.map(({path, title})=>(
              <li key={path}>
                <NavLink
                  to={path}
                  className='logo'
                >{title}</NavLink>
              </li>
            ))
          }
          {/* 여기에 로그아웃 버튼 추가하기 */}
          {
            isAuth && (
              <li>
                <a href="#"
                  className={S.logout}
                  onClick={(e)=>{
                    e.preventDefault();
                    if(confirm('너... 진짜 떠날꺼야? 넌 예쁘지 않아 죄를 지었어')){
                      logOut();
                    }
                  }}
                >
                  로그아웃
                </a>
              </li>
            )
          }
        </ul>
      </nav>
    </header>
    
  )
}
export default Header

// routes 배열에 정의된 페이지 정보를 활용하여 메뉴를 생성한다.
// 메뉴를 하나씩 직접 작성하지 않고 배열 메서드를 사용하여
// path는 이동 경로로, title은 메뉴 이름으로 사용한다.


// routes 배열을 map()으로 순회한다.

// [map()이란?]
// 배열의 요소를 하나씩 꺼내서 원하는 형태로 변환하고
// 그 결과를 새로운 배열로 반환하는 JavaScript 배열 메서드이다.
// 기존 배열 자체를 변경하지 않는다.

// [왜 map()을 사용하는가?]
// routes 배열에는 여러 개의 페이지 정보가 객체로 들어 있다.
// 각각의 객체를 li 태그로 변환하여 화면에 보여줘야 하기 때문에
// map()을 사용한다.

// 구조 분해 할당을 사용하여 각 객체의 path와 title을 꺼낸다.
// path는 이동할 URL 경로로 사용한다.
// title은 메뉴에 표시할 이름으로 사용한다.
// key는 React가 각각의 메뉴 항목을 구별하기 위해 사용한다.

// 페이지 정보를 한 곳에서 관리하여 메뉴를 동적으로 생성할 수 있다.

// [기억하기]
// 배열에 들어 있는 데이터를 반복해서 화면에 보여줘야 할 때
// map()을 떠올리자!
// 예) 상품 목록, 게시글 목록, 메뉴 목록, 회원 목록 등


/*
 * SPA (Single Page Application)
 * 단일 페이지 애플리케이션
 *
 * 하나의 HTML 문서를 기반으로 동작하는 방식이다.
 * 페이지 전체를 새로 불러오지 않고
 * 필요한 컴포넌트를 변경하여 화면을 전환할 수 있다.
 *
 * 이때 URL 경로에 따라 어떤 컴포넌트를 보여줄지
 * 결정하는 처리를 라우팅(Routing)이라고 한다.
 *
 * [현재 수업 진행 순서]
 *
 * 1. 각각의 페이지 컴포넌트를 만든다.
 * 2. routes 배열에 title, path, element를 정의한다.
 * 3. RouterProvider에 Header와 routes를 전달한다.
 * 4. Header에서 routes 배열을 map()으로 순회한다.
 * 5. path와 title을 활용하여 메뉴를 동적으로 생성한다.
 *
 * 단, 일반 a 태그를 사용하는 것만으로는
 * 페이지 새로고침 없는 화면 전환이 이루어지지 않는다.
 * 이를 위해 별도의 클라이언트 사이드 라우팅 처리가 필요하다.
 */


/*
 * CSS 클래스 이름 조합하기
 *
 * 기존에는 컴포넌트 내부에 CSS 클래스 이름이 고정되어 있었다.
 *
 * className을 Props로 전달받도록 변경하여
 * 외부에서도 원하는 클래스 이름을 직접 지정할 수 있게 한다.
 *
 * activeClassName : 현재 선택된 메뉴에만 적용할 클래스
 * className : 외부에서 직접 전달하여 적용할 클래스
 *
 * 두 클래스 이름을 템플릿 리터럴을 사용하여 조합한다.
 * trim()을 사용하여 문자열 앞뒤의 공백을 제거한다.
 *
 * 이렇게 하면 같은 컴포넌트를 사용하더라도
 * 사용하는 위치에 따라 다른 CSS를 적용할 수 있다.
 * 컴포넌트의 유연성과 재사용성을 높이기 위한 방법이다.
 */