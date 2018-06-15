import * as React from 'react';

import './include/bootstrap';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import { SignInContainer } from './components/sign-in/sign-in.container';
import { RequestFormContainer } from './components/request-form/request-form.container';
import { RequestTableContainer } from './components/request-table/request-table.container';
import { ViewTableContainer } from './components/view-table/view-table.container';

class App extends React.Component<any,any> {
  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <Switch>
              <Route path="/sign-in" component={SignInContainer} />
              <Route path="/request-form" component={RequestFormContainer} />
              <Route path="/request-table" component={RequestTableContainer} />
              <Route path="/view-table" component={ViewTableContainer} />
              <Route component={SignInContainer} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;