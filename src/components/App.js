import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar/Navbar';
import Search from './Search/Search';

const App = () => (
  <MuiThemeProvider>
    <div>
      <Navbar />
      <Search />
    </div>
  </MuiThemeProvider>
);

export default App;
