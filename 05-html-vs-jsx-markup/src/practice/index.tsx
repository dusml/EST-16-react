
import type { JSX } from 'react/jsx-runtime'
import './practice.css'
import './conditionalRendering/OrderCard.css'
import ProfileCard from './dataBinding/profileCard'
import OrderCard from './conditionalRendering/OrderCard'
import { orders } from './conditionalRendering/data'
import PlaylistCard from './renderList/PlayListCard'
import { playlists } from './renderList/data'


function Practice():JSX.Element {
  return (
    <div className='practice'>
      <section>
        <h1>Practice</h1>
        <ProfileCard/>
      </section>
      <section>
        <h1>Conditional Rendering</h1>
        <div className="orderCards">
          <OrderCard order={orders[0]}/>
          <OrderCard order={orders[1]}/>
          <OrderCard order={orders[2]}/>
          <OrderCard order={orders[3]}/>
        </div>
      </section>
      <section>
        <h1>RenderList</h1>
        {/* <div>
          <PlaylistCard playlist={playlists[0]} />
          <PlaylistCard playlist={playlists[1]} />
        </div> */}
        <div className="playListCard">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist ={playlist} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Practice