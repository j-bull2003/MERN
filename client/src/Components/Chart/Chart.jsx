import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Pie } from '@ant-design/plots'
import axios from 'axios'
import { GET } from '../../utils/apis'
import ReactApexChart from 'react-apexcharts'

// Define a new component called DemoPie (which is the pie chart for clothes)
const DemoPie = () => {

    // Initialize the state variable to store the graph data and set the initial values
    const [graphData, setGraphData] = useState({
        series: [], // array to store the data series
        options: { // object to store the chart options
            noData: {
                text: "Loading....",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000000',
                    fontSize: '19px',
                    fontFamily: 'Roboto'
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            chart: {
                width: 480, // set the width of the chart
                type: 'pie', // set the type of chart to pie
            },
            
            labels: ['hoodie', 'blazer', 'raincoat', 'jumper', 'sweater', 'jacket'], // array to store the chart labels
            responsive: [{ // set the chart options for different screen sizes
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200 // set the width of the chart for small screens
                    },
                    legend: {
                        show: false
                    }
                }
            }]
        }
    })

    // Make an API call to get the clothes data
    useEffect(() => {
        getClothes()
    }, [])

    const getClothes = () => {
        axios.get(GET?.GET_CLOTHES_DATA)
            .then(async (result) => {
                const { data } = result
                if (data?.success) {
                    let resultNormailized = data?.resultNormailized
                    let totalLength = data?.totalLength
                    let seriesArr = []
                    let arrTypes = []

                    // Normalize the data and calculate the percentage for each item
                    resultNormailized = resultNormailized?.map((val, ind) => {
                        val.percentage = (100 * Number(val?.count)) / totalLength
                        let percent = val?.percentage
                        let type = val?.clothe
                        seriesArr.push(percent)
                        arrTypes.push(type)

                        // Update the graph data with the new series and labels
                        const newGraphData = {
                            ...graphData,
                            series: [...seriesArr],
                        }
                        newGraphData.options.labels = [...arrTypes]
                        setGraphData(newGraphData)
                        return val
                    })
                }
            })
            .catch((error) => console.log('error', error?.message))
    }

    // Render the pie chart component with the graph data and options
    return (

        // The actual pie chart
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactApexChart options={graphData?.options} series={graphData?.series} type="pie" width={400} height={190} />
        </div>
    )
};

export default DemoPie