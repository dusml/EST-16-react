import { Fragment, type JSX } from 'react';
import type { Playlist, Song } from './data';
import './playListCard.css'

interface Props {
  playlist: Playlist;
}

function PlaylistCard({ playlist }: Props): JSX.Element {
  // console.log(playlist);
  
  const { title, tags, info, songs } = playlist;

  // TODO 1. for...of 문 + push
  

  const tagItems: JSX.Element[] = [];
  //  이 안에는 태그를 집어 넣어주어야 한다.
  for(const tag of tags){
      // console.log(tag);
      tagItems.push(
        <li className='tag' key={tag}>#{tag}</li>
      )
    }
  // console.log(tagItems);
  

  

  // TODO 2. 렌더 함수 만들기
  // 태그만 내보내는 애로 그래서 맵을 지우고.. 구조분해 할당을 하고 타입은 만들어나서 송으로 다입을 넣는다.
  /* template 이 된다. */
  const renderSongItem = ({id, title, artist,isLiked}:Song) =>(
            <li key={id}>
              <span className='songTitle'>{title}</span>
              <span className='artist'>{artist}</span>
              {isLiked && <span aria-label='좋아요'>❤️</span>}
            </li>
        )

/*  function render() {
    return (
      <li key={song.id}>
        <span className="songTitle">{song.title}</span>
        <span className="artist">{song.artist}</span>
        {song.isLiked && <span aria-label="좋아요">❤️</span>}
      </li>
    );
    함수 선언문 방식
  } */
  // TODO 3. filter
  //         songs 중 isLiked 가 true 인 곡만 골라 likedSongs 에 담으세요.
  const likedSongs = songs.filter((song)=>song.isLiked);

  return (
    <article className="playlistCard">
      <h2>{title}</h2>

      {/* TODO 1 에서 만든 tagItems 를 <ul> 안에 넣으세요. */}
      <ul className="tags">
        {/* <li className="tag">#태그</li> */}
        {tagItems}
      </ul>

      {/* TODO 4. Object.entries + map */}
      {/* <dl className="info">
        <dt>키</dt>
        <dd>값</dd>
      </dl> */}
      <dl className="info">
        {
          Object.entries(info).map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))
        }
      </dl>
      
      {/* songs.length 로 곡 수를 출력하세요. */}
      <h3>전체 곡 (songs.length)</h3>
      {/* TODO 2 의 renderSongItem 과 map 을 사용해 전체 곡을 렌더링하세요. */}
      <ol className="songs">
        {/* <li>곡 제목</li> */}
        {/* 대괄호를 하면 리턴을 해야 하기 때문에 소괄호를 그리고 에러가 뜨면 태그 하나를 집어 넣는다. 렌더링에서 콘솔이 안되기 때문에 위에 올라가서 확인 하는 법도 있다.  */}
        {
          // songs.map((song)=> renderSongItem(song))
          songs.map(renderSongItem)
          // 이렇게 줄여서 사용도 가능한데 매개변수가 2갱이면 안됀다.
        }
      </ol>

      <h3>최근 추가 순</h3>
      {/* TODO 5. 전체 곡을 역순으로 렌더링하세요.*/}
      <ol className="songs">
        {/* <li>곡 제목</li> */}
        {
          songs.toReversed().map(renderSongItem)
        }
      </ol>

      <h3>좋아요한 곡 ({likedSongs.length})</h3>
      {/* TODO 6. 빈 목록 처리 리스트 목록 + 조건부 렌더링*/}
      {/* 아무것도 없을 때는 빈 화면이 보이면 안되니까 조건부로 보이게..?? */}
      {/* <ul className="songs">
        <li>곡 제목</li>
      </ul> */}
      {
        likedSongs.length > 0
          ? (<ul className="songs">{likedSongs.map(renderSongItem)}</ul>)
          : (<p className='empty'>좋아요를 누른 곡이 없습니다.</p>)
      }
    </article>
  );
}

export default PlaylistCard;