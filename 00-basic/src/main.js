

import {Greeting} from './data.js'
import React from './lib/react.js';
import ReactDOM from './lib/react-dom.js';

// console.log(Greeting);

const getRandom = (n) => {
  return Math.floor(Math.random() * n);
};


const keys = Object.keys(Greeting);
const key = keys[getRandom(keys.length)]
const value = Greeting[key];

// console.log(keys,key, value);

const app = document.getElementById('app');

// createRoot
const root = ReactDOM.createRoot(app);

// createElement
const element = React.createElement(
  'h1',
  { title: `나라별 인사말 - ${key}` },
  `인사말 : ${value}`
);

root.render(element);

// JSX 주석 (JSX 내부에서 사용)
// {/* <h1 title="나라별 인사말 - KO">인사말 : 안녕하세요</h1> */}

