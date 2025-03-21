import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaTasks, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deletedProjectAdmin } from '../Utiles/api';

function UserTable() {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const navigates = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUsers();
                if (data) {
                    const groupedData = data.reduce((acc, user) => {
                        user.projects.forEach((project) => {
                            if (!acc[project.project]) {
                                acc[project.project] = {
                                    projectId: project._id,
                                    projectName: project.project,
                                    projectCreatedat: project.projectCreatedat,
                                    users: [],
                                };
                            }
                            acc[project.project].users.push({
                                name: user.user.name,
                                email: user.user.email,
                                userId: user.user._id,
                            });
                        });
                        return acc;
                    }, {});
                    setProjectData(Object.values(groupedData));
                } else {
                    console.log('No user data found.');
                }
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTaskClick = (userId, username, projectId, projectName) => {
        navigate(`/Addtask/${userId}/${username}/${projectName}/${projectId}`);
    };

    const handleTaskViewClick = (userId, projectId, projectName) => {
        console.log(`View tasks for project ID: ${projectId}, user ID: ${userId}, and project name: ${projectName}`);
        navigate(`/taskTable/${projectId}/${userId}/${projectName}`);
    };

    const handleDeleteProject = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deletedProjectAdmin(projectId);
                setProjectData((prevData) =>
                    prevData.filter((project) => project.projectId !== projectId)
                );
            } catch (err) {
                console.error('Error deleting project:', err);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
                  <h2 onClick={()=>{navigates('/Adminhome')}} style={{ textAlign: 'center', marginBottom: '20px' }}>Usertasble</h2>

            <Table striped bordered hover>
                <thead style={{ backgroundColor: 'green', color: 'white' }}>
                    <tr>
                        <th>S.No</th>
                        <th>Project Name</th>
                        <th>Users</th>
                        <th>Project Created Date</th>
                        <th>Create Task</th>
                        <th>Delete Project</th>
                    </tr>
                </thead>
                <tbody>
                    {projectData.length > 0 ? (
                        projectData.map((project, index) => (
                            <tr key={project.projectId}>
                                <td>{index + 1}</td>
                                <td style={{ cursor: 'pointer', color: '#000' }}
                                        onClick={() =>
                                            handleTaskViewClick(
                                                project.users[0]?.userId,
                                                project.projectId,
                                                project.projectName
                                            )
                                        }>
                                    
            
                                        {project.projectName}
                                
                                </td>
                                <td>
                                    {project.users.map((user, idx) => (
                                        <div key={idx}>{user.name}</div>
                                    ))}
                                </td>
                                <td>{project.projectCreatedat}</td>
                                <td>
                                    {project.users.map((user) => (
                                        <div key={user.userId}>
                                            <FaTasks
                                                style={{ cursor: 'pointer', color: '#007bff', marginRight: '5px' }}
                                                onClick={() =>
                                                    handleTaskClick(
                                                        user.userId,
                                                        user.name,
                                                        project.projectId,
                                                        project.projectName
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <FaTrash
                                        style={{ cursor: 'pointer', color: 'red' }}
                                        onClick={() => handleDeleteProject(project.projectId)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No projects found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default UserTable;


// const handleTaskClick = (users, project, projectid) => {
//     console.log(`Task icon clicked for user ID: ${users}, project: ${project}, projectId: ${projectid}`);
//     if (project && projectid) {
//         navigate(`/Addtask/${users}/${project}/${projectid}`);
//     } else {
//         console.error("Project or Project ID is undefined");
//     }
// };

// <div
// key={project._id}
// style={{ cursor: 'pointer', color: '#000' }}
// onClick={() => handleTaskViewClick(user.user._id, project._id, project.project || project.name)}
// >

// import React, { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import { FaTasks, FaTrash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { getAllUsers, deletedProjectAdmin } from '../Utiles/api';

// function UserTable() {
//     const [projectData, setProjectData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await getAllUsers();
//                 if (data) {
//                     // Group users by project name
//                     const groupedData = data.reduce((acc, user) => {
//                         user.projects.forEach((project) => {
//                             if (!acc[project.project]) {
//                                 acc[project.project] = {
//                                     projectId: project._id,
//                                     projectName: project.project,
//                                     projectCreatedat: project.projectCreatedat,
//                                     users: [],
//                                 };
//                             }
//                             acc[project.project].users.push({
//                                 name: user.user.name,
//                                 email: user.user.email,
//                                 userId: user.user._id,
//                             });
//                         });
//                         return acc;
//                     }, {});
//                     setProjectData(Object.values(groupedData));
//                 } else {
//                     console.log('No user data found.');
//                 }
//             } catch (err) {
//                 console.error('Error fetching user details:', err);
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleTaskClick = (userId, projectId, projectName) => {
//         navigate(`/Addtask/${userId}/${projectName}/${projectId}`);
//     };

//     const handleTaskViewClick = (userId, projectId, projectName) => {
//         navigate(`/taskTable/${projectId}/${userId}/${projectName}`);
//     };

//     const handleDeleteProject = async (projectId) => {
//         if (window.confirm('Are you sure you want to delete this project?')) {
//             try {
//                 await deletedProjectAdmin(projectId);
//                 setProjectData((prevData) =>
//                     prevData.filter((project) => project.projectId !== projectId)
//                 );
//             } catch (err) {
//                 console.error('Error deleting project:', err);
//             }
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <Table striped bordered hover>
//             <thead style={{ backgroundColor: 'green', color: 'white' }}>
//                 <tr>
//                     <th>S.No</th>
//                     <th>Project Name</th>
//                     <th>Users</th>
//                     <th>Project Created Date</th>
//                     <th>Create Task</th>
//                     <th>Delete Project</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {projectData.length > 0 ? (
//                     projectData.map((project, index) => (
//                         <tr key={project.projectId}>
//                             <td>{index + 1}</td>
//                             <td>{project.projectName}</td>
//                             <td>
//                                 {project.users.map((user, idx) => (
//                                     <div key={idx} onClick={handelsend}>
//                                         {user.name} 
//                                     </div>
//                                 ))}
//                             </td>
//                             <td>{project.projectCreatedat}</td>
//                             <td>
//                                 {project.users.map((user) => (
//                                     <FaTasks
//                                         key={user.userId}
//                                         style={{ cursor: 'pointer', color: '#007bff', marginRight: '5px' }}
//                                         onClick={() => handleTaskClick(user.userId, project.projectId, project.projectName)}
//                                     />
//                                 ))}
//                             </td>
//                             <td>
//                                 <FaTrash
//                                     style={{ cursor: 'pointer', color: 'red' }}
//                                     onClick={() => handleDeleteProject(project.projectId)}
//                                 />
//                             </td>
//                         </tr>
//                     ))
//                 ) : (
//                     <tr>
//                         <td colSpan="6">No projects found.</td>
//                     </tr>
//                 )}
//             </tbody>
//         </Table>
//     );
// }

// export default UserTable;
