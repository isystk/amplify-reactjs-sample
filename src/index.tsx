import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/app.scss'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './store'

import reportWebVitals from './reportWebVitals'
import App from './components/App'

// 開発環境の場合は、redux-devtools-extension を利用できるようにする
const enhancer =
  process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducers, enhancer)

const container = document.getElementById('root')
if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
