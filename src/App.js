import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import Navigator from './navigation';
import store from './store';

const App = () => (
  <StoreProvider store={store}>
      <Navigator />
  </StoreProvider>
);

export default App