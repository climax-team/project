import {ReactComponent as EmptyStar} from "../assets/star-empty.svg"
import {useEffect, useState} from "react";


export function TaskRender({userTasks, setIsEditorDisplayed, currentSelectedTask, setCurrentSelectedTask}) {
    const taskObj = userTasks.tasks;
    let currentTaskId = null;

    if (currentSelectedTask) {
        currentTaskId = currentSelectedTask.taskId;
    }

    const handleTaskClick = (task) => {
        setIsEditorDisplayed(true);
        setCurrentSelectedTask(task);
    }

    return (
        <>
            {taskObj.length ? (
                <ul className=''>
                    {
                        taskObj.map((task) =>
                            <li key={task.taskId}
                                onClick={() => handleTaskClick(task)}
                                className='
                                 flex
                                 my-1
                                 h-14
                                 p-1
                                 rounded-md
                                 bg-light_bg_color_op-50
                                 hover:bg-light_form_color'
                                style={{background: currentTaskId === task.taskId && 'rgba(148, 148, 255, 0.5)'}}
                            >
                                <div id='cheacker-radio' className='flex items-center justify-center '>
                                    {/*todo change component*/}
                                    <div className='
                                      w-5 h-5
                                      rounded-full
                                      ml-4 mr-3
                                      border-2
                                      border-solid
                                      border-form_gray_color
                                      hover:border-white
                                      '
                                    >
                                    </div>
                                </div>
                                <div id='task_info-text'
                                     className='flex items-center break-all w-full text-left'>
                                    <span className='text-base text-white '>
                                        {task.taskTitle}
                                    </span>
                                </div>
                                <div id='important_star-toggleBtn' className='flex items-center justify-center p-3'>
                                    <EmptyStar name='icon'/>
                                </div>
                            </li>
                        )
                    }
                </ul>
            ) : (
                <div className='flex justify-center items-center h-full'>
                    <h1 className='text-white text-2xl'>the task list is empty plz add your own task!!</h1>
                </div>
            )}
        </>
    )
}