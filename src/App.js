import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './redux/store';
import RoutesHandler from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <Router  basename="/">
        <RoutesHandler />
      </Router>
    </Provider>
  );
};
export default App;