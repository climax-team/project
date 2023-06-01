import React, { useState } from "react";
import {
    Form, Link,
    Outlet,
    useLoaderData,
} from "react-router-dom";
import {useNavigate} from "react-router";
import {createTaskList, getTaskLists, getUserInfo} from "../taskListControler.js";
import {ReactComponent as BAccountCircle} from '../assets/big-account-circle.svg'
import {ReactComponent as Calender} from '../assets/calendar.svg'
import {FixedTaskList} from "../components/FixedTaskList.jsx";
import {UserAppendedTaskList} from "../components/UserAppendedTaskList.jsx";

import {auth} from "../firebase-config.js";
import {signOut} from "firebase/auth";


export async function action() {
    const taskList = await createTaskList();
    return {taskList};
}

export async function loader() {
    const userAddedTaskLists = await getTaskLists();
    const userInfo = await getUserInfo();

    return {userAddedTaskLists, userInfo};
}

export default function Root() {
    const navigate = useNavigate();
    const {userInfo} = useLoaderData();

    function handleLogOut() {
        signOut(auth).then(() => {
            navigate('/logIn');
            window.localStorage.clear();
            window.location.reload()
            console.log("log-out successful");
        }).catch((error) => {
            console.error("log out something happen");
        })
    }

    //todo eliminate duplicate
    const [flyoutPosition, setFlyoutPosition] = useState({x: 0, y: 0});
    const showflyout = (event) => {
        event.preventDefault();
        const xPos = event.clientX;
        const yPos = event.clientY;
        setFlyoutPosition({x: xPos, y: yPos});
        setShowFlyout(true);
    };

    const [showFlyout, setShowFlyout] = useState(false);
    const handleDeleteFlyout = () => {
        setShowFlyout(false);
    };

    return (
        <>
            <div id='sidebar' className='w-1/5 bg-light_bg_color h-screen border-2 flex flex-col min-w-max'>
                <div id='nav-header' className='h-1/4'>
                    <div id="user-info">
                        <div id='userInfoBox' className='flex flex-row' onClick={showflyout}>
                            <BAccountCircle name='icon'/>
                            <div className='flex flex-col'>
                                <h1 id='userName' className='text-white'>
                                    {auth.currentUser.displayName === null ?
                                        userInfo.userName
                                        :
                                        localStorage.getItem('userName')
                                    }
                                </h1>
                                <h3 id='userEmail' className='text-white'>{auth.currentUser.email}</h3>
                            </div>
                        </div>
                        {showFlyout && (
                            <div
                                style={{top: flyoutPosition.y, left: flyoutPosition.x,}}
                                className='absolute bg-form_gray_color border-solid border border-black p-2.5'
                            >
                                <button onClick={handleLogOut}>
                                    log out
                                </button>
                                <button onClick={handleDeleteFlyout}>* x *</button>
                            </div>
                        )}
                    </div>
                    <div id="search-bar">

                    </div>
                </div>

                <div id='nav-items' className='border-2 h-1/3 flex-grow min-w-max'>
                    <div id="fixed-taskList">
                        <FixedTaskList/>
                    </div>
                    <div id="added-taskList">
                        <UserAppendedTaskList/>
                    </div>
                </div>

                <div id='nav-bottom-items' className='h-20 border-2 w-full '>
                    <div id="bottom-content">
                        <Link to={`/calender`}>
                            <div id='daily-tasks' className='task-list'>
                                <Calender name='icon'/>
                                <span>daily tasks</span>
                            </div>
                        </Link>
                        <Form method="post">
                            <button type="submit">New</button>
                        </Form>
                    </div>
                </div>
            </div>
            <div id='tadks' className='w-screen h-screen bg-deep_bg_color'>
                <Outlet/>
            </div>
        </>
    );
}