import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import './styles/index.css'
import {DailyTasks} from "./routes/FixedTaskLists/DailyTasks.jsx";
import {Important} from "./routes/FixedTaskLists/Important.jsx";
import {Plan} from "./routes/FixedTaskLists/Plan.jsx";
import {AboutMe} from "./routes/FixedTaskLists/AboutMe.jsx";
import {TasksNavItem} from "./routes/FixedTaskLists/Tasks-nav-item.jsx";


import Task, {
    loader as taskListLoader,
} from "./routes/Task.jsx";

import Root, {
    loader as rootLoader,
    action as rootAction,
} from "./routes/Root.jsx";
import PrivateRoute from "./routes/PrivateRouter.tsx";

import Login from "./routes/auth/Login.jsx";
import SignIn from "./routes/auth/SignIn.jsx";
import MainPage from "./routes/MainPage.tsx";



const router = createBrowserRouter([
    // {
    //     index: true,
    //     path: "/singInPlease",
    //     element: <MainPage/>,
    // },

    {
        element: <PrivateRoute authentication={false}/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signIn",
                element: <SignIn/>
            }
        ]
    },


    {
        element: <PrivateRoute authentication={true}/>,
        children: [
            {
                path: "/",
                element: <Root/>,
                action: rootAction,
                loader: rootLoader,
                children: [
                    {
                        path: "/task/:taskId",
                        element: <Task/>,
                        loader: taskListLoader,
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
                    },

                ]
            }
        ]
    },
]);


function Loading() {
    return <h1> loading .....</h1>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} fallbackElement={<Loading/>}/>
    </React.StrictMode>,
)
