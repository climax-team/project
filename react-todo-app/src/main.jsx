import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from './routes/Root.jsx'

import './styles/index.css'
import {Task} from "./routes/Task.jsx";
import {DailyTasks} from "./routes/DailyTasks.jsx";
import {Important} from "./routes/Important.jsx";
import {Plan} from "./routes/Plan.jsx";
import {AboutMe} from "./routes/AboutMe.jsx";
import {TasksNavItem} from "./routes/Tasks-nav-item.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/task/:taskId",
                element: <Task/>,
            },
            {
                path: "/task/daily-tasks",
                element: <DailyTasks/>
            },
            {
                path: "/task/important",
                element: <Important/>
            },
            {
                path: "/task/plan",
                element: <Plan/>
            },
            {
                path: "/task/about-me",
                element: <AboutMe/>
            },
            {
                path: "/task/tasks",
                element: <TasksNavItem/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
