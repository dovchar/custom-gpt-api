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

import React, { useState } from 'react';
import { createTask } from './api';

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;
    await createTask({ name: task });
    setTask('');
    onTaskAdded();
  };

  return (
    <div className="bg-white max-w-md mx-auto rounded shadow-lg p-6 mt-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <form onSubmit={handleSubmit} className="flex justify-between">
        <input 
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter todo"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <button type="submit" className="ml-2 bg-black text-white rounded px-4 py-2 hover:bg-gray-700 focus:outline-none focus:shadow-outline">
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="bg-white max-w-md mx-auto rounded shadow-lg p-6 mt-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">TODO</h2>
        <div className="mt-2">
          {tasks.filter(task => !task.completed).map((task) => (
            <div key={task.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className="mr-2"
                />
                <span className="text-sm">{task.name}</span>
              </div>
              <div>
                <button onClick={() => onEdit(task.id)} className="text-xs text-blue-500 hover:underline mr-2">Edit</button>
                <button onClick={() => onDelete(task.id)} className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">COMPLETED</h2>
        <div className="mt-2">
          {tasks.filter(task => task.completed).map((task) => (
            <div key={task.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className="mr-2"
                />
                <span className="text-sm line-through">{task.name}</span>
              </div>
              <div>
                <button onClick={() => onEdit(task.id)} className="text-xs text-blue-500 hover:underline mr-2">Edit</button>
                <button onClick={() => onDelete(task.id)} className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;

