import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { updateAdminTask } from '../Utiles/api';

function Updatetask() {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectid, id, taskid, task, taskstatus } = location.state;

    // Set default task status to "complete" if no status is passed
    const [updatedTask, setUpdatedTask] = useState(task);
    const [updatedTaskStatus, setUpdatedTaskStatus] = useState(taskstatus || 'complete'); // Default to "complete"

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the updateAdminTask function with individual parameters
            const result = await updateAdminTask(id, updatedTask, updatedTaskStatus, projectid, taskid);
            console.log('Update result:', result);

            if (result.success) {
                alert('Task updated successfully');
                navigate(-1); // Navigate back to the TaskTable
            } else {
                alert('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                backgroundColor: '#f8f9fa',
            }}
        >
               <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Task Table</h2>
            <Card style={{ width: '30rem', padding: '20px' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            value={updatedTask}
                            onChange={(e) => setUpdatedTask(e.target.value)}
                            placeholder="Enter updated task"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Status</Form.Label>
                        <Form.Control
                            value={updatedTaskStatus}
                            onChange={(e) => setUpdatedTaskStatus(e.target.value)}
                            placeholder="Enter updated task status"
                        />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Card>
        </div>
    );
}

export default Updatetask;
