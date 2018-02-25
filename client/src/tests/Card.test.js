import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'components/Card/Card';
import Router from 'Router';

it('renders without crashing', () => { 
  const div = document.createElement('div');
  ReactDOM.render(<Router><Card /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
