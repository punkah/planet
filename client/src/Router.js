import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Home from 'pages/Home/Home';
import Planet from './pages/Planet/Planet';

class Router extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/planet/:id' component={Planet}/>
          <Redirect from='*' to='/'/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;