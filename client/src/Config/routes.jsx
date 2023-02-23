import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MenuLayout } from '../Components'
import allPaths from './paths'
import { Result, Button } from 'antd'
import { Home, Signup, Login, News, Sports, Task, UploadPhoto } from '../Screens'
import axios from 'axios'
import { GET } from '../utils/apis'
import { useSelector } from 'react-redux'
import Papa from "papaparse"
import file from "../assets/file.csv"

const Page404 = (props) => {

    // Extract history object from props
    const { history } = props

    // Return 404 error page with a button to go back to home
    return (
        <Result
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={<Button
                type='primary'
                className='form-button'
                onClick={() => history.push('/')}
            >Back Home</Button>}
        />
    )
}

const Routes = () => {

    // Get user object from Redux store
    const user = useSelector(state => state.authReducer.user)
    
    // Declare and initialize state variables
    const [newsData, setNewsData] = useState(null)
    const [taskData, setTaskData] = useState(null)
    const [fileList, setFileList] = useState([])
    const [rows, setRows] = useState(null)

    // Call API functions and parse CSV file on component mount
    useEffect(() => {
        // Parse CSV file using Papa.parse library
        Papa.parse(file, {
            download: true,
            header: true,
            complete: data => {
                setRows(data?.data)
            }
        })
        // Call API functions to get photos, news data, and task data
        getPhotos()
        getNews()
        getTaskData()
    }, [])

    // Function to get photos for the user from the server
    const getPhotos = (_id) => {
        // Use current user's ID or provided _id argument to get photos
        let id = user?._id ? user?._id : _id
        axios.get(`${GET?.GET_PHOTOS}/${id}`)
            .then((res) => {
                const { data } = res
                if (data.success) {
                    console.log(data)
                    // Update fileList state with response data
                    setFileList(data?.data || [])
                }
            }).catch((e) => {
                console.log('e', e)
            })
    }

    // Function to get news data from the server
    const getNews = () => {
        axios.get(GET?.GET_NEWS_DATA)
            .then((res) => {
                const { data } = res
                if (data.success) {
                    // Update newsData state with response data
                    setNewsData(data?.data || {})
                }
            }).catch((e) => {
                console.log('e', e)
            })
    }

    // Function to get task data for the user from the server
    const getTaskData = (_id) => {

        // Use current user's ID or provided _id argument to get task data
        let id = user?._id ? user?._id : _id
        axios.get(`${GET?.GET_TASKS}/${id}`)
            .then((res) => {
                const { data } = res
                if (data.success) {
                    // Update taskData state with response data
                    setTaskData(data?.data || [])
                }
            }).catch((e) => {
                console.log('e', e)
            })
    }

    // Render different components based on the current URL path
    return (
        <Router>
            <Switch>
                <Route path={allPaths?.SIGNUP} exact component={(props) => <Signup user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.LOGIN} exact component={(props) => <Login user={user} rows={rows} {...props} getPhotos={getPhotos} getNews={getNews} getTaskData={getTaskData} />} />
                <Route path={allPaths?.HOME} exact component={(props) => <Home getPhotos={getPhotos} fileList={fileList} newsData={newsData} getTaskData={getTaskData} taskData={taskData} user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.NEWS} exact component={(props) => <News newsData={newsData} user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.SPORTS} exact component={(props) => <Sports user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.TASK} exact component={(props) => <Task getTaskData={getTaskData} taskData={taskData} user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.UPLOADPHOTO} exact component={(props) => <UploadPhoto getPhotos={getPhotos} fileList={fileList} user={user} rows={rows} {...props} />} />
                <Route path='/:page404' exact component={Page404} />
            </Switch >
        </Router >
    )
}

export {
    Routes,
    Page404
}