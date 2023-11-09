import 'modern-normalize';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './redux/store';
import { App } from './components/App/App';
import { GlobalStyle } from 'components/baseStyles/GlobalStyle';
import { ThemeStatus } from 'components/ThemeStatus/ThemeProvider';

import AOS from 'aos';

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={'Loading'} persistor={persistor}>
        <BrowserRouter basename="finance-club">
          <ThemeStatus>
            <GlobalStyle />
            <App />
          </ThemeStatus>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
