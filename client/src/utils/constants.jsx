import HomeOutlined from '@ant-design/icons/HomeOutlined'
import allPaths from '../Config/paths'

// Defining the background color for the application.
const bgColor = '#0adc00'

// Creating an array of routes for the application drawer.
const drawerRoutes = [
    {
        title: 'Home',
        route: allPaths.HOME,
        icon: <HomeOutlined />
    }
]

// Exporting the bgColor, drawerRoutes, and allPaths variables for use in other parts of the application.
export {
    bgColor,
    drawerRoutes,
    allPaths,
}

