import React, { useState, useEffect, useRef } from 'react'
import { ImageUploader } from '../../Components/index'
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { requiredMessage, inputPlace, successNotification, errorMessage, warningMessage } from '../../utils/helpers'
import { AUTH } from '../../utils/apis'
import { allPaths, provincie } from '../../utils/constants'
import axios from 'axios'
import { removeUser } from '../../Redux/actions/authActions'

const Signup = (props) => {
    const { history } = props
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([])

    // Called when the form is successfully submitted
    const onFinish = (values) => {
        // Add the selected file to the form data
        values.file = fileList[0]
        console.log('Success:', values)

        // Show an error message if no file is selected
        if (!values?.file) {
            return warningMessage('Please Upload Logo!')
        }

        // Create a new form data object
        let formData = new FormData()

        // Add the selected file to the form data
        if (values?.file) {
            formData.append('file', values?.file?.originFileObj)
        }

        // Add all form values to the form data
        for (var [k, v] of Object.entries(values)) {
            if (k && v) {
                console.log(k, v)
                formData.append(k, v)
            }
        }
        console.log('formData',formData)
        setLoading(true)

        // Submit the form data to the server
        axios.post(AUTH?.SIGNUP, formData)
            .then((res) => {
                const { data } = res
                setLoading(false)

                // Show a success message if the signup was successful
                if (data?.success) {
                    successNotification(
                        'Successfully Signup'
                    )

                    // Redirect to the login page after a short delay
                    return setTimeout(() => {
                        history.push(allPaths?.LOGIN)
                    }, 300)
                }

                // Show an error message if the signup failed
                errorMessage(data?.message)
            })
            .catch((e) => {
                setLoading(false)
                // Show an error message if there was an error submitting the form
                errorMessage()
            })
    }

    // Called when the form submission fails
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    // Render the signup form
    return (
        <div className='form_container'>
            <div className='form_heading_div'><h1>Hackathon</h1></div>
            <Form className='form'
                name="basic"
               
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className='inputs_container'>
                    <div className='inputs_div'>
                        <div>
                            <Form.Item
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder='Username' className='inp' />
                            </Form.Item>
                        </div>
                        <div className="password_inputs">
                            
                            <Form.Item
                                name='password'
                                
                                rules={[
                                    {
                                        required: true,
                                        message: requiredMessage('Password')
                                    },
                                    {
                                        min: 6
                                    }
                                ]}
                            >
                                <Input
                                    className='inp'
                                    placeholder={'password'}
                                    type='password'
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='inputs_div'>
                        <div>
                            <Form.Item
                                name='email'
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input placeholder='Email' className='inp' />
                            </Form.Item>
                        </div>
                        <div className="password_inputs">
                            
                            <Form.Item
                                name='confirm'
                                rules={[
                                    {
                                        required: true,
                                        message: requiredMessage('confirm password'),
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                'The two passwords that you entered do not match!'
                                            )
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder={'confirm password'}
                                    className='inp'
                                    type='password'
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className='upload_image_div'>
                    <ImageUploader fileList={fileList} setFileList={setFileList} />
                </div>
                <div className='btn_div'>
                    <Button loading={loading} className='btn' type="primary" htmlType="submit">
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default Signup