
import { PlanetItem } from '../components/planet/PlanetItem.js';
import { PlanetList } from '../components/planet/PlanetList.js';
import { listData } from '../data.js';
import React, {createElement as h} from '/src/lib/react.js';


// planetpage 부터 만든다 여기가 섹션 아니면 큰 div
export function PlanetPage_ ({ title, lang, children }){

  // const { title, lang, children } = this.props;

  return /* createElement return */ h(
    PlanetList,
    {
      lang:'en',
      children: listData.items.map(({id,title}) => h(PlanetItem,{ key:id, id, title }))
    },
  )
}
//이제 함수로 바꿔서 this로 props를 받는게 아니라 params로 받는거군요