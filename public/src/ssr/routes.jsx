/*global document*/
import React, {Component} from 'react';
import { browserHistory, Router, Route, IndexRedirect, Link, withRouter } from 'react-router';
import cookie from 'react-cookie';

//import Login from './login';
//import ServerMain from '../server';

class _ServerLogin extends Component {
  render() {
    return (
      <div>
        <div id = "_login"></div>
      </div>
    );
  }
}

class ServerLogin extends Component {
  render() {
    return (
      <div>
        <div id = "login"></div>
        <script src="dist/login.js"></script>
      </div>
    );
  }
}

class ServerMain extends Component {
  render() {
    return (
      <div>
        <div id = "root"></div>
        <script src="dist/bundle.js"></script>
      </div>
    );
  }
}

class AppContainer extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

/*
class First extends Component{
  render() {
    console.log('First');
    return (
      <div>
        <ul>
          <li><Link to='/'>Top</Link></li>
          <li><Link to='/login'>Log in</Link></li>
          <li><Link to='/main'>Main</Link></li>
        </ul>
      </div>
    );
  }
}

const Second = withRouter(
  React.createClass({
    render() {
      console.log('Second');
      return (
        <div>
          'Second'
        </div>
      );
    }
  })
);


const Third = React.createClass({
  render() {
    return <h1>Third</h1>;
  }
});
*/

function setConfig(nextState, replace) {
  console.log('setConfig');

  const apiKey = cookie.load('apiKey');

  if (!apiKey) {
    const config = process.env;
    cookie.save('apiKey', config.apiKey, { path: '/login' });

    console.log('cookie',cookie.load('apiKey'));

  }

  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  });

}

function requireAuth(nextState, replace) {
  console.log('requireAuth',nextState);
  const authed = true;
  if (!authed) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export default (
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/_login" />
      <Route path="_login" component={_ServerLogin} onEnter={setConfig}/>
      <Route path="login" component={ServerLogin} />
      <Route path="main" component={ServerMain} onEnter={requireAuth} />
    </Route>
);
