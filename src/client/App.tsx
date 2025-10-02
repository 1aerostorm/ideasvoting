import React from 'react';
import { Provider } from "./components/provider"
import Ideas from './Ideas';

const App = () => {
  return <Provider>
    <Ideas />
  </Provider>;
};

export default App;
