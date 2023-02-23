import apiUrl from '../Config/api'

// Defining different API endpoints
const authApi = `${apiUrl}/api/user`
const getApi = `${apiUrl}/api/get`
const postApi = `${apiUrl}/api/post`

// Object containing different API endpoints related to authentication
const AUTH = {
    LOGIN: `${authApi}/login`,
    SIGNUP: `${authApi}/signup`
}

// Object containing different API endpoints related to fetching data
const GET = {
    GET_PHOTOS: `${getApi}/get-photos`,
    GET_TASKS: `${getApi}/get-tasks`,
    GET_CLOTHES_DATA: `${getApi}/get-clothes-data`,
    GET_NEWS_DATA: `${getApi}/get-latest-news`,
}

// Object containing different API endpoints related to posting data
const POST = {
    ADD_PHOTOS: `${postApi}/add-photo`,
    DELETE_PHOTOS: `${postApi}/delete-photo`,
    ADD_TASKS: `${postApi}/add-task`,
    UPDATE_TASKS: `${postApi}/update-task`
}

// Exporting different API endpoint objects
export {
    AUTH,
    GET,
    POST
}