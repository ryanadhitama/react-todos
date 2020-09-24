import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import State from './pages/State';
import Hooks from './pages/Hooks';

class App extends React.Component {

  render(){
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={State} exact/>
            <Route path="/hook" component={Hooks}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
