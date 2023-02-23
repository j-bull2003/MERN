import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ImageUploader } from '../../Components/index'
import { Button, Form, Input } from 'antd';
import { requiredMessage, inputPlace, successNotification, errorMessage } from '../../utils/helpers'
import { allPaths } from '../../utils/constants'
import { AUTH } from '../../utils/apis'
import axios from 'axios';
import { loginUser, removeUser } from '../../Redux/actions/authActions'

// Define a functional component called "Login" that takes in "props" as an argument
const Login = (props) => {
    // Destructure "history", "getPhotos", "getNews", and "getTaskData" from "props"
    const { history, getPhotos, getNews, getTaskData } = props
     // Get the "dispatch" function from the "useDispatch" hook
    const dispatch = useDispatch()
    // Define a state variable called "loading" and set its initial value to "false"
    const [loading, setLoading] = useState(false)

    // Define a function called "onFinish" that takes in "values" as an argument
    const onFinish = (values) => {
        // Set the "loading" state variable to "true"
        setLoading(true)
        // Send a POST request to the AUTH.LOGIN endpoint with the given "values"
        axios.post(AUTH.LOGIN, values)
            // If the request is successful, execute the following code
            .then((res) => {
                // Destructure "data" from the response object
                const { data } = res
                // Set the "loading" state variable to "false"
                setLoading(false)
                // If the response indicates success, execute the following code
                if (data?.success) {
                    // Show a success notification
                    successNotification('Successfully Logged In!')
                    // Dispatch an action to log in the user with the given "user" data
                    dispatch(loginUser(data?.user))
                    // Wait for 300 milliseconds, then execute the following code
                    return setTimeout(() => {
                        // Navigate to the HOME page
                        history?.replace(allPaths?.HOME)
                        // Get the photos for the logged-in user
                        getPhotos(data?.user?._id)
                        // Get the task data for the logged-in user
                        getTaskData(data?.user?._id)
                        // Get the news data
                        getNews()
                    }, 300)
                
                    // Show an error message with the given error "message"
                } else {
                    errorMessage(data?.message)
                }
            })

            // If the request fails, execute the following code
            .catch((e) => {
                setLoading(false)
                // Show an error message
                errorMessage()
            })
    }

    // Return the following JSX code
    return (
        <div className='form_container'>
            <div className='form_heading_div'><h1>Hackathon</h1></div>
            <Form className='form'
                name="basic"
               
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            
            >
                <div className='inputs_container'>
                    <div className='inputs_div login_inputs'>
                        <Form.Item
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your User Username!',
                                },
                            ]}
                        >
                            <Input placeholder='Username' className='inp' />
                        </Form.Item>
                    </div>
                    <div className='inputs_div login_inputs'>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input placeholder='Password' className='inp' type='password' />
                        </Form.Item>
                    </div>
                </div>
                <div className='btn_div'>
                    <Button loading={loading} className='btn login_btn' type="primary" htmlType="submit">
                        Login
                    </Button>
                </div>
                <div className="new_sign_up">
                    <span className='new'>New to the hackathon? </span>
                    <span className='sign_up cursor-pointer' onClick={() => history.push(allPaths?.SIGNUP)}>Sign up</span>
                </div>
            </Form>
        </div>
    )
};
export default Login;