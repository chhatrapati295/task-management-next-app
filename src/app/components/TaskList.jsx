"use client"; // Ensure this file is treated as a Client Component

import React from "react";
import TaskListClient from "../components/TaskInfo"; // Corrected import

// Task list display component
const Tasks = ({ initialTasks }) => {
  return (
    <main className="taskListWrapper">
      <ul>
        {initialTasks?.map((task, index) => (
          <li key={index} className={`task-item ${task.priority}`}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>{task.title}</h2>
              <p>Priority: {task.priority}</p>
            </div>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
      <TaskListClient initialTasks={initialTasks} />
    </main>
  );
};

// Server-side rendering function to fetch tasks
export async function getServerSideProps() {
  const tasks = [
    {
      title: "Task 1",
      description: "Description 1",
      priority: "medium",
      completed: false,
    },
    {
      title: "Task 2",
      description: "Description 2",
      priority: "high",
      completed: false,
    },
    {
      title: "Task 3",
      description: "Description 3",
      priority: "low",
      completed: true,
    },
  ];

  // Pass the initial tasks as props to the component
  return {
    props: { initialTasks: tasks },
  };
}

export default Tasks;
