
/* props */
import React from "/src/lib/react.js";
import ReactDOM from "/src/lib/react-dom.js";


function Avatar({name, status, size = 64}){
  
  let iconPath = '';
  let statusMessage = '';
  
  switch (status) {
    case 'offline':
      iconPath = '/icons/status-offline.svg';
      statusMessage = '오프라인';
      break;
    case 'online':
      iconPath = '/icons/status-online.svg';
      statusMessage = '온라인'
      break;
    case 'disturb':
      iconPath = '/icons/status-disturb.svg';
      statusMessage = '방해금지'
      break;
    case 'away':
      iconPath = '/icons/status-away.svg';
      statusMessage = '자리비움'
      break;
  }
  
  const label = `${name} (${statusMessage})`
  
  //개행을 하려면 () 소광호가 있어야 한다.
  return (
    <li className="avatar">
      <figure aria-label={label} title = {label}>
        <div className="cover">
          <img src={`/avatar/${name}.png`} alt="{name}"/>
          {/* 문자를 쓸 때는 $ 표시를 한다. */}
        </div>
        <figcaption>
          <img src={iconPath} alt=""/>
        </figcaption>
      </figure>
    </li>
  )


/*  return h(
    'li',
    {className: 'avatar'},
    h(
      'figure',
      {'aria-label':label, title: label},
      h('div',{className:'cover'},
        h('img',{
          src:`/avatar/${name}.png`,
          alt:'',
        })
      ),
      h('figcaption',null,
        h('img',{
          src:iconPath,
          alt:''
        })
      ),
    )
  ) */
}


function AvatarPage(){

  return(
    <ul className="avatarList">
      {/* <Avatar className="Avatar" name={sinzzang} status={online}></Avatar> */}
      <Avatar name= "sinzzang" status="online"/>
      <Avatar name= "zzanga" status="offline"/>
      <Avatar name= "sinpapa" status="disturb"/>
      <Avatar name= "bongmiseon" status="away"/>
    </ul>
  )
  /* return h(
    'ul',
    { className:'avatarList' },
    h(Avatar, {name:'sinzzang', status:'online'}),
    h(Avatar, {name:'zzanga', status:'offline'}),
    h(Avatar, {name:'sinpapa', status:'disturb'}),
    h(Avatar, {name:'bongmiseon', status:'away'}),
  ) */
}

const container = document.getElementById('app');

if (container) {
  const reactDomRoot = ReactDOM.createRoot(container);
  reactDomRoot.render(<AvatarPage />);
}