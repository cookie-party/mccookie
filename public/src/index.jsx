import React from 'react';
import ReactDOM from 'react-dom';
import App from './main';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Index = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
