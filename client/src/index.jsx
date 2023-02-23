import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/store'
import { PersistGate } from 'redux-persist/integration/react'

// This code is rendering the App component with Redux store and PersistGate
// The App component is being rendered inside the root element in the HTML document.
ReactDOM.render(<Provider store={store}>
    <PersistGate persistor={persistor}>
        <App />
    </PersistGate>
</Provider>, document.getElementById('root'))