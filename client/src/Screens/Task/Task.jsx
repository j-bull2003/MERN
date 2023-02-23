import React, { useState } from 'react';
import Add from '../../assets/Images/Add.png';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { GiCheckMark } from 'react-icons/gi';
import axios from 'axios';
import { POST } from '../../utils/apis';
import { errorMessage, successMessage } from '../../utils/helpers';
import { Button } from 'antd';
import { allPaths } from '../../utils/constants';

const Task = (props) => {
  // Destructuring props
  const { taskData, getTaskData, user, history } = props

  // Initializing state variables
  const [inputs, setInputs] = useState([])
  const [taskValue, setTaskValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [spin, setSpin] = useState({})

  // Updating the input value for a specific index
  const handleInputChange = (index, e) => {
    const newInputs = [...inputs];
    newInputs[index].description = e.target.value;
    setInputs(newInputs);
  };

  // Updating the task status for a specific index
  const handleStatusChange = (index) => {
    const newInputs = [...inputs];
    newInputs[index].isComplete = !newInputs[index].isComplete;
    setInputs(newInputs);
  };

  // Adding a new input element
  const handleAddInput = () => {
    setInputs([...inputs, { description: '', isComplete: false }]);
  };

  // Updating task status using the API
  const updateStatus = (id, comp) => {
    setSpin({ [id]: true })

    let isCompleted = comp ? false : true
    axios.post(POST.UPDATE_TASKS, { _id: id, isCompleted: isCompleted })
      .then((res) => {
        const { data } = res
        if (data.success) {
          console.log('data', data)
          successMessage(data?.message)
          setSpin({})
          getTaskData()
        }
      }).catch((e) => {
        console.log('e', e)
        setSpin({})
        errorMessage(e)
      })
  }

  // Adding a new task using the API
  const addTask = () => {
    setLoading(true)
    let obj = {
      userId: user?._id,
      description: taskValue
    }

    axios.post(POST?.ADD_TASKS, obj)
      .then((res) => {
        const { data } = res
        if (data.success) {
          console.log('data', data)
          successMessage(data?.message)
          getTaskData()
        }
        setLoading(false)
      }).catch((e) => {
        console.log('e', e)
        errorMessage(e)
        setLoading(false)
      })
  }

  // Rendering the component
  return (
    <div className="Task_main_section">
      
      <div className="Sports_haeding" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Task</h1>
        <Button style={{ margin: '25px 43px' }} icon={<RollbackOutlined />} onClick={() => history.push(allPaths?.HOME)}>Back </Button>
      </div>
      {
        taskData?.map((v, index) => {
          return (
            <div key={index} className="Inputs_box">
              <input
                disabled
                className="task_input"
                type="text"
                value={v.description}
                placeholder={`Team ${index + 1}`}
              />
              <div className="check_box" onClick={() => updateStatus(v?._id, v?.isCompleted)}>
                <span className='check_icon2' >
                  {spin[v?._id] ? <i class="fa fa-spinner fa-spin">&nbsp;</i> :
                    v?.isCompleted ? <GiCheckMark /> : null
                  }
                </span>
              </div>
            </div>)
        })
      }
      <div className="task_main_input_div">
        <div className="input_div">
          {inputs?.map((input, index) => (
            <div key={index} className="Inputs_box">
              <input
                className="task_input"
                type="text"
                value={taskValue}
                placeholder={`Task ${index + 1}`}
                onChange={(e) => {
                  handleInputChange(index, e)
                  setTaskValue(e?.target?.value)
                }}
              />
              <div className="check_box" disabled={taskValue?.length ? false : true} onClick={addTask}>
                <span className='check_icon2' >
                  {loading === true ?
                    <>
                      {loading && <i class="fa fa-spinner fa-spin">&nbsp;</i>}
                    </>
                    :
                    <span> +</span>
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {inputs?.length >= 1 ?
        <button className="add_task_button">
          <img src={Add} alt="Add" />
        </button>
        :
        < button className="add_task_button" onClick={handleAddInput}>
          <img src={Add} alt="Add" />
        </button>
      }

    </div >
  );
};

export default Task;
