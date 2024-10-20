"use client"; // Ensure client-side rendering

import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { toast } from "react-toastify";
import { MdCloudDone } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { CgTrash } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";

const TaskListClient = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    // Append new task
    const newTask = {
      title: formValues.title,
      description: formValues.description,
      priority: formValues.priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    e.target.reset();
    toast("Task added successfully!");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    toast("Task deleted successfully!");
  };

  const handleToggleCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    toast("Task status updated!");
  };

  const handleEditTask = (index) => {
    setEditingTask(index);
  };

  const handleSaveEdit = (e, index) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedTask = Object.fromEntries(formData.entries());

    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...updatedTask, completed: task.completed } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div style={{ width: "100%" }}>
      <form action="" className="createTaskForm" onSubmit={handleAddTask}>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Create Task</h1>
        <input type="text" name="title" placeholder="Enter title" required />
        <textarea
          name="description"
          placeholder="Enter description"
          rows="5"
          required
        ></textarea>
        <select name="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">
          <GrAdd /> Add task
        </button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.priority}`}>
            {editingTask === index ? (
              <form
                className="createTaskForm"
                onSubmit={(e) => handleSaveEdit(e, index)}
              >
                <input
                  type="text"
                  name="title"
                  defaultValue={task.title}
                  required
                />
                <textarea
                  name="description"
                  defaultValue={task.description}
                  required
                ></textarea>
                <select name="priority" defaultValue={task.priority} required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button type="submit">Save</button>
              </form>
            ) : (
              <div className="taskCard">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <h2
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {task.title}
                  </h2>
                  <p style={{ fontSize: "0.9rem" }}>
                    Priority: {task.priority}
                  </p>
                </div>
                <p style={{ textTransform: "capitalize", fontSize: "0.9rem" }}>
                  {task.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <p style={{ fontSize: "0.9rem" }}>
                    Status: {task.completed ? "Completed" : "Pending"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      justifycontent: "flex-end",
                    }}
                  >
                    <span onClick={() => handleToggleCompleted(index)}>
                      {task.completed ? <TiWarning /> : <MdCloudDone />}
                    </span>
                    <span onClick={() => handleDeleteTask(index)}>
                      <CgTrash />
                    </span>
                    <span onClick={() => handleEditTask(index)}>
                      <FaEdit />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListClient;
