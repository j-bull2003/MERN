import { Button, Spin, Upload } from 'antd'
import { useEffect, useState } from 'react'
import plus from '../../assets/Images/Plus_button.png'
import { errorMessage, getBase64, successMessage, warningMessage } from '../../utils/helpers'
import { POST } from '../../utils/apis'
import { useSelector } from 'react-redux'
import axios from 'axios'

// Defining PhotoUpl component
const PhotoUpl = ({ fileList, getPhotos }) => {

    // Getting the user object from the Redux store
    const user = useSelector(state => state?.authReducer?.user)

    // Setting initial state values for photosData, loadingDelete, and spin
    const [photosData, setPhotosData] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [spin, setSpin] = useState({})

    // Handling file upload
    const onChange = ({ fileList: newFileList }) => {

        // Creating new FormData object
        const formData = new FormData()
        setPhotosData(true)

        for (let files of newFileList) {
            formData.append('file', files?.originFileObj)
        }

        formData.append('userId', user?._id)

        // Sending POST request to server to add new photos
        axios.post(POST?.ADD_PHOTOS, formData)
            .then((res) => {
                const { data } = res

                // If photos are added successfully, show success message and call getPhotos method
                if (data?.success) {
                    successMessage(data?.message)
                    getPhotos()
                } else {
                    errorMessage(data?.message)
                }

                // Setting photosData state to false
                setPhotosData(false)
            }).catch((e) => {

                // Setting photosData state to false and logging the error
                setPhotosData(false)
                console.log('e', e)
            })
    }

    // Defining Uploader component
    const Uploader = (
        <div className='uploader_main'>
            <div className='upload_main_div'>
            </div>
            <div className='upload_plus_div'>
                <img src={plus} draggable={false} className='upload_plus_icon' />
            </div>
        </div>
    )

    // Handling photo deletion
    const deletePhoto = (id) => {

        // Setting spin state for the corresponding photo ID to true
        setSpin({ [id]: true })

        // Sending POST request to server to delete the photo
        axios.post(POST?.DELETE_PHOTOS, { _id: id })
            .then((res) => {
                const { data } = res

                // If photo is deleted successfully, show success message and call getPhotos method
                if (data.success) {
                    successMessage(data?.message)
                    setSpin({})
                    getPhotos()
                }
            }).catch((e) => {

                // Logging the error and setting spin state for the corresponding photo ID to false
                console.log('e', e)
                setSpin({})
                errorMessage(e)
            })
    }
    console.log(fileList)

    // Rendering the component
    return (
        // Render the parent container div for the photo uploader component
        <div className='upload_div'>
            {/* Render an Ant Design Upload component for uploading photos */}
            <Upload
               fileList={fileList} // Set the fileList prop to the fileList object passed in from props
               onChange={onChange} // Set the onChange event handler to the onChange function defined above
               onPreview={null} // Set the onPreview prop to null (no preview functionality)
               beforeUpload={() => false} // Prevent the Upload component from automatically uploading files
               multiple={false} // Allow only one file to be uploaded at a time
               accept='image/png, image/jpeg' // Limit the file types that can be uploaded to PNG and JPEG images
               showUploadList={false} // Hide the default Ant Design upload list
            >
                {/* If photosData is true, render a spinner while the photo is being uploaded */}
                {
                    photosData ?
                        <>
                            <div className='uploader_main'>
                                <div className='upload_main_div'>
                                </div>
                                <div className='upload_plus_div'>
                                    <i className="fa fa-spinner fa-spin fa-3x icon-style"></i>
                                </div>
                            </div>
                        </>
                        // If photosData is false, render the uploader icon
                        :
                        Uploader
                }
            </Upload>
            {/* If there is at least one photo in the fileList, render each photo */}
            {fileList?.length >= 1 ?
                <>
                    {
                        // Map over the fileList object and render each photo
                        fileList?.map((v, i) => {
                            return (
                                <div className='uploader_main'>
                                    <div className=' upload_main_div2'>
                                        {/* If spin[v._id] is true, render a spinner while the photo is being deleted */}
                                        <span className='check_icon' >
                                            {spin[v?._id] ?
                                                <i class="fa fa-spinner fa-spin">&nbsp;</i>
                                                // If spin[v._id] is false, render the delete button
                                                :
                                                <Button onClick={() => deletePhoto(v?._id)}>X</Button>
                                            }
                                        </span>
                                        <div>
                                            <img src={v?.imageUrl} className='upload_img' />
                                        </div>
                                    </div>
                                    </div>
                            )
                        })
                    }
                </>
                // If there are no photos in the fileList, render nothing
                :
                null
            }
        </div>
    )
}

// Export the PhotoUpl component as the default export of the module
export default PhotoUpl