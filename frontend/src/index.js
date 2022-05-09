import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
ReactDOM.render(
  // <AlertProvider template={AlertTemplate} {...options}>
  <Provider store={store}>
    <App />
  </Provider>
  // </AlertProvider>
  ,
  document.getElementById('root')
);