import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { fetchTasks } from './api';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const tasks = await fetchTasks();
    setTasks(tasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <TaskForm onTaskAdded={loadTasks} />
      <TaskList tasks={tasks} onTaskDeleted={loadTasks} />
    </div>
  );
};

export default App;
