import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {auth} from "../firebase-config.js";

import './styles/index.css'
import DailyTasks, {
    action as dailyAction,
    loader as dailyLoader
} from "./routes/FixedTaskLists/DailyTasks.jsx";
import {Important} from "./routes/FixedTaskLists/Important.jsx";
import {Plan} from "./routes/FixedTaskLists/Plan.jsx";
import {AboutMe} from "./routes/FixedTaskLists/AboutMe.jsx";
import {TasksNavItem} from "./routes/FixedTaskLists/Tasks-nav-item.jsx";
import {Calender} from "./routes/Calender.jsx";
import Task from "./routes/Task.jsx";
import Login from "./routes/auth/Login.jsx";
import SignIn from "./routes/auth/SignIn.jsx";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root, {
    action as rootAction,
    loader as rootLoader,
} from "./routes/Root.jsx";

import {action as destroyAction} from "./routes/Destroy.jsx";
import {
    loader as taskLoader,
} from './routes/Task.jsx';


import {Index} from "./routes/Index.jsx";
import SearchPage from "./routes/SearchPage.jsx";

function Main() {
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(() => {
                setUserObj({})
            }
        );
    }, []);


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            action: rootAction,
            loader: rootLoader,
            children: [
                {
                    index: true,
                    element: <Index/>
                },
                {
                    path: "/task/:taskListId",
                    element: <Task/>,
                    loader: taskLoader,
                },
                {
                    path: "/search",
                    element: <SearchPage/>
                },
                {
                    path: "/calender",
                    element: <Calender/>,
                },
                {
                    path: "/task/:taskListId/destroy",
                    action: destroyAction,
                    errorElement: <div>Oops! There was an error.</div>,
                },
                {
                    path: "/task/dailyTasks",
                    element: <DailyTasks/>,
                    action: dailyAction,
                    loader: dailyLoader
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
                    path: "/task/aboutMe",
                    element: <AboutMe/>
                },
                {
                    path: "/task/tasks",
                    element: <TasksNavItem/>
                },
            ]
        },

    ]);

    const LoginRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: "/signIn",
            element: <SignIn/>
        }
    ])

    return (
        <>
            {auth.currentUser !== null ? (
                <RouterProvider router={router} fallbackElement={<Loading/>}/>
            ) : (
                <RouterProvider router={LoginRouter} fallbackElement={<Loading/>}/>
            )
            }
        </>
    )
}

function Loading() {
    return (
        <div className='w-full h-full bg-deep_bg_color flex justify-center items-center'>
            <h1 className='text-xl text-white'>
                loading......
            </h1>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Main/>
    </React.StrictMode>,
)
