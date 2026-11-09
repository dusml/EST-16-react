
import React, {createElement as h} from './lib/react.js';
import ReactDOM, {createRoot} from './lib/react-dom.js';
import { PlanetPage } from './pages/PlanetPage.js';
import { PlanetPage_ } from './pages/PlanetPage_.js';
import { AvatarPage } from './pages/AvatarPage.js';


/* react class component */


// h(PlanetItem,{id,title})

const container = document.getElementById('app');

if(container){
  const reactDomRoot = ReactDOM.createRoot(container);
  // reactDomRoot.render( h(PlanetPage) )
  // reactDomRoot.render( h(PlanetPage_) )
  reactDomRoot.render( h(AvatarPage) )
}

//페이지는 따로.. 컴포넌트는 컴포넌트로..? 