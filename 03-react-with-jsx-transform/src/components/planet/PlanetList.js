import React, {createElement as h} from '/src/lib/react.js';



// planetList
export class PlanetList extends React.Component {
  render(){
    const {lang, children} = this.props;

    return h(
      'ul',
      {className:'planet', lang},
      children
    )
  }
}