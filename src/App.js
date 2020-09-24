import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import State from './pages/State';
import Hooks from './pages/Hooks';
import Firebase from './pages/Firebase';

class App extends React.Component {

  render(){
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={State} exact/>
            <Route path="/hook" component={Hooks}/>
            <Route path="/firebase" component={Firebase}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
