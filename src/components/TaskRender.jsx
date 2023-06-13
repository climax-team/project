import {ReactComponent as EmptyStar} from "../assets/star-empty.svg"
import {useState} from "react";


export function TaskRender({userTasks, setIsEditorDisplayed, currentSelectedTask ,setCurrentSelectedTask}) {
    const taskObj = userTasks.tasks;

    const handleTaskClick = (taskId) => {
        setIsEditorDisplayed(true);
        setCurrentSelectedTask(taskId);
    }
    return (
        <>
            {!taskObj.isEmpty ? (
                <ul className=''>
                    {
                        taskObj.map((task) =>
                            <li key={task.taskId}
                                onClick={() => handleTaskClick(task.taskId)}
                                className='
                                 h-14 my-1
                                 rounded-md
                                 flex
                                 items-center
                                 justify-between
                                 bg-light_bg_color_op-50
                                 hover:bg-light_form_color'
                                style={{background: currentSelectedTask === task.taskId && 'rgba(148, 148, 255, 0.5)'}}
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
                                <div id='task_info-text' className='w-full flex items-center text-white text-base'>
                                    <h1>
                                        {task.taskTitle}
                                    </h1>
                                </div>
                                <div id='important_star-toggleBtn' className='flex items-center justify-center p-3'>
                                    <EmptyStar name='icon'/>
                                </div>
                            </li>
                        )
                    }
                </ul>
            ) : (
                <h1>the list is empty plz add your own task</h1>
            )}
        </>
    )
}