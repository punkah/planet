import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'pages/Home/Home';
import Router from 'Router';

it('renders without crashing', () => { 
  const div = document.createElement('div');
  ReactDOM.render(<Router><Home /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
