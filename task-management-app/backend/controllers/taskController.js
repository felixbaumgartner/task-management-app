 // In-memory tasks array (in a real app, this would be a database)
let tasks = [
    { id: 1, title: 'Complete project setup', description: 'Set up the project structure', status: 'pending', dueDate: '2023-12-31' },
    { id: 2, title: 'Implement backend', description: 'Create Express server with CRUD operations', status: 'in-progress', dueDate: '2023-12-25' }
  ];
  
  // Get all tasks
  exports.getAllTasks = (req, res) => {
    res.json(tasks);
  };
  
  // Get a single task by ID
  exports.getTaskById = (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  };
  
  // Create a new task
  exports.createTask = (req, res) => {
    const { title, description, status, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    // Generate a new ID (in a real app with a DB, this would be handled differently)
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    
    const newTask = {
      id: newId,
      title,
      description: description || '',
      status: status || 'pending',
      dueDate: dueDate || null
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
  };
  
  // Update an existing task
  exports.updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const { title, description, status, dueDate } = req.body;
    
    // Update task properties if provided in the request
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title || tasks[taskIndex].title,
      description: description !== undefined ? description : tasks[taskIndex].description,
      status: status || tasks[taskIndex].status,
      dueDate: dueDate !== undefined ? dueDate : tasks[taskIndex].dueDate
    };
    
    res.json(tasks[taskIndex]);
  };
  
  // Delete a task
  exports.deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const deletedTask = tasks[taskIndex];
    tasks = tasks.filter(task => task.id !== taskId);
    
    res.json(deletedTask);
  };