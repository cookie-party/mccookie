import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Index = () => (
  <MuiThemeProvider>
    <Login />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
