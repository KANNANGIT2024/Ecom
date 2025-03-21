import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { getUserTask, updateAdminTask, getOldtaskdetaiels } from "../Utiles/api";
import { useNavigate } from "react-router-dom";

function TaskTable() {
  const { projectname } = useParams();
  const [tasks, setTasks] = useState([]);
  const [oldTasks, setOldTasks] = useState([]);
  const [updates, setUpdates] = useState({});
const navigates=useNavigate()
  useEffect(() => {
    const fetchOldTasks = async () => {
      const result = await getOldtaskdetaiels(projectname);
      if (result && result.success) {
        setOldTasks(result.data);
        
        
      }
    };

    const fetchTask = async () => {
      try {
        const response = await getUserTask(projectname);
        if (response.success) {
          setTasks(response.data);
          const initialUpdates = response.data.reduce((acc, task) => {
            acc[task._id] = {
              adminsuggestions: task.adminsuggestions || "",
              taskstatus: task.taskstatus || "",
            };
            return acc;
          }, {});
          setUpdates(initialUpdates);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTask();
    fetchOldTasks();
  }, [projectname]);

  const handleInputChange = (taskId, field, value) => {
    setUpdates((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (taskid, id, projectid) => {
    const { adminsuggestions, taskstatus } = updates[taskid];
    try {
      const response = await updateAdminTask(id, taskstatus, projectid, taskid, adminsuggestions);
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 onClick={()=>{navigates('/Adminhome')}} style={{ textAlign: 'center', marginBottom: '20px' }}>Tasktable</h2>

      <div className="text-center mb-4">
        <h1 className="display-4"><strong>Projectname:</strong>{projectname}</h1>
      </div>

      <h2><stron>CurrentTaskDetaiels:</stron></h2>

      <div className="d-flex flex-column align-items-start">
        {tasks.map((task) => (
          <Card key={task._id} className="mb-4" style={{ width: "100%" }}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <strong>Task Details for User: </strong>{task.users.name}
                  </Card.Title>
                </Col>
                <Col>
                  <Card.Text>
                    <strong>task:</strong> {task.task}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <strong>Task Created At:</strong> {task.taskCreatedat || "N/A"}
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    <strong>Task Start Time:</strong> {task.taskstarttime || "N/A"}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <strong>Task Stop Time:</strong> {task.taskstoptime || "N/A"}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <strong>Interval Time:</strong> {task.intervaltime || "N/A"}
                  </Card.Text>
                </Col>
              </Row>
              <Row>
  <Col>
    <Card.Text>
      <strong>Suggestions:</strong>
      <div
        style={{
          border: "1px solid Aqua",
          padding: "15px", // Increased padding for better spacing
          borderRadius: "5px",
          minHeight: "300px", // Set a minimum height
          fontSize: "1.1rem", // Adjust font size for better readability
        }}
      >
        {task.suggestions || "N/A"}
      </div>
    </Card.Text>
  </Col>
</Row>

              <Row>
                <Col>
                  <Card.Text>
                    <strong>Previous Task Status:</strong> {task.taskstatus || "N/A"}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <strong>Admin Suggestions:</strong>
                    <Form.Control
                      type="text"
                      value={updates[task._id]?.adminsuggestions || ""}
                      onChange={(e) =>
                        handleInputChange(task._id, "adminsuggestions", e.target.value)
                      }
                    />
                  </Card.Text>
                  <Card.Text>
                    <strong>Admin Task Status:</strong>
                    <Form.Control
                      as="select"
                      value={updates[task._id]?.taskstatus || ""}
                      onChange={(e) =>
                        handleInputChange(task._id, "taskstatus", e.target.value)
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending">Pending</option>
                    </Form.Control>
                  </Card.Text>
                </Col>
              </Row>
              <Button
                variant="primary"
                onClick={() =>
                  handleSubmit(task._id, task.users._id, task.projectid._id)
                }
              >
                Submit Updates
              </Button>
            </Card.Body>
          </Card>
        ))}

        <div className="mt-5">
        
        

          {oldTasks.map((oldTask) => (
            
            <Card key={oldTask.id} className="mb-4" style={{ width: "100%" }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>
                      <strong>Task Details for User: {oldTask.userName}</strong>
                    </Card.Title>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>Project Name:</strong> {oldTask.projectName}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>task:</strong> {oldTask.task}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>Old Task Created At:</strong> {oldTask.oldtaskCreatedAt || "N/A"}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      <strong>Task Start Time:</strong> {oldTask.taskStartTime || "N/A"}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>Task Stop Time:</strong> {oldTask.taskStopTime || "N/A"}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>Interval Time:</strong> {oldTask.intervalTime || "N/A"}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
  <Col>
    <Card.Text>
      <strong>Suggestions:</strong>
      <div
        style={{
          border: "1px solid Aqua",
          padding: "15px",
          borderRadius: "5px",
          minHeight: "300px", // Set a minimum height
          fontSize: "1.1rem",
        }}
      >
        {oldTask.suggestions || "N/A"}
      </div>
    </Card.Text>
  </Col>
</Row>

                <Row>
                  <Col>
                    <Card.Text>
                      <strong>Task Status:</strong> {oldTask.taskStatus || "N/A"}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>Admin Suggestions:</strong> {oldTask.adminsuggestions || "N/A"}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskTable;






// const { projectid, users, projectname } = useParams();
// const [taskData, setTaskData] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);
// const navigate = useNavigate();
// console.log("projectname in usertable",projectname);
// useEffect(() => {
//     const fetchTasks = async () => {
//         try {
//             const response = await getUserTask(projectname);
       
            
//             if (response && response.success && response.task) {
//                 setTaskData(response.task);
//             } else {
//                 setTaskData([]);
//             }
//         } catch (err) {
//             setError('Error fetching tasks');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchTasks();
// }, [projectid, users]);

// const handleEdit = (task) => {
//     navigate('/updatetask', {
//         state: {
//             projectid,
//             id: users,
//             taskid: task._id,
//             task: task.task,
//             taskstatus: task.taskstatus,
//             taskstarttime: task.taskstarttime,
//             taskstoptime: task.taskstoptime,
//             intervaltime: task.intervaltime,
//         },
//     });
// };

// const handleDelete = async (taskid) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//         try {
//             const response = await deletedTaskAdmin(users, projectid, taskid);
//             if (response && response.success) {
//                 alert('Task deleted successfully');
//                 setTaskData(taskData.filter((task) => task._id !== taskid));  // Remove deleted task from state
//             } else {
//                 alert('Failed to delete task');
//             }
//         } catch (error) {
//             console.error('Error deleting task:', error);
//         }
//     }
// };

// if (loading) {
//     return <div>Loading...</div>;
// }

// if (error) {
//     return <div>{error}</div>;
// }

// return (
//     <div>
//         <h2>{`Project: ${projectname}`}</h2>
//         <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
//             <thead>
//                 <tr style={{ borderBottom: '1px solid black' }}>
//                     <th style={{ border: '1px solid black' }}>Task no</th>
//                     <th style={{ border: '1px solid black' }}>Created Date</th>
//                     <th style={{ border: '1px solid black' }}>Task</th>
//                     <th style={{ border: '1px solid black' }}>Taskdetailes</th>
//                     <th style={{ border: '1px solid black' }}>Task Status</th>
//                     <th style={{ border: '1px solid black' }}>Start Time</th>
//                     <th style={{ border: '1px solid black' }}>Stop Time</th>
//                     <th style={{ border: '1px solid black' }}>Interval Time</th>
//                     <th style={{ border: '1px solid black' }}>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {taskData.length > 0 ? (
//                     taskData.map((task, index) => (
//                         <tr key={task._id} style={{ textAlign: 'center' }}>
//                             <td style={{ border: '1px solid black' }}>{index + 1}</td>
//                             <td style={{ border: '1px solid black' }}>{task.taskCreatedat}</td>

//                             <td style={{ border: '1px solid black' }}>{task.task}</td>
//                             <td style={{ border: '1px solid black' }}>{task.suggestions}</td>


//                             <td style={{ border: '1px solid black' }}>{task.taskstatus}</td>
//                             <td style={{ border: '1px solid black' }}>{task.taskstarttime}</td>
//                             <td style={{ border: '1px solid black' }}>{task.taskstoptime}</td>
//                             <td style={{ border: '1px solid black' }}>{task.intervaltime}</td>
//                             <td style={{ border: '1px solid black' }}>
//                                 <FaEdit
//                                     style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
//                                     onClick={() => handleEdit(task)}
//                                 />
//                                 <FaTrash
//                                     style={{ cursor: 'pointer', color: 'red' }}
//                                     onClick={() => handleDelete(task._id)}
//                                 />
//                             </td>
//                         </tr>
//                     ))
//                 ) : (
//                     <tr>
//                         <td colSpan="8" style={{ textAlign: 'center', border: '1px solid black' }}>
//                             No tasks found.
//                         </td>
//                     </tr>
//                 )}
//             </tbody>
//         </table>
//     </div>
// );

