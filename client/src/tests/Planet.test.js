import React from 'react';
import ReactDOM from 'react-dom';
import Planet from 'pages/Planet/Planet';
import Router from 'Router';

it('renders without crashing', () => { 
  const div = document.createElement('div');
  ReactDOM.render(<Router><Planet /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
