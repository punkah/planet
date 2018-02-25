import React from 'react';
import ReactDOM from 'react-dom';
import Label from 'components/Label/Label';
import Router from 'Router';

it('renders without crashing', () => { 
  const div = document.createElement('div');
  ReactDOM.render(<Router><Label /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
