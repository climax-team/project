import {Link,} from "react-router-dom";
import {ReactComponent as MoreOption} from '../assets/more-option.svg'
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {FirestoreDB} from "../firebase-config.js";



export function UserAppendedTaskList(userTaskLists) {

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

    console.log(Object.values(userTaskLists.userTaskLists));

    return (
        <>
            {Object.values(userTaskLists.userTaskLists)?
                (
                    <ul>
                        {Object.values(userTaskLists.userTaskLists).map(taskList => (
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
                                                <i>No Title List</i>
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

