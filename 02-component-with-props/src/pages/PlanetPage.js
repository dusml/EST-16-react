
import { PlanetItem } from '../components/planet/PlanetItem.js';
import { PlanetList } from '../components/planet/PlanetList.js';
import { listData } from '../data.js';
import React, {createElement as h} from '/src/lib/react.js';


// planetpage 부터 만든다 여기가 섹션 아니면 큰 div
export class PlanetPage extends React.Component {

  render(){

    const { title, lang, children } = this.props;

    return /* createElement return */ h(
      PlanetList,
      {
        lang:'en',
        children: listData.items.map(({id,title}) => h(PlanetItem,{ key:id, id, title }))
      },
    )
  }
}
