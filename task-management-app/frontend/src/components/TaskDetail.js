import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      // Use direct API call with explicit URL
      const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTask(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching task:', err);
      setError('Error fetching task details. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Use direct API call with explicit URL
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        navigate('/');
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

  if (loading) return <div>Loading task details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!task) return <div>Task not found.</div>;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" className="btn btn-primary">Back to Tasks</Link>
      </div>

      <div className="task-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>{task.title}</h2>
        <span className={`status ${getStatusClass(task.status)}`}>
          {task.status}
        </span>

        <div style={{ marginTop: '20px' }}>
          <h3>Description</h3>
          <p>{task.description || 'No description provided.'}</p>
        </div>

        {task.dueDate && (
          <div style={{ marginTop: '20px' }}>
            <h3>Due Date</h3>
            <p>{new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <Link to={`/edit/${task.id}`} className="btn btn-success">
            Edit Task
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            style={{ marginLeft: '10px' }}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;