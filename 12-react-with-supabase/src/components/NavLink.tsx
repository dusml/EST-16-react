import { RouterContext } from "@/router/RouterProvider";
import { useContext } from "react";
import S from './Layout/Header.module.css'

interface Props {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

function NavLink({to, children, activeClassName = S.active, className}: Props) {

  const { currentPath, setHistoryRoute } = useContext(RouterContext)!;

  const isActive = currentPath === to;

  const classNames = `${isActive ? activeClassName : ''} ${className}`.trim();
  // 삼항 연산자를 사용하여 현재 선택된 메뉴인지 확인한다.
  // isActive가 true이면 activeClassName을 사용한다.
  // isActive가 false이면 빈 문자열('')을 사용한다.
  // 현재 선택된 메뉴에만 활성화 CSS 클래스를 적용하기 위함이다.

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setHistoryRoute(to);
    history.pushState(null, '', to); // SPA의 핵심
  }

  return (
    <a href={to} className={classNames} onClick={handleLink}>{children}</a>
  )
}

export default NavLink