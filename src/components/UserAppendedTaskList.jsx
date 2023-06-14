import {Link, useLoaderData,} from "react-router-dom";
import {ReactComponent as MoreOption} from '../assets/more-option.svg'
import React from "react";

export function UserAppendedTaskList({setCurrentItem, currentItem}) {
    const {userAddedTaskLists} = useLoaderData();

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
                                    >
                                        <div className='m-2'>
                                            <MoreOption name='icon'/>
                                        </div>
                                        <span className='text-white ml-2 text-lg'>
                                            {taskList.taskListTitle}
                                        </span>
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

