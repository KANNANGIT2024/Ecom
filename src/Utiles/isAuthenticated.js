import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserDetaiels } from './api'; // Adjust the path accordingly

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await getUserDetaiels();
                if (profileData && profileData.user) {
                    console.log("profileData", profileData.user.role);
                    setUser(profileData.user);  // Set user data correctly
                } else {
                    console.log("no profileData");
                    setUser(null);  // Handle the case when no profile data is returned
                }
            } catch (err) {
                console.error('Failed to fetch user profile:', err);
                setError(err.message);  // Set error message if fetching fails
            } finally {
                setLoading(false);  // Stop loading when done
            }
        };
    
        fetchUserProfile();
    }, []);
    

    // Show a loading indicator while fetching user data
    if (loading) {
        return <div>Loading...</div>; // Replace with a spinner if needed
    }

    // Show an error message if fetching user data fails
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if user is authenticated
    if (!user ) {
        console.log("user from isauth",user);
        
        return <Navigate to="/" />; // Redirect to login if not authenticated
    }

    // Check if user role is allowed
    const isRoleAllowed = allowedRoles ? allowedRoles.includes(user.role) : true;

    if (!isRoleAllowed) {
        return <div>Unauthorized access.</div>; // Redirect to unauthorized if role not allowed
    }

    // If user is authenticated and has a valid role, render the children components
    return <>{children}</>;
};

export default ProtectedRoute;
