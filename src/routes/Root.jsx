import React, {useEffect, useState} from "react";
import {
    Form,
    Outlet,
    useLoaderData,
} from "react-router-dom";
import {useNavigate} from "react-router";
import {createTaskList, getTaskLists} from "../taskListControler.js";
import {ReactComponent as BAccountCircle} from '../assets/big-account-circle.svg'
import {FixedTaskList} from "../components/FixedTaskList.jsx";
import {UserAppendedTaskList} from "../components/UserAppendedTaskList.jsx";

import {auth, FirestoreDB} from "../firebase-config.js";
import { getDoc, doc} from "firebase/firestore";
import {signOut} from "firebase/auth";


export async function action() {
    const taskList = await createTaskList();
    return {taskList};
}

export async function loader() {
    const userAddedTaskLists = await getTaskLists();
    return {userAddedTaskLists};
}

export default function Root() {
    const navigate = useNavigate();

    function handleLogOut() {
        signOut(auth).then(() => {
            navigate('/logIn');
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


    const [userData, setUserData] = useState({});

    const userInfoDocRef = doc(FirestoreDB, "user", auth.currentUser.uid);

    useEffect(() => {
        async function getUser() {
            const userInfoDocSnap = await getDoc(userInfoDocRef);
            setUserData(
                userInfoDocSnap.data().userData
            );
        }

        void getUser();
    }, []);

    return (
        <>
            <div id='sidebar' className='w-1/5 bg-light_bg_color h-screen border-2 flex flex-col min-w-max'>
                <div id='nav-header' className='h-1/4'>
                    <div id="user-info">
                        <div id='userInfoBox' className='flex flex-row' onClick={showflyout}>
                            <BAccountCircle/>
                            <div className='flex flex-col'>
                                <h1 id='userName' className='text-white'>
                                    {sessionStorage.getItem('userName') !== "null" ?
                                        sessionStorage.getItem('userName')
                                        :
                                        userData.userName}
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
                        <Form method="post">
                            <button type="submit">New</button>
                        </Form>
                    </div>
                </div>
            </div>
            <div id='contents' className='w-screen h-screen border-2 border-black'>
                <Outlet/>
            </div>
        </>
    );
}