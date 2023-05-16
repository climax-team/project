import {
    Form,
    Outlet,
} from "react-router-dom";
import {FixedTaskList} from "../components/FixedTaskList.jsx";
import {UserAppendedTaskList} from "../components/UserAppendedTaskList.jsx";

import {createTaskList, getTaskLists} from "../tasks.js";
import React, {useState} from "react";
import {ReactComponent as BAccountCircle} from '../assets/big-account-circle.svg'
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router";

import {auth, FirestoreDB} from "../firebase-config.js";
import {doc, getDoc} from "firebase/firestore";


export async function action() {
    const taskList = await createTaskList();
    return {taskList};
}

export async function loader() {
    const taskLists = await getTaskLists();
    return {taskLists};
}


export default function Root() {
    const [showFlyout, setShowFlyout] = useState(false);
    const navigate = useNavigate();
    const [flyoutPosition, setFlyoutPosition] = useState({x: 0, y: 0});


    function handleLogOut() {
        signOut(auth).then(() => {
            sessionStorage.setItem('isAuthenticated', 'false');
            navigate('/login');
            console.log("log-out successful");
        }).catch((error) => {
            console.error("log out something happen");
        })
    }

    const showflyout = (event) => {
        event.preventDefault();
        const xPos = event.clientX;
        const yPos = event.clientY;
        setFlyoutPosition({x: xPos, y: yPos});
        setShowFlyout(true);
    };

    const handleDeleteFlyout = () => {
        setShowFlyout(false);
    };


    const user = auth.currentUser;
    const displayName = user.displayName;
    const email = user.email;
    const uid = user.uid;


    const getUserCol = FirestoreDB.collection("user").doc(uid).get();

    const userNick = "asdfa";

    async function handleNewClick() {
        const userCollection = doc(FirestoreDB, "user", uid);
        const docSnap = await getDoc(userCollection);
        if (displayName === null) {
            const RepresentUserName = docSnap.data().userName;
            console.log(RepresentUserName);
        }

        //
        // const docRef = doc(FirestoreDB, "userTaskLists", uid);
        // const docSnap = await getDoc(docRef);
        //
        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     // docSnap.data() will be undefined in this case
        //     console.log("No such document!");
        // }

    }


    return (
        <>
            <div id='sidebar' className='w-1/5 bg-light_bg_color h-screen border-2 flex flex-col min-w-max'>
                <div id='nav-header' className='h-1/4'>
                    <div id="user-info">
                        <div id='userInfoBox' className='flex flex-row' onClick={showflyout}>
                            <BAccountCircle/>
                            <div className='flex flex-col'>
                                <h1 id='userName' className='text-white'>
                                    {userNick === null ?
                                        displayName !== null ?
                                            {displayName}
                                            :
                                            "user name not found"
                                        :
                                        {userNick}
                                    }
                                </h1>
                                <h3 id='userEmail' className='text-white'>{email}</h3>
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