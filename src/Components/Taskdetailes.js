import React, { useEffect, useState } from 'react';
import { Card, Button, Toast, Row, Form } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getUserDetaiels, getSingleUserTask, updateSingleUserTask, Logoutfun } from '../Utiles/api';

const TaskManager = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [profile, setProfile] = useState({});
  const [taskStates, setTaskStates] = useState({});
  const [activeProject, setActiveProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const user = await getUserDetaiels();
      if (user && user.user) {
        setProfile(user.user);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchTasks = async () => {
    if (profile._id) {
      try {
        const userTasks = await getSingleUserTask();
        const tasksData = userTasks.data?.tasks || [];
        const projectsData = userTasks.data?.projects || [];
        setTasks(tasksData);
        setProjects(projectsData);

        const initialTaskStates = tasksData.reduce((acc, task) => {
          acc[task._id] = {
            taskStatus: '',
            startTime: null,
            stopTime: null,
            playTime: null,
            pushTime: null,
            intervalTime: null,
            suggestion: '',
          };
          return acc;
        }, {});
        setTaskStates(initialTaskStates);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  };

  const handleLogout = () => {
    Logoutfun();
    navigate('/login');
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (profile._id) {
      fetchTasks();
    }
  }, [profile]);

  const handleStartTask = async (task) => {
    const startTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setTaskStates((prevStates) => ({
      ...prevStates,
      [task._id]: { 
        ...prevStates[task._id], 
        startTime 
      },
    }));

    await updateSingleUserTask(
      profile._id,
      task._id,
      task.projectid,
      '',
      startTime,
      null,
      null,
      taskStates[task._id]?.suggestion || null // Avoid sending empty string
    );
  };

  const handlePushTask = async (task) => {
    const pushTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setTaskStates((prevStates) => ({
      ...prevStates,
      [task._id]: { ...prevStates[task._id], pushTime },
    }));

    await updateSingleUserTask(
      profile._id,
      task._id,
      task.projectid,
      taskStates[task._id]?.taskStatus,
      taskStates[task._id]?.startTime,
      null,
      null,
      taskStates[task._id]?.suggestion || null // Avoid sending empty string
    );
  };
  const handlePlayTask = async (task) => {
    const playTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const previousPushTime = taskStates[task._id]?.pushTime;
    
    if (previousPushTime) {
      const duration = moment.duration(moment(playTime).diff(moment(previousPushTime)));
      let formattedInterval;
  
      if (duration.asHours() >= 1) {
        formattedInterval = `${Math.floor(duration.asHours())} hrs`;
      } else if (duration.asMinutes() >= 1) {
        formattedInterval = `${Math.floor(duration.asMinutes())} minutes`;
      } else {
        formattedInterval = `${Math.floor(duration.asSeconds())} seconds`;
      }
  
      setTaskStates((prevStates) => ({
        ...prevStates,
        [task._id]: { ...prevStates[task._id], playTime, intervalTime: formattedInterval },
      }));
  
      await updateSingleUserTask(
        profile._id,
        task._id,
        task.projectid,
        taskStates[task._id]?.taskStatus,
        taskStates[task._id]?.startTime,
        null,
        formattedInterval,
        taskStates[task._id]?.suggestion || null // Avoid sending empty string
      );
    } else {
      console.error('Push time is not available to calculate interval time.');
    }
  };
  
  const handleStopTask = async (task) => {
    const stopTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setTaskStates((prevStates) => ({
      ...prevStates,
      [task._id]: { 
        ...prevStates[task._id], 
        stopTime 
      },
    }));

    await updateSingleUserTask(
      profile._id,
      task._id,
      task.projectid,
      taskStates[task._id]?.taskStatus,
      taskStates[task._id]?.startTime,
      stopTime,
      taskStates[task._id]?.intervalTime,
      taskStates[task._id]?.suggestion || null // Avoid sending empty string
    );
  };

  const handleTaskStatusChange = async (task, status) => {
    const stopTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const intervalTime = taskStates[task._id]?.intervalTime || '';
    setTaskStates((prevStates) => ({
      ...prevStates,
      [task._id]: { ...prevStates[task._id], taskStatus: status, stopTime },
    }));

    try {
      const result = await updateSingleUserTask(
        profile._id,
        task._id,
        task.projectid,
        status,
        taskStates[task._id]?.startTime,
        stopTime,
        intervalTime,
        taskStates[task._id]?.suggestion || null // Avoid sending empty string
      );
      if (result) {
        console.log(`Task ${task.tasknumber} updated successfully with status ${status}.`);
      }
    } catch (error) {
      console.error(`Error updating task ${task.tasknumber}:`, error);
    }
  };

  const handleSuggestionChange = (task, suggestion) => {
    setTaskStates((prevStates) => ({
      ...prevStates,
      [task._id]: { ...prevStates[task._id], suggestion },
    }));
  };

  const handleSubmitSuggestion = async (task) => {
    const updatedState = taskStates[task._id];
    const { taskStatus, startTime, stopTime, intervalTime, suggestion } = updatedState;
    try {
      const result = await updateSingleUserTask(
        profile._id,
        task._id,
        task.projectid,
        taskStatus,
        startTime,
        stopTime,
        intervalTime,
        suggestion || null // Avoid sending empty string
      );
      if (result) {
        console.log(`Suggestion for Task ${task.tasknumber} submitted successfully.`);
      }
    } catch (error) {
      console.error(`Error submitting suggestion for task ${task.tasknumber}:`, error);
    }
  };

  const renderTaskToasts = () => {
    if (!activeProject) return null;

    const projectTasks = tasks.filter((task) => task.projectid === activeProject);

    return projectTasks.map((task) => (
      <Toast key={task._id} style={{ width: '100%' }} className="mb-3">
        <Toast.Body>
          <div >
            <label>
              <h3><strong>
                Task:
              </strong></h3>
            </label>

          {/* <p style={{padding:'10px'}}>{task.task}</p> */}
          <h5 style={{padding:'10px'}}>{task.task}</h5>
          </div>
          
          
          <div className="d-flex justify-content-around mt-2">
            <Button size="sm" style={{borderColor: "green", borderWidth: "2px", borderStyle: "solid"}} variant="light" onClick={() => handleStartTask(task)}>Start</Button>
            <Button size="sm" style={{borderColor: "red", borderWidth: "2px", borderStyle: "solid"}} variant="light" onClick={() => handlePushTask(task)}>Pass</Button>
            <Button size="sm" style={{borderColor: "green", borderWidth: "2px", borderStyle: "solid"}} variant="light" onClick={() => handlePlayTask(task)}>Play</Button>
            <Button size="sm" style={{borderColor: "red", borderWidth: "2px", borderStyle: "solid"}} variant="light" onClick={() => handleStopTask(task)}>Stop</Button>
          </div>
          <div className="d-flex justify-content-around mt-2">
            <Button size="sm" variant="primary" onClick={() => handleTaskStatusChange(task, 'Perseverance')}>Perseverance</Button>
            <Button size="sm" variant="success" onClick={() => handleTaskStatusChange(task, 'Progress')}>Progress</Button>
            <Button size="sm" variant="info" onClick={() => handleTaskStatusChange(task, 'Done')}>Done</Button>
          </div>
          <div className="mt-2">

          <div>
          <label>
              <h3><strong>
                Adminsuggestions:
              </strong></h3>
            </label>
  <div style={{border:'2px solid blue'}}>{task.adminsuggestions||"N/A"}</div>
</div>

            <Form.Group controlId={`suggestion-${task._id}`}>
              <Form.Label> <label>
              <h3><strong>
                Taskdetailes
              </strong></h3>
            </label></Form.Label>
              <Form.Control
                type="text"
                style={{padding:"50PX", justifyContent:'start' }}
                placeholder="Enter the taskdetailes"
                value={taskStates[task._id]?.suggestion || ''}
                onChange={(e) => handleSuggestionChange(task, e.target.value)}
              />
              <Button variant="primary" size="sm" className="mt-2" onClick={() => handleSubmitSuggestion(task)}>Submit</Button>
            </Form.Group>
          </div>
        </Toast.Body>
      </Toast>
    ));
  };

  const handleProjectSelect = (projectId) => {
    setActiveProject((prevActiveProject) => (prevActiveProject === projectId ? null : projectId));
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <Card style={{ width: '18rem' }} className="mb-4">
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>{profile.email}</Card.Text>
          <Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleLogout}>Logout</Button>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-around mb-4">
        {projects.map((project) => (
          <Button key={project._id} variant="secondary" onClick={() => handleProjectSelect(project._id)}>
            {project.project}
          </Button>
        ))}
      </div>
      <Row className="justify-content-center">{renderTaskToasts()}</Row>
    </div>
  );
};

export default TaskManager;



//
// import React, { useEffect, useState } from 'react';
// import { Card, Button, Toast, Row, Col, Form } from 'react-bootstrap';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { getUserDetaiels, getSingleUserTask, updateSingleUserTask, Logoutfun } from '../Utiles/api';

// const TaskManager = () => {
//   const navigate=useNavigate()
//   const [tasks, setTasks] = useState([]);
//   const [profile, setProfile] = useState({});
//   const [taskStates, setTaskStates] = useState({});
//   const [activeProject, setActiveProject] = useState(null);
//   const [projects, setProjects] = useState([]);

//   const fetchUserDetails = async () => {
//     try {
//       const user = await getUserDetaiels();
//       if (user && user.user) {
//         setProfile(user.user);
//       }
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

//   const fetchTasks = async () => {
//     if (profile._id) {
//       try {
//         const userTasks = await getSingleUserTask();
//         const tasksData = userTasks.data?.tasks || [];
//         const projectsData = userTasks.data?.projects || [];
//         setTasks(tasksData);
//         setProjects(projectsData);

//         const initialTaskStates = tasksData.reduce((acc, task) => {
//           acc[task._id] = {
//             taskStatus: 'Pending',
//             startTime: null,
//             stopTime: null,
//             playTime: null,
//             pushTime: null,
//             intervalTime: null,
//             suggestion: '',
//           };
//           return acc;
//         }, {});
//         setTaskStates(initialTaskStates);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     }
//   };
//   const handleLogout=()=>{
//     Logoutfun()
//     navigate('/login')

//   }

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   useEffect(() => {
//     if (profile._id) {
//       fetchTasks();
//     }
//   }, [profile]);

//   const handleStartTask = (task) => {
//     const startTime = moment().format('YYYY-MM-DD HH:mm:ss');
//     setTaskStates((prevStates) => ({
//       ...prevStates,
//       [task._id]: { ...prevStates[task._id], taskStatus: 'In Progress', startTime },
//     }));
//   };

//   const handlePushTask = (task) => {
//     const pushTime = moment().format('YYYY-MM-DD HH:mm:ss');
//     setTaskStates((prevStates) => ({
//       ...prevStates,
//       [task._id]: { ...prevStates[task._id], pushTime },
//     }));
//   };

//   const handlePlayTask = (task) => {
//     const playTime = moment().format('YYYY-MM-DD HH:mm:ss');
//     const intervalTime = moment(playTime).diff(moment(taskStates[task._id]?.pushTime), 'seconds');
//     setTaskStates((prevStates) => ({
//       ...prevStates,
//       [task._id]: { ...prevStates[task._id], playTime, intervalTime: `${intervalTime} seconds` },
//     }));
//   };

//   const handleStopTask = (task) => {
//     const stopTime = moment().format('YYYY-MM-DD HH:mm:ss');
//     setTaskStates((prevStates) => ({
//       ...prevStates,
//       [task._id]: { ...prevStates[task._id], taskStatus: 'Completed', stopTime },
//     }));
//   };

//   const handleTaskStatusChange = (task, status) => {
//     setTaskStates((prevStates) => ({
//       ...prevStates,
//       [task._id]: { ...prevStates[task._id], taskStatus: status },
//     }));
//   };

//   const handleSuggestionChange = (task, suggestion) => {
//     setTaskStates((prevStates) => ({
//       ...prevStates,
//       [task._id]: { ...prevStates[task._id], suggestion },
//     }));
//   };

//   const handleSubmitSuggestion = async (task) => {
//     const updatedState = taskStates[task._id];
//     try {

//    const id=   profile._id
//      const taskid=   task._id
//      const projectid=   task.projectid
//       const task=  updatedState.taskStatus
//      const startTime=   updatedState.startTime
//      const stopTime=   updatedState.stopTime
//      const intervalTime  = updatedState.intervalTime
//      const suggestion=   updatedState.suggestion
//       const result = await updateSingleUserTask(
        
//       );
//       if (result) {
//         console.log(`Suggestion for Task ${task.tasknumber} updated successfully.`);
//       }
//     } catch (error) {
//       console.error(`Error updating suggestion for Task ${task.tasknumber}:`, error);
//     }
//   };

//   const renderTaskToasts = () => {
//     if (!activeProject) return null;

//     const projectTasks = tasks.filter((task) => task.projectid === activeProject);

  

//     return projectTasks.map((task) => (
//       <Toast key={task._id} style={{ width: '100%' }} className="mb-3">
//         <Toast.Header>
//           <small>{moment(task.taskCreatedat).format('YYYY-MM-DD HH:mm:ss')}</small>
//         </Toast.Header>
//         <Toast.Body>
//           <p>{task.task}</p>
         
    
//           <div className="d-flex justify-content-around mt-2">
//             <Button
//               size="sm"
//               variant="light"
//               style={{ borderColor: 'green' }}
//               onClick={() => handleStartTask(task)}
//             >
//               Start
//             </Button>
//             <Button
//               size="sm"
//               variant="light"
//               style={{ borderColor: 'red' }}
//               onClick={() => handlePushTask(task)}
//             >
//               Push
//             </Button>
//             <Button
//               size="sm"
//               variant="light"
//               style={{ borderColor: 'green' }}
//               onClick={() => handlePlayTask(task)}
//             >
//               Play
//             </Button>
//             <Button
//               size="sm"
//               variant="light"
//               style={{ borderColor: 'red' }}
//               onClick={() => handleStopTask(task)}
//             >
//               Stop
//             </Button>
//           </div>
//           <div className="d-flex justify-content-around mt-2">
//             <Button size="sm" variant="primary" onClick={() => handleTaskStatusChange(task, 'Perseverance')}>
//               Perseverance
//             </Button>
//             <Button size="sm" variant="success" onClick={() => handleTaskStatusChange(task, 'Progress')}>
//               Progress
//             </Button>
//             <Button size="sm" variant="info" onClick={() => handleTaskStatusChange(task, 'Done')}>
//               Done
//             </Button>
//           </div>
//           <div className="mt-2">
//             {taskStates[task._id]?.taskStatus === 'In Progress' && (
//               <p>
//                 <strong>Start Time:</strong> {taskStates[task._id]?.startTime}
//               </p>
//             )}
//             {taskStates[task._id]?.stopTime && (
//               <p>
//                 <strong>Stop Time:</strong> {taskStates[task._id]?.stopTime}
//                 <br />
//                 <strong>Interval:</strong> {taskStates[task._id]?.intervalTime}
//               </p>
//             )}
//             {taskStates[task._id]?.playTime && (
//               <p>
//                 <strong>Play Time:</strong> {taskStates[task._id]?.playTime}
//                 <br />
//                 {taskStates[task._id]?.intervalTime && (
//                   <>
//                     <strong>Time Interval between Push and Play:</strong> {taskStates[task._id]?.intervalTime}
//                   </>
//                 )}
//               </p>
//             )}
//           </div>
//           <div className="mt-2">
//             <Form.Group controlId={`suggestion-${task._id}`}>
//               <Form.Label>Suggestion</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter suggestion"
//                 value={taskStates[task._id]?.suggestion || ''}
//                 onChange={(e) => handleSuggestionChange(task, e.target.value)}
//               />
//               <Button
//                 variant="primary"
//                 size="sm"
//                 className="mt-2"
//                 onClick={() => handleSubmitSuggestion(task)}
//               >
//                 Submit
//               </Button>
//             </Form.Group>
//           </div>
//         </Toast.Body>
//       </Toast>
//     ));
//   };

//   const handleProjectSelect = (projectId) => {
//     setActiveProject((prevActiveProject) => (prevActiveProject === projectId ? null : projectId));
//   };

//   return (
//     <div className="d-flex flex-column align-items-center mt-4">
//       <Card style={{ width: '18rem' }} className="mb-4">
//         <Card.Body>
//           <Card.Title>{profile.name}</Card.Title>
//           <Card.Text>{profile.email}</Card.Text>
//         <Button style={{backgroundColor:"blue", color:"white"}} onClick={handleLogout}>Logout</Button>
//         </Card.Body>

//       </Card>
//       <div className="d-flex justify-content-around mb-4">
//         {projects.map((project) => (
//           <Button key={project._id} variant="secondary" onClick={() => handleProjectSelect(project._id)}>
//             {project.project}
//           </Button>
//         ))}
//       </div>
//       <Row className="justify-content-center">{renderTaskToasts()}</Row>
//     </div>
//   );
// };

// export default TaskManager;
