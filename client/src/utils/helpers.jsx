import { message, notification } from 'antd'
import allPaths from '../Config/paths'

// function to generate a message prompting for a required input
const requiredMessage = (value) => `Please input your ${value}!`

// function to generate a placeholder for input field
const inputPlace = (value) => `Input your ${value} Here...!`

const setActiveMenu = (path) => path === allPaths.HOME ? 0 : 1

// function to display a success message using Antd message component
const successMessage = (desc = 'Successfully Complete!') => {
    return message.success(desc)
}

// function to display an information message using Antd message component
const infoMessage = (desc = 'Successfully Complete!') => {
    return message.info(desc)
}

// function to display an error message using Antd message component
const errorMessage = (desc = 'Oops Something Went Wrong!') => {
    return message.error(desc)
}

const warningMessage = (desc = 'Warning!') => {
    return message.warning(desc)
}

const successNotification = (message = 'Successfully Complete!') => {
    return notification.success({ message })
}

const errorNotification = (message = 'Oops Something Went Wrong!') => {
    return notification.error({ message })
}

const convertTitle = (val) => val.charAt(0).toUpperCase() + val.slice(1)

// function to limit the length of a string and append '...' if the string is longer than the limit
const stringLimiter = (val, limit = 50) => val?.length > limit ? `${val.slice(0, limit)}...` : val

// function to convert a file to base64 format
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })

// export all the functions as a module
export {
    requiredMessage,
    inputPlace,
    setActiveMenu,
    successMessage,
    infoMessage,
    errorMessage,
    warningMessage,
    successNotification,
    errorNotification,
    convertTitle,
    stringLimiter,
    getBase64
}