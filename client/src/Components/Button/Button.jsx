import React from "react"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useHistory } from "react-router-dom"
import { allPaths } from '../../utils/constants'

// Define a component called GoBack
export const GoBack = () => {

    // Initialize a new history object using the useHistory hook
    const history = useHistory()

    // Define a new function called Back
    const Back = () => {
        history.push(allPaths?.HOME)
    }

    // Render a button that triggers the Back function when clicked
    return (
            <Button style={{ backgroundColor: '#ffe65e' }} onClick={Back} icon={<ArrowLeftOutlined />}>
                back
            </Button>
    )
}