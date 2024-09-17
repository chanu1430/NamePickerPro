import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MyContext from './myContext/MyContext';
import HostContext from './myContext/HostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HostContext>
        <MyContext>
          <App />
        </MyContext>
    </HostContext>
   
    
  </React.StrictMode>
);

