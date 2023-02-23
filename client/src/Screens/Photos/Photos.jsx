import { RollbackOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { PhotoUpl } from "../../Components"
import { allPaths } from "../../utils/constants"

// This component allows users to upload photos
export const UploadPhoto = ({ fileList, getPhotos, history }) => {
  return (
    <>
      <div className="photo_main_div">
        <div>
          {/* Header of the page */}
          <h1 className="photo_h1">Photos
            {/* Back button */}
            <Button style={{ margin: '25px 43px', display: 'inline', float: 'right' }} icon={<RollbackOutlined />} onClick={() => history.push(allPaths?.HOME)}>Back </Button>
          </h1>
        </div>
        <div>
          {/* Component for uploading photos */}
          <PhotoUpl fileList={fileList} getPhotos={getPhotos} />
        </div>
      </div>
    </>
  )
}