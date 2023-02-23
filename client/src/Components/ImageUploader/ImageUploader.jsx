import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';

// Define a new component called ImageUploader
const ImageUploader = ({ fileList, setFileList }) => {

    // This component takes two props, fileList and setFileList, which will be used to manage the list of uploaded files
    // The onChange function updates the fileList state with a newFileList when a user selects or uploads a new file
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <>
            {/* This is a UI component from antd library which allows a user to upload images */}
            <Upload
                // This is the server endpoint where the file will be uploaded
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // This specifies the style of the uploaded file list
                listType="picture-card"
                // This is the current list of uploaded files
                fileList={fileList}
                // This specifies the function that should be called when the list of uploaded files changes
                onChange={onChange}
                // This prevents the default behavior of uploading the file to the server
                beforeUpload={() => false}
                // This specifies that only one file can be uploaded at a time
                multiple={false}
                // This specifies which file types are allowed
                accept='image/png, image/jpeg'
            // onPreview={onPreview}
            >
                {/* This text is displayed on the Upload component if no files have been uploaded yet */}
                {fileList.length < 1 && 'Add picture'}
            </Upload>
        </>

    );
};

// This component is exported so it can be used in other parts of the application
export default ImageUploader;