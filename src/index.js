import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from './context/context';
import {SpeechProvider} from '@speechly/react-client'

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId="f6d37aca-9b52-4d47-a64e-388b7f5247ca" language='en-US'>
    <Provider>
    <App />
    </Provider>
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);