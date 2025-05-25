import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'


 ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
