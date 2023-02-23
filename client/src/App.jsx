import React from 'react'
import { hot } from 'react-hot-loader/root'
import AOS from 'aos'
import { Routes } from './Config/routes'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './App.css'
import 'antd/dist/antd.min.css'
import { UploadPhoto } from './Screens/Photos/Photos'
import { Task } from './Screens'

// Initialize the AOS animation library
AOS.init()

// Create a theme object with primary and secondary colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
      secondMain: '#1890ff'
    }
  }
})

// The main component of the application
const App = () => {

  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
      <Routes />
      {/* <News/> */}
      {/* <Sports/> */}
      {/* <Task/> */}
      {/* <UploadPhoto/> */}
      {/* </ThemeProvider> */}
    </div>
  )
}

// Export the App component using hot module replacement
export default hot(App)