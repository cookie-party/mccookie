'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global document*/


//import Login from './login';
//import ServerMain from '../server';

var _ServerLogin = function (_Component) {
  _inherits(_ServerLogin, _Component);

  function _ServerLogin() {
    _classCallCheck(this, _ServerLogin);

    return _possibleConstructorReturn(this, (_ServerLogin.__proto__ || Object.getPrototypeOf(_ServerLogin)).apply(this, arguments));
  }

  _createClass(_ServerLogin, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { id: '_login' })
      );
    }
  }]);

  return _ServerLogin;
}(_react.Component);

var ServerLogin = function (_Component2) {
  _inherits(ServerLogin, _Component2);

  function ServerLogin() {
    _classCallCheck(this, ServerLogin);

    return _possibleConstructorReturn(this, (ServerLogin.__proto__ || Object.getPrototypeOf(ServerLogin)).apply(this, arguments));
  }

  _createClass(ServerLogin, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { id: 'login' }),
        _react2.default.createElement('script', { src: 'dist/login.js' })
      );
    }
  }]);

  return ServerLogin;
}(_react.Component);

var ServerMain = function (_Component3) {
  _inherits(ServerMain, _Component3);

  function ServerMain() {
    _classCallCheck(this, ServerMain);

    return _possibleConstructorReturn(this, (ServerMain.__proto__ || Object.getPrototypeOf(ServerMain)).apply(this, arguments));
  }

  _createClass(ServerMain, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { id: 'root' }),
        _react2.default.createElement('script', { src: 'dist/bundle.js' })
      );
    }
  }]);

  return ServerMain;
}(_react.Component);

var AppContainer = function (_Component4) {
  _inherits(AppContainer, _Component4);

  function AppContainer() {
    _classCallCheck(this, AppContainer);

    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
  }

  _createClass(AppContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);

  return AppContainer;
}(_react.Component);

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

  var apiKey = _reactCookie2.default.load('apiKey');

  if (!apiKey) {
    var config = process.env;
    _reactCookie2.default.save('apiKey', config.apiKey, { path: '/login' });

    console.log('cookie', _reactCookie2.default.load('apiKey'));
  }

  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  });
}

function requireAuth(nextState, replace) {
  console.log('requireAuth', nextState);
  var authed = true;
  if (!authed) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: AppContainer },
  _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/_login' }),
  _react2.default.createElement(_reactRouter.Route, { path: '_login', component: _ServerLogin, onEnter: setConfig }),
  _react2.default.createElement(_reactRouter.Route, { path: 'login', component: ServerLogin }),
  _react2.default.createElement(_reactRouter.Route, { path: 'main', component: ServerMain, onEnter: requireAuth })
);