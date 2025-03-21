import axios from 'axios'


const PORT=process.env.REACT_APP_API_KEY

export const Registerfun=async(name,email,password,role)=>{
    try {
        console.log("from instance",name,email,password,role);
        console.log(process.env.REACT_APP_API_KEY);
        
        
        
        const result=await axios.post(`${PORT}user/registeruser`,{name,email,password})
        if(result){
        console.log(result);
            
        }


    } catch (error) {
        console.log(error);
        
    }
}

///user/addadmin


export const Addadminfun = async (name, email, password) => {
    try {
        const response = await axios.post(`${PORT}user/registeruser`, {
            name,
            email,
            password,
            
        });

        if (response.data.status) {
            alert(response.data.message); // Success message
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            alert(error.response.data.message); // "Email already exists"
        } else {
            alert("Registration failed. Please try again.");
        }
    }
};

export const Loginfun = async (email, password) => {
    try {
        console.log("Loginfun");
        
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const result = await axios.post(`${PORT}user/loginuser`, { email, password }, config);
  
      const token = result.data.token;
      console.log("Token from login:", token);
  
      if (token) {
        localStorage.setItem('token', token);
        console.log("Token stored in localStorage:", localStorage.getItem('token'));
        return true; // Indicate successful login
      } else {
        localStorage.removeItem('token');
        console.log('Token removed from localStorage.');
        return false; // Indicate login failure
      }
    } catch (error) {
      console.log('Error during login API call:', error);
      return false;
    }
  };
  

export const Logoutfun = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,  // Ensure cookies are sent along with the request
        };

        // Make the API call to logout
        const result = await axios.get(`${PORT}user/logout`, config);  // Change URL to /logout

        if (result) {
            console.log("Logout successful", result);

            // Remove the token from localStorage
            localStorage.removeItem('token');
            console.log("Token removed from localStorage");

            // Optionally, handle any client-side redirect or state update after logout
            // For example, redirect to the login page:
            // window.location.href = '/login';  // or use a routing library like react-router
        }
    } catch (error) {
        console.log(error);
    }
};

//getuserdetailes

export const getUserDetaiels = async () => {
    try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        console.log("token from usedetailes", token);

        if (!token) {
            console.log("No token found");
            return null;  // Return null if no token is found
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,  // Attach token in the Authorization header
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if needed)
        };

        const result = await axios.get(`${PORT}user/userdetailes`, config);
        console.log("result api",result);
        

        if (result) {
            console.log("User details:", result.data);  // Ensure you're logging the response data
            return result.data;  // Return the result data
        }
    } catch (error) {
        console.log("user details error", error);
        return null;  // Return null in case of error
    }
}

//showuser
export const getAllUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${PORT}user/getAllUserDetailsAlldata`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
export const Addtask = async (users, projectid, task, tasknumber) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found");
            return null;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        const result = await axios.post(
            `${PORT}task/createtask/${projectid}/${users}`,
            { task, tasknumber }, // Include tasknumber in the request body
            config
        );

        console.log("Result from API:", result);
        return result;
    } catch (error) {
        console.error("Error in Addtask API call:", error);
        throw error;
    }
};


//updatetaskby admin

///updatetask/:id/:projectid/:taskid

//taskid,adminsuggestions,id,projectid
export const updateAdminTask = async (id, taskstatus, projectid, taskid, adminsuggestions) => {
    try {
      console.log("Payload being sent:", { id, taskstatus, projectid, taskid, adminsuggestions });
  
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return null;
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
  
      const result = await axios.put(
        `${PORT}task/updatetask/${id}/${projectid}/${taskid}`,
        { adminsuggestions, taskstatus },
        config
      );
  
      console.log("Response from API:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error in API call:", error);
      return null;
    }
  };

  export const getOldtaskdetaiels = async (projectname) => {
    try {
      console.log("Payload being sent:", { projectname });
  
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return null;
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
  
      const result = await axios.get(
        `${PORT}olddetaiels/getoldprojectdetaiels/${projectname}`,
        
        config
      );
  
      console.log("Response from API:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error in API call:", error);
      return null;
    }
  };

  

//deleteproject

export const deletedProjectAdmin = async (id) => {
    try {
        const token = localStorage.getItem('token');  // Get token from localStorage
        if (!token) {
            console.log("No token found");
            return null;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
        };

        // Send the DELETE request
        ///deleteproject/:id
        const response = await axios.delete(`${PORT}project/deleteproject/${id}`, config);


        
        return response;
    } catch (error) {
        console.error("Error deleting task:", error);
        return null;  // Handle error
    }
};



export const Addprojects = async (projectData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found");
            return null;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        const result = await axios.post(
            `${PORT}project/createproject`,
            projectData, // Send project data with project name and user IDs
            config
        );

        console.log("Result from API:", result);
        return result;
    } catch (error) {
        console.error("Error in Addprojects API call:", error);
        throw error;
    }
};




///deletetask/:id/:projectid/:taskid

export const deletedTaskAdmin = async (userId, projectId, taskId) => {
    try {
        const token = localStorage.getItem('token');  // Get token from localStorage
        if (!token) {
            console.log("No token found");
            return null;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
        };

        // Send the DELETE request
        const response = await axios.delete(`${PORT}/task/deletetask/${userId}/${projectId}/${taskId}`, config);
        
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        return null;  // Handle error
    }
};



//getetask
export const getUserTask = async (projectname) => {
    console.log("Before request, projectname:", projectname);

    try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
            console.log("No token found");
            return null; // Return null if no token is found
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Attach token in the Authorization header
            },
            withCredentials: true, // Ensure cookies are sent with the request (if needed)
        };

        // Append projectname as a query parameter to the URL
        const result = await axios.get(`${PORT}user/getAllUserDetailsByProject?projectname=${projectname}`, config);

        console.log("Result from API:", result);

        if (result && result.data.success) {
            console.log("User task details from API:", result.data.task); // Correctly log the task array
            return result.data; // Return the full response, including success and task
        } else {
            console.log("No success field or task data in response.");
            return { success: false, task: [] }; // Return empty task array in case of failure
        }
    } catch (error) {
        console.error("Error fetching user task details:", error);
        return { success: false, task: [] }; // Return empty task array in case of error
    }
};



                          //users

export const getSingleUserTask = async () => {
    try {
        

        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
            console.log("No token found");
            return null; // Return null if no token is found
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Attach token in the Authorization header
            },
            withCredentials: true, // Ensure cookies are sent with the request (if needed)
        };

        const result = await axios.get(`${PORT}task/getUserTaskAndProject`, config);
        console.log("result from API", result); // Log the correct structure of the response
        return result; // Return the array of tasks
    } catch (error) {
        console.error(error);
        return null; // Handle error and return null
    }
};


//updateusertask
//:id/:projectid/:taskid

//taskstatus, taskstarttime, taskstoptime, suggestions,intervaltime
export const updateSingleUserTask = async (id, taskid, projectid, taskstatus, taskstarttime, taskstoptime, intervaltime, suggestions) => {
    try {
        console.log("id",id);
        
        console.log("id, taskid, projectid", id, taskid, projectid, taskstatus, taskstarttime, taskstoptime, intervaltime, suggestions);

        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found");
            return null;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
        };

        // Ensure IDs are valid strings
        if (typeof id !== 'string' || typeof taskid !== 'string' || typeof projectid !== 'string') {
            console.error("Invalid ID format");
            return null;
        }

        // Log the values before making the request to ensure they are correct
        console.log("Making API call with these values:");
        console.log("userId:", id, "projectId:", projectid, "taskId:", taskid);

        // Send the request
        const result = await axios.put(
            `${PORT}task/updatetaskuser/${id}/${projectid}/${taskid}`,
            { 
                taskstatus, 
                taskstarttime, 
                taskstoptime, 
                intervaltime, 
                suggestions 
            },
            config
        );

        console.log("result from API", result.data);
        return result.data.user; // If you want to return something else, modify accordingly
    } catch (error) {
        console.error("Error updating task:", error);
        return null;
    }
};