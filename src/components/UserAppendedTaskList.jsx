import {Form, Link, useLoaderData,} from "react-router-dom";
import {ReactComponent as MoreOption} from '../assets/more-option.svg'
import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {FirestoreDB} from "../firebase-config.js";
import {deleteTaskList} from "../taskListControler.js";
import {redirect, useNavigate} from "react-router";

export function UserAppendedTaskList({setCurrentItem, currentItem}) {
    const {userAddedTaskLists} = useLoaderData();
    const navigate = useNavigate();


    const [flyoutPosition, setFlyoutPosition] = useState({x: 0, y: 0});
    const showflyout = (event) => {
        event.preventDefault();

        const xPos = event.clientX;
        const yPos = event.clientY;
        setFlyoutPosition({x: xPos, y: yPos});
        setShowFlyout(true);
    };

    const [showFlyout, setShowFlyout] = useState(false);

    return (
        <>
            {userAddedTaskLists ?
                (
                    <ul>
                        {userAddedTaskLists.map(taskList => (
                            <li key={taskList.id}>
                                <Link to={`task/${taskList.id}`}
                                      onClick={() => setCurrentItem(taskList.id)}>
                                    <div className='
                                          flex
                                          hover:bg-light_form_color
                                          rounded-md
                                          mx-2 my-1
                                          px-0.5
                                          py-2
                                          items-center
                                          '
                                         style={{background: currentItem === taskList.id && '#1e1e2c'}}
                                         onContextMenu={showflyout}
                                    >
                                        <div className='m-2'>
                                            <MoreOption name='icon'/>
                                        </div>
                                        <span className='text-white ml-2 text-lg'>
                                            {taskList.taskListTitle}
                                        </span>

                                        {showFlyout &&
                                            (<div
                                                style={{
                                                    top: flyoutPosition.y,
                                                    left: flyoutPosition.x,
                                                }}
                                                className='
                                                    absolute
                                                    bg-form_gray_color
                                                    border-solid
                                                    border
                                                    border-black
                                                    p-2.5'
                                            >
                                                {/*<Form*/}
                                                {/*    method="post"*/}
                                                {/*    action="destroy"*/}
                                                {/*    onSubmit={(event) => {*/}
                                                {/*        if (!confirm("are you sure?")) {*/}
                                                {/*            event.preventDefault();*/}
                                                {/*        } else {*/}
                                                {/*            void deleteTaskList(taskList.id)*/}
                                                {/*            redirect('/');*/}
                                                {/*        }*/}

                                                {/*    }*/}
                                                {/*    }*/}
                                                {/*>*/}
                                                {/*</Form>*/}
                                                <button onClick={(event) => {
                                                    if (!confirm("are you sure?")) {
                                                        event.preventDefault();
                                                    } else {
                                                        void deleteTaskList(taskList.id)
                                                        redirect('/');
                                                        setShowFlyout(false);
                                                    }
                                                }
                                                }>🐍delete🐍
                                                </button>
                                                <button>| edit |</button>
                                                <button onClick={() =>
                                                    setShowFlyout(false)
                                                }>* x *
                                                </button>
                                            </div>)
                                        }
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
                :
                (<p>
                    <i>No taskLists</i>
                </p>)
            }
        </>
    )
}

