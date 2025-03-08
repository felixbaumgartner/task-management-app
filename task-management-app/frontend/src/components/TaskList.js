import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Use direct API call with explicit URL
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Error fetching tasks. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Use direct API call with explicit URL
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
        setError('Error deleting task. Please try again later.');
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Tasks</h2>
        <Link to="/add" className="btn btn-primary">Add New Task</Link>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks found. Create a new task to get started!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <span className={`status ${getStatusClass(task.status)}`}>
                {task.status}
              </span>
              <p>{task.description}</p>
              {task.dueDate && (
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              )}
              <div style={{ marginTop: '15px' }}>
                <Link to={`/task/${task.id}`} className="btn btn-primary">
                  View
                </Link>
                <Link to={`/edit/${task.id}`} className="btn btn-success">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;