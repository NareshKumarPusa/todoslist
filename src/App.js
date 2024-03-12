import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState('');

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleAddTask = () => {
        const taskParts = newTask.split(' ');
        const taskName = taskParts.slice(0, -1).join(' ');
        const taskCount = parseInt(taskParts[taskParts.length - 1]);

        if (!taskName || isNaN(taskCount) || taskCount <= 0) {
            alert('Please enter a valid task in the format "TaskName Count"');
            return;
        }

        const newTasks = Array.from({ length: taskCount }, (_, index) => ({
            id: tasks.length + index,
            name: taskName,
            count: 0,
        }));

        setTasks([...tasks, ...newTasks]);
        setNewTask('');
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleEditTask = (taskId) => {
        setEditingTaskId(taskId);
        setEditedTaskName(tasks.find(task => task.id === taskId).name);
    };

    const handleUpdateTask = () => {
        setTasks(tasks.map(task => {
            if (task.id === editingTaskId) {
                return {
                    ...task,
                    name: editedTaskName,
                    count: task.count + 1
                }; // Increment count when task is updated
            }
            return task;
        }));
        setEditingTaskId(null);
        setEditedTaskName('');
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditedTaskName('');
    };

    return (
        <div className="App">
            <h1>Day Goals</h1>
            <div className="task-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Add a todo"
                />
                <button onClick={handleAddTask}>Add Todo</button>
            </div>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id}>
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTaskName}
                                    onChange={(e) => setEditedTaskName(e.target.value)}
                                />
                                <button className="save-btn" onClick={handleUpdateTask}>Save</button>
                                <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span>{task.name} - Updated {task.count} times</span>
                                <span className="edit-icon" onClick={() => handleEditTask(task.id)}>✏️</span>
                                <span className="delete-icon" onClick={() => handleDeleteTask(task.id)}>❌</span>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
