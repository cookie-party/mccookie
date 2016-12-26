import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './login';

const Index = () => (
  <MuiThemeProvider>
    <Login />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Index />,
  document.getElementById('login')
);
