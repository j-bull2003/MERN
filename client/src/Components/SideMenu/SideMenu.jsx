import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { setActiveMenu } from '../../utils/helpers'
import { drawerRoutes } from '../../utils/constants'

// Define a menu component that takes in a location prop
const SideMenu = (props) => {

    // Extract the location prop from the props object using object destructuring
    const { location } = props

    // Render the following JSX code
    return (
        <Menu
            // Set the default open and selected menu items to the currently active menu item
            defaultOpenKeys={[`${setActiveMenu(location?.pathname)}`]}
            defaultSelectedKeys={[`${setActiveMenu(location?.pathname)}`]}
            // Set the style of the menu to be a fixed height and width
            style={{ height: '100vh', maxWidth: 180 }}
            mode='inline'
            // Set the theme of the menu to dark
            theme='dark'
        >
            {/* Loop over the array of routes and create a menu item for each one */}
            {drawerRoutes.map((v, i) => {
                return (
                    <Menu.Item
                        // Set the key for each menu item to the current index in the array
                        key={i}
                        // Set the icon for each menu item to the icon for that route
                        icon={v.icon}
                    >
                        {/* Create a link to the route and set the text of the menu item to the title of the route */}
                        <Link
                            to={v?.route}
                        >
                            {v.title}
                        </Link>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}

// Make the SideMenu component available for use in other parts of the code by exporting it as the default export of the module
export default SideMenu