import React from 'react'
import { SideMenu } from '../'
import { useSelector } from 'react-redux'

// This is a new component called MenuLayout. It takes in props, including a component.
const MenuLayout = ({ component: Component, ...props }) => {

    // This line uses the useSelector hook from the Redux library to extract the "user" state from the "authReducer" slice of the global store.
    // This will be used later in the component to check if the user is logged in or not.
    const user = useSelector(state => state.authReducer.user)

    // This component returns a div with class 'helper-main', which contains a SideMenu component and another div with class 'helper-comp' that renders the passed in component as a prop.
    return (
        <div className='helper-main'>
            <div className='menu-flex'>

                {/* This is a component called SideMenu. */}
                {/* It is being passed all of the props that were given to MenuLayout. */}
                <SideMenu {...props} />

                <div className='helper-comp'>
                    {/* This is the component that was passed in as a prop. */}
                    {/* It is being rendered here as a child component. */}
                    <Component {...props} />
                </div>
            </div>
        </div>
    )
}

// This component is exported so it can be used in other parts of the application
export { MenuLayout }