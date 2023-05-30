import {Link, useLoaderData,} from "react-router-dom";
import {ReactComponent as MoreOption} from '../assets/more-option.svg'
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {FirestoreDB} from "../firebase-config.js";



export function UserAppendedTaskList() {
    const { userAddedTaskLists } = useLoaderData();


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

    console.log(userAddedTaskLists);


    return (
        <>
            { userAddedTaskLists ?
                (
                    <ul>
                        {userAddedTaskLists.map(taskList => (
                            <li key={taskList.id}>
                                <Link to={`task/${taskList.id}`}>
                                    <div className='flex' onContextMenu={showflyout}>
                                        <MoreOption/>
                                        {taskList.taskListTitle ?
                                            (
                                                <>
                                                    {taskList.taskListTitle}
                                                </>
                                            ) :
                                            (
                                                <i>null</i>
                                            )
                                        }

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
                                                <button onClick={() => (taskList.id)}>| delete</button>
                                                <button>| edit |</button>
                                                <button onClick={handleDeleteFlyout}>* x *</button>
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

