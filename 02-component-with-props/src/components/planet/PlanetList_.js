import React, {createElement as h} from '/src/lib/react.js';



// planetList
export function PlanetList_ ({lang, children}) {
    // const {lang, children} = this.props; this는 전역 변수로 들어간다.

    return h(
      'ul',
      {className:'planet', lang},
      children
    )
}