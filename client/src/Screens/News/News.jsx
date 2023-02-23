import React from 'react'
import { RollbackOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { GoBack } from '../../Components/index'
import staticImage from '../../assets/Images/staticImage.png'
import { allPaths } from '../../utils/constants'

// Define a functional component called News that takes in props called newsData and history
const News = ({ newsData, history }) => {
    // Return the following JSX code
    return (
        <div className='News_main_section'>
            {/* Create a heading for the News section, with a "Back" button that navigates to the Home page */}
            <div className="Sports_haeding" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>News</h1>
                <Button style={{ margin: '25px 43px' }} icon={<RollbackOutlined />} onClick={() => history.push(allPaths?.HOME)}>Back </Button>
            </div>
            {/* Add a section for the News header */}
            <div className="news_header_section">
                <div className="white_space">
                    <img style={{ height: '250px', width: '100%' }} src={staticImage} />
                </div>
               
            </div>
            {/* Add a section for the News headline and content */}
            <div className="news_headline_div">
                <h1>{newsData?.title}</h1>
                <div className="headline_paragraph"><p>{newsData?.content}</p></div>
            </div>
        </div>
    )
}

// Export the News component
export default News
