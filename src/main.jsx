import React, {useEffect, useState} from 'react'
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


import Root, {
    action as rootAction,
    loader as rootLoader,
} from "./routes/Root.jsx";
import Task from "./routes/Task.jsx";


import Login from "./routes/auth/Login.jsx";
import SignIn from "./routes/auth/SignIn.jsx";


import {auth} from "./firebase-config.js";

function Main() {
    const [userObj, setUserObj] = useState(null);


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(null);
            }
        });
    }, []);


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root
                userObj = {userObj}
            />,
            action: rootAction,
            loader: rootLoader,
            children: [
                {
                    path: "/task/:taskId",
                    element: <Task/>,
                    //loader: taskLoader,
                    //action: taskAction,
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
    ]);

    const LoginRouter = createBrowserRouter([
        {
            path: '/',
            element: <Loading/>
        },
        {
            index: true,
            path: "/logIn",
            element: <Login/>,
        },
        {
            path: "/signIn",
            element: <SignIn/>
        }
    ])

    return (
        <>
            {auth.currentUser ? (
                <RouterProvider router={router} fallbackElement={<Loading/>}/>
            ) : (
                <RouterProvider router={LoginRouter} fallbackElement={<Loading/>}/>
            )
            }
        </>
    )
}


//todo styling loading page
function Loading() {
    return <h1> loading .....</h1>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
)
