import { RollbackOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { allPaths } from '../../utils/constants'

// Define Sports component
const Sports = ({ rows, history }) => {

    // Define state variables
    const [value, setValue] = useState(null)
    const [data, setData] = useState(null)

    // Handle input change
    const onchange = (e) => {
        // Get lowercase trimmed value from input
        let value = e?.target?.value?.toLowerCase()?.trim()
        // Set input value to state
        setValue(value)
        // Filter rows based on input value
        let newArr = []
        rows?.filter((val, ind) => {
            if (val?.HomeTeam?.toLowerCase() == value || val?.AwayTeam?.toLowerCase() == value) {
                console.log('val', val)
                let obj
                if (val?.HomeTeam?.toLowerCase() == value && val?.FTR == 'H' && val?.FTR != 'D') {
                    obj = {
                        HomeTeam: val?.HomeTeam,
                        AwayTeam: val?.AwayTeam,
                        FTR: val?.FTR,
                    }
                    // Push object to array
                    newArr.push(obj)
                } else if (val?.AwayTeam?.toLowerCase() == value && val?.FTR == 'A' && val?.FTR != 'D') {
                    obj = {
                        HomeTeam: val?.HomeTeam,
                        AwayTeam: val?.AwayTeam,
                        FTR: val?.FTR,
                    }
                    // Push object to array
                    newArr.push(obj)
                }
            }
        })

        // Set filtered data to state
        setData(newArr)
    }

    // Render Sports component
    return (
        <div className='Sports_main_section'>
            {/* The heading for the section, with a title of "Sports" */}
            <div className="Sports_haeding" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Sports</h1>
                {/* A button with a "Back" icon, which when clicked will redirect to the home page */}
                <Button style={{ margin: '25px 43px' }} icon={<RollbackOutlined />} onClick={() => history.push(allPaths?.HOME)}>Back </Button>
            </div>
           
            {/* A section for inputting the name of a sports team */}
            <div className="team_name_section">
                <input onChange={onchange} type="text" className='Sport_input' name="" id="" placeholder='Input Team Name' />
            </div>

            {/* A section for displaying the teams that the user has won against */}
            <div className="teams">
                <ul>
                    These teams You won against:
                </ul>
                {/* If data exists and has a length, it will map through the data and display the home or away team based on whether the input value matches the away team */}
                <ul>
                    
                    {
                        data?.length ?
                            data?.map((v, i) => {
                                return <li>{i + 1}:{value == v?.AwayTeam?.toLowerCase() ? v?.HomeTeam : v?.AwayTeam}</li>
                            })
                            : value ?
                                <li>No Team Found Against This Record</li> : null
                    }
                </ul>
            </div>
        </div>
    )
}

// Export the Sports component
export default Sports
